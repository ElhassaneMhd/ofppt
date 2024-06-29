import { CiImageOff } from 'react-icons/ci';
import { DetailsPreview, TagsPreview } from '../Shared';
import { formatDate, getFile } from '@/utils/helpers';

export default function Show({ event = {} }) {
  const { title, files, location, duration, created_at, details, tags, upcoming } = event;

  return (
    <>
      <div className='grid gap-5 sm:grid-cols-3'>
        <div
          className='group relative grid h-full min-h-52 place-content-center overflow-hidden rounded-lg bg-background-secondary bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${getFile(files[0])?.src})`,
          }}
        >
          {!getFile(files[0])?.src && <CiImageOff className='text-4xl text-text-secondary' />}{' '}
        </div>
        <div className='flex flex-col gap-3 sm:col-span-2'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Title :</label>
            <p className='font-medium text-text-primary'>{title}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Location :</label>
            <p className='font-medium text-text-primary'>{location}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Duration :</label>
            <p className='font-medium text-text-primary'>{duration}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Event Date :</label>
            <p className='font-medium text-text-primary'>{formatDate(created_at)}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Event Status :</label>
            <span
              className={`w-fit rounded-full px-5 py-1 text-xs font-medium text-white ${upcoming === 'true' ? 'bg-green-600' : 'bg-red-500'}`}
            >
              {upcoming === 'true' ? 'Upcoming' : 'Already Passed'}
            </span>
          </div>
        </div>
      </div>
      <TagsPreview tags={tags} />
      <DetailsPreview details={details} />
    </>
  );
}
