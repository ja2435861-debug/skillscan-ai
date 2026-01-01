
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultsViewProps {
  results: AnalysisResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-16 pb-24">
      {/* Top Header Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            Executive Summary
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg font-medium relative z-10">
            {results.summary}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>
            Market Vision
          </h2>
          <p className="text-indigo-100/80 leading-relaxed text-md font-medium flex-grow relative z-10">
            {results.scopeAnalysis}
          </p>
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-black uppercase tracking-widest text-indigo-400 relative z-10">
            <span>2025 - 2030 Window</span>
            <span className="bg-indigo-500 text-white px-2 py-0.5 rounded">High Growth</span>
          </div>
        </div>
      </section>

      {/* Salary Insights Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Global ROI Dashboard</h2>
            <p className="text-slate-500 font-bold mt-2">Annual Compensation Benchmarking (India vs International)</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-xs font-black text-slate-400">
              CURRENCY: LOCAL / USD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {results.salaryInsights?.map((insight, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{insight.role}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">Market Benchmark</span>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl flex items-center gap-4">
                   <span className="text-xl">🏆</span>
                   <div>
                     <p className="text-[10px] font-black text-indigo-400 uppercase">Top Global Payer</p>
                     <p className="text-sm font-black text-indigo-700">{insight.highestPayingCountry}</p>
                   </div>
                </div>
              </div>
              
              <div className="p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50">
                <div className="bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-sm relative overflow-hidden group/card">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-20 transition-opacity">
                    <span className="text-4xl font-black">🇮🇳</span>
                  </div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest">India (Domestic)</p>
                  <p className="text-3xl font-black text-emerald-900">{insight.indiaSalary}</p>
                  <div className="mt-4 h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/3"></div>
                  </div>
                </div>

                {insight.foreignSalaries?.map((f, fi) => (
                  <div key={fi} className="bg-white p-6 rounded-[2rem] border border-indigo-100 shadow-sm relative overflow-hidden group/card">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-30 transition-opacity">
                      <span className="text-4xl font-black">🌍</span>
                    </div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-widest">{f.country}</p>
                    <p className="text-3xl font-black text-indigo-900">{f.salary}</p>
                    <div className="mt-4 h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">6-Month Mastery Roadmap</h2>
          <p className="text-slate-500 font-bold mt-2 italic">A phased approach to achieving your global career goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.roadmap?.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 hover:scale-[1.02] transition-all flex flex-col group">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-black mb-6 shadow-xl group-hover:bg-indigo-600 transition-colors">
                {idx + 1}
              </div>
              <div className="mb-6">
                <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">{step.month}</p>
                <h3 className="text-xl font-black text-slate-900 leading-tight">{step.focus}</h3>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {step.tasks?.map((task, tIdx) => (
                  <li key={tIdx} className="flex gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                    {task}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Mastery Tools</p>
                <div className="grid grid-cols-1 gap-2">
                  {step.resources?.map((res, rIdx) => (
                    <a 
                      key={rIdx} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-xs font-bold text-slate-700 border border-slate-100 hover:border-indigo-200 transition-all"
                    >
                      <span className="truncate">{res.name}</span>
                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motivational Call-to-Action */}
      <section className="bg-indigo-600 p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-indigo-200 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <p className="text-indigo-100 text-lg md:text-2xl font-medium max-w-3xl mx-auto italic mb-12 leading-relaxed">
            "{results.motivation}"
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onReset}
              className="bg-white text-indigo-600 px-10 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              Start New Analysis
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-indigo-500/30 text-white border border-white/20 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-indigo-500/50 transition-all"
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
