import { TableLayout } from '@/layouts/TableLayout';
import { useOptions } from '../Shared';

export default function FilieresList({ filieres, sectors }) {
  const { columns, options } = useOptions({ routeName: 'filieres', resourceName: 'Filiere' });

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
          filter: { sector: sectors.map((s) => ({ value: s, checked: false })) },
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
      filters={{ ...options.filters, sector: sectors.map((s) => ({ value: s, checked: false })) }}
    />
  );
}
