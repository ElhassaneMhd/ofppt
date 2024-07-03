import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Section({ children,className,colored }) {
  const [parent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' });

  return (
    <section className={colored ? 'bg-background-secondary' : 'bg-background-primary' } ref={parent}>
    <div className={`px-3 xl:container xl:mx-auto py-6 md:px-6 md:py-10 ${className || ''}`} ref={parent}>
      {children}
    </div>
    </section>
  );
}
