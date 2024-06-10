import PageLayout from '@/layouts/PageLayout';
import FilieresList from './FilieresList';

export default function Index({ filieres = [] }) {
  return (
    <PageLayout title="Filieres" count={filieres.length}>
      <FilieresList filieres={filieres} />
    </PageLayout>
  );
}