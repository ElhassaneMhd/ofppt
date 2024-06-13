import { ArticlesList } from './Articles';

function ArticlesSection({ articles }) {
  return (
    <section className='px-28 py-12'>
      <div className='mb-12 flex items-center justify-between'>
        <h2 className='text-4xl font-medium'>Latest Articles</h2>
        <a href={route('home.articles')}>
          <div className='border-[1px] border-black px-6 py-2 font-medium transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white'>
            View All Articles
          </div>
        </a>
      </div>
      <ArticlesList gridNum={3} usedArticles={articles.slice(0, 3)} />
    </section>
  );
}

export default ArticlesSection;
