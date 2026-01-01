
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
      alert("Please provide a description or upload a resume.");
      return;
    }
    onSubmit(description, file || undefined);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 animate-in zoom-in-95 duration-500">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">
            Career Background or Education
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., '12th RBSE Science Maths scope' or 'Computer Engineering career paths'"
            className="w-full h-40 p-6 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="relative group">
          <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-widest">
            Resume / Documents (Optional)
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center transition-all ${
              file ? 'border-indigo-500 bg-indigo-50 shadow-inner' : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
            }`}
          >
            <div className={`p-4 rounded-2xl mb-4 ${file ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {file ? (
              <div className="text-center">
                <p className="text-indigo-600 font-black">{file.name}</p>
                <p className="text-[10px] font-bold text-indigo-400 uppercase">{(file.size / 1024).toFixed(1)} KB READY</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm font-medium">Drag & drop resume or <span className="text-indigo-600 font-black">Browse</span></p>
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 px-6 rounded-[2rem] shadow-2xl shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
        >
          Analyze Global Potential
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;
