import ArticleCard from '@/components/ArticleCard';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate cache every hour

export default async function Home() {
  // Fetch initial data directly via Supabase for Server-Side Rendering
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    return <div className="text-center mt-20 text-red-500">Failed to load content.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-poppins">
          Expand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Mind</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          Daily general knowledge, AI-narrated articles, and smart quizzes tailored to your language.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
