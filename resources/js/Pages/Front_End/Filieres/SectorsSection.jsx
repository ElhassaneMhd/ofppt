import Section from '@/components/Front_End/Section';
import { Link } from '@inertiajs/react';

export default function SectorsSection({
  sectors = [{
    name : 'Development',
    count : 3,
  },
  {
    name : 'Design',
    count : 5,
  },
  {
    name : 'Marketing',
    count : 10,
  },
  {
    name : 'Business',
    count : 8,
  },
  {
    name : 'Finance',
    count : 4,
  },
  {
    name : 'Health',
    count : 2,
  },
  {
    name : 'Education',
    count : 3,
  },
  {
    name : 'Engineering',
    count : 7,
  }
]
}) {
  return (
    <Section colored >
      <h2 className='text-center text-4xl font-bold tracking-widest text-text-primary sm:text-5xl'>Popular Sectors</h2>
      <div className='mt-12 grid grid-cols-4 gap-4'>
        {sectors.map((s) => (
          <Sector key={s} sector={s} />
        ))}
      </div>
    </Section>
  );
}

function Sector({ sector : {name,count} }) {
  return (
    <Link
      href={`/filieres?sector=${name}`}
      className='group flex flex-col items-center justify-center rounded-xl bg-background-primary p-3 shadow-sm transition-colors duration-300 hover:bg-primary'
    >
      {/* <img src={sector.image} alt={sector.name} className='h-20 w-20' /> */}
      <div className='space-y-1.5 text-center'>
        <h3 className='font-semibold text-text-primary transition-colors duration-300 group-hover:text-white'>
          {name}
        </h3>
        <h5 className='text-xs font-medium text-text-secondary transition-colors duration-300 group-hover:text-white'>
          {count} Filieres
        </h5>
      </div>
    </Link>
  );
}
