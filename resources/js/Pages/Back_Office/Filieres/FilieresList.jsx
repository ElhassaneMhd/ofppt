import { TableLayout } from '@/layouts/Back_Office/TableLayout';
import { useOptions } from '../Shared';
import { getFilter } from '@/utils/helpers';

export default function FilieresList({ filieres, sectors,formationYears,isTrashed }) {
  const { columns, options } = useOptions({ routeName: 'filieres', resourceName: 'Filiere',formationYears,isTrashed });

  return (
    <TableLayout
      data={filieres}
      columns={[
        columns.id,
        ...(isTrashed ? [] : [columns.visibility]),
        columns.title,
        {
          key: 'sector',
          displayLabel: 'Sector',
          visible: true,
          type: 'string',
          filter: true,
        },
        {
          key: 'max_stagiaires',
          displayLabel: 'Max Interns',
          visible: true,
          type: 'number',
        },
        columns.formationYear,
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'sector']}
      isTrashed={isTrashed}
      filters={{ ...options.filters, ...getFilter('sector',sectors)}}
    />
  );
}
