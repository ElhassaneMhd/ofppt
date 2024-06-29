import { Tag } from '@/components/ui/Tag';
import { getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { FaUserCircle } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa6';


export function Details({ article: { title, content, date, files, tags, author } }) {
  return (
    <div className='col-span-2'>
      <div className='mb-5 space-y-4'>
        <img src={getImage(files)} alt={title} className='h-72 w-full rounded-xl object-cover sm:h-96' />
        <div className='mb-3 flex gap-8 text-sm text-text-secondary'>
          <div className='flex items-center gap-2'>
            <FaUserCircle className='text-text-tertiary' />
            <span>{`By ${author}`}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaCalendar className='text-text-tertiary' />
            <span>
              {new Date(date).toLocaleString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>{' '}
          </div>
        </div>
        <h2 className='mb-3 text-3xl font-medium text-text-primary'>{title}</h2>
        <p className='leading- text-lg text-text-secondary'>{content}</p>
      </div>
      <ArticleTags tags={tags} />
    </div>
  );
}

function ArticleTags({ tags }) {
  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
      {tags?.map((tag) => (
        <Link key={tag} href={`/blog?f=${tag.toLowerCase()}`}>
          <Tag tag={tag} />
        </Link>
      ))}
    </div>
  );
}
