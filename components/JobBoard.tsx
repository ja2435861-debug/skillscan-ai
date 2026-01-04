
import React, { useState, useMemo } from 'react';
import { JobInfo, Language } from '../types';

interface JobBoardProps {
  jobs: JobInfo[];
  groundingMetadata: any;
  language: Language;
  onRetry?: () => void;
  error?: string | null;
}

const JobCard: React.FC<{ job: JobInfo, language: Language }> = ({ job, language }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all group h-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-grow pr-4">
        <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h4>
        <p className="text-sm font-bold text-slate-500 mt-1">{job.organization}</p>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shrink-0 ${
        job.type?.toLowerCase() === 'public' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
      }`}>
        {job.type || 'Job'}
      </span>
    </div>
    <p className="text-slate-600 text-sm mb-6 line-clamp-3 font-medium flex-grow">{job.description}</p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{language === 'hi' ? 'स्थान' : 'Location'}</span>
        <span className="text-xs font-bold text-slate-700">{job.location}</span>
      </div>
      <a 
        href={job.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center gap-2"
      >
        {language === 'hi' ? 'आवेदन करें' : 'Apply'}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>
  </div>
);

const JobBoard: React.FC<JobBoardProps> = ({ jobs = [], groundingMetadata, language, onRetry, error }) => {
  const [skillFilter, setSkillFilter] = useState('');

  const filteredJobs = useMemo(() => {
    if (!skillFilter.trim()) return jobs;
    const search = skillFilter.toLowerCase();
    return jobs.filter(job => 
      job.title.toLowerCase().includes(search) || 
      job.description.toLowerCase().includes(search) ||
      job.organization.toLowerCase().includes(search)
    );
  }, [jobs, skillFilter]);

  const publicJobs = filteredJobs.filter(j => j.type?.toLowerCase() === 'public' || j.type?.toLowerCase()?.includes('govt'));
  const privateJobs = filteredJobs.filter(j => j.type?.toLowerCase() === 'private' || j.type?.toLowerCase()?.includes('corp'));
  
  const fallbackJobs = (publicJobs.length === 0 && privateJobs.length === 0) ? filteredJobs : [];

  const ErrorDisplay = () => (
    <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-rose-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
        <div className="text-6xl mb-6">🏜️</div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">
          {language === 'hi' ? 'डेटा लोड करने में समस्या' : 'Connection Interrupted'}
        </h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed px-4">
          {error || (language === 'hi' 
            ? "हमें मार्केट डेटा प्राप्त करने में कठिनाई हो रही है। कृपया सुनिश्चित करें कि आपका इंटरनेट और API की (API Key) सही है।"
            : "We're having trouble reaching the live market feed. This usually happens due to a strict API quota or network timeout.")}
        </p>
        
        <div className="bg-slate-50 rounded-3xl p-6 text-left mb-8 border border-slate-100">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">
            {language === 'hi' ? 'संभावित समाधान' : 'Possible Solutions'}
          </h4>
          <ul className="text-xs font-bold text-slate-600 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-emerald-500">✔</span>
              {language === 'hi' ? 'अपनी Google Gemini API Key की कोटा लिमिट चेक करें' : 'Check your Google Gemini API quota limits'}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500">✔</span>
              {language === 'hi' ? 'इंटरनेट कनेक्शन को रीफ्रेश करें' : 'Ensure you have a stable internet connection'}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500">✔</span>
              {language === 'hi' ? 'कुछ मिनट बाद फिर से प्रयास करें' : 'Try again in a few minutes (Rate Limiting)'}
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onRetry}
            className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {language === 'hi' ? 'फिर से कोशिश करें' : 'Retry Connection'}
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex-grow bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
          >
            {language === 'hi' ? 'ऐप रीफ्रेश करें' : 'Refresh App'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {language === 'hi' ? 'लाइव मार्केट फीड 2025' : 'Live Market Feed 2025'}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          {language === 'hi' ? 'वर्तमान जॉब अवसर' : 'Current Job Opportunities'}
        </h2>
        
        {/* Skill Filter Bar */}
        <div className="max-w-xl mx-auto mt-8 px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder={language === 'hi' ? "स्किल द्वारा खोजें (जैसे: React, Python...)" : "Search by skills (e.g. React, Python...)"}
              className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none shadow-sm transition-all"
            />
            {skillFilter && (
              <button 
                onClick={() => setSkillFilter('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {(error || (jobs.length === 0 && !skillFilter)) ? (
        <ErrorDisplay />
      ) : (publicJobs.length > 0 || privateJobs.length > 0 || fallbackJobs.length > 0) ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Public Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <div className="bg-amber-500 text-white p-2.5 rounded-xl shadow-lg shadow-amber-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  {language === 'hi' ? 'सरकारी / सार्वजनिक क्षेत्र' : 'Govt. / Public Sector'}
                </h3>
                <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{publicJobs.length} {language === 'hi' ? 'परिणाम' : 'results'}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {publicJobs.map((job, idx) => (
                  <JobCard key={`pub-${idx}`} job={job} language={language} />
                ))}
              </div>
            </div>

            {/* Private Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                  <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg shadow-indigo-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {language === 'hi' ? 'कॉर्पोरेट / निजी क्षेत्र' : 'Corporate / Private Sector'}
                </h3>
                <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">{privateJobs.length} {language === 'hi' ? 'परिणाम' : 'results'}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {privateJobs.map((job, idx) => (
                  <JobCard key={`priv-${idx}`} job={job} language={language} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
          <div className="text-6xl mb-6 animate-bounce">🕵️‍♂️</div>
          <h3 className="text-xl font-black text-slate-800 mb-2">{language === 'hi' ? 'कोई जॉब नहीं मिली' : 'No matching jobs found'}</h3>
          <button 
            onClick={() => setSkillFilter('')}
            className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all"
          >
            {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear Filter'}
          </button>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
