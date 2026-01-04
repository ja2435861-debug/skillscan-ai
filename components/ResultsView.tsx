
import React, { useState, useEffect } from 'react';
import { AnalysisResult, Language } from '../types';

interface ResultsViewProps {
  results: AnalysisResult;
  onReset: () => void;
  language: Language;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onReset, language }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'routine' | 'strategy' | 'tools' | 'opportunities' | 'growth'>('dashboard');
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
          ? `शानदार तैयारी के लिए तैयार? मैंने 'Routine' टैब में आपके लिए एक स्पेशल एग्जाम-ग्राइंड टाइमटेबल बनाया है। इसे फॉलो करके 90% स्कोर करना मुमकिन है!`
          : `Ready for peak performance? I've built a special exam-grind timetable in the 'Routine' tab. Follow it to hit that 90% goal!` 
      }
    ]);
  }, [language, results]);

  const s = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val;
    return String(val.text || val.description || val);
  };

  const safeArray = <T,>(arr: any): T[] => Array.isArray(arr) ? arr : [];

  const timetable = safeArray<any>(results?.dailyTimetable);
  const resources = safeArray<any>(results?.learningResources);
  const missions = safeArray<string>(results?.dailyMissions);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { role: 'user' as const, text: chatInput };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: language === 'hi'
          ? `आपके लक्ष्य के लिए मैंने रिसोर्सेज को और बेहतर फ़िल्टर कर दिया है। 'Routine' टैब के नीचे के लिंक्स देखें।`
          : `I've refined your resources based on your target. Check the study links at the bottom of the 'Routine' tab.` 
      }]);
    }, 800);
  };

  const navItems = [
    { id: 'dashboard', label: language === 'hi' ? 'होम' : 'Home', icon: '🏠' },
    { id: 'routine', label: language === 'hi' ? 'रूटीन' : 'Routine', icon: '🗓️' },
    { id: 'strategy', label: language === 'hi' ? 'प्लान' : 'Plan', icon: '🚀' },
    { id: 'tools', label: language === 'hi' ? 'तैयारी' : 'Prep', icon: '🛠️' },
    { id: 'opportunities', label: language === 'hi' ? 'जॉब्स' : 'Jobs', icon: '💼' },
    { id: 'growth', label: language === 'hi' ? 'ग्रोथ' : 'Growth', icon: '📈' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-4 pb-28 pt-2">
      
      {/* APP HEADER */}
      <div className="px-3">
        <div className="android-card p-5 bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20">👤</div>
              <div>
                <p className="text-[9px] font-black uppercase text-indigo-400">Level {Math.floor(localXP/100)}</p>
                <h2 className="text-white font-black text-sm">{language === 'hi' ? 'स्मार्ट मेंटर सक्रिय' : 'Smart Mentor Active'}</h2>
              </div>
           </div>
           <div className="bg-slate-900/50 px-3 py-1.5 rounded-xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-cyan-400 leading-none mb-1">Target Score</p>
              <p className="text-lg font-black text-white leading-none">90%+</p>
           </div>
        </div>
      </div>

      <div className="px-3 space-y-6">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="android-card p-6 bg-slate-900/50">
               <h3 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">Expert Summary</h3>
               <p className="text-slate-200 text-sm leading-relaxed">{s(results?.summary)}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{language === 'hi' ? 'आज का काम' : 'Todays Goals'}</h3>
              {missions.map((m, idx) => (
                <div key={idx} className="android-card p-4 flex items-center gap-4 bg-slate-900/30">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px]">✓</div>
                  <p className="text-sm font-bold text-slate-300">{s(m)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROUTINE & RESOURCES (THE MAIN FEATURE REQUESTED) */}
        {activeTab === 'routine' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="android-card p-6 bg-indigo-600/10 border-indigo-500/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📝</div>
               <h3 className="text-xl font-black text-white mb-6">{language === 'hi' ? 'आपका डेली ग्राइंड' : 'Daily Study Grind'}</h3>
               <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                 {timetable.map((slot, i) => (
                   <div key={i} className="flex gap-6 relative">
                     <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 z-10 shrink-0"></div>
                     <div className="pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-indigo-400 font-black text-[10px] uppercase">{s(slot?.time)}</span>
                          <span className="h-1 w-1 bg-slate-700 rounded-full"></span>
                          <h4 className="text-white font-bold text-sm">{s(slot?.activity)}</h4>
                        </div>
                        <p className="text-slate-500 text-xs">{s(slot?.details)}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{language === 'hi' ? 'पढ़ाई के डायरेक्ट लिंक्स' : 'Direct Study Links'}</h3>
               {resources.map((res, i) => (
                  <a key={i} href={res?.url} target="_blank" rel="noopener noreferrer" className="android-card p-5 bg-slate-900/60 flex items-center justify-between active:scale-95 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-xl">
                          {s(res?.sourceType) === 'YouTube' ? '📺' : '📚'}
                       </div>
                       <div>
                         <h4 className="text-white font-bold text-sm leading-tight">{s(res?.title)}</h4>
                         <p className="text-indigo-400 text-[9px] font-black uppercase mt-1">{s(res?.sourceType)} • Open Now</p>
                       </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5"/></svg>
                    </div>
                  </a>
               ))}
               <div className="android-card p-5 bg-cyan-500/10 border-cyan-500/20">
                  <h4 className="text-cyan-400 font-black text-[10px] uppercase mb-2">Success Strategy</h4>
                  <p className="text-slate-300 text-xs italic leading-relaxed">{s(results?.studentGuidance)}</p>
               </div>
            </div>
          </div>
        )}

        {/* OTHER SECTIONS (PLaceholders for Android layout) */}
        {['strategy', 'tools', 'opportunities', 'growth'].includes(activeTab) && (
           <div className="android-card p-10 bg-slate-900/50 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-white font-black text-lg mb-2 capitalize">{activeTab} Details</h3>
              <p className="text-slate-400 text-sm">{language === 'hi' ? 'एग्जाम मोड में यह डेटा ' : 'This data is being filtered for your '} {activeTab}...</p>
           </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-950/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-2">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 px-3 relative transition-all ${
                activeTab === item.id ? 'text-cyan-400 scale-110' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
              {activeTab === item.id && <div className="active-tab-indicator" />}
            </button>
          ))}
        </div>
      </nav>

      {/* FABs */}
      <div className="fixed bottom-24 right-4 z-[110] flex flex-col gap-3">
        <button onClick={() => setShowChat(!showChat)} className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-xl active:scale-90 transition-all">💬</button>
        <button onClick={() => setShowEmergency(!showEmergency)} className="w-14 h-14 bg-rose-600 rounded-full flex items-center justify-center text-2xl shadow-xl active:scale-90 transition-all">🆘</button>
      </div>

      {/* CHAT MODAL */}
      {showChat && (
        <div className="fixed inset-0 z-[150] bg-black/60 flex items-end p-4 animate-in fade-in duration-200">
           <div className="w-full bg-slate-900 rounded-t-[3rem] p-6 space-y-4 animate-in slide-in-from-bottom-20">
              <div className="flex justify-between items-center px-2">
                <span className="text-xs font-black uppercase text-indigo-400">Ask Your Mentor</span>
                <button onClick={() => setShowChat(false)} className="text-slate-500">Close</button>
              </div>
              <div className="h-64 overflow-y-auto space-y-4 scrollbar-hide">
                 {chatMessages.map((msg, i) => (
                   <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <p className={`p-4 rounded-3xl text-xs ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{s(msg.text)}</p>
                   </div>
                 ))}
              </div>
              <div className="flex gap-2">
                 <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type here..." className="flex-grow bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white"/>
                 <button onClick={sendMessage} className="bg-indigo-600 px-6 rounded-2xl">→</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
