import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';
import { Tags } from '../Articles/Details';
export default function Details({ element: event = {}, elements: events = {} }) {
  const { files, tags, upcoming } = event;
export default function Details({ element: event = {} }) {
  console.log(event);
  const { files, otherEvents } = event;
  return (
    <div className='grid min-h-[80vh] grid-cols-[4fr,1fr] p-2'>
      <div className='grid w-full grid-cols-1 gap-4 p-3 md:grid-cols-[1fr,2fr]'>
        <div className=''>
          {files.length > 1 && <SwiperImges files={files} />}
          {files.length < 1 && (
            <div className='relative'>
              <img className='rounded-lg' src={'/images/no_result.png'} />
              <p className='absolute bottom-0 font-bold text-gray-400'>{"events doesn't have images"}</p>
            </div>
          )}
        </div>
        <div className='p-2'>
          <EventItem event={event} upcoming={upcoming} />
        </div>
      </div>
      <div className='grid grid-cols-1'>
        <Tags tags={tags} />
        <div className='self-start bg-gray-100 p-4'>
          <h3 className='mb-4 text-xl font-semibold'>Other Events</h3>
          {events?.length > 1 && (
            <ul className='gap-4'>
              {events.map((event, i) => (
                <li key={i} className='px-3 text-black/70'>
                  {event.title.slice(0, 20)}...
                </li>
              ))}
            </ul>
          )}
        </div>
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
      <p className='mb-4 text-[15px] font-light leading-6 text-[#666666]'>{parse(event.details)}</p>
    </div>
  );
}
