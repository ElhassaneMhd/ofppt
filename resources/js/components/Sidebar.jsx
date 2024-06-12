import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, usePage } from '@inertiajs/react';

import {
  RxDashboard,
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
  IoBriefcaseOutline,
  IoMailOutline,
  GrUserAdmin,
  GrArticle,
  BsCalendar4Event,
  GoPeople,
  PiMoonStars,
  PiSunDim,
} from './ui/Icons';

import { ROUTES } from '../utils/constants';
import { Button } from './ui';
import { useUser } from '@/hooks/useUser';
import { DropDownProfile } from './DropDownProfile';
import { useTheme } from '@/hooks';
import { LanguageSwitcher } from './LanguageSwitcher';

const routesIcons = {
  dashboard: <RxDashboard />,
  filieres: <IoBriefcaseOutline />,
  articles: <GrArticle />,
  events: <BsCalendar4Event />,
  demands: <IoMailOutline />,
  users: <GoPeople />,
  roles: <GrUserAdmin />,
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const { t } = useTranslation();
  const { url, props } = usePage();
  const { user } = useUser();

  const spanClass = `transition-transform origin-left duration-500 text-sm text-text-secondary ${
    isExpanded ? 'md:scale-100' : 'scale-0'
  }`;

  useEffect(() => {
    const onresize = () => setIsExpanded(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', onresize);

    return () => window.removeEventListener('resize', onresize);
  }, [isExpanded]);

  return (
    <aside
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 bg-background-secondary pb-2 pt-3 transition-[width] duration-500 md:relative ${
        isExpanded ? 'w-full px-3 md:w-[280px]' : 'w-14 px-2'
      }`}
    >
      <div className='z-20 flex items-center justify-between'>
        <div className={isExpanded ? 'w-20 flex-1 scale-100' : 'h-0 w-0 scale-0'}>
          <DropDownProfile />
        </div>
        <Button
          shape='icon'
          className={`not-active self-center ${isExpanded ? '' : 'mx-auto'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <BsLayoutSidebarInset /> : <BsLayoutSidebarInsetReverse />}
        </Button>
      </div>
      <ul className={`relative space-y-1 overflow-y-auto overflow-x-hidden ${isExpanded ? 'pr-2' : 'no_scrollbar'}`}>
        {ROUTES[user?.role]?.map((route) => (
          <li key={route}>
            <Link
              href={`/admin/${route}`}
              className={`sidebar-element group ${url.split('/admin/')[1]?.startsWith(route) ? 'active' : ''}`}
            >
              {routesIcons[route]}
              <span className={spanClass}>{t(`app.sidebar.${route}`)}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mt-auto'>
        <div className={`flex items-center gap-3 ${isExpanded ? '' : 'flex-col'}`}>
          <ThemeToggler />
          <LanguageSwitcher layout={isExpanded ? 'long' : ''} iconDirection='up' size={isExpanded ? 'small' : ''} />
        </div>
        <div className='text-xs pt-1 px-3 text-center w-full font-medium capitalize text-text-tertiary'>{props.year.year}</div>
      </div>
    </aside>
  );
}

function ThemeToggler() {
  const { theme, changeTheme } = useTheme();

  return (
    <button
      onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
      className='dropdown-option text-xs'
      id='themeToggler'
    >
      <div className={theme === 'dark' ? 'translate-y-9' : 'translate-y-0'}>
        <PiMoonStars size={18} />
        <span>Dark Mode</span>
      </div>
      <div className={theme === 'light' ? 'translate-y-9' : 'translate-y-0'}>
        <PiSunDim size={18} />
        <span>Light Mode</span>
      </div>
    </button>
  );
}
