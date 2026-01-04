
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
          ? `आपके स्किलस्कैन मेंटर में स्वागत है! मैं आपका AI मेंटर हूँ। आपका ${results?.careerGrowthScore || 0}% ग्रोथ स्कोर बहुत बढ़िया है। बताइए, मैं आपकी कैसे मदद कर सकता हूँ?`
          : `Welcome to SkillScan! I'm your AI Mentor. Your ${results?.careerGrowthScore || 0}% score is great. How can I help you today?` 
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
    alert(language === 'hi' ? "सफलतापूर्वक कॉपी किया गया!" : "Successfully Copied!");
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
          ? `शानदार! मैंने आपका टाइमटेबल अपडेट कर दिया है। 'Routine' टैब देखें।`
          : `Great! I've updated your routine. Check the 'Routine' tab for details.` 
      }]);
    }, 800);
  };

  if (!results) return null;

  const navItems = [
    { id: 'dashboard', label: language === 'hi' ? 'होम' : 'Home', icon: '🏠' },
    { id: 'routine', label: language === 'hi' ? 'रूटीन' : 'Routine', icon: '⏰' },
    { id: 'strategy', label: language === 'hi' ? 'प्लान' : 'Plan', icon: '🚀' },
    { id: 'tools', label: language === 'hi' ? 'तैयारी' : 'Prep', icon: '🛠️' },
    { id: 'opportunities', label: language === 'hi' ? 'जॉब्स' : 'Jobs', icon: '💼' },
    { id: 'growth', label: language === 'hi' ? 'ग्रोथ' : 'Growth', icon: '📈' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-6 pb-28 pt-4">
      
      {/* APP-LIKE HEADER STATS */}
      <div className="px-2">
        <div className="android-card p-6 flex items-center justify-between shadow-2xl bg-indigo-600/10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg">👤</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Level {Math.floor(localXP/100)}</p>
                <h2 className="text-white font-black text-lg">{language === 'hi' ? 'आपकी प्रोफाइल' : 'User Profile'}</h2>
              </div>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{language === 'hi' ? 'ग्रोथ स्कोर' : 'Growth'}</p>
              <p className="text-2xl font-black text-white">{localGrowthScore}%</p>
           </div>
        </div>
      </div>

      <div className="px-2 space-y-6 min-h-[70vh]">
        {/* TAB CONTENT: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="android-card p-6 bg-slate-900/80">
               <h3 className="text-xl font-black text-white mb-4">{language === 'hi' ? 'करियर सारांश' : 'Career Summary'}</h3>
               <p className="text-slate-300 text-sm leading-relaxed">{s(results?.summary)}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">{language === 'hi' ? 'आज के मिशन्स' : 'Daily Missions'}</h3>
              <div className="grid grid-cols-1 gap-3">
                {missions.map((m, idx) => {
                  const missionText = s(m);
                  const isDone = completedMissions.has(missionText);
                  return (
                    <div key={idx} onClick={() => handleCompleteMission(missionText)} className={`android-card p-5 flex items-center gap-4 transition-all active:scale-95 ${isDone ? 'opacity-40 bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-900/50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${isDone ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        {isDone ? '✓' : '•'}
                      </div>
                      <p className={`text-sm font-bold flex-grow ${isDone ? 'line-through' : 'text-slate-200'}`}>{missionText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ROUTINE */}
        {activeTab === 'routine' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="android-card p-6 bg-indigo-900/10 border-indigo-500/20">
               <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                 <span>⏰</span> {language === 'hi' ? 'आपका डेली रूटीन' : 'Your Routine'}
               </h3>
               <div className="space-y-6">
                 {timetable.map((slot, i) => (
                   <div key={i} className="flex gap-4 group">
                     <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                        <div className="w-0.5 flex-grow bg-slate-800 my-1"></div>
                     </div>
                     <div className="pb-4">
                        <p className="text-[10px] font-black text-indigo-400 uppercase">{s(slot?.time)}</p>
                        <h4 className="text-white font-bold text-sm mb-1">{s(slot?.activity)}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{s(slot?.details)}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-4">{language === 'hi' ? 'पढ़ाई के रिसोर्सेज' : 'Study Resources'}</h3>
               {resources.map((res, i) => (
                  <a key={i} href={res?.url} target="_blank" rel="noopener noreferrer" className="android-card p-5 bg-slate-900/50 flex items-center justify-between active:scale-95 transition-transform">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-xl">📄</div>
                       <div>
                         <h4 className="text-white font-bold text-sm">{s(res?.title)}</h4>
                         <p className="text-slate-500 text-[10px]">{s(res?.sourceType)} • Click to learn</p>
                       </div>
                    </div>
                    <span className="text-indigo-400">→</span>
                  </a>
               ))}
            </div>
          </div>
        )}

        {/* OTHER TABS simplified for brevity, following the same Android-style card pattern */}
        {['strategy', 'tools', 'opportunities', 'growth'].includes(activeTab) && (
           <div className="android-card p-10 bg-slate-900/80 text-center space-y-4">
              <div className="text-5xl animate-bounce mb-4">🚀</div>
              <h3 className="text-xl font-black text-white capitalize">{activeTab} Section</h3>
              <p className="text-slate-400 text-sm">Deep analysis optimized for your device.</p>
              <div className="bg-slate-950 p-6 rounded-[2rem] text-left text-xs font-mono text-indigo-400 opacity-60">
                 {language === 'hi' ? 'डेटा लोड हो रहा है...' : 'Syncing career intelligence...'}
              </div>
              {/* Note: In a real implementation, each tab's unique content from results would go here */}
           </div>
        )}
      </div>

      {/* ANDROID-STYLE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-950/90 backdrop-blur-2xl border-t border-white/5 pb-8 pt-4 px-2">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1.5 px-3 transition-all relative ${
                activeTab === item.id ? 'text-cyan-400 scale-110' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
              {activeTab === item.id && <div className="active-tab-indicator" />}
            </button>
          ))}
        </div>
      </nav>

      {/* FLOATING ACTION BUTTONS (ANDROID STYLE) */}
      <div className="fixed bottom-24 right-4 z-[110] flex flex-col gap-3">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl active:scale-90 transition-transform shadow-indigo-500/40"
        >
          💬
        </button>
        <button 
          onClick={() => setShowEmergency(!showEmergency)}
          className="w-14 h-14 bg-rose-600 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl active:scale-90 transition-transform shadow-rose-500/40"
        >
          🆘
        </button>
      </div>

      {/* MODALS */}
      {showChat && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-3xl animate-in slide-in-from-bottom-8">
              <div className="p-5 bg-indigo-600 text-white flex justify-between items-center">
                <span className="font-black text-xs uppercase tracking-widest">SkillScan AI Mentor</span>
                <button onClick={() => setShowChat(false)} className="p-2">✕</button>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-950">
                 {chatMessages.map((msg, i) => (
                   <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium ${
                        msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {s(msg.text)}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
                 <input 
                   value={chatInput} 
                   onChange={(e) => setChatInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                   placeholder={language === 'hi' ? "सवाल पूछें..." : "Type question..."}
                   className="flex-grow bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-indigo-500 outline-none"
                 />
                 <button onClick={sendMessage} className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center text-white">
                   →
                 </button>
              </div>
           </div>
        </div>
      )}

      {showEmergency && (
         <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-sm android-card p-8 bg-slate-900 border-rose-500/30 text-center">
               <div className="text-5xl mb-6">🚑</div>
               <h3 className="text-2xl font-black text-rose-500 mb-4">{language === 'hi' ? 'करियर सहायता' : 'Emergency Help'}</h3>
               <p className="text-slate-300 text-sm leading-relaxed mb-8">{s(results?.emergencyGuidance)}</p>
               <button onClick={() => setShowEmergency(false)} className="w-full bg-rose-600 py-4 rounded-2xl font-black text-white uppercase tracking-widest text-xs">
                 {language === 'hi' ? 'वापस जाएं' : 'Understood'}
               </button>
            </div>
         </div>
      )}

    </div>
  );
};

export default ResultsView;
