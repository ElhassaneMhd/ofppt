import { useAutoAnimate } from '@formkit/auto-animate/react';
import Article from './Article';

export default function ArticlesList({ articles, categories }) {
  const [parent] = useAutoAnimate({ duration: 500 });
  const view = 'grid';

  
  return (
    <div
      className={`min-h-dvh gap-5 ${view === 'grid' ? 'grid gap-y-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-content-start sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]' : 'flex flex-col '}`}
      ref={parent}
    >
      {articles.map((article) => (
        <Article key={article.id} article={article} categories={categories} view={view} />
      ))}
    </div>
  );
}
