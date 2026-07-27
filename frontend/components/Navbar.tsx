'use client';
import { useStore } from '@/store/useStore';
import { Globe, User, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage } = useStore();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'bn', label: 'BN' }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-600" size={28} />
          <span className="text-xl font-bold dark:text-white">OmniKnowledge</span>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 text-sm dark:text-white focus:outline-none focus:border-indigo-500"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
          <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 transition">
            <User size={20} className="text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>
    </nav>
  );
}
