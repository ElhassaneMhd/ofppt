import { FaRegUser } from 'react-icons/fa';
import Section from './Section';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';

function Events({ events }) {
  return (
    <Section className={'bg-gray-100 py-12'}>
      <div className='mb-12 flex items-center justify-between'>
        <h2 className='text-4xl font-medium'>Events</h2>
        <a href=''>
          <div className='border-[1px] border-black px-6 py-2 font-medium transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white'>
            View All Events
          </div>
        </a>
      </div>
      <EventList events={events} />
    </Section>
  );
}

function EventList({ events }) {
  return (
    <ul className='grid grid-cols-3 gap-4'>
      {events.slice(0, 3).map((event, i) => (
        <EventItem key={i} event={event} />
      ))}
    </ul>
  );
}

function EventItem({ event }) {
  console.log(event);
  const eventMonth = new Date(event.date).toLocaleDateString('fr-FR', {
    month: 'long',
  });
  const eventDate = new Date(event.date)
    .toLocaleDateString('fr-FR', {
      day: 'numeric',
    })
    .padStart(2, 0);
  const eventYear = new Date(event.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
  });
  return (
    <li>
      <div className='grid grid-rows-[180px_auto]'>
        <div className='bg-[url("/images/hero-bg.png")] bg-cover p-3'>
          <div className='flex w-fit gap-1 bg-white px-2 py-1 text-sm'>
            <span>{eventDate}</span>
            <span className='capitalize'>{eventMonth}</span>
          </div>
        </div>
      </div>
      <div className='py-2 pr-2'>
        <a href=''>
          <h4 className='mb-2 text-lg font-semibold transition-colors hover:text-blue-500'>{event.title}</h4>
        </a>
        <div className='mb-4 flex items-center gap-2'>
          <div className='flex items-center gap-1 text-gray-500'>
            <IoTimeOutline size={14} />
            <span className='text-sm font-light'>{eventDate}</span>
            <span className='text-sm font-light'>{eventMonth}</span>
            <span className='text-sm font-light'>{eventYear}</span>
          </div>
          <span className='text-gray-500'>|</span>
          <div className='flex items-center gap-1 text-gray-500'>
            <IoLocationOutline />
            <span className='text-sm font-light'>{event.location}</span>
          </div>
          <span className='text-gray-500'>|</span>
          <div className='flex items-center gap-1 text-gray-500'>
            <MdOutlineTimer />
            <span className='text-sm font-light'>{event.duration} Days</span>
          </div>
        </div>
        <p className='mb-4 text-[15px] font-light leading-6 text-[#666666]'>
          {event.details.split(' ').slice(0, 11).join(' ')}...
        </p>
        <a
          href=''
          className='relative border-blue-500 pb-2 text-blue-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:content-[""] hover:before:w-full'
        >
          Read More
        </a>
      </div>
    </li>
  );
}

export default Events;
