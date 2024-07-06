import { useState } from 'react';
import { Button, Switch } from '@/components/ui';
import { FaEdit } from '@/components/ui/Icons';
import Announcements from './Announcements';

export function AnnouncementsBanner({ getValue, setValue, announcements }) {
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
          checked={getValue('announcementBanner') === 'true'}
          onChange={(e) => setValue('announcementBanner', String(e.target.checked))}
        />
      </div>
      <Announcements isOpen={isOpen} setIsOpen={setIsOpen} announcements={announcements} />
    </>
  );
}
