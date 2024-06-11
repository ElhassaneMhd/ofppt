import EventsList from './EventsList';
import PageLayout from '@/layouts/PageLayout';

export default function Index({ events = [],formationYears }) {
  return (
    <PageLayout title='Events' count={events.length}>
      <EventsList events={events} formationYears={formationYears} />
    </PageLayout>
  );
}
