import Editor from '@/components/shared/Editor/Editor';
import { Button, DropDown, InputField, Switch } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';
import { formatDate, getIntervals } from '@/utils/helpers';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { PiCheckBold } from 'react-icons/pi';

// eslint-disable-next-line react-refresh/only-export-components
export function useOptions({ routeName, resourceName, formationYears = [] }) {
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
            onChange={() => navigate({ url: `${routeName}.multiple.toggle`, method: 'post', data: { ids: [id] } })}
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
      filter: formationYears.map(({ year }) => ({ value: year, checked: false,id : year })),
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
      formationYear: formationYears.map(({ year }) => ({ value: year, checked: false,id : year })),
    },
    selectedOptions: {
      actions: [
        {
          text: 'Toggle Visibility',
          color: 'green',
          onClick: (ids, onClose) => {
            navigate({ url: `${routeName}.multiple.toggle`, method: 'post', data: { ids } });
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

export function Tags({ getValue, setValue }) {
  const [currentTag, setCurrentTag] = useState('');
  const [parent] = useAutoAnimate({ duration: 300 });

  const tags = getValue('tags');

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-text-tertiary'>Tags</label>
      <div className='flex flex-wrap gap-3 rounded-lg border border-border bg-background-secondary p-2' ref={parent}>
        {tags?.map((tag) => (
          <div
            key={tag}
            className='relative rounded-md border border-border bg-background-tertiary px-2 py-1 text-center text-xs font-medium text-text-secondary'
          >
            <button
              className='absolute -right-1 -top-1.5 h-3 w-3 rounded-full bg-red-500 text-white'
              onClick={() =>
                setValue(
                  'tags',
                  tags?.filter((s) => s !== tag)
                )
              }
            >
              <HiMiniXMark />
            </button>
            <span>{tag}</span>
          </div>
        ))}
        <input
          type='text'
          placeholder='Add tag...'
          className='w-28 rounded-md border border-border bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary outline-none'
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !tags?.includes(e.target.value)) {
              setValue('tags', [...tags, e.target.value]);
              setCurrentTag('');
            }
          }}
        />
      </div>
    </div>
  );
}

export function DataDropDown({ type, data, getValue, setValue }) {
  const [newValue, setNewValue] = useState('');

  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium capitalize text-text-tertiary'>{type}</label>
      <DropDown
        toggler={
          <DropDown.Toggler>
            <span>{getValue(type) || `Select ${type}...`}</span>
          </DropDown.Toggler>
        }
        options={{ className: 'overflow-auto max-h-[300px] w-[230px]', shouldCloseOnClick: false }}
      >
        <DropDown.Title className='capitalize'>New {type}</DropDown.Title>
        <div className='mb-2 flex items-center gap-1'>
          <InputField
            placeholder={`Enter new ${type}...`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button
            shape='icon'
            className='h-full w-7 rounded-md border border-border'
            disabled={!newValue}
            onClick={() => {
              setValue(type, newValue);
              setNewValue('');
            }}
          >
            <PiCheckBold />
          </Button>
        </div>
        <DropDown.Title className='capitalize'>Previous {type}s</DropDown.Title>
        {data?.map((e) => (
          <DropDown.Option key={e} onClick={() => setValue(type, e)} isCurrent={e === getValue(type)}>
            {e}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
}

export function Details({ getValue, setValue, ...props }) {
  return (
    <div className='flex min-h-72 flex-1 flex-col gap-1.5'>
      <label className='text-sm font-medium capitalize text-text-tertiary'>Details</label>
      <Editor size='small' content={getValue('details')} onUpdate={(val) => setValue('details', val)} {...props} />
    </div>
  );
}
