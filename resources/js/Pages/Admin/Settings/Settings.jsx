import { Head, Link, usePage } from '@inertiajs/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { capitalize } from '@/utils/helpers';
import { useEffect, useRef, useState } from 'react';
import { Heading } from '@/components/Heading';

export default function Settings({ children }) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabContainerRef = useRef(null);
  const [parent] = useAutoAnimate({ duration: 300 });
  const {props} = usePage()


  const currentTab = usePage().url.split('/admin/settings/')[1];

  useEffect(() => {
    const activeTabElement = tabContainerRef.current?.querySelector(`[data-tab="${currentTab}"]`);
    if (activeTabElement) {
      const { offsetLeft: left, offsetWidth: width } = activeTabElement;
      setIndicatorStyle({ left, width });
    }
  }, [currentTab]);

  return (
    <>
      <Head title={`Settings | ${capitalize(currentTab || 'Profile')}`} />

      <div className='relative flex h-full w-full flex-col gap-6 overflow-hidden border-border bg-background-primary'>
        <Heading>Settings</Heading>
        <div className='relative flex flex-col-reverse justify-between gap-3 border-b-2 border-border pb-3 mobile:flex-row  max-xs:overflow-auto mobile:items-center'>
          <div className='flex items-center gap-8' ref={tabContainerRef}>
            <div
              className='absolute -bottom-0.5 h-0.5 rounded-lg bg-primary transition-all duration-300'
              style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px` }}
            ></div>
            {props.tabs?.map((tab) => (
              <Link
                key={tab}
                href={`/admin/settings/${tab}`}
                data-tab={tab}
                className='group flex items-center gap-2 py-1.5 text-sm font-medium capitalize text-text-secondary transition-colors duration-300 hover:text-text-primary'
              >
                <span className='group-[.active]:text-text-primary'>{tab}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-3 overflow-auto transition-opacity duration-500' ref={parent}>
          {children}
        </div>
      </div>
    </>
  );
}
