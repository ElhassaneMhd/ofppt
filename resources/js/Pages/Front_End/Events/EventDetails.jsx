import NotFound from '@/Pages/NotFound';
import { Tags } from '@/components/ui/Tag';
import { formatDate, getImage } from '@/utils/helpers';
import { Head, Link } from '@inertiajs/react';
import Slider from '@/components/Front_End/Slider';
import { Share } from '../Blog/ArticleDetails';
import { LongDetails, ShortDetails } from '@/components/Front_End/Details';

export default function EventDetails({ event, events }) {
  const { title, details, files } = event;
  return (
    <>
      <Head title={event.title} />
      <div className='mt-3 grid-cols-3 gap-6 p-5 py-7 lg:grid'>
        {event.original?.message ? (
          <div className='col-span-2'>
            <NotFound />
          </div>
        ) : (
          <div className='col-span-2 flex flex-col gap-5'>
            <div className='space-y-4'>
              <Images images={files} />
              <h2 className='mb-3 text-3xl font-medium text-text-primary'>{title}</h2>
              <LongDetails details={details} />
            </div>
          </div>
        )}
        <aside className='mt-10 space-y-6 border-l-2 border-border pl-6 lg:mt-0'>
          {!event.original?.message && <Details {...event} />}
          <LatestEvents currentEventId={event.id} events={events} />
          {!event.original?.message && (
            <>
              <Tags tags={event?.tags} />
              <Share title={event.title} />
            </>
          )}
        </aside>
      </div>
    </>
  );
}

function Details({ location, date, duration, upcoming }) {
  return (
    <div className='border-b border-border'>
      <h4 className='mb-3 text-lg font-bold text-text-primary'>Event Details</h4>

      <div className='flex flex-col gap-2 pb-5 text-sm font-medium text-text-tertiary'>
        <div className='flex items-center gap-2'>
          <span className='text-text-secondary'>Location:</span>
          <h4 className='font-semibold text-primary'>{location}</h4>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-text-secondary'>Date:</span>
          <h4 className='font-semibold text-primary'>{formatDate(date, true)}</h4>
        </div>
        {duration > 1 && (
          <div className='flex items-center gap-2'>
            <span className='text-text-secondary'>Duration:</span>
            <h4 className='font-semibold text-primary'>{duration} days</h4>
          </div>
        )}
        <div className='flex items-center gap-2'>
          <span className='text-text-secondary'>Status:</span>
          <h4 className='font-semibold text-primary'>{upcoming === 'true' ? 'Upcoming' : 'Past'}</h4>
        </div>
      </div>
    </div>
  );
}

function Images({ images }) {
  if (images?.length === 1)
    return <img src={getImage(images)} alt='event' className='h-96 w-full rounded-lg object-cover' />;

  return (
    <div className='mb-10'>
      <Slider defaultSlidesPerView={1} paginationId={'events-details-pagination'} className='py-3'>
        <></>
        {images.map((_, index) => (
          <Slider.Slide key={index}>
            <img src={getImage(images, index)} alt='event' className='h-96 w-full rounded-lg object-cover' />
          </Slider.Slide>
        ))}

        <Slider.Pagination />
      </Slider>
    </div>
  );
}

function LatestEvents({ events, currentEventId }) {
  const latestEvents = events?.filter((event) => +event.id !== +currentEventId).slice(-4);

  const render = () => {
    if (!latestEvents.length) return <p className='text-sm font-medium text-text-secondary'>No events found...</p>;
    return (
      <ul className='space-y-3'>
        {latestEvents.map(({ id, title, details, location, date }) => {
          const formattedDate = formatDate(date).split(' ');
          return (
            <li key={id}>
              <Link
                href={`/blog/${id}`}
                className='grid grid-cols-[60px_auto] gap-5 rounded-lg transition-transform duration-300 hover:scale-95'
              >
                <div className='flex flex-col items-center md:items-start'>
                  <span className='text-sm font-medium text-text-secondary'>{formattedDate[0]}</span>
                  <span className='text-4xl font-bold text-secondary'>{formattedDate[1].slice(0, -1)}</span>
                </div>
                <div className='space-y-1 overflow-hidden'>
                  <h4 className='truncate text-sm font-bold text-text-primary sm:text-base' title={title}>
                    {title}
                  </h4>
                  <ShortDetails details={details} className='line-clamp-1' />
                  <span className='mt-auto text-xs font-semibold capitalize text-text-tertiary'>{location}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className='relative rounded-xl'>
      <h4 className='mb-5 text-lg font-bold text-text-primary'>Latest Events</h4>
      {render()}
    </div>
  );
}
