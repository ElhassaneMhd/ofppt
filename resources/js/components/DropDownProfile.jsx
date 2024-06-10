import { FiLogOut, IoSettingsOutline, PiTrashLight } from '@/components/ui/Icons';
import { IoChevronDownOutline } from 'react-icons/io5';
import { DropDown } from './ui';
import { useNavigate } from '@/hooks/useNavigate';
import { useConfirmationModal } from '@/hooks';
import { usePage } from '@inertiajs/react';

export function DropDownProfile({ setIsSettingsOpen, setIsTrashOpen }) {
  const navigate = useNavigate();
  const { openModal } = useConfirmationModal();

  return (
    <DropDown
      toggler={<Profile />}
      togglerClassName='flex w-full items-center justify-between gap-8 pr-3'
      options={{ className: 'w-[250px] rounded-xl', shouldCloseOnClick: false }}
    >
      <DropDown.Option display='with-icon' onClick={() => setIsSettingsOpen(true)}>
        <IoSettingsOutline className='text-text-tertiary' />
        <span>Settings</span>
      </DropDown.Option>

      <DropDown.Option display='with-icon' onClick={() => setIsTrashOpen((prev) => !prev)}>
        <PiTrashLight className='text-text-tertiary' />
        <span>Trash</span>
      </DropDown.Option>
      <DropDown.Divider />
      <DropDown.Option
        onClick={() => {
          openModal({
            message: 'You are about to log out. Do you wish to proceed?',
            title: 'Logout',
            confirmText: 'Logout',
            onConfirm: () => navigate({ url: 'logout', method: 'POST' }),
          });
        }}
      >
        <FiLogOut size={22} /> <span>Sign Out</span>
      </DropDown.Option>
    </DropDown>
  );
}

function Profile() {
  const { props } = usePage();
  const { firstName, lastName, role = 'super-admin' } = props.user || {};

  const getFallback = (role, gender = 'M') => {
    if (['user', 'intern'].includes(role)) return gender === 'M' ? '/images/male.png' : '/images/female.png';
    if (['super-admin', 'admin', 'supervisor'].includes(role))
      return gender === 'M' ? '/images/male-admin.png' : '/images/female-admin.png';
  };

  return (
    <div className='transition-color flex flex-1 items-center justify-between gap-3 rounded-md px-1.5 py-1 duration-200 hover:bg-background-tertiary'>
      <div className='flex items-center gap-3'>
        <img
          className='h-9 w-9 rounded-full border border-border object-cover text-center text-xs text-text-tertiary'
          src={getFallback(role || 'user')}
          alt='profile image'
        />
        <div className='flex flex-col text-start'>
          <span className='text-sm font-semibold text-text-primary'>{`${firstName} ${lastName}`}</span>
          <span className='text-xs font-medium capitalize text-text-tertiary'>{role?.replace('-', ' ')}</span>
        </div>
      </div>
      <IoChevronDownOutline className='text-text-secondary' />
    </div>
  );
}
