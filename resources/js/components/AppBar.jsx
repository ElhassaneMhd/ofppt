import { useUser } from '@/hooks/useUser';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
// import { Notifications } from '../features/notifications/Notifications';

export default function AppBar() {
  return (
    <div className='flex items-center justify-between gap-8 px-6 py-3'>
      <UserInfo />
      <div className='flex gap-3'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        {/* <Notifications /> */}
      </div>
    </div>
  );
}

function UserInfo() {
  const { user } = useUser();
  const { fullName, role } = user || {};

  return (
    <div className='flex items-center gap-3'>
      <Avatar />
      <div>
        <h3 className='text-sm font-medium capitalize text-text-primary'>{fullName}</h3>
        <h4 className='text-xs capitalize text-text-tertiary'>{role?.replace('-', ' ')}</h4>
      </div>
    </div>
  );
}

function Avatar() {
  const { user } = useUser();

  const getFallback = (role, gender) => {
    if (['user', 'intern'].includes(role)) return gender === 'M' ? '/images/male.png' : '/images/female.png';
    if (['super-admin', 'admin', 'supervisor'].includes(role))
      return gender === 'M' ? '/images/male-admin.png' : '/images/female-admin.png';
  };

  return (
    <img
      className='rounded-full h-9 w-9 border border-border object-cover text-center text-xs text-text-tertiary'
      src={user?.avatar?.src || getFallback(user?.role || 'user', user?.gender)}
      alt='profile image'
    />
  );
}
