import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsViewProps {
  results: AnalysisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-20 pb-24">
      {/* Overview Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
            <div className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            Expert Summary
          </h2>
          <p className="text-slate-300 leading-relaxed text-xl font-medium relative z-10">
            {results.summary}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Market Potential
          </h2>
          <p className="text-indigo-100 font-medium text-lg leading-relaxed flex-grow">
            {results.scopeAnalysis}
          </p>
          <div className="mt-10 pt-6 border-t border-white/20 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-between">
            <span>Scan Horizon: 2030</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">High Precision</span>
          </div>
        </div>
      </section>

      {/* Salary Insights */}
      <section>
        <div className="mb-10 px-4">
          <h2 className="text-4xl font-black text-white tracking-tighter">Compensation Benchmarks</h2>
          <p className="text-slate-500 font-bold mt-2">Comparison across top-performing global markets</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {results.salaryInsights?.map((insight, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur rounded-[3rem] border border-slate-800 overflow-hidden hover:border-indigo-500/50 transition-all group">
              <div className="p-10 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">{insight.role}</h3>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Opportunity Hub</span>
                  </div>
                </div>
                <div className="bg-slate-800 px-8 py-4 rounded-[1.5rem] flex items-center gap-5 border border-slate-700">
                   <div className="bg-indigo-600 text-white p-2 rounded-xl">👑</div>
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Market</p>
                     <p className="text-lg font-black text-white">{insight.highestPayingCountry}</p>
                   </div>
                </div>
              </div>
              
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-slate-950 p-8 rounded-[2rem] border border-cyan-500/20 shadow-xl relative overflow-hidden group/card">
                  <div className="absolute top-0 right-0 p-6 opacity-5 grayscale group-hover/card:opacity-20 transition-opacity">🇮🇳</div>
                  <p className="text-[10px] font-black text-cyan-400 uppercase mb-3 tracking-widest">India (Base)</p>
                  <p className="text-4xl font-black text-white tracking-tight">{insight.indiaSalary}</p>
                </div>

                {insight.foreignSalaries?.map((f, fi) => (
                  <div key={fi} className="bg-slate-950 p-8 rounded-[2rem] border border-indigo-500/20 shadow-xl relative overflow-hidden group/card">
                    <div className="absolute top-0 right-0 p-6 opacity-10 grayscale group-hover/card:opacity-30 transition-opacity">🌍</div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-3 tracking-widest">{f.country}</p>
                    <p className="text-4xl font-black text-white tracking-tight">{f.salary}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl font-black text-white tracking-tighter">6-Month Strategic Roadmap</h2>
          <p className="text-slate-500 font-bold mt-2">Phased skill acquisition for global readiness</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.roadmap?.map((step, idx) => (
            <div key={idx} className="bg-slate-900/50 backdrop-blur p-10 rounded-[3.5rem] border border-slate-800 hover:border-indigo-500 transition-all flex flex-col group relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-white text-slate-950 rounded-2xl flex items-center justify-center text-2xl font-black shadow-2xl shadow-white/10 group-hover:bg-indigo-400 transition-colors">
                {idx + 1}
              </div>
              <div className="mb-8 pt-4">
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">{step.month}</p>
                <h3 className="text-2xl font-black text-white leading-tight">{step.focus}</h3>
              </div>
              
              <ul className="space-y-5 mb-10 flex-grow">
                {step.tasks?.map((task, tIdx) => (
                  <li key={tIdx} className="flex gap-4 text-slate-400 font-medium leading-relaxed">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2.5 shrink-0 shadow-lg shadow-indigo-500/50"></div>
                    {task}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Curated Resources</p>
                {step.resources?.map((res, rIdx) => (
                  <a 
                    key={rIdx} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 hover:bg-indigo-600/20 text-xs font-bold text-slate-300 border border-slate-800 hover:border-indigo-500/50 transition-all"
                  >
                    <span className="truncate max-w-[180px]">{res.name}</span>
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-16 md:p-24 rounded-[4rem] shadow-3xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-white text-2xl md:text-4xl font-black max-w-4xl mx-auto italic mb-16 leading-tight">
            "{results.motivation}"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onReset}
              className="bg-white text-indigo-700 px-12 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              Start New Analysis
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-indigo-500/30 text-white border border-white/20 px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-white/10 transition-all backdrop-blur"
            >
              Back to Top
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultsView;