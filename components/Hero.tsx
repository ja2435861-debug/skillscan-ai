
import React from 'react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  return (
    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex justify-center mb-10">
        <div className="relative w-32 h-32 md:w-48 md:h-48 p-1.5 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
           <div className="w-full h-full bg-slate-950 rounded-[2.2rem] flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent animate-pulse"></div>
             
             <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-36 md:h-36 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                <rect x="10" y="10" width="80" height="80" rx="22" fill="white" fillOpacity="0.05" />
                <path 
                  d="M50 20 C35 20 22 33 22 48 C22 60 30 70 40 75 L40 85 L60 85 L60 75 C70 70 78 60 78 48 C78 33 65 20 50 20 Z" 
                  fill="white" 
                  opacity="0.1"
                />
                <path 
                  d="M42 65 L58 65 L58 48 L70 48 L50 25 L30 48 L42 48 Z" 
                  fill="white"
                  className="animate-pulse"
                />
                <circle cx="50" cy="45" r="2" fill="#22d3ee" className="animate-ping" />
             </svg>
           </div>
        </div>
      </div>
      
      <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
        SkillScan <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">AI</span>
      </h1>
      
      <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-bold tracking-tight">
        {language === 'hi' ? (
          <>भारत के भविष्य के कार्यबल को सशक्त बनाना। <br className="hidden md:block" /> अपने कौशल को उच्च-भुगतान वाले अवसरों में बदलें।</>
        ) : (
          <>Empowering India's Next Workforce. <br className="hidden md:block" /> Convert your skills into high-paying job opportunities.</>
        )}
      </p>
    </div>
  );
};

export default Hero;
