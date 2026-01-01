
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Future-Proof Your <span className="text-indigo-600">Career</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Upload your resume or describe your background. Our AI mentor analyzes the shifting 2025-2030 job market to build your personalized success roadmap.
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium border border-indigo-100">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          AI Market Analysis
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-100">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Learning Roadmaps
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium border border-amber-100">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Job Role Recommendations
        </div>
      </div>
    </div>
  );
};

export default Hero;
