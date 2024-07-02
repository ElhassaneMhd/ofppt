import EventsList from './EventsList';
import PageLayout from '@/layouts/Back_Office/PageLayout';

export default function Index({ events = [] }) {
  return (
    <PageLayout title='Events' count={events.length}>
      <EventsList events={events}  />
    </PageLayout>
  );
}
