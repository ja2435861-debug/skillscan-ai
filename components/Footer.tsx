import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center p-1.5 shadow-lg shadow-cyan-500/20">
               <svg viewBox="0 0 100 100" className="w-full h-full">
                 <rect x="10" y="10" width="80" height="80" rx="20" fill="white" fillOpacity="0.1" />
                 <path d="M50 25 C38 25 30 35 30 45 C30 55 35 63 42 67 L42 75 L58 75 L58 67 C65 63 70 55 70 45 C70 35 62 25 50 25 Z" fill="white" opacity="0.3"/>
                 <path d="M44 60 L56 60 L56 48 L65 48 L50 28 L35 48 L44 48 Z" fill="white" />
               </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black text-2xl tracking-tight">SkillScan</span>
              <span className="text-cyan-400 font-black text-2xl tracking-tight">AI</span>
            </div>
          </div>
          <p className="text-sm max-w-xs leading-relaxed opacity-60 font-medium">
            Navigating the intersection of talent and future opportunities. Built for the workforce of 2030.
          </p>
        </div>
        
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-3">
            <p className="text-slate-200 font-black mb-1 uppercase tracking-[0.2em] text-[10px]">Ecosystem</p>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">Market Analysis</a>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">Salary Data</a>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">Learning Path</a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-slate-200 font-black mb-1 uppercase tracking-[0.2em] text-[10px]">Support</p>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">API Status</a>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">Contact Support</a>
            <a href="#" className="hover:text-cyan-400 transition-colors font-bold">Documentation</a>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl mb-4 inline-block">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Intelligence Status</p>
            <p className="text-white font-black mt-1">v2.5 DeepScan Active</p>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mt-4">© 2025 SkillScan AI • Future Bound</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;