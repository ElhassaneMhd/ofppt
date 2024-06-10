import { formatDate, getIntervals } from '@/utils/helpers';
import { TableLayout } from '@/layouts/TableLayout';
import { Switch } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';

export default function EventsList({ events }) {
  const navigate = useNavigate();
  return (
    <TableLayout
      data={events}
      resourceName='Event'
      routeName='events'
      columns={[
        {
          key: 'visibility',
          displayLabel: 'Visibility',
          visible: true,
          unSortable: true,
          format: (val, id, isDownload) => {
            if (isDownload) return val === 'true' ? 'Public' : 'Private';
            return (
              <Switch
                checked={val === 'true'}
                onChange={(e) =>
                  navigate({
                    url: `demands.multiple.${e.target.checked ? 'show' : 'hide'}`,
                    method: 'post',
                    data: { ids: [id] },
                  })
                }
              />
            );
          },
        },
        {
          key: 'title',
          displayLabel: 'Title',
          visible: true,
          type: 'string',
          format: (val = '') => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`,
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
          format: (val) => `${val} days`,
        },
        {
          key: 'date',
          displayLabel: 'Date',
          visible: true,
          type: 'date',
          format: (val) => formatDate(val, true),
          filter: getIntervals('date', ['present', 'past', 'future']),
        },
        {
          key: 'upcoming',
          displayLabel: 'Upcoming',
          visible: true,
          type: 'string',
          format: (val, id, isDownload) => {
            if (isDownload) return val ? 'Yes' : 'No';
            return (
              <span
                className={`rounded-full px-5 py-1 text-xs font-medium text-white ${val === 'true' ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {val === 'true' ? 'Yes' : 'No'}
              </span>
            );
          },
        },
        renderTags,
      ]}
      filters={{ date: getIntervals('date', ['present', 'past', 'future']) }}
      fieldsToSearch={['fullName', 'subject', 'message']}
      downloadOptions={{ csvFileName: 'Events', pdfFileName: 'Events' }}
      selectedOptions={{ deleteOptions: { resourceName: 'email', onConfirm: (ids) => console.log(ids) } }}
      layoutOptions={{ actions: 'defaultActions' }}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const renderTags = {
  key: 'tags',
  displayLabel: 'Tags',
  visible: true,
  format: (val = [], id, isDownload) => {
    if (isDownload) return val?.join(', ');
    const tags = val?.filter((v) => v) || [];

    return (
      <div className='flex items-center gap-1'>
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className='rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary'
          >
            {tag}
          </span>
        ))}
        {tags.slice(3).length ? (
          <span className='rounded-full bg-background-secondary px-2 py-1 text-xs font-medium text-text-secondary'>
            +{tags.slice(3).length}
          </span>
        ) : null}
      </div>
    );
  },
  fn(a, b, direction) {
    return direction === 'asc' ? a?.tags.length - b?.tags.length : b?.tags.length - a?.tags.length;
  },
  type: 'custom',
};
