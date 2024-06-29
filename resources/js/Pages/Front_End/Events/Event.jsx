import { MdCalendarToday, MdLocationPin } from 'react-icons/md';
import { GoClockFill } from 'react-icons/go';
import { Button } from '@/components/ui';
import { getImage } from '@/utils/helpers';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

export default function Event({ event }) {
  return (
    <div className='grid grid-cols-2 items-center gap-10'>
      <Images images={event.files} />
      <Info event={event} />
    </div>
  );
}

function Info({ event: {id, title, details, date, location, duration } }) {
  return (
    <div className='flex-1 space-y-5 rounded-lg bg-background-secondary p-5 text-center md:text-start'>
      <div>
        <h2 className='text-2xl font-bold text-text-primary sm:text-4xl'>{title}</h2>
      </div>
      <p className='line-clamp-4 text-text-secondary'>{details}</p>
      <div className='flex flex-wrap gap-5'>
        <div className='grid grid-cols-[40px_auto] items-center'>
          <span className='grid h-8 w-8 place-content-center rounded-full border border-border bg-background-tertiary text-sm'>
            <MdCalendarToday className='text-white' />
          </span>
          <h4 className='text-sm font-medium text-text-tertiary'>{date}</h4>
        </div>
        <div className='grid grid-cols-[40px_auto] items-center'>
          <span className='grid h-8 w-8 place-content-center rounded-full border border-border bg-background-tertiary text-sm'>
            <MdLocationPin className='text-white' />
          </span>
          <h4 className='text-sm font-medium text-text-tertiary'>{location}</h4>
        </div>
        <div className='grid grid-cols-[40px_auto] items-center'>
          <span className='grid h-8 w-8 place-content-center rounded-full border border-border bg-background-tertiary text-sm'>
            <GoClockFill className='text-white' />
          </span>
          <h4 className='text-sm font-medium text-text-tertiary'>{duration} jours</h4>
        </div>
      </div>
      <Link href={`/events/${id}`}></Link>
      <Button display='with-icon' className='w-full md:w-fit'>
        Lire Plus
        <FaChevronRight />
      </Button>
    </div>
  );
}
function Images({ images }) {
  const className = images.length === 1 ? '' : images.length === 2 ? 'grid-cols-2 ' : 'grid-cols-3 ';
  return (
    <div className={`grid h-full gap-5 ${className}`}>
      {images.slice(0,3).map((_, index) => (
        <img
          key={index}
          src={getImage(images, index)}
          alt=''
          className={`rounded-xl h-full w-full object-cover max-h-[350px] ${index === 0 && images.length === 3 ? 'col-span-2 row-span-2' : ''}`}
        />
      ))}
    </div>
  );
}
