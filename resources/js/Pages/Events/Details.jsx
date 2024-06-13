// import Swiper core and required modules

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';
export default function Details({ element: event = {} }) {
  console.log(event);
  const { files, otherEvents } = event.original;
  return (
    <div className='grid grid-cols-[4fr,1fr] p-2'>
      <div className='grid w-full grid-cols-1 gap-4 p-3 md:grid-cols-[1fr,2fr]'>
        <div className=''>
          {files.length > 1 && <SwiperImges files={files} />}
          {files.length < 1 && <img className='rounded-lg' src={'/images/no_result.png'} />}
        </div>
        <div className='p-2'>
          <EventItem event={event.original} upcoming={event.original.upcoming} />
        </div>
      </div>
      <div className=''>
        {otherEvents?.length > 1 && (
          <>
            <div className='rounded-lg bg-gray-200 p-2'>
              <span>other Events</span>
              <div className='grid grid-cols-1 gap-4'>
                {otherEvents.map((event, i) => (
                  <EventItem key={i} event={event} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function SwiperImges({ files, upcoming }) {
  return (
    <>
      <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
        {files.map((e, i) => (
          <SwiperSlide key={i}>
            <div className='relative'>
              <img className='rounded-t-md' src={e.url} />
              <p className='absolute top-full z-[9] w-full rounded-b-md bg-black text-center text-sm'>
                {upcoming === 'true' ? 'Upcoming Event' : 'Passed Event'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
    <div className='grid grid-cols-1 gap-4 py-2 pr-2'>
      <h4 className='mb-2 text-xl font-semibold transition-colors hover:text-blue-500'>{event.title}</h4>
      <div className='mb-4 flex items-center gap-2'>
        <div className='flex items-center gap-1 text-gray-500'>
          <IoTimeOutline size={14} />
          <span className='text-sm font-light'>{eventDate}</span>
          <span className='text-sm font-light'>{eventMonth}</span>
          <span className='text-sm font-light'>{eventYear}</span>
          <span className='text-gray-500'>|</span>
        </div>
        <div className='flex items-center gap-1 text-gray-500'>
          <IoLocationOutline />
          <span className='text-sm font-light'>{event.location}</span>
          <span className='text-gray-500'>|</span>
        </div>
        <div className='flex items-center gap-1 text-gray-500'>
          <MdOutlineTimer />
          <span className='text-sm font-light'>{event.duration} Days</span>
        </div>
      </div>
      <p className='mb-4 text-[15px] font-light leading-6 text-[#666666]'>{event.details}</p>
    </div>
  );
}
