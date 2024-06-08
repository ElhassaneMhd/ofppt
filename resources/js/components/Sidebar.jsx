import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, usePage } from '@inertiajs/react';

import {
  RxDashboard,
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
  FiLogOut,
  IoSettingsOutline,
  IoBriefcaseOutline,
  IoMailOutline,
  GrUserAdmin,
  GrArticle,
  BsCalendar4Event,
  GoPeople,
} from './ui/Icons';

import { ROUTES } from '../utils/constants';
import { Button } from './ui';
import { useLogout, useUser } from '@/hooks/useUser';

const routesIcons = {
  dashboard: <RxDashboard />,
  filieres: <IoBriefcaseOutline />,
  articles: <GrArticle />,
  events: <BsCalendar4Event />,
  demands: <IoMailOutline />,
  users: <GoPeople />,
  roles: <GrUserAdmin />,
};

export default function Sidebar({ openSettings }) {
  const [isExpanded, setIsExpanded] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const { url } = usePage();

  //   const location = useLocation().pathname.split('/');

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
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 overflow-hidden bg-background-secondary pb-2 pt-3 transition-[width] duration-500 md:relative ${
        isExpanded ? 'w-full px-3 md:w-[250px]' : 'w-14 px-2'
      }`}
    >
      <div className='flex items-center justify-between'>
        <img
          src='/Logo.svg'
          alt='Logo'
          className={`object-contain transition-all duration-500 ${isExpanded ? 'w-20 scale-100' : 'w-0 scale-0'}`}
        />
        <Button
          shape='icon'
          className={`not-active self-center ${isExpanded ? '' : 'mx-auto'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <BsLayoutSidebarInset /> : <BsLayoutSidebarInsetReverse />}
        </Button>
      </div>
      <ul className={`relative space-y-1 overflow-y-auto overflow-x-hidden ${isExpanded ? 'pr-2' : 'no_scrollbar'}`}>
        {ROUTES[user?.role]
          ?.filter((r) => !r.includes('/'))
          .map((route) => (
            <li key={route}>
              <Link href={route} className={`sidebar-element group ${url.slice(1) === route ? 'active' : ''}`}>
                {routesIcons[route]}
                <span className={spanClass}>
                  {t(`app.sidebar.${route}`)}
                  {/* {route} */}
                </span>
              </Link>
            </li>
          ))}
      </ul>

      <div className='mt-auto'>
        <button className='sidebar-element group w-full' onClick={openSettings}>
          <IoSettingsOutline />
          <span className={spanClass}>{t('app.sidebar.settings')}</span>
        </button>
        <button className='sidebar-element group w-full' onClick={logout}>
          <FiLogOut />
          <span className={spanClass}>{isLoggingOut ? 'Logging Out...' : t('app.sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
