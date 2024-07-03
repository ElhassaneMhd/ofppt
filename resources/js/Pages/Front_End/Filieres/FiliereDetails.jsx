import NotFound from '@/Pages/NotFound';
import { Tags } from '@/components/ui/Tag';
import { getImage } from '@/utils/helpers';
import { Head, Link } from '@inertiajs/react';
import { Share } from '../Blog/ArticleDetails';
import { LongDetails } from '@/components/Front_End/Details';

export default function FiliereDetails({ filiere, filieres }) {
  return (
    <>
      <Head title={filiere.title} />
      <div className='mt-3 grid-cols-3 gap-6 p-5 py-7 lg:grid'>
        {filiere.original?.message ? (
          <div className='col-span-2'>
            <NotFound />
          </div>
        ) : (
          <Details filiere={filiere} />
        )}
        <aside className='mt-10 space-y-10 border-l-2 border-border pl-6 lg:mt-0'>
          <OtherFilieres currentFiliereId={filiere.id} filieres={filieres} />
          <Sectors filieres={filieres} />
          {!filiere.original?.message && (
            <>
              <Tags tags={filiere.tags} />
              <Share />
            </>
          )}
        </aside>
      </div>
    </>
  );
}

function Details({ filiere: { title, details, files, max_stagiaires, isActive, sector, formationYear } }) {
  return (
    <div className='col-span-2 flex flex-col gap-5'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2 text-sm font-medium text-text-tertiary'>
            <h2 className='mb-3 text-3xl font-medium text-text-primary'>{title}</h2>
            <span className='text-lg font-bold text-primary'> {formationYear?.year}</span>
          </div>
        </div>
        <div className='relative'>
          <img src={getImage(files)} alt={title} className='h-72 w-full rounded-xl object-cover sm:h-96' />
          <div className=' animate-wiggle-1s-delay-2s absolute bottom-24 right-8 flex items-center justify-center rounded-lg bg-primary p-2'>
            <span className='text-white'>Places : {max_stagiaires}</span>
          </div>
          <div
            className={`absolute bottom-80 right-5 flex items-center justify-center rounded-lg ${isActive === 'true' ? 'bg-green-600' : 'bg-red-600'} animate-wiggle-1s-delay-1s p-2 font-bold`}
          >
            <span className='text-white'>Inscription {isActive === 'true' ? ' Ouvert' : ' Termine'}</span>
          </div>
          <div className=' animate-wiggle-1s absolute bottom-48 left-5 flex items-center justify-center rounded-lg bg-secondary p-2 font-bold'>
            <span className='text-white'> {sector}</span>
          </div>
        </div>
        <p className='text-center text-xl font-bold'>Présentation de la filière</p>
        <LongDetails details={details} />
      </div>
    </div>
  );
}

function OtherFilieres({ filieres, currentFiliereId }) {
  const otherFilieres = filieres?.filter((filiere) => +filiere.id !== +currentFiliereId).slice(-4);

  const render = () => {
    if (!otherFilieres.length) return <p className='text-sm font-medium text-text-secondary'>No filieres found...</p>;
    return (
      <ul className='space-y-3'>
        {otherFilieres.map(({ id, title, files, sector,formationYear }) => (
          <li key={id}>
            <Link
              href={`/filieres/${id}`}
              className='grid grid-cols-[100px_auto] gap-5 rounded-lg transition-transform duration-300 hover:scale-95'
            >
              <img
                src={getImage(files)}
                alt={title.slice(0, 10) + '...'}
                className='h-20 w-full rounded-lg object-cover'
              />
              <div className='space-y-1 overflow-hidden'>
                <h4 className='truncate text-sm font-bold text-text-primary sm:text-base' title={title}>
                  {title}
                </h4>
                <p className='line-clamp-1 text-sm font-medium text-secondary'>{sector}</p>
                <p className='line-clamp-1 text-xs font-medium text-text-secondary'>{formationYear?.year}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[200px] rounded-xl'>
      <h4 className='mb-5 text-lg font-bold text-text-primary'>Other Filiers</h4>
      {render()}
    </div>
  );
}

function Sectors({ filieres }) {
  const sectorsCount = filieres.reduce((acc, filiere) => {
    acc[filiere.sector] = (acc[filiere.sector] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className='w-full border-t-[1px] border-border pt-4'>
      <h4 className='mb-3 text-lg font-bold text-text-primary'>Sectors</h4>
      <div className='flex flex-col'>
        {Object.entries(sectorsCount).map(([sector, count]) => (
          <Link
            key={sector}
            href={`/filieres?sector=${sector}`}
            className='rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-background-secondary'
          >
            <div className='flex items-center justify-between'>
              <h4 className='text-md text-text-primary'>{sector}</h4>
              <span className='count text-xs'>{count} </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
