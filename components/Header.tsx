
import React from 'react';

interface HeaderProps {
  onReset: () => void;
  onShowJobs: () => void;
  canGoBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, onShowJobs, canGoBack }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {canGoBack && (
            <button 
              onClick={onReset}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600 group flex items-center gap-1.5"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-black hidden sm:inline">Back</span>
            </button>
          )}
          
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={onReset}
          >
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 hidden xs:block">
              SkillScan AI
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onShowJobs}
            className="text-slate-600 hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-all hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:border-indigo-100"
          >
            <span className="bg-indigo-100 p-1 rounded-lg">🔥</span>
            India Job Board
          </button>

          <button 
            onClick={onReset}
            className="text-white bg-slate-900 hover:bg-black px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
      
      {/* Mobile Jobs link */}
      <div className="md:hidden bg-slate-50 border-t border-slate-100 px-4 py-2">
        <button 
          onClick={onShowJobs}
          className="text-slate-700 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <span className="bg-indigo-500 p-0.5 rounded text-white text-[8px]">LIVE</span>
          Browse Active India Jobs
        </button>
      </div>
    </header>
  );
};

export default Header;
