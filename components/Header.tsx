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
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
               {/* SkillScan AI Brain Logo */}
               <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 p-1.5">
                 <path d="M50 20 C35 20 25 32 25 45 C25 55 30 63 38 67 L38 80 L62 80 L62 67 C70 63 75 55 75 45 C75 32 65 20 50 20 Z" fill="white" opacity="0.3"/>
                 <path d="M42 55 L58 55 L58 45 L68 45 L50 25 L32 45 L42 45 Z" fill="white" />
                 <path d="M25 45 Q35 40 38 67" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                 <path d="M75 45 Q65 40 62 67" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
               </svg>
            </div>
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 hidden xs:block">
              SkillScan AI
            </span>
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