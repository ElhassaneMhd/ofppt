import { createContext, useContext, useEffect, useState } from 'react';
import { Navigation, Pagination, A11y, Keyboard, Autoplay, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/styles/App.css';

const SliderContext = createContext();

export default function Slider({ defaultSlidesPerView, children, navigationIds = {}, paginationId,className='my-10 px-6 py-3' }) {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    function handleSlides(width) {
      if (width < 768) return 1;
      if (width < 1024) return 2;
      if (width < 1280) return 3;
      return 4;
    }
    setSlidesPerView(handleSlides(window.innerWidth));

    window.addEventListener('resize', () => {
      setSlidesPerView(handleSlides(window.innerWidth));
    });
    return () => window.removeEventListener('resize', () => setSlidesPerView(handleSlides(window.innerWidth)));
  }, []);

  return (
    <SliderContext.Provider
      value={{
        slidesPerView,
        navigationIds,
        paginationId,
      }}
    >
      {children[0]}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Virtual, A11y, Keyboard]}
        spaceBetween={50}
        slidesPerView={defaultSlidesPerView || slidesPerView}
        className={className}
        navigation={{ nextEl: `#${navigationIds.next}`, prevEl: `#${navigationIds.prev}` }}
        mousewheel
        pagination={{ clickable: true, el: `#${paginationId}` }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        virtual
      >
        {children.slice(1, children.length - 1)}
      </Swiper>
      {children[children.length - 1]}
    </SliderContext.Provider>
  );
}

function SliderPagination() {
  const { paginationId } = useContext(SliderContext);
  return <div id={paginationId} className='static flex justify-center gap-2'></div>;
}

function SliderNavigation() {
  const {
    navigationIds: { prev, next },
  } = useContext(SliderContext);
  return (
    <div className='hidden gap-3 md:flex'>
      <button id={prev} className='slider-button'>
        <IoMdArrowBack />
      </button>
      <button id={next} className='slider-button'>
        <IoMdArrowForward />
      </button>
    </div>
  );
}

Slider.Slide = SwiperSlide;
Slider.Pagination = SliderPagination;
Slider.Navigation = SliderNavigation;
