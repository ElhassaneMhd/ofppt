import PageLayout from '@/layouts/Back_Office/PageLayout';
import SessionsListe from './SessionsList';

export default function Index({ sessions = [] }) {
    console.log(sessions);
  return (
    <PageLayout title='Sessions' count={sessions.length}>
      <SessionsListe sessions={sessions} />
    </PageLayout>
  );
}
