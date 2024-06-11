import PageLayout from '@/layouts/Admin/PageLayout';
import EventsList from './EventsList';

export default function TrashedList({ data = [], additionalData = {} }) {
  const {  formationYears } = additionalData;

  return (
    <PageLayout title='Trashed Events' count={data.length}>
      <EventsList events={data} formationYears={formationYears} isTrashed={true} />
    </PageLayout>
  );
}
