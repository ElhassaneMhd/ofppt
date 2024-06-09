import { formatDate, getIntervals } from '@/utils/helpers';
import { TableLayout } from '@/layouts/TableLayout';

export default function EventsList({ events }) {
  return (
    <TableLayout
      data={events}
      resourceName='Event'
      routeName='events'
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
          key: 'content',
          displayLabel: 'Content',
          visible: true,
          type: 'string',
          format: (val = '') => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`,
        },
        {
          key: 'location',
          displayLabel: 'Location',
          visible: true,
          type: 'string',
        },
        {
          key: 'publisher',
          displayLabel: 'Publisher',
          visible: true,
          type: 'string',
        },
        {
          key: 'duration',
          displayLabel: 'Duration',
          visible: true,
          type: 'number',
        },
        {
          key: 'date',
          displayLabel: 'Date',
          visible: true,
          type: 'date',
          format: (val) => formatDate(val, true),
          filter: getIntervals('created_at', ['present', 'past', 'future']),
        },
        {
          key: 'upcoming',
          displayLabel: 'Upcoming',
          visible: true,
          type: 'string',
          format: (val) => (val ? 'Yes' : 'No'),
        },
        {
          key: 'tags',
          displayLabel: 'Tags',
          visible: true,
          type: 'string',
          format: (val = '', id, isDownload) => {
            if (isDownload) return val;
            return val.split(',').map((tag) => (
              <span
                key={tag}
                className='mr-1 rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-gray-700'
              >
                {tag}
              </span>
            ));
          },
        },
      ]}
      filters={{ created_at: getIntervals('created_at', ['present', 'past']) }}
      fieldsToSearch={['fullName', 'subject', 'message']}
      downloadOptions={{ csvFileName: 'Events', pdfFileName: 'Events' }}
      selectedOptions={{ deleteOptions: { resourceName: 'email', onConfirm: (ids) => console.log(ids) } }}
      layoutOptions={{ displayNewRecord: false, actions: (def) => [def.view, def.delete] }}
    />
  );
}
