import { Operations } from '@/components/shared/Operations/Operations';
import PageLayout from '@/layouts/Front_End/PageLayout';
import EventsList from './EventsList';

export default function Events({ events }) {
  return (
    <PageLayout title='Events' image='events'>
      <Operations
        data={events?.map((e) => ({ ...e, status: e.upcoming === 'true' ? 'upcoming' : 'past' }))}
        sortOptions={[
          { key: 'date', display: 'Event Date', type: 'date' },
          { key: 'title', display: 'Title', type: 'string' },
          { key: 'duration', display: 'Duration', type: 'number' },
        ]}
        defaultSortBy='title'
        defaultDirection='desc'
        filters={{
          status: [
            { value: 'upcoming', checked: false, id: 'upcoming', display: 'Upcoming Events' },
            { value: 'past', checked: false, id: 'past', display: 'Past Events' },
          ],
        }}
        defaultLayout='grid'
        fieldsToSearch={['title', 'location']}
      >
        <EventsList />
      </Operations>
    </PageLayout>
  );
}
