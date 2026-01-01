import React, { useState, useRef } from 'react';

interface AnalysisFormProps {
  onSubmit: (description: string, file?: File) => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !file) {
      alert("Kripya apna goal likhein ya resume upload karein.");
      return;
    }
    onSubmit(description, file || undefined);
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-700">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div>
          <label className="block text-xs font-black text-cyan-400 mb-4 uppercase tracking-[0.2em]">
            Apna Goal ya Background batayein
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jaise: 'Main 12th ke baad Software Engineer banna chahta hoon' ya 'Mujhe AI tools seekhne hain'"
            className="w-full h-44 p-6 bg-slate-950 border border-slate-800 rounded-3xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all resize-none text-white font-medium placeholder:text-slate-600 shadow-inner"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-cyan-400 mb-4 uppercase tracking-[0.2em]">
            Apna Resume Upload Karein (Optional)
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all ${
              file ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 hover:border-cyan-500 bg-slate-950/50'
            }`}
          >
            <div className={`p-4 rounded-2xl mb-4 transition-colors ${file ? 'bg-cyan-500 text-white' : 'bg-slate-900 text-slate-500'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {file ? (
              <div className="text-center">
                <p className="text-cyan-400 font-black">{file.name}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Scan ke liye taiyar</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm font-medium">Resume yahan drop karein ya <span className="text-cyan-400 font-black">Browse</span> karein</p>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept=".pdf,.docx,.txt,image/*"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black py-5 px-8 rounded-3xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4 text-lg uppercase tracking-widest"
        >
          Analysis Shuru Karein
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;