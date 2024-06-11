import PageLayout from '@/layouts/Admin/PageLayout';
import DemandsList from './DemandsList';

export default function Index({ demands = [] }) {
  return (
    <PageLayout title='Demands' count={demands.length}>
      <DemandsList demands={demands} />
    </PageLayout>
  );
}
