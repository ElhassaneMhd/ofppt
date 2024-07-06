import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';
import { PiX } from 'react-icons/pi';
import { useLocalStorageState } from '@/hooks';
import { usePage } from '@inertiajs/react';

export default function AnnouncementsBanner({ announcements }) {
  const { announcementBanner } = usePage().props.settings;
  const [visible, setVisible] = useLocalStorageState('banner', true);

  if (!visible || announcementBanner === 'false') return null;

  return createPortal(
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      loop
      allowTouchMove={false}
      className='relative bg-background-primary'
    >
      {announcements.map((announcement) => (
        <SwiperSlide key={announcement.id}>
          <div
            className='w-full bg-blue-500 p-3'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement.content) }}
          />
        </SwiperSlide>
      ))}
      <button
        className='absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-text-primary transition-colors duration-300 hover:bg-white/30'
        onClick={() => setVisible(false)}
      >
        <PiX />
      </button>
    </Swiper>,
    document.getElementById('banner') || document.body
  );
}
