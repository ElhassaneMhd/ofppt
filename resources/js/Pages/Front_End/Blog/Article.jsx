import { Tag } from '@/components/ui/Tag';
import { formatDate, getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { sanitize } from '@/utils/helpers/';
import { FaUserCircle } from 'react-icons/fa';

export default function Article({ article, layout = 'grid' }) {
  const { id, title, date, files, tags, details, publisher } = article;

  if (layout === 'list')
    return (
      <Link href={`/blog/${id}`}>
        <div className='grid grid-cols-[100px_auto] overflow-hidden rounded-lg border border-border shadow-sm transition-all duration-500 hover:translate-x-2 sm:grid-cols-[140px_auto]'>
          <img src={getImage(files)} alt={title} className='h-full max-h-[140px] w-full object-cover' />
          <div className='flex flex-col gap-2 overflow-hidden p-3 transition-all duration-500'>
            <h4 className='w-fit truncate font-bold leading-tight text-text-primary sm:text-lg' title={title}>
              {title}
            </h4>
            <p
              dangerouslySetInnerHTML={{ __html: sanitize(details) }}
              className='line-clamp-2 text-sm font-medium text-text-secondary'
            />

            <div className='mt-auto flex items-center gap-1 text-xs font-medium text-text-tertiary'>
              <FaUserCircle />
              <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
            </div>
            <Tags tags={tags} />
          </div>
        </div>
      </Link>
    );

  return (
    <Link href={`/blog/${id}`}>
      <div className='flex h-full flex-col transition-transform duration-300 hover:scale-95'>
        <img src={getImage(files)} alt={title} className='h-[230px] w-full rounded-lg object-cover' />
        <div className='flex flex-1 flex-col gap-3 bg-background-primary py-3'>
          <h4
            className='line-clamp-2 w-fit text-wrap font-bold leading-tight text-text-primary sm:text-lg'
            title={title}
          >
            {title}
          </h4>
          <p
              dangerouslySetInnerHTML={{ __html: sanitize(details) }}
              className='line-clamp-2 text-sm font-medium text-text-secondary'
            />
          <hr className='mt-auto border-border' />
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 text-xs font-medium text-text-tertiary'>
              <FaUserCircle />
              <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
            </div>
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Tags({ tags }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.slice(0, 3).map((tag) => (
        <Tag key={tag} tag={tag} className='text-text-secondary' />
      ))}
    </div>
  );
}
