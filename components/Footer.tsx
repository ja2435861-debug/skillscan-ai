
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-600 p-1 rounded">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">SkillScan AI</span>
          </div>
          <p className="text-sm max-w-xs leading-relaxed">
            Empowering professionals with AI-driven career intelligence for the next generation of work across India.
          </p>
        </div>
        
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold mb-2">Platform</p>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
            <a href="#" className="hover:text-white transition-colors">Career Blog</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold mb-2">Legal</p>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-xs">© 2025 SkillScan AI. Global Intelligence, Local Opportunities.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
