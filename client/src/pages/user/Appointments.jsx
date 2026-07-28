import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Stethoscope,
  AlertCircle,
  CalendarX,
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  Plus,
  X
} from 'lucide-react';

function ConfirmCancelModal({ open, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 motion-safe:animate-[popIn_0.18s_ease-out]">
        <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
          <AlertCircle className="w-5 h-5 text-rose-400" />
        </div>
        <h3 className="text-white font-bold text-base mb-1">Cancel this appointment?</h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-6">
          This can't be undone. You'll need to book a new appointment if you change your mind.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-slate-950 transition-colors"
          >
            Cancel appointment
          </button>
        </div>
      </div>
      <style>{`@keyframes popIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

// Shared button styles so the table and mobile-card views can't drift apart
const cancelBtnClass = (isPending) =>
  `inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
    isPending
      ? 'text-rose-300 border-rose-500/30 hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-95'
      : 'text-slate-600 border-slate-800 bg-slate-800/40 cursor-not-allowed opacity-50'
  }`;

const rescheduleBtnClass = (isPending) =>
  `inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
    isPending
      ? 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-sm shadow-teal-400/20 active:scale-95'
      : 'text-slate-600 border border-slate-800 bg-slate-800/40 cursor-not-allowed opacity-50'
  }`;

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingCancelId, setPendingCancelId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(`${API_URL}/api/appointments`, config);
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please refresh or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const confirmCancel = async () => {
    const appointmentId = pendingCancelId;
    setPendingCancelId(null);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`${API_URL}/api/appointments/${appointmentId}`, config);
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (err) {
      console.error('Cancellation error:', err);
      alert('Failed to cancel appointment.');
    }
  };

  const renderStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'approved':
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="capitalize">{status}</span>
          </span>
        );
      case 'cancelled':
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            <span className="capitalize">{status}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock3 className="w-3.5 h-3.5 animate-pulse" />
            <span className="capitalize">{status || 'Pending'}</span>
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        </div>
        <p className="text-slate-400 text-sm font-medium">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            My Appointments
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage your upcoming medical consultations and view status updates.
          </p>
        </div>

        <Link
          to="/user/book-appointment"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/10 transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Book Appointment
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {appointments.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-10 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
          <div className="p-4 bg-slate-800/50 rounded-2xl text-slate-400 mb-4 border border-slate-700/50">
            <CalendarX className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No appointments found</h3>
          <p className="text-slate-400 text-xs mb-6 max-w-xs">
            You don't have any scheduled appointments at the moment.
          </p>
          <Link
            to="/user/book-appointment"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Book New Appointment
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop & Tablet View (Table) */}
          <div className="hidden md:block overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">#</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Doctor Info</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Date &amp; Time</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Reason</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {appointments.map((appt, index) => {
                    const isPending = appt.status?.toLowerCase() === 'pending';
                    return (
                      <tr key={appt.id} className="hover:bg-slate-800/40 transition-colors duration-150">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 border border-slate-700/60">
                              <Stethoscope className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm">
                                {appt.Doctor?.User?.name || 'Dr. Assigned'}
                              </div>
                              <div className="text-xs text-slate-400">
                                {appt.Doctor?.specialization || 'General Physician'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{appt.appointmentDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>{appt.appointmentTime}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-1.5 text-xs text-slate-300 max-w-xs truncate">
                            <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                            <span className="truncate">{appt.reason || 'General Checkup'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {renderStatusBadge(appt.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setPendingCancelId(appt.id)}
                              disabled={!isPending}
                              className={cancelBtnClass(isPending)}
                            >
                              <X className="w-3.5 h-3.5" />
                              Cancel
                            </button>

                            {isPending ? (
                              <Link to={`/user/reshedule/${appt.id}`}>
                                <button className={rescheduleBtnClass(true)}>
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  Reschedule
                                </button>
                              </Link>
                            ) : (
                              <button disabled className={rescheduleBtnClass(false)}>
                                <RefreshCw className="w-3.5 h-3.5" />
                                Reschedule
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {appointments.map((appt) => {
              const isPending = appt.status?.toLowerCase() === 'pending';
              return (
                <div
                  key={appt.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400 border border-slate-700/60">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {appt.Doctor?.User?.name || 'Dr. Assigned'}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {appt.Doctor?.specialization || 'General Physician'}
                        </p>
                      </div>
                    </div>
                    {renderStatusBadge(appt.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-500 font-medium text-[10px] uppercase mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" /> Date
                      </div>
                      <div className="text-slate-200 font-medium">{appt.appointmentDate}</div>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-500 font-medium text-[10px] uppercase mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-teal-400" /> Time
                      </div>
                      <div className="text-slate-200 font-medium">{appt.appointmentTime}</div>
                    </div>
                  </div>

                  {appt.reason && (
                    <div className="text-xs text-slate-400 bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/50">
                      <span className="text-slate-500 font-medium">Reason: </span>
                      {appt.reason}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setPendingCancelId(appt.id)}
                      disabled={!isPending}
                      className={`flex-1 py-2 ${cancelBtnClass(isPending)}`}
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>

                    {isPending ? (
                      <Link to={`/user/reshedule/${appt.id}`} className="flex-1">
                        <button className={`w-full py-2 ${rescheduleBtnClass(true)}`}>
                          <RefreshCw className="w-3.5 h-3.5" />
                          Reschedule
                        </button>
                      </Link>
                    ) : (
                      <button disabled className={`flex-1 py-2 ${rescheduleBtnClass(false)}`}>
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ConfirmCancelModal
        open={pendingCancelId !== null}
        onConfirm={confirmCancel}
        onClose={() => setPendingCancelId(null)}
      />
    </div>
  );
}