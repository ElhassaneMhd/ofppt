import { CiImageOff } from 'react-icons/ci';
import { FaCalendar, FaUserCircle } from 'react-icons/fa';
import { TagsPreview } from '../Shared';
import { formatDate, getFile } from '@/utils/helpers';
import { MdOutlineCategory } from 'react-icons/md';
import { LongDetails } from '@/components/Front_End/Details';

export default function Show({ article = {} }) {
  const { title, files, publisher, created_at, details, tags, categorie } = article;

  return (
    <>
      <div className='mb-5 flex-1 space-y-4'>
        <div
          className='group relative grid h-60 w-full place-content-center overflow-hidden rounded-xl bg-background-secondary bg-cover bg-center bg-no-repeat object-cover'
          style={{
            backgroundImage: `url(${getFile(files[0])?.src})`,
          }}
        >
          {~files[0]?.src && <CiImageOff className='text-4xl text-text-secondary' />}{' '}
        </div>
        <div className='mb-3 flex gap-5 text-xs font-medium text-text-secondary'>
          <div className='flex items-center gap-2'>
            <FaUserCircle className='text-text-tertiary' />
            <span>{`By ${publisher}`}</span>
          </div>
          <span className='h-5 w-0.5 bg-border'></span>
          <div className='flex items-center gap-2'>
            <FaCalendar className='text-text-tertiary' />
            <span>{formatDate(created_at)}</span>
          </div>
          <span className='h-5 w-0.5 bg-border'></span>
          <div className='flex items-center gap-2'>
            <MdOutlineCategory />
            <span>{categorie}</span>
          </div>
        </div>
        <h2 className='mb-3 text-3xl font-medium text-text-primary'>{title}</h2>
        <LongDetails details={details} className='flex-1 overflow-auto' />
      </div>
      <div className='border-t border-border pt-2'>
        <TagsPreview tags={tags} label={false} />
      </div>
    </>
  );
}
