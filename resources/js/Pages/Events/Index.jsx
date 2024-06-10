import { Heading } from '@/components/Heading';
import { Head } from '@inertiajs/react';
import EventsList from './EventsList';

export default function Index({ events = [] }) {
  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Heading count={events.length}>Events</Heading>
      <EventsList events={events} />
    </>
  );
}
