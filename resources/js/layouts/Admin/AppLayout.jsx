import { useAutoAnimate } from '@formkit/auto-animate/react';
import Sidebar from '@/components/Sidebar';

import '@/styles/app.css';

export function AppLayout({ children }) {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className='flex size-full'>
      <Sidebar />
      <main
        className='ml-14 flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden bg-background-primary p-3 sm:px-5 md:ml-0'
        ref={parent}
      >
        {children}
      </main>
    </div>
  );
}
