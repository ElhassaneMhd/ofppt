import { TableLayout } from '@/layouts/Back_Office/TableLayout';
import { useOptions } from '../Shared';

export default function EventsList({ events , isTrashed}) {
  const { columns, options } = useOptions({ routeName: 'events', resourceName: 'Event',isTrashed });

  return (
    <TableLayout
      data={events}
      columns={[
        columns.id,
        ...(isTrashed ? [] : [columns.visibility]),
        columns.title,
        {
          key: 'location',
          displayLabel: 'Location',
          visible: true,
          type: 'string',
        },
        {
          key: 'duration',
          displayLabel: 'Duration',
          visible: true,
          type: 'number',
          format: (val) => `${val} days`,
        },
        {
          ...columns.date,
          displayLabel: 'Event Date',
        },
        columns.formationYear,
        {
          key: 'upcoming',
          displayLabel: 'Upcoming',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            if (isDownload) return val ? 'Yes' : 'No';
            return (
              <span
                className={`rounded-full px-5 py-1 text-xs font-medium text-white ${val === 'true' ? 'bg-green-600' : 'bg-red-500'}`}
              >
                {val === 'true' ? 'Yes' : 'No'}
              </span>
            );
          },
        },
        columns.createdAt,
      ]}
      fieldsToSearch={['title', 'details', 'location', 'publisher']}
      isTrashed={isTrashed}
      {...options}
    />
  );
}
