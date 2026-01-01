
import React from 'react';
import { JobInfo } from '../types';

interface JobBoardProps {
  jobs: JobInfo[];
  groundingMetadata: any;
}

// Fixed: Added JobCard component definition
const JobCard: React.FC<{ job: JobInfo }> = ({ job }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h4>
        <p className="text-sm font-bold text-slate-500 mt-1">{job.organization}</p>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
        job.type === 'Public' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
      }`}>
        {job.type}
      </span>
    </div>
    <p className="text-slate-600 text-sm mb-6 line-clamp-2 font-medium">{job.description}</p>
    <div className="flex items-center justify-between mt-auto">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Location</span>
        <span className="text-xs font-bold text-slate-700">{job.location}</span>
      </div>
      <a 
        href={job.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center gap-2"
      >
        Apply
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>
  </div>
);

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
          Direct career opportunities in India, updated in real-time from across the web.
        </p>
      </div>

      {(publicJobs.length > 0 || privateJobs.length > 0) ? (
        <>
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
              </div>
            </div>
          </div>

          {/* Mandatory: Listing URLs from groundingChunks as per guidelines */}
          {groundingMetadata?.groundingChunks && (
            <div className="mt-16 bg-white p-8 rounded-[2rem] border border-slate-200">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Information Sources
              </h4>
              <div className="flex flex-wrap gap-3">
                {groundingMetadata.groundingChunks.map((chunk: any, i: number) => (
                  chunk.web && (
                    <a 
                      key={i}
                      href={chunk.web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center gap-2"
                    >
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${new URL(chunk.web.uri).hostname}`} 
                        alt="" 
                        className="w-4 h-4"
                      />
                      {chunk.web.title || "View Source"}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-xl font-black text-slate-800 mb-2">No active jobs found</h3>
          <p className="text-slate-500">Try searching for a different career path or check back later.</p>
        </div>
      )}
    </div>
  );
};

// Fixed: Added missing default export
export default JobBoard;
