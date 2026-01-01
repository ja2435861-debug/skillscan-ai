import React from 'react';

interface HeaderProps {
  onReset: () => void;
  onShowJobs: () => void;
  canGoBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, onShowJobs, canGoBack }) => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {canGoBack && (
            <button 
              onClick={onReset}
              className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-400 group flex items-center gap-1.5"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-black hidden sm:inline">Back</span>
            </button>
          )}
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onReset}
          >
            {/* Logo recreation based on user's image */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
               <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 p-1.5">
                 <rect x="10" y="10" width="80" height="80" rx="20" fill="white" fillOpacity="0.1" />
                 <path d="M50 25 C38 25 30 35 30 45 C30 55 35 63 42 67 L42 75 L58 75 L58 67 C65 63 70 55 70 45 C70 35 62 25 50 25 Z" fill="white" opacity="0.3"/>
                 <path d="M44 60 L56 60 L56 48 L65 48 L50 28 L35 48 L44 48 Z" fill="white" />
                 <path d="M40 45 Q50 35 60 45" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
               </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white hidden xs:block">
                SkillScan
              </span>
              <span className="text-2xl font-black tracking-tight text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] hidden xs:block">
                AI
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onShowJobs}
            className="text-slate-300 hover:text-cyan-400 font-black text-xs uppercase tracking-widest transition-all hidden md:flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/50"
          >
            <span className="bg-cyan-500/20 p-1 rounded-lg">🔥</span>
            Job Board
          </button>

          <button 
            onClick={onReset}
            className="text-white bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
          >
            New Scan
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;