import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Section({ children, className, colored }) {
  const [parent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' });

  return (
    <section
      className={`${colored ? 'border-y border-border bg-background-secondary' : 'bg-background-primary'}`}
      ref={parent}
    >
      <div className={`px-3 py-6 xl:container md:px-6 md:py-10 xl:mx-auto ${className || ''}`} ref={parent}>
        {children}
      </div>
    </section>
  );
}
