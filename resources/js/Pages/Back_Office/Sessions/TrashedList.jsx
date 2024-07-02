import PageLayout from '@/layouts/Back_Office/PageLayout';
import SessionsList from './SessionsList';

export default function TrashedList({ data = [] }) {
  return (
    <PageLayout title='Trashed Sessions' count={data.length}>
      <SessionsList sessions={data} isTrashed={true} />
    </PageLayout>
  );
}
