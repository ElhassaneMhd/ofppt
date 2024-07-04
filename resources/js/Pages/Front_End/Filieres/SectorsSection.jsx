import Section from '@/components/Front_End/Section';
import { Link } from '@inertiajs/react';

export default function SectorsSection({ sectors }) {
  return (
    <Section className='rounded-xl border border-border bg-background-secondary'>
      <div className=''>
        <h2 className='text-center text-4xl font-bold tracking-widest text-text-primary sm:text-5xl'>
          Popular Sectors
        </h2>
        <div className='mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {sectors.map((s, i) => (
            <Sector key={i} sector={s} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Sector({ sector: { name, count } }) {
  return (
    <Link
      href={`/filieres?sector=${name}`}
      className='z-100 group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-background-primary p-3 px-8 py-2 font-semibold shadow-sm'
    >
      <div className='grid gap-1 text-center'>
        <h3 className='relative z-10 text-lg font-semibold text-primary transition-colors duration-500 group-hover:text-white'>
          {name}
        </h3>
        <h5 className='relative z-10 text-xs font-medium text-text-secondary transition-colors duration-300 group-hover:text-white'>
          {count} Filieres
        </h5>
        <span className='absolute -left-full top-0 h-full w-full -rotate-45 bg-primary duration-500 group-hover:left-0 group-hover:rotate-0'></span>
        <span className='absolute -right-full top-0 h-full w-full -rotate-45 bg-secondary duration-500 group-hover:right-0 group-hover:rotate-0'></span>
      </div>
    </Link>
  );
}
