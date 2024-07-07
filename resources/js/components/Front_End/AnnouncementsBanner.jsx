import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { createPortal } from 'react-dom';
import { useLocalStorageState } from '@/hooks';
import { usePage } from '@inertiajs/react';
import { Announcement } from '@/Pages/Back_Office/Settings/AnnouncementsBanner/NewAnnouncement';

export default function AnnouncementsBanner({ announcements }) {
  const { announcementBanner } = usePage().props.settings;
  const [visible, setVisible] = useLocalStorageState('banner', []);

  if (
    announcements?.length === 0 ||
    announcements?.every((announcement) => visible.includes(announcement.id)) ||
    announcementBanner === 'false'
  )
    return null;

  return createPortal(
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      loop
      allowTouchMove={false}
      className='relative bg-background-primary'
    >
      {announcements
        .filter((announcement) => !visible.includes(announcement.id))
        .map((announcement) => (
          <SwiperSlide key={announcement.id}>
            <Announcement announcement={announcement} onClose={() => setVisible([...visible, announcement.id])} />
          </SwiperSlide>
        ))}
    </Swiper>,
    document.getElementById('banner') || document.body
  );
}
