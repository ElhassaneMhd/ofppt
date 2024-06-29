import { Head, Link, usePage } from '@inertiajs/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { capitalize } from '@/utils/helpers';
import { Heading } from '@/components/Back_Office/Heading';
import { useIndicator } from '@/hooks/useIndicator';

export default function Settings({ children }) {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { props } = usePage();
  const { ref, indicator } = useIndicator('/admin/settings/');

  const currentTab = usePage().url.split('/admin/settings/')[1];

  return (
    <>
      <Head title={`Settings | ${capitalize(currentTab || 'Profile')}`} />

      <div className='relative flex h-full w-full flex-col gap-6 overflow-hidden border-border bg-background-primary'>
        <Heading>Settings</Heading>
        <div className='relative flex flex-col-reverse justify-between gap-3 border-b-2 border-border pb-3 max-xs:overflow-auto mobile:flex-row mobile:items-center'>
          <div className='flex items-center gap-8' ref={ref}>
            {indicator}
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
