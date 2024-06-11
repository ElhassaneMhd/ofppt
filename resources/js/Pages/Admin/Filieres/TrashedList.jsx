import PageLayout from '@/layouts/Admin/PageLayout';
import FilieresList from './FilieresList';

export default function TrashedList({ data = [], additionalData = {} }) {
  const { sectors, formationYears } = additionalData;

  return (
    <PageLayout title='Trashed Filieres' count={data.length}>
      <FilieresList filieres={data} sectors={sectors} formationYears={formationYears} isTrashed={true} />
    </PageLayout>
  );
}
