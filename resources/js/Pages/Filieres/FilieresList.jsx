import { formatDate, getIntervals } from '@/utils/helpers';
import { TableLayout } from '@/layouts/TableLayout';

export default function FilieresList({ filieres }) {
  return (
    <TableLayout
      data={filieres}
      resourceName='Filiere'
      routeName='filieres'
      columns={[
        {
          key: 'id',
          displayLabel: 'ID',
          visible: true,
          type: 'number',
        },
        {
          key: 'title',
          displayLabel: 'Title',
          visible: true,
          type: 'string',
        },
        {
          key: 'description',
          displayLabel: 'Description',
          visible: true,
          type: 'string',
        },
        {
          key: 'sector',
          displayLabel: 'Sector',
          visible: true,
          type: 'string',
        },
        {
          key: 'max_stagiaires',
          displayLabel: 'Max Interns',
          visible: true,
          type: 'number',
        },
        {
          key: 'tags',
          displayLabel: 'Tags',
          visible: true,
          type: 'string',
          format: (val = [], id, isDownload) => {
            if (isDownload) return val?.join(', ');
            return (
              <div className='flex flex-wrap items-center gap-1'>
                {val?.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            );
          },
        },
      ]}
      filters={{}}
      fieldsToSearch={['firstName', 'lastName', 'email']}
      downloadOptions={{ csvFileName: 'Filieres', pdfFileName: 'Filieres' }}
      selectedOptions={{ deleteOptions: { resourceName: 'email', onConfirm: (ids) => console.log(ids) } }}
      layoutOptions={{ displayNewRecord: false, actions: (def) => [def.view, def.delete] }}
    />
  );
}
