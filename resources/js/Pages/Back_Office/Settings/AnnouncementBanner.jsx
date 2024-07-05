import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DateTime } from 'luxon';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { Button, Switch, Modal, Status, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  BsCalendar4Event,
  FaPlus,
  FaEdit
} from '@/components/ui/Icons';
import { useConfirmationModal, useForm } from '@/hooks';
import { Overlay } from '@/components/ui/Modal';
import { useNavigate } from '@/hooks/useNavigate';
import { formatDate, getIntervals } from '@/utils/helpers';

export function AnnouncementBanner({ getValue, setValue, announcements }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-start gap-5'>
            <h4 className='font-bold text-text-secondary'>Announcement Banner</h4>
            <Button size='small' color='tertiary' onClick={() => setIsOpen(true)}>
              <FaEdit />
            </Button>
          </div>
          <p className='mt-2 text-xs text-text-tertiary'>
            This banner will be displayed on the homepage of the website.
          </p>
        </div>
        <Switch
          checked={getValue('announcementBanner')}
          onChange={(e) => setValue('announcementBanner', e.target.checked)}
        />
      </div>
      <Announcements isOpen={isOpen} setIsOpen={setIsOpen} announcements={announcements} />
    </>
  );
}

function Announcements({ isOpen, setIsOpen, announcements }) {
  const [currentAnnouncement, setCurrentAnnouncement] = useState({ action: null, announcement: null });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      closeButton={false}
      className='relative overflow-y-auto p-3 sm:p-5 md:h-[550px] md:w-[800px] md:border'
    >
      <div className='mb-5 flex items-center justify-between gap-3 pt-7 md:pt-0'>
        <h1 className='flex items-center gap-4 text-lg font-bold text-text-primary mobile:text-2xl'>
          Announcements
          <span className='count text-sm'>{announcements?.length}</span>
        </h1>
        <Button
          size='small'
          display='with-icon'
          onClick={() => {
            setCurrentAnnouncement({
              action: 'add',
              announcement: {
                content: '',
                startDate: DateTime.now().toFormat('yyyy-LL-dd\'T\'HH:mm'),
                endDate: '',
                visibility: 'true',
              },
            });
          }}
        >
          <FaPlus />
          New Announcement
        </Button>
      </div>
      <Operations
        data={announcements || []}
        defaultSortBy='created_at'
        defaultDirection='desc'
        sortOptions={[
          { key: 'created_at', display: 'Creation Date', type: 'date' },
          { key: 'startDate', display: 'Start Date', type: 'date' },
          { key: 'endDate', display: 'End Date', type: 'date' },
        ]}
        filters={{
          visibility: [
            { value: 'true', display: 'Visible', id: 'visible' },
            { value: 'false', display: 'Hidden', id: 'hidden' },
          ],
          startDate: getIntervals('startDate', ['present', 'past', 'future']),
          endDate: getIntervals('endDate', ['present', 'past', 'future']),
        }}
        fieldsToSearch={['content']}
      >
        <AnnouncementsList currentAnnouncement={currentAnnouncement} setCurrentAnnouncement={setCurrentAnnouncement} />
      </Operations>
    </Modal>
  );
}

