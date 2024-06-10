
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function AuthLayout({chlidren }) {
  const [parent] = useAutoAnimate({ duration: 300 });
  return (
    <div className='grid h-full w-full grid-cols-1 '>
        <div ref={parent} className=' flex h-full w-full flex-col p-2 md:h-screen md:overflow-auto md:p-0 '>
              {chlidren}
        </div>
    </div>
  );
}
