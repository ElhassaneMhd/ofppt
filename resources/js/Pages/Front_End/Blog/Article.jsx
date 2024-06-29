import { Tag } from '@/components/ui/Tag';
import { getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { FaUserCircle, FaCalendar } from 'react-icons/fa';

export default function Article({ article, view = 'grid' }) {
  const { id, title, date, files, tags, author } = article;

  if (view === 'list')
    return (
      <div className='grid grid-cols-[100px_auto] overflow-hidden rounded-lg border border-border shadow-sm transition-all duration-500 hover:translate-x-2 sm:grid-cols-[140px_auto] md:h-[120px]'>
        <img src={getImage(files)} alt={title} className='h-full object-cover' />
        <div className='flex flex-col gap-4 overflow-hidden p-3 transition-all duration-500'>
          <Link to={`/blog/${id}`} className='w-fit'>
            <h4
              className='truncate font-bold leading-tight text-text-primary transition-colors duration-300 hover:text-secondary sm:text-lg'
              title={title}
            >
              {title}
            </h4>
          </Link>
          <div className='flex flex-col gap-x-5 gap-y-2 text-xs text-text-tertiary min-[420px]:flex-row'>
            <Info author={author} date={date} />
          </div>
          <ArticleTags tags={tags} />
        </div>
      </div>
    );

  return (
    <div className='group flex h-[350px] flex-col rounded-lg border-border transition-all duration-500'>
      <img src={getImage(files)} alt={title} className='h-[280px] w-full rounded-lg object-cover' />
      <div className='-mt-[100px] ml-[50%] flex w-[90%] flex-1 -translate-x-1/2 flex-col border border-border rounded-2xl bg-background-primary p-5 shadow-md transition-transform duration-500 group-hover:-translate-y-2'>
        <div className='mb-3 flex justify-between gap-5 text-xs text-text-tertiary'>
          <Info author={author} date={date} />
        </div>
        <Link href={`/blog/${id}`}>
          <h4
            className='max-h-[55px] overflow-hidden text-wrap font-bold leading-tight text-text-primary transition-colors duration-300 hover:text-secondary sm:text-lg'
            title={title}
          >
            {title}
          </h4>
        </Link>

        <hr className='my-4 border-border' />
        <ArticleTags tags={tags} />
      </div>
    </div>
  );
}

function Info({ author, date }) {
  return (
    <>
      <div className='flex items-center gap-2'>
        <FaUserCircle />
        <span>{`By ${author}`}</span>
      </div>
      <div className='flex items-center gap-2'>
        <FaCalendar />
        <span>
          {new Date(date).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </>
  );
}

export function ArticleTags({ tags }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.slice(0, 3).map((tag) => (
        <Tag key={tag} tag={tag} className='text-text-secondary' />
      ))}
    </div>
  );
}
