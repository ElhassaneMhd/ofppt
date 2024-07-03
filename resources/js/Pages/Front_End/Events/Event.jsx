import { Button } from '@/components/ui';
import { formatDate, getImage } from '@/utils/helpers';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { MdCalendarToday, MdLocationPin } from 'react-icons/md';
import { ShortDetails } from '@/components/Front_End/Details';

export default function Event({ event }) {
  const { id, title, details, date, location, duration, files, upcoming } = event;
  const formattedDate = formatDate(date).split(' ');

  return (
    <div className='grid gap-5 md:grid-cols-[120px_1fr_1fr]'>
      <div className='flex flex-col items-center md:items-start'>
        <span className='font-medium text-text-secondary'>{formattedDate[0]}</span>
        <span className='text-7xl font-bold text-secondary'>{formattedDate[1].slice(0, -1)}</span>
        {upcoming === 'true' && (
          <div className='mt-3 flex flex-col items-center gap-4'>
            <div className='h-12 w-0.5 bg-border'></div>
            <h3 className='vertical text-xs font-medium uppercase text-text-tertiary'>Upcoming</h3>
            <div className='h-12 w-0.5 bg-border'></div>
          </div>
        )}
      </div>
      <Images images={files} />
      <div className='flex flex-col gap-3'>
        <h3 className='text-2xl font-bold text-text-primary'>{title}</h3>
        <div className='flex flex-col gap-2 text-sm font-medium text-text-tertiary'>
          <div className='flex items-center gap-2'>
            <Button size='small' shape='icon' className='rounded-full'>
              <MdLocationPin />
            </Button>
            <h4>{location}</h4>
          </div>
          <div className='flex items-center gap-2'>
            <Button size='small' shape='icon' className='rounded-full'>
              <MdCalendarToday />
            </Button>
            <h4>{formatDate(date, true)}</h4>
            {duration > 1 && <h4 className='border-l-2 border-border pl-2'>{duration} days</h4>}
          </div>
        </div>
        <ShortDetails details={details} className='mb-4 line-clamp-5' />
        <hr className='mb-4 mt-auto border-border' />
        <Link href={`/events/${id}`} className='w-fit'>
          <Button type='outline' display='with-icon'>
            View Event Details
            <FaChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Images({ images }) {
  const className = images.length === 1 ? '' : images.length === 2 ? 'grid-cols-2 ' : 'grid-cols-3 ';
  return (
    <div className={`grid h-full gap-3 ${className}`}>
      {images.slice(0, 3).map((_, index) => (
        <img
          key={index}
          src={getImage(images, index)}
          alt=''
          className={`h-full max-h-[350px] w-full rounded-xl object-cover ${index === 0 && images.length === 3 ? 'col-span-2 row-span-2' : ''}`}
        />
      ))}
    </div>
  );
}
