import { Button } from '@/components/ui/Button';
import Section from '@/components/Front_End/Section';
import Slider from '@/components/Front_End/Slider';
import Filiere from './Filiere';
import { Link, usePage } from '@inertiajs/react';

const ids = {
  pagination: 'filieres-pagination',
  prev: 'filieres-button-prev',
  next: 'filieres-button-next',
};

export default function FilieresSection({ filieres }) {
  return (
    <Section>
      <Slider
        navigationIds={{
          prev: ids.prev,
          next: ids.next,
        }}
        paginationId={ids.pagination}
      >
        <div className='mt-3 flex items-end justify-center md:justify-between'>
          <div className='text-center md:text-start'>
            <h2 className='text-4xl font-bold tracking-widest text-text-primary sm:text-5xl'>Filieres</h2>
          </div>
          <Slider.Navigation />
        </div>

        {filieres?.map((filiere) => (
          <Slider.Slide key={filiere.id}>
            <Filiere filiere={filiere} />
          </Slider.Slide>
        ))}

        <Slider.Pagination />
      </Slider>
      <More />
    </Section>
  );
}

function More() {
  const filieresCount = usePage().props.count?.filieres
  return (
    <div className='mx-auto mt-10 flex w-fit flex-col items-center justify-between gap-3 rounded-3xl border-2 border-text-tertiary py-2 pl-6 pr-3 sm:flex-row sm:rounded-full md:gap-5'>
      <p className='text-text-primary'>
        <span className='text-sm sm:text-base'>
          <span className='font-bold sm:text-lg'>{filieresCount}+</span> Filières compétentes à explorer
        </span>
      </p>
      <Link href='/filieres'>
      <Button className='rounded-full'>Explorer Tous</Button>
      </Link>
    </div>
  );
}
