
import React, { useState, useCallback, useEffect } from 'react';
import { AnalysisResult, AppStatus, JobInfo } from './types';
import { analyzeCareer, fetchLatestJobsInIndia } from './services/geminiService';
import Header from './components/Header';
import Hero from './components/Hero';
import AnalysisForm from './components/AnalysisForm';
import ResultsView from './components/ResultsView';
import JobBoard from './components/JobBoard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [grounding, setGrounding] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "2025 Market Trends Scan ho rahe hain...",
    "Global Salaries ka vishleshan...",
    "Aapke liye sateek Roadmap taiyar...",
    "Learning Resources dhundhe ja rahe hain...",
    "Bas kuch hi pal aur..."
  ];

  useEffect(() => {
    let interval: any;
    if (status === AppStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleStartAnalysis = useCallback(async (description: string, file?: File) => {
    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      let fileData;
      if (file) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
          };
        });
        reader.readAsDataURL(file);
        const data = await base64Promise;
        fileData = { data, mimeType: file.type };
      }

      const data = await analyzeCareer(description, fileData);
      setResults(data);
      setStatus(AppStatus.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("App Error:", err);
      setError(err.message || "Something went wrong. Deployment settings check karein.");
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const handleShowJobs = useCallback(async () => {
    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const data = await fetchLatestJobsInIndia();
      setJobs(data.jobs);
      setGrounding(data.groundingMetadata);
      setStatus(AppStatus.JOBS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError("Market data fetch nahi ho raha. Kripya check karein ki API Key sahi hai.");
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const reset = () => {
    setStatus(AppStatus.IDLE);
    setResults(null);
    setJobs([]);
    setGrounding(null);
    setError(null);
  };

  const canGoBack = status === AppStatus.RESULTS || status === AppStatus.JOBS || status === AppStatus.ERROR;

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] selection:bg-cyan-500/30">
      <Header 
        onReset={reset} 
        onShowJobs={handleShowJobs}
        canGoBack={canGoBack}
      />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl relative">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

        {status === AppStatus.IDLE && (
          <div className="relative z-10">
            <Hero />
            <AnalysisForm onSubmit={handleStartAnalysis} />
          </div>
        )}

        {status === AppStatus.LOADING && (
          <div className="flex flex-col items-center justify-center py-32 relative z-10">
            <div className="relative w-32 h-32 mb-12">
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-white animate-pulse text-center tracking-tight mb-4 px-4">
              {loadingMessages[loadingStep]}
            </h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">SkillScan Engine Active</p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-2xl mx-auto bg-slate-900 p-12 rounded-[3rem] shadow-2xl text-center border border-slate-800 relative z-10">
            <div className="text-amber-500 text-7xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Configuration Required</h2>
            <p className="text-slate-400 mb-8 font-medium leading-relaxed">
              {error}
            </p>
            <div className="bg-slate-950 p-6 rounded-2xl mb-8 text-left border border-slate-800">
              <p className="text-xs font-black text-indigo-400 uppercase mb-2">Vercel Setup:</p>
              <ul className="text-sm text-slate-300 space-y-2 font-medium">
                <li>1. Open project on Vercel Dashboard</li>
                <li>2. Settings &gt; Environment Variables</li>
                <li>3. Add <b>API_KEY</b> as Key</li>
                <li>4. Paste your Gemini Key as Value</li>
                <li>5. Click Save and Redeploy</li>
              </ul>
            </div>
            <button 
              onClick={reset}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95 border border-slate-700"
            >
              Back to Home
            </button>
          </div>
        )}

        {status === AppStatus.RESULTS && results && (
          <div className="relative z-10">
            <ResultsView results={results} onReset={reset} />
          </div>
        )}

        {status === AppStatus.JOBS && (
          <div className="relative z-10">
            <JobBoard jobs={jobs} groundingMetadata={grounding} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
