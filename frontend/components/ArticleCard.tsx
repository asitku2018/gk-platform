'use client';
import { Headphones, Share2 } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface ArticleProps {
  id: string;
  title: string;
  content: string;
  category: string;
  audio_url: string;
}

export default function ArticleCard({ article }: { article: ArticleProps }) {
  const setAudio = useStore((state) => state.setAudio);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-wider">
          {article.category}
        </span>
        <h3 className="text-xl font-bold mt-4 mb-2 text-slate-900 dark:text-white line-clamp-2">
          {article.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
          {article.content}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <button 
          onClick={() => setAudio(article.audio_url, article.title)}
          className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
        >
          <Headphones size={18} />
          Listen Now
        </button>
        <button className="text-slate-400 hover:text-indigo-600 transition">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
