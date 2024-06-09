import { formatDate, getIntervals } from '@/utils/helpers';
import { TableLayout } from '@/layouts/TableLayout';

export default function DemandsList({ demands }) {
  return (
    <TableLayout
      data={demands}
      resourceName='Email'
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
      fieldsToSearch={['firstName', 'lastName', 'email']}
      downloadOptions={{ csvFileName: 'Demands', pdfFileName: 'Demands' }}
      selectedOptions={{ deleteOptions: { resourceName: 'email', onConfirm: (ids) => console.log(ids) } }}
      layoutOptions={{ displayNewRecord: false, actions: (def) => [def.view, def.delete] }}
    />
  );
}
