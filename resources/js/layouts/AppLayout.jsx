import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Toaster } from 'sonner';
import Sidebar from '../components/Sidebar';
import { FaSpinner } from 'react-icons/fa';
import { useTheme } from '@/hooks';

import '@/styles/app.css';

export function AppLayout({ children }) {
  const { theme } = useTheme();
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <>
      <div className='flex size-full'>
        <Sidebar />
        <main
          className='ml-14 md:ml-0 flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden bg-background-primary p-3 sm:px-5'
          ref={parent}
        >
          {children}
        </main>
      </div>
      <Toaster
        icons={{
          loading: <FaSpinner className='animate-spin text-lg text-text-secondary' />,
        }}
        position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
        theme={theme}
        toastOptions={{
          className: 'sonner-toast',
          duration: 2000,
        }}
      />
    </>
  );
}
