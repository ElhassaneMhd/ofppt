import { getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { FaUserCircle } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa6';

export function LatestArticles({ articles, currentArticleId }) {
  const latestArticles = articles?.filter((article) => +article.id !== +currentArticleId).slice(-3);

  const render = () => {
    if (!latestArticles.length)
      return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          <p className='font-bold text-text-tertiary'>No articles found</p>
        </div>
      );
    return (
      <ul>
        {latestArticles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[400px] rounded-xl bg-background-secondary p-4'>
      <h4 className='mb-6 text-lg font-bold text-text-primary'>Latest Articles</h4>
      {render()}
    </div>
  );
}

function Article({ article: { id, title, files, author, date } }) {
  return (
    <li>
      <Link
        href={`/blog/${id}`}
        className='grid grid-cols-[100px_auto] gap-5 rounded-lg p-4 transition-transform duration-300 hover:scale-95'
      >
        <img src={getImage(files)} alt='blog' className='h-20 w-full rounded-lg object-cover' />
        <div className='space-y-2 overflow-hidden'>
          <h4 className='truncate text-sm font-bold text-text-primary sm:text-base' title={title}>
            {title}
          </h4>

          <div className='flex items-center gap-2'>
            <FaUserCircle className='text-text-tertiary' />
            <span className='text-sm font-bold text-text-secondary'>{author}</span>
          </div>
          <div className='grid grid-cols-[16px_auto] items-center gap-2 text-xs font-medium text-text-secondary'>
            <FaCalendar className='text-sm text-text-tertiary' />

            <span>
              {new Date(date).toLocaleString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
