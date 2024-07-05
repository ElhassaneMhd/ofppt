import { useAutoAnimate } from '@formkit/auto-animate/react';
import Footer from '@/components/Front_End/Footer';
import Header from '@/components/Front_End/Header';


export default function AppLayout({ children }) {
  const [parent] = useAutoAnimate({ duration: 400, easing: 'ease-in-out' });

  return (
    <div className='flex h-full flex-col overflow-y-auto overflow-x-hidden'>
      <Header />
      <main className='flex-1' ref={parent}>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
