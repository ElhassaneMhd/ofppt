import { Button, Modal, SearchInput } from '@/components/ui';
import { useState } from 'react';
import { formatDate } from '@/utils/helpers';
import {
  IoTrashOutline,
  MdDriveFileRenameOutline,
  FaRegCircleXmark,
  FaRegCircleCheck,
  LuPlus,
  LuUpload,
  LiaUserPlusSolid,
  LiaUserMinusSolid,
  LiaUserEditSolid,
} from '@/components/ui/Icons';
import { Operations } from '@/components/shared/Operations/Operations';

export function ActivitiesList({ isOpen, activities, onClose }) {
  const [query, setQuery] = useState('');
  console.log(activities?.length);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={true}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Session activities</h1>
      <div>
        <div className='mb-4 flex items-center justify-between gap-5'>
          <div className='flex items-center gap-2'>
            <Operations.Sort />
            <Operations.Filter />
          </div>
          <Operations.Search />
        </div>
        <SearchInput placeholder='Search for activitie...' value={query} onChange={(q) => setQuery(q)} />
      </div>
      <Operations
        data={activities}
        sortOptions={[{ key: 'created_at', display: 'Activity Date', type: 'date' }]}
        defaultSortBy='created_at'
        defaultDirection='desc'
        filters={{
          action: [
            { value: 'Create', checked: false },
            { value: 'Update', checked: false },
            { value: 'Delete', checked: false },
            { value: 'Approve', checked: false },
            { value: 'Reject', checked: false },
            { value: 'Upload', checked: false },
          ],
        }}
        fieldsToSearch={['activity', 'object']}
        searchQueryKey='s'
        sortQueryKey='so'
        paginationKey='p'
        limitKey='p'
        directionQueryKey='d'
      >
        <Activities activities={activities} />
      </Operations>
      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button
          color='tertiary'
          onClick={() => {
            onClose();
            setQuery('');
          }}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
function Activities({ activities }) {
  return (
    <div className='mb-auto grid gap-4'>
      {activities?.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
function Activity({ activity: { action, activity, object, created_at, model }, style }) {
  const colors = {
    Create: 'bg-blue-500',
    Update: 'bg-yellow-500',
    Delete: 'bg-red-500',
    Approve: 'bg-green-600',
    Reject: 'bg-orange-600',
    Upload: 'bg-purple-500',
  };

  return (
    <div
      className='flex w-full flex-col items-center gap-5 rounded-md px-3 py-2 text-center transition-colors duration-200 hover:bg-background-secondary xs:flex-row xs:text-start'
      style={style}
    >
      <div className={`grid h-11 w-11 place-content-center rounded-full text-white sm:text-xl ${colors[action]}`}>
        {getIcon(action, model)}
      </div>
      <div className='flex-1 space-y-0.5'>
        <h5 className='text-sm font-medium capitalize text-text-primary'>{activity}</h5>
        <h6 className='text-wrap text-xs font-semibold text-text-secondary'>{object?.object || object}</h6>
        {action === 'Update' && ['Task', 'Project'].includes(model) && object.status && (
          <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold text-white`}>{object.status}</span>
        )}
      </div>
      <span className='rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary'>
        {formatDate(created_at, true)}
      </span>
    </div>
  );
}

const getIcon = (action, model) => {
  if (model === 'Profile') {
    return { Create: <LiaUserPlusSolid />, Update: <LiaUserEditSolid />, Delete: <LiaUserMinusSolid /> }[action];
  }
  if (model === 'Application') {
    return { Approve: <FaRegCircleCheck />, Reject: <FaRegCircleXmark />, Delete: <IoTrashOutline /> }[action];
  }
  if (model === 'File') return { Upload: <LuUpload />, Delete: <IoTrashOutline /> }[action];
  return { Create: <LuPlus />, Update: <MdDriveFileRenameOutline />, Delete: <IoTrashOutline /> }[action];
};
