import PageLayout from '@/layouts/Front_End/PageLayout';
import FilieresList from './FilieresList';

export default function Filieres({ filieres, sectors }) {
  return (
    <PageLayout title='Filieres' image='filieres'>
      <div className='space-y-8'>
        <FilieresList filieres={filieres} sectors={sectors} />
      </div>
    </PageLayout>
  );
}
