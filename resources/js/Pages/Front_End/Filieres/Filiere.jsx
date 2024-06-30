import { Button } from '@/components/ui';
import { getImage } from '@/utils/helpers';
import { Link } from '@inertiajs/react';

export default function Filiere({ filiere, layout = 'grid' }) {
  const { id, title, details, isActive, sector, formationYear, files } = filiere || {};

  if (layout === 'grid') {
    return (
      <div className='group relative h-full overflow-hidden shadow-md'>
        {!isActive && (
          <div className='absolute -right-[55px] top-[38px] z-20 rotate-45 bg-red-500 px-10 py-1.5 text-sm font-semibold text-white'>
            Inscription Fermée
          </div>
        )}
        <div className='grid h-full grid-rows-[250px_auto] overflow-hidden rounded-xl'>
          <img
            src={getImage(files)}
            alt={title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='relative flex flex-col gap-2 rounded-b-xl border-border bg-background-secondary p-3'>
            <div className='flex items-center justify-between gap-3 border-b border-border pb-2 text-sm'>
              <span className='font-medium text-secondary'>{sector}</span>
              <span className='font-medium text-text-secondary'>{formationYear?.year}</span>
            </div>
            <h4 className='text-lg font-bold leading-snug text-text-primary'>{title}</h4>
            <p className='mb-3 line-clamp-3 text-sm font-medium text-text-secondary'>{details}</p>
            <Link href={`/filieres/${id}`} className='mt-auto'>
              <Button size='small' className='mx-auto'>
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='relative w-full overflow-hidden rounded-lg border border-border shadow-sm'>
      {!isActive && (
        <div className='absolute -left-[55px] top-[38px] z-20 -rotate-45 bg-red-500 px-10 py-1.5 text-sm font-semibold text-white'>
          Inscription Fermée
        </div>
      )}
      <div className='relative grid h-full min-h-[150px] grid-cols-[140px_auto] overflow-hidden rounded-lg sm:grid-cols-[180px_auto]'>
        <img
          src={getImage(files)}
          alt={title}
          className='h-full object-cover transition-transform duration-300 hover:scale-105'
        />
        <div className='relative flex flex-col justify-between gap-5 bg-background-primary p-5 sm:flex-row'>
          <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-bold leading-snug text-text-primary'>{title}</h4>
            <p className='line-clamp-3 text-sm font-medium text-text-secondary'>{details}</p>
            <div className='mt-auto flex items-center gap-5 text-sm'>
              <span className='font-medium text-secondary'>{sector}</span>
              <span className='font-medium text-text-secondary'>{formationYear?.year}</span>
            </div>
          </div>
          <Link href={`/filieres/${id}`}>
            <Button className='h-fit w-fit self-center'>En savoir plus</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
