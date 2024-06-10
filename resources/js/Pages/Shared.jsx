import { Switch } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';
import { formatDate, getIntervals } from '@/utils/helpers';

export function useOptions({ routeName, resourceName }) {
  const navigate = useNavigate();

  const columns = {
    id: {
      key: 'id',
      displayLabel: 'ID',
      visible: false,
      type: 'number',
    },
    visibility: {
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
                url: `${routeName}.multiple.${e.target.checked ? 'show' : 'hide'}`,
                method: 'post',
                data: { ids: [id] },
              })
            }
          />
        );
      },
    },
    title: {
      key: 'title',
      displayLabel: 'Title',
      visible: true,
      type: 'string',
      format: (val = '') => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`,
    },
    details: {
      key: 'details',
      displayLabel: 'Details',
      visible: true,
      type: 'string',
      format: (val = '') => `${val.slice(0, 30)}${val.slice(20).length ? '...' : ''}`,
    },
    tags: {
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
    },
    formationYear: {
      key: 'formationYear',
      displayLabel: 'Formation Year',
      visible: true,
      type: 'number',
    },
    createdAt: {
      key: 'created_at',
      displayLabel: 'Created At',
      visible: false,
      type: 'date',
      format: (val) => formatDate(val, true),
      filter: getIntervals('created_at', ['present', 'past']),
    },
    date: {
      key: 'date',
      displayLabel: 'Date',
      visible: true,
      type: 'date',
      format: (val) => formatDate(val, true),
      filter: getIntervals('date', ['present', 'past', 'future']),
    },
  };

  const options = {
    filters: {
      created_at: getIntervals('created_at', ['present', 'past']),
      date: getIntervals('date', ['present', 'past', 'future']),
    },
    selectedOptions: {
      actions: [
        {
          text: 'Toggle Visibility',
          color: 'green',
          onClick: (ids, onClose) => {
            navigate({ url: `${routeName}.multiple.show`, method: 'post', data: { ids } });
            onClose();
          },
        },
      ],

      deleteOptions: {
        resourceName,
        onConfirm: (ids) => navigate({ url: `${routeName}.multiple.delete`, method: 'post', data: { ids } }),
      },
    },
    layoutOptions: { actions: 'defaultActions' },
    downloadOptions: { csvFileName: routeName, pdfFileName: routeName },
    routeName,
    resourceName,
  };

  return { columns, options };
}
