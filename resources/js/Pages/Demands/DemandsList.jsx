import { formatDate, getIntervals } from '@/utils/helpers';
import { TableLayout } from '@/layouts/TableLayout';
import { useNavigate } from '@/hooks/useNavigate';

export default function DemandsList({ demands }) {
  const navigate = useNavigate();
  return (
    <TableLayout
      data={demands}
      resourceName='Demand'
      routeName='demands'
      columns={[
        {
          key: 'id',
          displayLabel: 'ID',
          visible: true,
          type: 'number',
        },
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
          key: 'created_at',
          displayLabel: 'Sent Date',
          visible: true,
          type: 'date',
          format: (val) => formatDate(val, true),
          filter: getIntervals('created_at', ['present', 'past']),
        },
      ]}
      filters={{ created_at: getIntervals('created_at', ['present', 'past']) }}
      fieldsToSearch={['fullName', 'subject', 'message']}
      downloadOptions={{ csvFileName: 'Demands', pdfFileName: 'Demands' }}
      selectedOptions={{
        deleteOptions: {
          resourceName: 'demand',
          onConfirm: (ids) =>
            navigate({
              url: 'demands.multiple.delete',
              method: 'post',
              data: { ids },
            }),
        },
      }}
      layoutOptions={{ displayNewRecord: false, actions: (def) => [def.view, def.delete] }}
    />
  );
}
