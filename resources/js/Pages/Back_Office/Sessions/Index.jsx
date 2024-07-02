import PageLayout from '@/layouts/Back_Office/PageLayout';

export default function Index({ sessions = [] }) {
  return (
    <PageLayout title='Articles' count={sessions.length}>
    </PageLayout>
  );
}
