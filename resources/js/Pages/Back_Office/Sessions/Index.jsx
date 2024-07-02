import PageLayout from '@/layouts/Back_Office/PageLayout';
import SessionsList from './SessionsList';

export default function Index({ sessions = [] }) {
  return (
    <PageLayout title='Sessions' count={sessions.length}>
      <SessionsList sessions={sessions} />
    </PageLayout>
  );
}
