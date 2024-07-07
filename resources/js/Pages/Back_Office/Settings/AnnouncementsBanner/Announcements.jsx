import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DateTime } from 'luxon';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  BsCalendar4Event,
  MdOutlinePreview,
  FaPlus,
} from '@/components/ui/Icons';
import { Operations } from '@/components/shared/Operations/Operations';
import { Modal, Button, DropDown, Status } from '@/components/ui';
import { useOperations } from '@/components/shared/Operations/useOperations';
import NewAnnouncement, { Announcement as AnnouncementPreview } from './NewAnnouncement';
import { formatDate, getIntervals } from '@/utils/helpers';
import { useConfirmationModal, useNavigate } from '@/hooks';
import { DEFAULT_STYLES } from '@/utils/constants';

export default function Announcements({ isOpen, setIsOpen, announcements }) {
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
                startDate: DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm"),
                endDate: '',
                visibility: 'true',
                styles: DEFAULT_STYLES,
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
  const [previewed, setPreviewed] = useState(null);
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
        onToggle={() => {
          navigate({ url: `announces.multiple.toggle`, method: 'post', data: { ids: [announcement.id] } });
        }}
        onDelete={() => {
          openModal({
            message: 'Are you sure you want to delete this announcement',
            title: 'Delete Announcement',
            onConfirm: () => {
              navigate({ url: 'announces.destroy', params: announcement.id, method: 'delete' });
              announcements?.length === 1 && onPaginate(page - 1);
            },
          });
        }}
        onPreview={() => setPreviewed(announcement)}
      />
    ));
  };

  useEffect(() => {
    const id = setTimeout(() => setPreviewed(null), 5000);
    return () => clearTimeout(id);
  });

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
        className='relative mb-2 w-full flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-2'
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
            ? (data) =>
                navigate({
                  url: 'announces.update',
                  method: 'put',
                  params: data.id,
                  data: { ...data, styles: JSON.stringify(data.styles) },
                })
            : (data) =>
                navigate({
                  url: 'announces.store',
                  method: 'post',
                  data: { ...data, styles: JSON.stringify(data.styles) },
                })
        }
        onClose={() => setCurrentAnnouncement({ action: null, announcement: null })}
      />

      {createPortal(
        <AnnouncementPreview
          announcement={previewed || {}}
          preview={true}
          previewVisible={previewed !== null}
          onClose={() => setPreviewed(null)}
        />,
        document.getElementById('app')
      )}
    </>
  );
}

function Announcement({
  announcement: { content, visibility, startDate, endDate },
  onEdit,
  onToggle,
  onDelete,
  onPreview,
}) {
  const cleanContent = new DOMParser().parseFromString(content, 'text/html').body.textContent;

  return (
    <div className='flex w-full flex-row items-center gap-5 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-background-secondary'>
      <div className={`flex-1 space-y-1 ${visibility === 'false' ? 'opacity-50' : ''}`}>
        <p className='text-sm capitalize text-text-primary'>{cleanContent}</p>
        <h6 className='flex items-center gap-2 text-wrap text-xs text-text-secondary'>
          <BsCalendar4Event />
          <span>
            {formatDate(startDate, true)} - {formatDate(endDate, true)}
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
        <DropDown.Option onClick={onPreview}>
          <MdOutlinePreview />
          Preview
        </DropDown.Option>
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
