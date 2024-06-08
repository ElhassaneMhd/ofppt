import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Sidebar from '../components/Sidebar';
// import Settings from "../features/settings/Settings";
import AppBar from '../components/AppBar';
import '@/styles/app.css';
import { Toaster } from 'sonner';
import { FaSpinner } from 'react-icons/fa';
import { useTheme } from '@/hooks';

export function AppLayout({ children }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useTheme();
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <>
      <div className='flex size-full'>
        <Sidebar openSettings={() => setIsSettingsOpen(true)} />
        <div className='ml-14 flex flex-1 flex-col overflow-hidden bg-background-secondary p-1.5 md:ml-0'>
          <AppBar />
          <main
            className='flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-background-primary p-3 sm:rounded-2xl sm:px-5'
            ref={parent}
          >
            {children}
          </main>
        </div>
        {/* <Settings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            /> */}
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
