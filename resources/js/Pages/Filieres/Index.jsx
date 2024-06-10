import PageLayout from '@/layouts/PageLayout';
import FilieresList from './FilieresList';

export default function Index({ filieres = [],sectors = [],formationYears }) {
  return (
    <PageLayout title="Filieres" count={filieres.length}>
      <FilieresList filieres={filieres} sectors={sectors} formationYears={formationYears} />
    </PageLayout>
  );
}