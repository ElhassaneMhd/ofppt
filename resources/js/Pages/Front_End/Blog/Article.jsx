import { formatDate, getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { sanitize } from '@/utils/helpers/';
import { FaUserCircle } from 'react-icons/fa';

export default function Article({ article, layout = 'grid' }) {
  const { id, title, date, files, details, publisher, categorie } = article;

  if (layout === 'list')
    return (
      <Link href={`/blog/${id}`}>
        <div className='grid grid-cols-[100px_auto] overflow-hidden rounded-lg border border-border shadow-sm transition-all duration-500 hover:translate-x-2 sm:grid-cols-[140px_auto]'>
          <img src={getImage(files)} alt={title.slice(0,40)} className='h-full max-h-[140px] w-full object-cover' />
          <div className='flex flex-col gap-2 overflow-hidden p-3 transition-all duration-500'>
            <h4 className='w-fit truncate font-bold leading-tight text-text-primary sm:text-lg' title={title}>
              {title}
            </h4>
            <p
              dangerouslySetInnerHTML={{ __html: sanitize(details) }}
              className='line-clamp-2 text-sm font-medium text-text-secondary'
            />
          <div className='flex items-center mt-3 justify-between'>

            <span className='text-sm font-medium capitalize text-secondary'>{categorie}</span>
            <div className='mt-auto flex items-center gap-1 text-xs font-medium text-text-primary'>
              <FaUserCircle />
              <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
            </div>
            </div>
          </div>
        </div>
      </Link>
    );

  return (
    <Link href={`/blog/${id}`}>
      <div className='flex h-full flex-col transition-transform duration-300 hover:scale-95'>
        <img src={getImage(files)} alt={title} className='h-[230px] w-full rounded-t-xl object-cover' />
        <div className='flex flex-1 flex-col gap-3 rounded-b-xl border border-border bg-background-primary p-3'>
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
            <span className='text-sm font-medium capitalize text-secondary'>{categorie}</span>
            <div className='flex items-center gap-1 text-xs font-medium text-text-primary'>
              <FaUserCircle />
              <span className='capitalize'>{publisher}</span>•<span>{formatDate(date)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
