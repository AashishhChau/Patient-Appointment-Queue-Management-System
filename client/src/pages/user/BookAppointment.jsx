import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const toDateInputValue = (date) => date.toISOString().split("T")[0];
const toTimeInputValue = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

const inputClass =
  "w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 disabled:bg-slate-50 disabled:text-slate-400";

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5 tracking-wide uppercase">
      {Icon && <Icon className="w-3.5 h-3.5 text-teal-600" />}
      {label}
    </label>
    {children}
  </div>
);

const BookAppointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const now = new Date();
  const today = toDateInputValue(now);
  const isToday = formData.appointmentDate === today;
  const minTime = isToday ? toTimeInputValue(now) : undefined;

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);

  const fetchApprovedDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(`${API_URL}/api/doctors`, config);
      setDoctors(response.data.filter((doc) => doc.isApproved));
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // If date changes to today and the currently-picked time is now in the past, clear it
      if (
        name === "appointmentDate" &&
        value === today &&
        prev.appointmentTime < toTimeInputValue(new Date())
      ) {
        next.appointmentTime = "";
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const selected = new Date(
      `${formData.appointmentDate}T${formData.appointmentTime}`,
    );
    if (selected < new Date()) {
      return setError(
        "Please choose a date and time that hasn't already passed.",
      );
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.post(
        `${API_URL}/api/appointments`,
        formData,
        config,
      );
      setMessage(response.data.message);
      setFormData({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
      navigate("/user/appointments");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Appointment creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-slate-500 text-sm">Loading doctors…</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Book an appointment
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Pick a doctor, a time that works, and let us know why you're coming
            in.
          </p>
        </div>

        {message && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {message}
          </div>
        )}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Select doctor" icon={Stethoscope}>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.User?.name} — {doc.specialization}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date" icon={Calendar}>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={today}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Time" icon={Clock}>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                min={minTime}
                required
                disabled={!formData.appointmentDate}
                className={inputClass}
              />
            </Field>
          </div>
          {isToday && (
            <p className="text-[11px] text-slate-400 -mt-2">
              Booking for today — only times from now onward are available.
            </p>
          )}

          <Field label="Reason for visit" icon={FileText}>
            <input
              type="text"
              name="reason"
              placeholder="e.g. Annual check-up, persistent cough…"
              value={formData.reason}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 bg-green-600 hover:bg-teal-500 active:scale-[0.99] text-green-700 font-semibold text-sm rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Booking…
              </>
            ) : (
              "Book appointment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
