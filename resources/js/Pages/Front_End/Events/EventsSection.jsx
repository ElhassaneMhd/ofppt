import Event from './Event';
import Section from '@/components/Front_End/Section';
import Slider from '@/components/Front_End/Slider';

const ids = {
  pagination: 'events-pagination',
  prev: 'events-button-prev',
  next: 'events-button-next',
};

export default function EventsSection({ events }) {
  return (
    <Section className='bg-background-secondary'>
      <Slider
        defaultSlidesPerView={1}
        navigationIds={{
          prev: ids.prev,
          next: ids.next,
        }}
        paginationId={ids.pagination}
      >
        <div className='mt-3 flex items-end justify-center md:justify-between'>
          <div className='text-center md:text-start'>
            <h2 className='text-4xl font-bold tracking-widest text-text-primary sm:text-5xl'>Upcoming Events</h2>
          </div>
          <Slider.Navigation />
        </div>

        {events.map((event) => (
          <Slider.Slide key={event.id}>
            <Event event={event} />
          </Slider.Slide>
        ))}

        <Slider.Pagination />
      </Slider>
    </Section>
  );
}
