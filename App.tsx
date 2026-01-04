
import React, { useState, useCallback, useEffect } from 'react';
import { AnalysisResult, AppStatus, JobInfo, Language } from './types';
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
  const [language, setLanguage] = useState<Language>('en');

  const loadingMessages = {
    en: [
      "AI Scanning 2025 Market...",
      "Analyzing Future Potential...",
      "Creating Daily Routine...",
      "Mapping Growth Paths...",
      "Almost ready..."
    ],
    hi: [
      "AI 2025 मार्केट को स्कैन कर रहा है...",
      "आपकी क्षमता का विश्लेषण हो रहा है...",
      "डेली रूटीन बनाया जा रहा है...",
      "ग्रोथ पाथ तैयार हो रहे हैं...",
      "बस कुछ ही पल..."
    ]
  };

  useEffect(() => {
    let interval: any;
    if (status === AppStatus.LOADING) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages[language].length);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [status, language]);

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

      const data = await analyzeCareer(description, language, fileData);
      setResults(data);
      setStatus(AppStatus.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("App Error:", err);
      setError(language === 'hi' 
        ? "कुछ गलत हो गया। कृपया अपनी सेटिंग्स चेक करें।" 
        : err.message || "Something went wrong. Please check your deployment settings.");
      setStatus(AppStatus.ERROR);
    }
  }, [language]);

  const handleShowJobs = useCallback(async () => {
    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const data = await fetchLatestJobsInIndia(language);
      setJobs(data.jobs);
      setGrounding(data.groundingMetadata);
      setStatus(AppStatus.JOBS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError(language === 'hi'
        ? "मार्केट डेटा नहीं मिल रहा। कृपया चेक करें कि API Key सही है और कोटा बचा है।"
        : "Market data fetch failed. Your API key might have reached its quota limit.");
      setJobs([]); // Ensure empty jobs to trigger internal error UI in JobBoard
      setStatus(AppStatus.JOBS); // Stay in JOBS to show the Board with the internal error UI
    }
  }, [language]);

  const reset = () => {
    setStatus(AppStatus.IDLE);
    setResults(null);
    setJobs([]);
    setGrounding(null);
    setError(null);
  };

  const canGoBack = status === AppStatus.RESULTS || status === AppStatus.JOBS || status === AppStatus.ERROR;

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-100 selection:bg-cyan-500/30">
      {/* HEADER HIDDEN DURING RESULTS FOR APP FEEL (Bottom Nav handles it) */}
      {status !== AppStatus.RESULTS && (
        <Header 
          onReset={reset} 
          onShowJobs={handleShowJobs}
          canGoBack={canGoBack}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}
      
      <main className={`flex-grow container mx-auto px-4 max-w-6xl relative ${status === AppStatus.RESULTS ? 'pt-2' : 'py-12'}`}>
        {/* Android Background Accents */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
        </div>

        {status === AppStatus.IDLE && (
          <div className="relative z-10 animate-in fade-in duration-500">
            <Hero language={language} />
            <AnalysisForm onSubmit={handleStartAnalysis} language={language} />
          </div>
        )}

        {status === AppStatus.LOADING && (
          <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 animate-in fade-in">
            <div className="relative w-40 h-40 mb-12">
               <div className="absolute inset-0 border-8 border-slate-900 rounded-full"></div>
               <div className="absolute inset-0 border-8 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl">🧠</div>
               </div>
            </div>
            <h2 className="text-2xl font-black text-white text-center mb-4 tracking-tight px-4 animate-pulse">
              {loadingMessages[language][loadingStep]}
            </h2>
            <div className="bg-slate-900/50 px-6 py-2 rounded-full border border-slate-800">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Powered by SkillScan AI</span>
            </div>
          </div>
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-3xl text-center border border-slate-800 relative z-10 mt-10">
            <div className="text-amber-500 text-6xl mb-6">⚠️</div>
            <h2 className="text-xl font-black text-white mb-4 tracking-tight">System Notice</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">{error}</p>
            <button 
              onClick={reset}
              className="w-full bg-slate-800 py-4 rounded-2xl font-black text-white shadow-xl active:scale-95 transition-all"
            >
              {language === 'hi' ? 'फिर से कोशिश करें' : 'Try Again'}
            </button>
          </div>
        )}

        {status === AppStatus.RESULTS && results && (
          <div className="relative z-10">
            <ResultsView results={results} onReset={reset} language={language} />
          </div>
        )}

        {status === AppStatus.JOBS && (
          <div className="relative z-10">
            <JobBoard 
              jobs={jobs} 
              groundingMetadata={grounding} 
              language={language} 
              onRetry={handleShowJobs}
              error={error}
            />
          </div>
        )}
      </main>

      {status === AppStatus.IDLE && <Footer language={language} />}
    </div>
  );
};

export default App;
