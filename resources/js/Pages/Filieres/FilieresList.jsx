import { TableLayout } from '@/layouts/TableLayout';
import { useOptions } from '../Shared';
import { getFilter } from '@/utils/helpers';

export default function FilieresList({ filieres, sectors,formationYears }) {
  const { columns, options } = useOptions({ routeName: 'filieres', resourceName: 'Filiere',formationYears });

  return (
    <TableLayout
      data={filieres}
      columns={[
        columns.id,
        columns.visibility,
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
        columns.tags,
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'sector']}
      filters={{ ...options.filters, ...getFilter('Sector',sectors)}}
    />
  );
}
