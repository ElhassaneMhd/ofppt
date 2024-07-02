import PageLayout from '@/layouts/Front_End/PageLayout';
import FilieresList from './FilieresList';
import { Operations } from '@/components/shared/Operations/Operations';
import { getFilter } from '@/utils/helpers';

export default function Filieres({ filieres, sectors }) {
  return (
    <PageLayout title='Filieres' image='filieres'>
      <Operations
        data={filieres}
        sortOptions={[
          { key: 'date', display: 'Publication Date', type: 'date' },
          { key: 'title', display: 'Title', type: 'string' },
        ]}
        defaultSortBy='title'
        defaultDirection='desc'
        filters={{ ...getFilter('sector', sectors)}}
        defaultLayout='grid'
        fieldsToSearch={['title']}
      >
        <FilieresList  />
      </Operations>
    </PageLayout>
  );
}
