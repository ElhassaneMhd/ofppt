import { useEffect, useState } from 'react';
import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

function Events({ events }) {
  const [selectedEvents, setSelectedEvents] = useState('true');
  const usedEvents = events
    .filter((event) => event.upcoming === selectedEvents)
    .toSorted((a, b) => new Date(b.date) - new Date(a.date));

  function handleSelect(value) {
    setSelectedEvents(value === 'upcoming' ? 'true' : 'false');
  }

  return (
    <section className={'mt-12 px-28'}>
      <h1 className='mb-12 text-5xl font-medium'>Events</h1>
      <div className='mb-3 flex w-full items-center gap-16'>
        <span
          className={`text-xl font-semibold capitalize ${selectedEvents === 'true' ? 'text-blue-500' : 'hover:text-blue-500'} cursor-pointer transition-colors`}
          onClick={(e) => handleSelect(e.target.textContent)}
        >
          upcoming
        </span>
        <span
          className={`text-xl font-semibold capitalize ${selectedEvents === 'false' ? 'text-blue-500' : 'hover:text-blue-500'} cursor-pointer transition-colors`}
          onClick={(e) => handleSelect(e.target.textContent)}
        >
          expired
        </span>
      </div>
      <EventList usedEvents={usedEvents} key={selectedEvents} />
    </section>
  );
}

function EventList({ usedEvents }) {
  const [willLoadMore, setWillLoadMore] = useState(true);
  const increasingNum = 3;
  const [sliceTo, setSliceTo] = useState(increasingNum);

  useEffect(
    function () {
      if (usedEvents.length < sliceTo) setWillLoadMore(false);
    },
    [sliceTo, usedEvents.length]
  );

  function handleIncrease() {
    setSliceTo((num) => num + 3);
  }

  return (
    <>
      <ul className='mb-16'>
        {usedEvents.slice(0, sliceTo).map((event, i) => (
          <EventItem key={i} event={event} />
        ))}
      </ul>
      {willLoadMore && (
        <div className='mx-auto w-fit'>
          <button className='bg-blue-500 px-6 py-2 text-lg text-white' onClick={handleIncrease}>
            Load More
          </button>
        </div>
      )}
    </>
  );
}

function EventItem({ event }) {
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
    <li className='mb-10 grid grid-cols-[100px_auto_350px] items-center gap-12 border-t-[1px] border-t-gray-300 pt-6'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-6xl text-blue-500'>{eventDate}</span>
        <span className='capitalize tracking-widest text-black/80'>{eventMonth}</span>
      </div>
      <div className='relative pl-12 before:absolute before:left-0 before:top-[50%] before:h-[50%] before:w-[2px] before:translate-y-[-50%] before:bg-black/20 before:content-[""]'>
        <a href=''>
          <h3 className='mb-3 text-xl font-medium transition-colors hover:text-blue-500'>{event.title}</h3>
        </a>
        <div className='mb-4 flex gap-4'>
          <div className='flex items-center gap-1 text-sm text-black/60'>
            <IoTimeOutline />
            <div>
              <span>{eventDate} </span>
              <span>{eventMonth} </span>
              <span>{eventYear}</span>
            </div>
          </div>
          <div className='flex items-center gap-1 text-sm text-black/60'>
            <IoLocationOutline />
            <span>{event.location}</span>
          </div>
        </div>
        <p className='text-sm text-black/60'>
          {event.details.split(' ').length > 16
            ? `${event.details.split(' ').slice(0, 16).join(' ')}...`
            : event.details}
        </p>
      </div>
      <div>
        <img src='/images/hero-bg.png' className='w-full object-cover' />
      </div>
    </li>
  );
}

export default Events;
