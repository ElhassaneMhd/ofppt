import { Modal, Status } from '@/components/ui';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { formatDate } from '@/utils/helpers';
import {
  IoTrashOutline,
  MdDriveFileRenameOutline,
  LuPlus,
  LiaUserPlusSolid,
  LiaUserMinusSolid,
  LiaUserEditSolid,
  MdOutlineSettingsBackupRestore,
} from '@/components/ui/Icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Session({ isOpen, onClose, activities }) {
  return (
    <Modal
      isOpen={isOpen}
      className='relative overflow-auto p-3 sm:p-5 md:h-[500px] md:w-[700px] md:border'
      onClose={onClose}
      closeButton={false}
    >
      <div className='mb-5 flex items-center justify-between gap-3 pt-7 md:pt-0'>
        <h1 className='mobile::text-xl flex items-center gap-2 text-lg font-bold text-text-primary'>
          Activities
          <span className='count text-xs'>{activities?.length}</span>
        </h1>
      </div>
      <Operations
        data={activities || []}
        sortOptions={[{ key: 'created_at', display: 'Activity Date', type: 'date' }]}
        defaultSortBy='created_at'
        defaultDirection='desc'
        filters={{
          action: ['Create', 'Update', 'Delete', 'Force Delete', 'Restore'].map((value) => ({
            value,
            checked: false,
            id: value,
          })),
        }}
        fieldsToSearch={['activity', 'object']}
        searchQueryKey='s'
        sortQueryKey='so'
        paginationKey='p'
        limitKey='p'
        directionQueryKey='d'
      >
        <ActivitiesList />
      </Operations>
    </Modal>
  );
}

function ActivitiesList() {
  const { data: activities, initialData, query, appliedFiltersNumber, page, totalPages } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (initialData.length === 0 && !query && !appliedFiltersNumber('all')) {
      return (
        <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
          <img src='/SVG/no-applications.svg' alt='' className='w-[140px]' />
          <div className='space-y-2 text-center'>
            <h2 className='font-medium text-text-primary'>This sessions has no activities yet</h2>
            <p className='text-sm text-text-secondary'>Activities will be displayed here once they are available.</p>
          </div>
        </div>
      );
    }
    if (page > totalPages && !query && !appliedFiltersNumber('all')) return <Status status='pageNotFound' />;
    if (activities.length === 0 && (query || appliedFiltersNumber('all'))) {
      return (
        <Status
          status='noResults'
          heading='No applications found'
          message='Try changing your search query or filters'
        />
      );
    }
    return activities?.map((activity) => <Activity key={activity.id} activity={activity} />);
  };

  return (
    <>
      <div className='mb-4 flex items-center justify-between gap-5'>
        <div className='flex items-center gap-2'>
          <Operations.Sort />
          <Operations.Filter />
        </div>
        <Operations.Search />
      </div>
      <div
        className='relative w-full flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-2'
        ref={activities.length ? parent : null}
      >
        {render()}
      </div>
      <Operations.Pagination onlyButtons={true} />
    </>
  );
}

function Activity({ activity: { action, activity, object, created_at, model }, style }) {
  const colors = {
    Create: 'bg-blue-500',
    Update: 'bg-yellow-500',
    Delete: 'bg-red-500',
    'Force Delete': 'bg-red-700',
    Restore: 'bg-green-600',
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
      </div>
      <span className='rounded-md bg-background-tertiary px-2 py-1 text-xs font-medium text-text-secondary'>
        {formatDate(created_at, true)}
      </span>
    </div>
  );
}

const getIcon = (action, model) => {

  return {
    Create: model === 'User' ? <LiaUserPlusSolid /> : <LuPlus />,
    Update: model === 'User' ? <LiaUserEditSolid /> : <MdDriveFileRenameOutline />,
    Delete: model === 'User' ? <LiaUserMinusSolid /> : <IoTrashOutline />,
    'Force Delete': <IoTrashOutline />,
    Restore: model === 'User' ? <MdOutlineSettingsBackupRestore />: <MdOutlineSettingsBackupRestore />,
  }[action];
};
