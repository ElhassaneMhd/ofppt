import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from '@/components/Front_End/Header';


export default function AppLayout({ children }) {
  const [parent] = useAutoAnimate({ duration: 400, easing: 'ease-in-out' });

  return (
    <div className='flex h-full flex-col overflow-y-auto overflow-x-hidden'>
      <div id="banner"></div>
      <Header />
      <main className='flex-1' ref={parent}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
