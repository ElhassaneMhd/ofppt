import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { Button, Switch, Modal, Status, DropDown } from '@/components/ui';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect, useState } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import {
  IoEllipsisHorizontalSharp,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  BsCalendar4Event,
} from '@/components/ui/Icons';
import { useConfirmationModal, useForm } from '@/hooks';
import { Overlay } from '@/components/ui/Modal';
import { useNavigate } from '@/hooks/useNavigate';

export function AnnouncementBanner({ getValue, setValue }) {
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
      <Announcements isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

const an = [
  {
    id: 1,
    content: "We're extending our free trial period to 60 days for all new sign-ups until the end of November!",
    visibility: 'false',
    created_at: '2023-10-01',
    startDate: '2023-10-01',
    endDate: '2023-11-30',
  },
  {
    id: 2,
    content: 'Get ready for our biggest sale of the year this December. Exclusive discounts on all products!',
    visibility: 'true',
    created_at: '2023-12-01',
    startDate: '2023-12-01',
    endDate: '2023-12-25',
  },
  {
    id: 3,
    content: "We're excited to announce the opening of our new office in downtown San Francisco!",
    visibility: 'true',
    created_at: '2023-11-15',
    startDate: '2023-11-15',
    endDate: '2023-12-15',
  },
  {
    id: 4,
    content: 'Join us for a webinar on the latest product updates and features on November 20th, 2023.',
    visibility: 'false',
    created_at: '2023-11-20',
    startDate: '2023-11-20',
    endDate: '2023-11-20',
  },
  {
    id: 5,
    content: 'Help us give back this holiday season. Participate in our charity event starting December 1st.',
    visibility: 'true',
    created_at: '2023-12-01',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
  },
];

function Announcements({ isOpen, setIsOpen, announcements = an }) {
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
                startDate: new Date().toISOString().split('T')[0],
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
          visibility : [
            {value : 'true', display : 'Visible',id : 'visible'},
            {value : 'false', display : 'Hidden' , id : 'hidden'}
          ]
        }}
        fieldsToSearch={['title', 'description']}
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
        onToggle={() => navigate({ url: `annonces.multiple.toggle`, method: 'post', data: { ids: [announcement.id] } })}
        onDelete={() =>
          openModal({
            message: 'Are you sure you want to delete this announcement',
            title: 'Delete Announcement',
            onConfirm: () => {
              navigate({ url: '', params: announcement.id, method: 'delete' });
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
        className='relative w-full flex-1 space-y-3 overflow-y-auto overflow-x-hidden pr-2'
        ref={announcements.length ? parent : null}
      >
        {render()}
      </div>
      <Operations.Pagination />
      <NewAnnouncement
        defaultValues={currentAnnouncement?.announcement}
        action={currentAnnouncement?.action}
        onSubmit={currentAnnouncement?.action === 'edit' ? () => navigate({}) : () => navigate({})}
        onClose={() => setCurrentAnnouncement({ action: null, announcement: null })}
      />
    </>
  );
}

function Announcement({ announcement: { content, visibility, startDate, endDate }, onEdit, onToggle, onDelete }) {
  return (
    <div className='flex w-full flex-col items-center gap-5 rounded-md px-3 py-2 text-center transition-colors duration-200 hover:bg-background-secondary xs:flex-row xs:text-start'>
      <div className='flex-1 space-y-1'>
        <h5 className='text-sm font-medium capitalize text-text-primary'>{content}</h5>
        <h6 className='flex items-center gap-2 text-wrap text-xs text-text-secondary'>
          <BsCalendar4Event />
          <span>
            {startDate} - {endDate}
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
        type: 'date',
      },
      {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
      },
      {
        name: 'visibility',
        customComponent: ({ getValue, setValue }) => (
          <div className='mt-2 flex items-center justify-between gap-3'>
            <label className='text-sm font-medium text-text-tertiary'>Visibility</label>
            <Switch
              checked={getValue('visibility') === 'true'}
              onChange={(e) => setValue('visibility', e.target.checked)}
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
          <Button onClick={handleSubmit} disabled={!isUpdated}>
            {action === 'edit' ? 'Update Announcement' : 'Create Announcement'}
          </Button>
        </div>
      </div>
    </>
  );
}
