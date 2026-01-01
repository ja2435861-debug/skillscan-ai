import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40 p-1 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/40">
           <div className="w-full h-full bg-slate-950 rounded-[2.2rem] flex items-center justify-center relative overflow-hidden group">
             {/* Glowing lines background */}
             <div className="absolute inset-0 opacity-20">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="absolute h-px bg-cyan-400 w-full" style={{ top: `${i * 20}%`, opacity: 0.3 }}></div>
               ))}
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="absolute w-px bg-purple-400 h-full" style={{ left: `${i * 20}%`, opacity: 0.3 }}></div>
               ))}
             </div>
             
             {/* Brain with Upward Arrow SVG */}
             <svg viewBox="0 0 100 100" className="w-20 h-20 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                <path 
                  d="M50 15 C30 15 15 32 15 50 C15 63 22 75 33 81 L33 90 L67 90 L67 81 C78 75 85 63 85 50 C85 32 70 15 50 15 Z" 
                  fill="url(#brainGradient)" 
                  className="animate-pulse"
                />
                <path 
                  d="M40 60 L60 60 L60 48 L72 48 L50 22 L28 48 L40 48 Z" 
                  fill="white"
                />
                <defs>
                  <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
             </svg>
             
             {/* Accents */}
             <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 -ml-2">
               <div className="w-4 h-0.5 bg-cyan-400 rounded-full"></div>
               <div className="w-6 h-0.5 bg-indigo-400 rounded-full"></div>
               <div className="w-3 h-0.5 bg-purple-400 rounded-full"></div>
             </div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 -mr-2 items-end">
               <div className="w-4 h-0.5 bg-cyan-400 rounded-full"></div>
               <div className="w-6 h-0.5 bg-indigo-400 rounded-full"></div>
               <div className="w-3 h-0.5 bg-purple-400 rounded-full"></div>
             </div>
           </div>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
        Navigate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Future</span>
      </h1>
      
      <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
        Scan your skills. Analyze the 2025-2030 job market. <br className="hidden md:block" />
        Build a high-impact roadmap to your dream career.
      </p>
    </div>
  );
};

export default Hero;