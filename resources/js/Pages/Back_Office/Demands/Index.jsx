import PageLayout from '@/layouts/Back_Office/PageLayout';
import DemandsList from './DemandsList';

export default function Index({ demands = [] }) {
  return (
    <PageLayout title='Demands' count={demands.length}>
      <DemandsList demands={demands} />
    </PageLayout>
  );
}
