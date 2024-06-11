import { Head, Link, usePage } from '@inertiajs/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Profile from './Profile';
import Password from './Password';
import General from './General';
import About from './About';
import { capitalize } from '@/utils/helpers';
import { useEffect } from 'react';

const tabs = {
  profile: <Profile />,
  password: <Password />,
  general: <General />,
  about: <About />,
};

export default function Settings() {
  const { url } = usePage();
  const [parent] = useAutoAnimate({ duration: 300 });
  const currentTab = url.split('/admin/settings/')[1];

  useEffect(() => {
    if (!tabs[currentTab]) window.location.href = '/admin/settings/profile';
  }, [currentTab]);

  return (
    <>
      <Head title={`Settings | ${capitalize(currentTab || 'Profile')}`} />

      <div className='relative flex h-full w-full flex-col gap-5 overflow-hidden border-border bg-background-primary'>
        <div className='relative flex flex-col-reverse justify-between gap-3 border-b-2 border-border pb-3 mobile:flex-row mobile:items-center'>
          <div className='flex items-center gap-8'>
            {Object.keys(tabs).map((tab) => (
              <Link
                key={tab}
                href={`/admin/settings/${tab}`}
                className={`group relative flex items-center gap-2 py-1.5 text-sm font-medium capitalize text-text-secondary transition-colors duration-300 hover:text-text-primary ${
                  currentTab === tab
                    ? 'after:absolute after:-bottom-3.5 after:h-0.5 after:w-full after:rounded-lg after:bg-primary'
                    : ''
                }`}
              >
                <span className='group-[.active]:text-text-primary'>{tab}</span>
              </Link>
            ))}
          </div>
        </div>
        <div
          className='flex flex-1 flex-col gap-3 overflow-auto transition-opacity duration-500'
          ref={parent}
        >
          {tabs[currentTab] || tabs['profile']}
        </div>
      </div>
    </>
  );
}
