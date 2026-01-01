
import React from 'react';
import { JobInfo } from '../types';

interface JobBoardProps {
  jobs: JobInfo[];
  groundingMetadata: any;
}

const JobBoard: React.FC<JobBoardProps> = ({ jobs = [], groundingMetadata }) => {
  const publicJobs = jobs.filter(j => j.type === 'Public');
  const privateJobs = jobs.filter(j => j.type === 'Private');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Live Market Feed
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Latest Job Openings
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Real-time vacancies synthesized from premium Indian job boards and official sources.
        </p>
      </div>

      {(publicJobs.length > 0 || privateJobs.length > 0) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between px-6">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-lg shadow-amber-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                Government / Sarkari
              </h3>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{publicJobs.length} results</span>
            </div>
            
            <div className="space-y-4">
              {publicJobs.map((job, idx) => (
                <JobCard key={idx} job={job} />
              ))}
              {publicJobs.length === 0 && (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center text-slate-400 font-bold italic">
                  No public sector roles found currently.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-6">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Private Sector
              </h3>
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{privateJobs.length} results</span>
            </div>

            <div className="space-y-4">
              {privateJobs.map((job, idx) => (
                <JobCard key={idx} job={job} />
              ))}
              {privateJobs.length === 0 && (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center text-slate-400 font-bold italic">
                  No private roles found currently.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[4rem] text-center shadow-2xl border border-slate-50">
          <div className="text-7xl mb-8">🔍</div>
          <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Updating Job Feed</h3>
          <p className="text-slate-500 font-medium">Please wait while our engine syncs with the latest market updates.</p>
        </div>
      )}

      {groundingMetadata?.groundingChunks && (
        <section className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 mt-12 shadow-2xl">
          <h4 className="text-[10px] font-black text-indigo-400 uppercase mb-8 tracking-[0.3em] flex items-center gap-3">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Intelligence Sources
          </h4>
          <div className="flex flex-wrap gap-4">
            {groundingMetadata.groundingChunks.map((chunk: any, i: number) => (
              chunk.web && (
                <a 
                  key={i} 
                  href={chunk.web.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800/40 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 px-5 py-3 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white transition-all flex items-center gap-3 backdrop-blur-sm uppercase tracking-widest shadow-lg"
                >
                  <span className="max-w-[220px] truncate">{chunk.web.title || chunk.web.uri}</span>
                  <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              )
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const JobCard: React.FC<{ job: JobInfo }> = ({ job }) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-indigo-100 transition-all group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-slate-50 group-hover:bg-indigo-500 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-5">
        <div>
          <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors tracking-tight">{job.title}</h4>
          <p className="text-sm font-black text-indigo-500 mt-2 uppercase tracking-wide">{job.organization}</p>
        </div>
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-xl ${job.type === 'Public' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
          {job.type}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 mb-6 font-black uppercase tracking-widest">
        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
          {job.location}
        </span>
        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10"/></svg>
          Expires: {job.deadline}
        </span>
      </div>

      <p className="text-sm text-slate-600 line-clamp-2 mb-8 leading-relaxed font-medium">
        {job.description}
      </p>

      <a 
        href={job.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-[1.25rem] transition-all shadow-xl active:scale-95"
      >
        Apply Now
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
};

export default JobBoard;
