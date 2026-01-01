
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
    "Analyzing market trends...",
    "Comparing global salary data...",
    "Generating personalized roadmap...",
    "Fetching learning resources...",
    "Finalizing results..."
  ];

  useEffect(() => {
    let interval: any;
    if (status === AppStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
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
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze career data. Please try again.");
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
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch latest jobs. Please try again.");
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header 
        onReset={reset} 
        onShowJobs={handleShowJobs}
        canGoBack={canGoBack}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {status === AppStatus.IDLE && (
          <>
            <Hero />
            <AnalysisForm onSubmit={handleStartAnalysis} />
          </>
        )}

        {status === AppStatus.LOADING && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 animate-pulse text-center tracking-tight">
              {loadingMessages[loadingStep]}
            </h2>
            
            <div className="mt-8 w-full max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 ease-out" 
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
              ></div>
            </div>
            
            <p className="text-slate-400 mt-6 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span>
              Ultra-Fast Flash Analysis Active
              <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </p>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border border-slate-100">
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Something went wrong</h2>
            <p className="text-slate-600 mb-8 font-medium">{error}</p>
            <button 
              onClick={reset}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {status === AppStatus.RESULTS && results && (
          <ResultsView results={results} onReset={reset} />
        )}

        {status === AppStatus.JOBS && (
          <JobBoard jobs={jobs} groundingMetadata={grounding} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
