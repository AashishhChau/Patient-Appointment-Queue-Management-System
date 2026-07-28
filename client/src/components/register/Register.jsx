import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Stethoscope, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Activity,
  Check,
  UserPlus,
  HeartPulse
} from "lucide-react";
import img from "../../Images/doctor.png";

const Field = ({ label, required, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-slate-300 tracking-wide">
      {label} {required && <span className="text-emerald-400">*</span>}
    </label>
    {children}
  </div>
);

const IconInput = ({ icon: Icon, type = "text", name, placeholder, value, onChange, required }) => (
  <div className="relative group">
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
      <Icon className="w-4 h-4" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-900/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
    />
  </div>
);

const PasswordInput = ({ name, value, onChange, visible, onToggle, placeholder }) => (
  <div className="relative group">
    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
      <Lock className="w-4 h-4" />
    </div>
    <input
      type={visible ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
      aria-label={visible ? "Hide password" : "Show password"}
    >
      {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => setFormData((prev) => ({ ...prev, role }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phone, address, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill in all required fields.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await register({ name, email, password, phone, address, role });
      toast.success("Registration successful!");
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-md">

        {/* Left Side: Visual Hero Banner */}
        <div className="hidden lg:flex lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 p-8 flex-col justify-between border-r border-slate-800/80">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Pill */}
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Patient &amp; Provider Portal
            </span>
            <h2 className="text-2xl font-bold text-white leading-tight">
              Care that keeps pace with you.
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Create a single unified account to schedule visits, review health records, and interface with your clinical team.
            </p>
          </div>

          {/* Animated Graphic */}
          <div className="relative z-10 my-auto py-2">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400/80 font-mono mb-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE SYSTEM STATUS: ONLINE</span>
            </div>
            <svg viewBox="0 0 300 60" className="w-full" fill="none">
              <path
                d="M0 30 H95 L108 10 L124 50 L138 30 H300"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="[stroke-dasharray:1] [stroke-dashoffset:1] animate-[drawLine_2s_ease-out_infinite]"
              />
            </svg>
          </div>

          {/* Doctor Image Overlay */}
          <div className="relative z-10 my-auto flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
                <img src={img} alt="Doctor" className="w-48 max-h-56 object-cover rounded-xl" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
            <span>Seamless Onboarding</span>
            <span>HIPAA Compliant</span>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Branding Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 shadow-lg shadow-emerald-500/20">
                <Stethoscope className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block leading-none">CareQueue</span>
                <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">Health Systems</span>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white tracking-tight">Create an Account</h1>
              <p className="text-slate-400 text-xs mt-1">Select your account type to proceed with registration.</p>
            </div>

            {/* Error Message Banner */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Professional Card-Style Role Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300 tracking-wide">
                  Registering As <span className="text-emerald-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Patient Selection Card */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("user")}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                      formData.role === "user"
                        ? "bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-500/10"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                      formData.role === "user" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                    }`}>
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${formData.role === "user" ? "text-slate-100" : "text-slate-400"}`}>
                          Patient
                        </span>
                        {formData.role === "user" && (
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">Book &amp; manage appointments</p>
                    </div>
                  </button>

                  {/* Doctor Selection Card */}
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("doctor")}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                      formData.role === "doctor"
                        ? "bg-slate-800/90 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-500/10"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                      formData.role === "doctor" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                    }`}>
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${formData.role === "doctor" ? "text-slate-100" : "text-slate-400"}`}>
                          Doctor
                        </span>
                        {formData.role === "doctor" && (
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">Manage schedules &amp; queues</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <Field label="Full Name" required>
                <IconInput
                  icon={User}
                  name="name"
                  placeholder="Dr. Sarah Connor or John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Field>

              {/* Email Address */}
              <Field label="Email Address" required>
                <IconInput
                  icon={Mail}
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Password" required>
                  <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    visible={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                    placeholder="••••••••"
                  />
                </Field>
                <Field label="Confirm Password" required>
                  <PasswordInput
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    visible={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                    placeholder="••••••••"
                  />
                </Field>
              </div>

              {/* Contact Information Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Phone Number">
                  <IconInput
                    icon={Phone}
                    type="tel"
                    name="phone"
                    placeholder="+977 0000000000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Address">
                  <IconInput
                    icon={MapPin}
                    name="address"
                    placeholder="Street, City"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.99] text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Registering Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Routing */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
            Already registered?{" "}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawLine { 
          0% { stroke-dashoffset: 1; } 
          50% { stroke-dashoffset: 0; } 
          100% { stroke-dashoffset: -1; } 
        }
      `}</style>
    </div>
  );
};

export default Register;