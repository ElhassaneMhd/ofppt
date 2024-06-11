import { TableLayout } from '@/layouts/Admin/TableLayout';
import { useOptions } from '../Shared';

export default function DemandsList({ demands }) {
  const { columns, options } = useOptions({ routeName: 'demands', resourceName: 'Demand' });

  return (
    <TableLayout
      data={demands}
      columns={[
        columns.id,
        {
          key: 'fullName',
          displayLabel: 'Full Name',
          visible: true,
          type: 'string',
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'subject',
          displayLabel: 'Subject',
          visible: true,
          type: 'string',
          format: (val = '') => `${val.slice(0, 15)}${val.slice(10).length ? '...' : ''}`,
        },
        {
          key: 'message',
          displayLabel: 'Message',
          visible: true,
          type: 'string',
          format: (val = '') => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`,
        },
        {
          ...columns.createdAt,
          displayLabel: 'Sent Date',
          visible: true,
        },
      ]}
      {...options}
      fieldsToSearch={['fullName', 'subject', 'message']}
      selectedOptions={{ deleteOptions: options.selectedOptions.deleteOptions }}
      layoutOptions={{ displayNewRecord: false, actions: (def) => [def.view, def.delete], haveTrashed: false}}
    />
  );
}
