import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center p-1.5">
               <svg viewBox="0 0 100 100" className="w-full h-full">
                 <path d="M50 20 C35 20 25 32 25 45 C25 55 30 63 38 67 L38 80 L62 80 L62 67 C70 63 75 55 75 45 C75 32 65 20 50 20 Z" fill="white" opacity="0.4"/>
                 <path d="M42 55 L58 55 L58 45 L68 45 L50 25 L32 45 L42 45 Z" fill="white" />
               </svg>
            </div>
            <span className="text-white font-black text-xl tracking-tight">SkillScan AI</span>
          </div>
          <p className="text-sm max-w-xs leading-relaxed opacity-60">
            Empowering professionals with AI-driven career intelligence for the next generation of work.
          </p>
        </div>
        
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-slate-200 font-bold mb-2 uppercase tracking-widest text-[10px]">Platform</p>
            <a href="#" className="hover:text-cyan-400 transition-colors">Resources</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Career Blog</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-slate-200 font-bold mb-2 uppercase tracking-widest text-[10px]">Legal</p>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
          </div>
        </div>
        
        <div className="text-center md:text-right opacity-40">
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2025 SkillScan AI</p>
          <p className="text-[10px] mt-1">Deep Intelligence • Global Opportunities</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;