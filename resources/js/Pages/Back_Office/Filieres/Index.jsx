import PageLayout from '@/layouts/Back_Office/PageLayout';
import FilieresList from './FilieresList';

export default function Index({ filieres = [],sectors = [], }) {
  return (
    <PageLayout title="Filieres" count={filieres.length}>
      <FilieresList filieres={filieres} sectors={sectors}  />
    </PageLayout>
  );
}