
import React, { useState, useEffect } from 'react';
import { AnalysisResult, Language } from '../types';

interface ResultsViewProps {
  results: AnalysisResult;
  onReset: () => void;
  language: Language;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onReset, language }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'strategy' | 'routine' | 'tools' | 'opportunities' | 'growth'>('dashboard');
  const [showEmergency, setShowEmergency] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());
  const [localXP, setLocalXP] = useState(450);
  const [localGrowthScore, setLocalGrowthScore] = useState(results?.careerGrowthScore || 0);

  useEffect(() => {
    setChatMessages([
      { 
        role: 'ai', 
        text: language === 'hi' 
          ? `आपके स्किलस्कैन कमांड सेंटर में स्वागत है! मैं आपका AI मेंटर हूँ। मैं आपका ${results?.careerGrowthScore || 0}% ग्रोथ स्कोर देख सकता हूँ। कृपया बताइये, क्या आप टाइमटेबल या पढ़ाई के रिसोर्सेज से शुरू करना चाहेंगे?`
          : `Welcome to your SkillScan Command Center! I'm your AI Mentor. I see your ${results?.careerGrowthScore || 0}% Growth Score. Kripya batiye, kya aap Timetable ya study resources se start karna chahenge?` 
      }
    ]);
  }, [language, results]);

  const s = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'object') {
      return val.text || val.description || val.value || JSON.stringify(val);
    }
    return String(val);
  };

  const safeArray = <T,>(arr: any): T[] => Array.isArray(arr) ? arr : [];

  const missions = safeArray<string>(results?.dailyMissions);
  const badges = safeArray<string>(results?.badges);
  const ninetyDay = safeArray<any>(results?.ninetyDayProgram);
  const roadmap = safeArray<any>(results?.roadmap);
  const minIncomeSkills = safeArray<any>(results?.minIncomeSkills);
  const interviewPrep = safeArray<any>(results?.interviewPrep);
  const microInternships = safeArray<any>(results?.microInternships);
  const collegeCourseFinder = safeArray<any>(results?.collegeCourseFinder);
  const timetable = safeArray<any>(results?.dailyTimetable);
  const resources = safeArray<any>(results?.learningResources);
  const govtExams = safeArray<string>(results?.govtJobAssistant?.exams);
  const govtAlerts = safeArray<string>(results?.govtJobAssistant?.alertKeywords);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(language === 'hi' ? "क्लिपबोर्ड पर कॉपी किया गया!" : "Copied to clipboard!");
  };

  const handleCompleteMission = (missionText: string) => {
    const text = s(missionText);
    if (completedMissions.has(text)) return;
    setCompletedMissions(prev => {
      const next = new Set(prev);
      next.add(text);
      return next;
    });
    setLocalXP(prev => prev + 50);
    setLocalGrowthScore(prev => Math.min(100, prev + 1));
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { role: 'user' as const, text: chatInput };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: language === 'hi'
          ? `आपकी पढ़ाई के लिए मैंने 'Routine' टैब में एक नया शेड्यूल बना दिया है। ${s(results?.missingSkills?.[0]) || 'नई तकनीकों'} पर फोकस करें।`
          : `I've updated your schedule in the 'Routine' tab. Focus on ${s(results?.missingSkills?.[0]) || 'emerging technologies'} to reach your goal.` 
      }]);
    }, 800);
  };

  if (!results) return null;

  const tabs = language === 'hi' ? [
    { id: 'dashboard', label: '🏠 डैशबोर्ड' },
    { id: 'routine', label: '⏰ डेली रूटीन' },
    { id: 'strategy', label: '🚀 रणनीति' },
    { id: 'tools', label: '🛠️ तैयारी' },
    { id: 'opportunities', label: '💼 अवसर' },
    { id: 'growth', label: '📊 ग्रोथ' },
  ] : [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'routine', label: '⏰ Daily Routine' },
    { id: 'strategy', label: '🚀 Strategy' },
    { id: 'tools', label: '🛠️ Tools' },
    { id: 'opportunities', label: '💼 Jobs' },
    { id: 'growth', label: '📊 Growth' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-10 pb-32 print:p-0">
      
      {/* AI MENTOR CHAT & SOS BUTTONS */}
      <div className="fixed bottom-8 left-8 z-[60] print:hidden">
        <button onClick={() => setShowChat(!showChat)} className="bg-indigo-600 text-white p-5 rounded-full shadow-2xl shadow-indigo-500/40 hover:scale-110 transition-all active:scale-95 flex items-center gap-3 font-black">
          <span className="relative">💬 {language === 'hi' ? 'AI मेंटर' : 'AI Mentor'}</span>
        </button>
        {showChat && (
          <div className="absolute bottom-20 left-0 w-80 h-[450px] bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="p-5 bg-indigo-600 text-white flex justify-between items-center">
              <span className="font-black text-xs uppercase tracking-widest">SkillScan Mentor</span>
              <button onClick={() => setShowChat(false)}>✕</button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg?.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium ${msg?.role === 'user' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300'}`}>{s(msg?.text)}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-800 flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder={language === 'hi' ? "कुछ भी पूछें..." : "Ask anything..."} className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-indigo-500"/>
              <button onClick={sendMessage} className="bg-indigo-600 p-2 rounded-xl text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2"/></svg></button>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => setShowEmergency(!showEmergency)} className="fixed bottom-8 right-8 z-[60] bg-rose-600 text-white p-5 rounded-full shadow-2xl shadow-rose-500/40 hover:scale-110 transition-all active:scale-95 flex items-center gap-3 font-black group print:hidden">
        <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full animate-ping absolute"></span>
        <span className="relative">🆘 {language === 'hi' ? 'इमरजेंसी' : 'Emergency'}</span>
        {showEmergency && (
          <div className="absolute bottom-20 right-0 w-80 bg-slate-900 border border-rose-500 p-6 rounded-[2rem] shadow-3xl animate-in slide-in-from-bottom-4">
            <h4 className="text-rose-400 uppercase text-xs font-black mb-3 tracking-widest">{language === 'hi' ? 'करियर SOS सलाह' : 'Career SOS Guidance'}</h4>
            <p className="text-white text-sm leading-relaxed mb-4">{s(results?.emergencyGuidance)}</p>
            <button className="w-full bg-rose-500 text-white py-2 rounded-xl text-[10px] font-black uppercase" onClick={() => setShowEmergency(false)}>{language === 'hi' ? 'मैं अब बेहतर महसूस कर रहा हूँ' : "I'm Feeling Better"}</button>
          </div>
        )}
      </button>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 print:hidden">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">{language === 'hi' ? 'करियर डैशबोर्ड' : 'Life Career Dashboard'}</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">2025-2030 Employment Engine</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => copyToClipboard(`https://skillscan.ai/profile/verified-${Math.floor(Math.random()*10000)}`)} className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-cyan-500 transition-all">{language === 'hi' ? 'प्रोफाइल शेयर करें' : 'Share Profile'}</button>
           <button onClick={() => window.print()} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">{language === 'hi' ? 'PDF डाउनलोड' : 'Download PDF'}</button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      <nav className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] max-w-5xl mx-auto sticky top-24 z-40 print:hidden">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{tab.label}</button>
        ))}
      </nav>

      <div className="min-h-[500px]">
        {/* TAB: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 bg-gradient-to-br from-indigo-900 to-slate-950 p-8 rounded-[3rem] border border-slate-800 text-center relative overflow-hidden group shadow-2xl">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner border border-indigo-500/30">👤</div>
                <h3 className="text-white font-black text-lg mb-1">{language === 'hi' ? 'करियर पहचान' : 'Career Identity'}</h3>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">Level {Math.floor(localXP/100)}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {badges.map((b, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-950 text-indigo-300 text-[7px] font-black uppercase border border-indigo-500/20 rounded-md">✨ {s(b)}</span>
                  ))}
                </div>
                <div className="space-y-4 pt-6 border-t border-slate-800 text-left">
                  <div className="flex justify-between items-center"><span className="text-[9px] font-black text-slate-500 uppercase">{language === 'hi' ? 'ग्रोथ स्कोर' : 'Growth Score'}</span><span className="text-[10px] text-white font-bold">{localGrowthScore}%</span></div>
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${localGrowthScore}%` }}></div></div>
                </div>
              </div>
              <div className="lg:col-span-3 bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
                <h2 className="text-2xl font-black text-white mb-6">{language === 'hi' ? 'डेली मिशन्स' : 'Daily Missions'} 🚀</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {missions.map((m, idx) => {
                    const missionText = s(m);
                    const isDone = completedMissions.has(missionText);
                    return (
                      <div key={idx} className={`p-6 rounded-2xl border transition-all flex flex-col h-full relative ${isDone ? 'bg-emerald-500/10 border-emerald-500/30 opacity-70' : 'bg-slate-950 border-slate-800 shadow-lg'}`}>
                        <p className={`text-sm font-medium flex-grow ${isDone ? 'text-emerald-100 line-through' : 'text-slate-300'}`}>{missionText}</p>
                        <button onClick={() => handleCompleteMission(missionText)} disabled={isDone} className={`mt-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDone ? 'text-emerald-500' : 'bg-slate-900 text-slate-400'}`}>
                          {isDone ? 'Done +50XP' : 'Finish →'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="bg-slate-900/80 p-10 rounded-[3rem] border border-slate-800 text-slate-300 text-lg leading-relaxed">
               {s(results?.summary)}
            </section>
          </div>
        )}

        {/* TAB: ROUTINE (NEW) */}
        {activeTab === 'routine' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900/80 p-10 rounded-[3rem] border border-slate-800 shadow-3xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white">{language === 'hi' ? 'डेली स्टडी टाइमटेबल' : 'Daily Study Timetable'}</h3>
                  <span className="bg-cyan-500/20 text-cyan-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Live Schedule</span>
                </div>
                <div className="space-y-0 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
                  {timetable.map((slot, i) => (
                    <div key={i} className="flex gap-6 relative pb-10 group last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-indigo-500 z-10 flex items-center justify-center text-[10px] font-black text-indigo-400 group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div className="flex-grow pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-indigo-400 font-black text-xs uppercase">{s(slot?.time)}</span>
                          <span className="h-0.5 w-4 bg-slate-800"></span>
                          <h4 className="text-white font-bold text-lg">{s(slot?.activity)}</h4>
                        </div>
                        <p className="text-slate-500 text-sm">{s(slot?.details)}</p>
                      </div>
                    </div>
                  ))}
                  {timetable.length === 0 && <p className="text-slate-500 text-center italic py-10">No specific routine found. Tell us about your exams!</p>}
                </div>
              </div>
              <div className="space-y-8">
                 <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl">
                    <h4 className="text-xl font-black mb-4">{language === 'hi' ? 'पढ़ाई के लिए लिंक्स' : 'Top Study Resources'}</h4>
                    <div className="space-y-4">
                      {resources.map((res, i) => (
                        <a key={i} href={res?.url} target="_blank" rel="noopener noreferrer" className="block bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-all group">
                           <div className="flex justify-between items-start mb-2">
                             <span className="text-[8px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">{s(res?.sourceType)}</span>
                             <svg className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                           </div>
                           <h5 className="font-bold text-sm mb-1">{s(res?.title)}</h5>
                           <p className="text-[10px] opacity-70 line-clamp-2">{s(res?.description)}</p>
                        </a>
                      ))}
                      {resources.length === 0 && <p className="opacity-70 text-xs italic">Enter your subjects to see best links!</p>}
                    </div>
                 </div>
                 <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800">
                    <h4 className="text-white font-black mb-4 uppercase text-xs tracking-widest">{language === 'hi' ? 'महत्वपूर्ण टिप्स' : 'Academic Guidance'}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{s(results?.studentGuidance)}</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: STRATEGY */}
        {activeTab === 'strategy' && (
          <div className="space-y-10 animate-in slide-in-from-right-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-6">{language === 'hi' ? '90-दिन का प्रोग्राम' : '90-Day Program'}</h3>
                {ninetyDay.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start mb-6 last:mb-0">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">D{step?.day || (idx * 30)}</div>
                    <div><p className="text-lg font-medium">{s(step?.task)}</p></div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
                <h3 className="text-2xl font-black text-white mb-6">{language === 'hi' ? 'महीनेवार रोडमैप' : 'Monthly Roadmap'}</h3>
                {roadmap.map((step, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-700 mb-8 last:mb-0">
                    <div className="absolute top-0 -left-1.5 w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <p className="text-indigo-400 font-black text-[10px] uppercase mb-1">{s(step?.month)}</p>
                    <h4 className="text-white font-bold mb-2">{s(step?.focus)}</h4>
                    <ul className="text-slate-400 text-xs space-y-1">{safeArray<string>(step?.tasks).slice(0, 2).map((t, i) => <li key={i}>• {s(t)}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: TOOLS */}
        {activeTab === 'tools' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-900/80 p-10 rounded-[3.5rem] border border-slate-800 flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="12" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="url(#scoreGrad)" strokeWidth="12" strokeDasharray={440} strokeDashoffset={440 - (440 * (results?.resumeScore?.overall || 0)) / 100} strokeLinecap="round" />
                      <defs><linearGradient id="scoreGrad"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white">{results?.resumeScore?.overall || 0}</span>
                      <span className="text-[8px] font-black text-slate-500 uppercase">Score</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {results?.resumeScore?.breakdown && Object.entries(results.resumeScore.breakdown).map(([k,v]) => <div key={k} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center"><p className="text-white font-bold text-xs">{String(v)}%</p><p className="text-[7px] text-slate-500 font-black uppercase">{k}</p></div>)}
                  </div>
               </div>
               <div className="bg-slate-900/80 p-10 rounded-[3.5rem] border border-slate-800 overflow-y-auto h-[400px]">
                  <h3 className="text-xl font-black text-white mb-6">Interview Prep</h3>
                  {interviewPrep.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-4">
                      <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">{s(item?.category)}</span>
                      <h4 className="text-white font-bold text-sm mb-2">{s(item?.question)}</h4>
                      <p className="text-slate-500 text-[10px] italic">Tip: {s(item?.tip)}</p>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-slate-900/80 p-10 rounded-[3rem] border border-slate-800">
               <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-black text-white">Cover Letter</h3><button onClick={() => copyToClipboard(s(results?.coverLetter))} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Copy</button></div>
               <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs leading-relaxed whitespace-pre-wrap">{s(results?.coverLetter)}</div>
            </div>
          </div>
        )}

        {/* TAB: OPPORTUNITIES */}
        {activeTab === 'opportunities' && (
          <div className="space-y-10 animate-in fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-amber-600/10 border border-amber-600/30 p-10 rounded-[3rem]">
                   <h3 className="text-2xl font-black text-amber-500 mb-6">{language === 'hi' ? 'सरकारी सहायक' : 'Govt Job Asst.'}</h3>
                   <div className="bg-slate-900/80 p-5 rounded-2xl mb-4">
                      <h4 className="text-white font-bold text-sm mb-1">{s(results?.govtJobAssistant?.category)}</h4>
                      <div className="flex flex-wrap gap-2 mt-3">
                         {govtExams.map((e, i) => <span key={i} className="bg-amber-600/20 text-amber-500 px-3 py-1 rounded-full text-[8px] font-black uppercase">{s(e)}</span>)}
                      </div>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {govtAlerts.map((k, i) => <span key={i} className="bg-slate-800 text-slate-400 px-3 py-1 rounded-md text-[8px] font-bold">{s(k)}</span>)}
                   </div>
                </div>
                <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
                   <h3 className="text-2xl font-black text-white mb-6">Micro-Internships</h3>
                   {microInternships.map((mi, i) => (
                    <div key={i} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 mb-4">
                      <h4 className="text-indigo-400 font-bold text-sm">{s(mi?.title)}</h4>
                      <p className="text-slate-400 text-[10px] mb-1">at {s(mi?.company)}</p>
                      <ul className="text-slate-500 text-[9px] list-disc pl-4">{safeArray<string>(mi?.tasks).map((t, idx) => <li key={idx}>{s(t)}</li>)}</ul>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* TAB: GROWTH */}
        {activeTab === 'growth' && (
          <div className="space-y-10 animate-in slide-in-from-top-8">
             <div className="bg-slate-900/80 p-12 rounded-[4rem] border border-slate-800 shadow-3xl text-center">
                <h2 className="text-3xl font-black text-white mb-6">{language === 'hi' ? 'भविष्य की भविष्यवाणी (2030)' : 'Future Prediction'}</h2>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto italic">{s(results?.futurePrediction)}</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
                   <h3 className="text-white font-black text-xl mb-6">College Finder</h3>
                   {collegeCourseFinder.map((c, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-3">
                       <h4 className="text-cyan-400 font-bold text-sm">{s(c?.name)}</h4>
                       <p className="text-slate-400 text-[10px]">{s(c?.reason)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800">
                   <h3 className="text-white font-black text-xl mb-4">Student Guidance</h3>
                   <p className="text-slate-300 text-sm">{s(results?.studentGuidance)}</p>
                </div>
             </div>
          </div>
        )}
      </div>

      <section className="bg-gradient-to-br from-indigo-700 to-purple-900 p-16 rounded-[4rem] text-center shadow-3xl">
        <p className="text-white text-3xl font-black italic mb-12 max-w-4xl mx-auto">"{s(results?.motivation)}"</p>
        <button onClick={onReset} className="bg-white text-indigo-700 px-12 py-5 rounded-[2.5rem] font-black text-lg shadow-2xl hover:scale-105 transition-all">
          {language === 'hi' ? 'नया एनालिसिस शुरू करें' : 'Start New Analysis'}
        </button>
      </section>
    </div>
  );
};

export default ResultsView;
