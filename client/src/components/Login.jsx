import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, Stethoscope } from "lucide-react";
import img from "../Images/doctor.png";

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
      return setError("Please fill in all fields.");
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
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-200">
        {/* Left Side: Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header / Logo */}
            <div className="flex items-center space-x-2.5 mb-8">
              <div className="p-2.5 bg-green-600 rounded-xl text-white shadow-md shadow-green-600/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                CareQueue
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Please enter your credentials to access your portal.
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div className="flex flex-col">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="doctor@carequeue.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Password
                  </label>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Glossy 3D Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-3 px-6 bg-gradient-to-b from-green-500 via-green-600 to-green-700 hover:from-green-400 hover:to-green-600 active:to-green-800 text-white rounded-full shadow-lg shadow-green-600/30 border border-green-400/40 focus:outline-none focus:ring-4 focus:ring-green-400/50 transition-all duration-150 flex items-center justify-between overflow-hidden cursor-pointer mt-2"
              >
                {/* Glossy Top Glass Effect */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />

                {/* Left White Circular Badge */}
                <div className="relative z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600 fill-current ml-0.5"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Button Label */}
                <span className="relative z-10 flex-1 text-center font-extrabold text-base tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] pr-9">
                  {loading ? "LOGIN..." : "LOGIN"}
                </span>
              </button>
            </form>
          </div>

          {/* Footer Register Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <a
              href="#forgot"
              className="text-xs hover:text-green-700 transition-colors"
            >
              Forgot password?
            </a>
            <p className="text-xs text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Visual Hero Side */}
        <div className="hidden md:flex relative bg-gradient-to-br from-green-600 to-emerald-800 p-8 flex-col justify-between overflow-hidden">
          {/* Subtle Glow Accents */}
          <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-emerald-900/30 rounded-full blur-2xl"></div>

          <div className="relative z-10 text-white space-y-2">
            <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase text-green-100 border border-white/10">
              Smart Healthcare Portal
            </span>
            <h2 className="text-2xl font-bold leading-tight pt-1">
              Welcome Back
            </h2>
            <p className="text-green-100/80 text-xs leading-relaxed max-w-xs">
              Log in to manage appointments, live queue status, and consult with
              patients seamlessly.
            </p>
          </div>

          {/* Doctor Image Container */}
          <div className="relative z-10 my-auto flex justify-center items-center py-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md"></div>
              <img
                src={img}
                alt="Doctor Illustration"
                className="relative w-56 max-h-72 object-contain rounded-2xl drop-shadow-xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-green-100/70 border-t border-white/10 pt-3">
            <span>CareQueue System</span>
            <span>Fast & Secure Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