function AnnouncementsList({ currentAnnouncement, setCurrentAnnouncement }) {
  const {
    data: announcements,
    initialData,
    query,
    appliedFiltersNumber,
    page,
    totalPages,
    onPaginate,
  } = useOperations();
  const [parent] = useAutoAnimate({ duration: 400 });
  const { openModal } = useConfirmationModal();
  const { navigate } = useNavigate();

  const render = () => {
    if (initialData.length === 0 && !query && !appliedFiltersNumber('all')) {
      return (
        <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
          <img src='/images/empty.svg' alt='' className='w-[100px]' />
          <div className='space-y-2 text-center'>
            <h2 className='font-medium text-text-primary'>No announcements available</h2>
            <p className='text-sm text-text-secondary'>Announcements will be displayed here once they are available.</p>
          </div>
        </div>
      );
    }
    if (page > totalPages && !query && !appliedFiltersNumber('all')) return <Status status='pageNotFound' />;
    if (announcements.length === 0 && (query || appliedFiltersNumber('all'))) {
      return (
        <Status
          status='noResults'
          heading='No announcements found'
          message='Try changing your search query or filters'
        />
      );
    }
    return announcements?.map((announcement) => (
      <Announcement
        key={announcement.id}
        announcement={announcement}
        onEdit={() => setCurrentAnnouncement({ action: 'edit', announcement })}
        onToggle={() =>
          navigate({ url: `announces.multiple.toggle`, method: 'post', data: { ids: [announcement.id] } })
        }
        onDelete={() =>
          openModal({
            message: 'Are you sure you want to delete this announcement',
            title: 'Delete Announcement',
            onConfirm: () => {
              navigate({ url: 'announces.destroy', params: announcement.id, method: 'delete' });
              announcements?.length === 1 && onPaginate(page - 1);
            },
          })
        }
      />
    ));
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
        className='relative w-full flex-1 space-y-3 mb-2 overflow-y-auto overflow-x-hidden pr-2'
        ref={announcements.length ? parent : null}
      >
        {render()}
      </div>
      <Operations.Pagination />
      <NewAnnouncement
        defaultValues={currentAnnouncement?.announcement}
        action={currentAnnouncement?.action}
        onSubmit={
          currentAnnouncement?.action === 'edit'
            ? (data) => navigate({ url: 'announces.update', method: 'put', params: data.id, data })
            : (data) => navigate({ url: 'announces.store', method: 'post', data })
        }
        onClose={() => setCurrentAnnouncement({ action: null, announcement: null })}
      />
    </>
  );
}

function Announcement({ announcement: { content, visibility, startDate, endDate }, onEdit, onToggle, onDelete }) {
  return (
    <div className='flex w-full  items-center gap-5 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-background-secondary flex-row '>
      <div className={`flex-1 space-y-1 ${visibility === 'false' ? 'opacity-50' : ''}`}>
        <h5 className='text-sm font-medium capitalize text-text-primary'>{content}</h5>
        <h6 className='flex items-center gap-2 text-wrap text-xs text-text-secondary'>
          <BsCalendar4Event />
          <span>
            {formatDate(startDate,true)} - {formatDate(endDate,true)}
          </span>
        </h6>
      </div>
      <DropDown
        toggler={
          <Button shape='icon' size='small'>
            <IoEllipsisHorizontalSharp />
          </Button>
        }
      >
        <DropDown.Option onClick={onEdit}>
          <MdDriveFileRenameOutline />
          Edit
        </DropDown.Option>
        <DropDown.Option onClick={onToggle}>
          {visibility === 'true' ? <IoEyeOffOutline /> : <IoEyeOutline />}
          {visibility === 'true' ? 'Hide' : 'Show'}
        </DropDown.Option>
        <DropDown.Option onClick={onDelete}>
          <IoTrashOutline />
          Delete
        </DropDown.Option>
      </DropDown>
    </div>
  );
}

function NewAnnouncement({ defaultValues, action, onSubmit, onClose }) {
  const {
    Form,
    options: { isUpdated, handleSubmit, updateValues },
  } = useForm({
    defaultValues,
    fields: [
      {
        name: 'content',
        label: 'Content',
        type: 'textarea',
        rows: 4,
      },
      {
        name: 'startDate',
        label: 'Start Date',
        type: 'datetime-local',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'datetime-local',
      },
      {
        name: 'visibility',
        customComponent: ({ getValue, setValue }) => (
          <div className='mt-2 flex items-center justify-between gap-3'>
            <label className='text-sm font-medium text-text-tertiary'>Visibility</label>
            <Switch
              checked={getValue('visibility') === 'true'}
              onChange={(e) => setValue('visibility', String(e.target.checked))}
            />
          </div>
        ),
      },
    ],
    onSubmit,
  });

  useEffect(() => {
    if (defaultValues) updateValues(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const isOpen = Boolean(defaultValues);

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} closeOnBlur={true} className='z-30' />
      <div
        className={`absolute top-0 z-40 flex h-full w-full flex-col items-start gap-5 border-l border-border bg-background-primary p-4 transition-[right] duration-500 mobile:w-fit ${
          isOpen ? 'right-0' : '-right-full'
        }`}
      >
        {Form}
        <div className='mt-auto grid w-full gap-3 xs:grid-cols-2'>
          <Button color='tertiary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(onClose)} disabled={!isUpdated}>
            {action === 'edit' ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </div>
      </div>
    </>
  );
}
