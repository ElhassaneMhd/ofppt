import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Section({ children, className, colored, borderd =false }) {
  const [parent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' });

  return (
    <section
      className={`${borderd &&'border-t-2 border-border'}  ${colored ? 'bg-background-secondary' : 'bg-background-primary'}`}
      ref={parent}
    >
      <div className={`px-3 py-6 xl:container md:px-6 md:py-10 xl:mx-auto ${className || ''}`} ref={parent}>
        {children}
      </div>
    </section>
  );
}
