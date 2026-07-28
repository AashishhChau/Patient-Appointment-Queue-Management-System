import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, Stethoscope, Eye, EyeOff, ShieldCheck, Activity } from "lucide-react";
import img from "../Images/doctor.png";

const InputField = ({ icon: Icon, type, placeholder, value, onChange, label, extraLabel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-medium text-slate-300 tracking-wide">
          {label}
        </label>
        {extraLabel}
      </div>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 shadow-inner"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please fill in all required fields.");
    }

    try {
      setError("");
      setLoading(true);

      const data = await login(email, password);
      toast.success("Login successful!");

      switch (data.user.role) {
        case "user":
          navigate("/user/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Main Glass Card Wrapper */}
      <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 backdrop-blur-md">

        {/* Left Side: Form Controls */}
        <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-between border-r border-slate-800/80">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl text-slate-950 shadow-lg shadow-emerald-500/20">
                <Stethoscope className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block leading-none">CareQueue</span>
                <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">Health Systems</span>
              </div>
            </div>

            {/* Title Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white tracking-tight">Portal Authentication</h1>
              <p className="text-slate-400 text-xs mt-1">Enter your credentials to access your clinical dashboard.</p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="doctor@carequeue.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="Password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                extraLabel={
                  <a href="#forgot" className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                    Forgot password?
                  </a>
                }
              />

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
                    <span>Authenticating...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Register now
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Hero Banner */}
        <div className="hidden md:flex md:col-span-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 p-8 flex-col justify-between">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Info Pill */}
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              HIPAA Compliant Platform
            </span>
            <h2 className="text-xl font-bold text-white leading-snug">Unified Queue &amp; Care Management</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Access real-time patient queues, automated scheduling, and encrypted health records in one interface.
            </p>
          </div>

          {/* Animated Heartbeat Graphic */}
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

          {/* System Footer Metadata */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
            <span>CareQueue v2.4</span>
            <span>AES-256 Encryption</span>
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

export default Login;