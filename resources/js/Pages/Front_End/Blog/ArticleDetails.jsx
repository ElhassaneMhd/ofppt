import NotFound from '@/Pages/NotFound';
import { Tag } from '@/components/ui/Tag';
import { formatDate, getImage } from '@/utils/helpers';
import { Head, Link } from '@inertiajs/react';
import { FaUserCircle } from 'react-icons/fa';
import {
  FacebookShareButton,
  PocketShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  PocketIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export default function ArticleDetails({ article, articles, tags }) {
  return (
    <>
      <Head title={article.title} />
      <div className='mt-3 grid-cols-3 gap-6 p-5 py-7 lg:grid'>
        {article.original?.message ? (
          <div className='col-span-2'>
            <NotFound />
          </div>
        ) : (
          <Details article={article} />
        )}
        <aside className='mt-10 space-y-10 border-l-2 border-border pl-6 lg:mt-0'>
          <LatestArticles currentArticleId={article.id} articles={articles} />
          <Tags tags={tags} />
        </aside>
      </div>
    </>
  );
}

function Details({ article: { title, details, date, files, tags, publisher } }) {
  const url = window.location.href;

  return (
    <div className='col-span-2 flex flex-col gap-5'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-sm font-medium text-text-tertiary'>
            <FaUserCircle size={18} />
            <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FacebookShareButton url={url} hashtag={title}>
              <FacebookIcon round size={28} className='transition-transform duration-200 hover:scale-110' />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon round size={28} className='transition-transform duration-200 hover:scale-110' />
            </TwitterShareButton>
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon round size={28} className='transition-transform duration-200 hover:scale-110' />
            </WhatsappShareButton>
            <PocketShareButton url={url} title={title}>
              <PocketIcon round size={28} className='transition-transform duration-200 hover:scale-110' />
            </PocketShareButton>
          </div>
        </div>
        <img src={getImage(files)} alt={title} className='h-72 w-full rounded-xl object-cover sm:h-96' />
        <h2 className='mb-3 text-3xl font-medium text-text-primary'>{title}</h2>
        <p className='leading-relaxed text-text-primary'>{details}</p>
      </div>
      <div className='mt-auto flex flex-wrap items-center gap-x-3 gap-y-2'>
        {tags?.map((tag) => (
          <Link key={tag} href={`/blog?f=${tag.toLowerCase()}`}>
            <Tag tag={tag} className='rounded-md bg-background-secondary p-2' />
          </Link>
        ))}
      </div>
    </div>
  );
}

function LatestArticles({ articles, currentArticleId }) {
  const latestArticles = articles?.filter((article) => +article.id !== +currentArticleId).slice(-4);

  const render = () => {
    if (!latestArticles.length) return <p className='text-sm font-medium text-text-secondary'>No articles found...</p>;
    return (
      <ul className='space-y-3'>
        {latestArticles.map(({ id, title, files, details, publisher, date }) => (
          <li key={id}>
            <Link
              href={`/blog/${id}`}
              className='grid grid-cols-[100px_auto] gap-5 rounded-lg transition-transform duration-300 hover:scale-95'
            >
              <img src={getImage(files)} alt='blog' className='h-20 w-full rounded-lg object-cover' />
              <div className='space-y-2 overflow-hidden'>
                <h4 className='truncate text-sm font-bold text-text-primary sm:text-base' title={title}>
                  {title}
                </h4>
                <p className='line-clamp-1 text-sm font-medium text-text-secondary'>{details}</p>

                <div className='mt-auto flex items-center gap-2 text-xs text-text-tertiary'>
                  <FaUserCircle />
                  <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[400px] rounded-xl'>
      <h4 className='mb-5 text-lg font-bold text-text-primary'>Latest Articles</h4>
      {render()}
    </div>
  );
}

function Tags({ tags = [] }) {
  const render = () => {
    if (!tags.length) return <p className='text-sm font-medium text-text-secondary'>No tags found...</p>;
    return (
      <ul className='flex max-h-[250px] flex-wrap gap-x-3 gap-y-1 overflow-auto py-1.5'>
        {tags?.map(({ id, name }) => (
          <Link key={id} href={`/blog?f=${name.toLowerCase()}`}>
            <Tag tag={name} />
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[200px] border-t border-border pt-4'>
      <h4 className='mb-5 text-lg font-bold text-text-primary'>Tags</h4>
      {render()}
    </div>
  );
}
