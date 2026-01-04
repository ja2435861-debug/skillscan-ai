
import React, { useState, useRef } from 'react';
import { Language } from '../types';

interface AnalysisFormProps {
  onSubmit: (description: string, file?: File) => void;
  language: Language;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, language }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presets = language === 'hi' ? [
    "मैंने अभी 12वीं पास की है और टेक करियर चाहता हूं",
    "मैं एक मैनेजर हूं और AI में स्विच करना चाहता हूं",
    "मैं सॉफ्टवेयर इंजीनियर के रूप में विदेश जाना चाहता हूं",
    "मार्केटिंग में हाई-पेइंग रिमोट जॉब्स ढूंढें"
  ] : [
    "I just finished 12th and want a tech career",
    "I am a mid-level manager looking to switch to AI",
    "I want to move abroad as a Software Engineer",
    "Find me high-paying remote jobs in Marketing"
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !file) {
      alert(language === 'hi' ? "कृपया अपना गोल लिखें या रिज्यूमे अपलोड करें।" : "Please write your goal or upload a resume.");
      return;
    }
    onSubmit(description, file || undefined);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-wrap justify-center gap-3">
        {presets.map((p, i) => (
          <button 
            key={i} 
            onClick={() => setDescription(p)}
            className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-700">
        <form onSubmit={handleFormSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-black text-cyan-400 mb-4 uppercase tracking-[0.2em]">
              {language === 'hi' ? 'अपनी पृष्ठभूमि या लक्ष्य बताएं' : 'Tell us your background or goal'}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'hi' ? "जैसे: 'मैं एक MBA छात्र हूं' या 'मैं 12वीं के बाद डेटा साइंस करना चाहता हूं'" : "e.g. 'I am an MBA student' or 'Main 12th ke baad data science karna chahta hoon'"}
              className="w-full h-44 p-6 bg-slate-950 border border-slate-800 rounded-3xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all resize-none text-white font-medium placeholder:text-slate-700 shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center transition-all ${
                file ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 hover:border-cyan-500 bg-slate-950/50'
              }`}
            >
              <div className={`p-4 rounded-2xl mb-4 ${file ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-slate-500'}`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-slate-500 text-xs font-bold text-center">
                {file ? file.name : (language === 'hi' ? "रिज्यूमे अपलोड करें (वैकल्पिक)" : "Upload Resume (Optional)")}
              </p>
              <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" accept=".pdf,.docx,.txt" />
            </div>

            <div className="flex flex-col justify-center">
               <button
                type="submit"
                className="w-full h-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black py-8 px-8 rounded-[2.5rem] shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center gap-2 text-xl uppercase tracking-widest"
              >
                {language === 'hi' ? 'डीप एनालिसिस शुरू करें' : 'Start Deep Analysis'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnalysisForm;
