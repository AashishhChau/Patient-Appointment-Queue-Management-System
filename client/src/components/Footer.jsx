import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-teal-900/50">
      {/* Top Banner: Emergency & Quick Status */}
      <div className="bg-amber-950/40 border-b border-amber-900/30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-amber-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-bold">Medical Emergency?</span>
            <span>Please call <strong className="text-white underline">911</strong> (or your local emergency services) directly.</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Live Queue Tracker: <strong className="text-white">Active</strong></span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: System Info & Identity */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">CareQueue</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Streamlining patient appointments, real-time wait times, and clinic workflows for a smoother healthcare experience.
          </p>
        </div>

        {/* Col 2: Patient Portal Links */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3 tracking-wider uppercase">Patient Services</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#book" className="hover:text-teal-300 transition-colors">Book Appointment</a></li>
            <li><a href="#queue" className="hover:text-teal-300 transition-colors">Check Live Queue Status</a></li>
            <li><a href="#departments" className="hover:text-teal-300 transition-colors">Departments & Doctors</a></li>
            <li><a href="#telehealth" className="hover:text-teal-300 transition-colors">Virtual Consultations</a></li>
          </ul>
        </div>

        {/* Col 3: Support & Hours */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3 tracking-wider uppercase">Clinic Hours</h4>
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Mon - Fri:</span>
              <span className="text-slate-200">8:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-slate-200">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-amber-400 font-medium">Emergency Only</span>
            </div>
          </div>
        </div>

        {/* Col 4: Help Desk & Contact */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3 tracking-wider uppercase">Support Desk</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+977 XXXXXXXXXX-CARE</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@clinicqueue.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Legal & Rights */}
      <div className="border-t border-slate-800 bg-slate-950 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} Patient Appointment and Queue Management System. All rights reserved.</p>
          <div className="flex space-x-6">
        
            <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;