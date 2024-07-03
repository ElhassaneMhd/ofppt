import NotFound from '@/Pages/NotFound';
import { Tags } from '@/components/ui/Tag';
import { getImage } from '@/utils/helpers';
import { Head, Link } from '@inertiajs/react';
import { sanitize } from '@/utils/helpers/';
import { Share } from '../Blog/ArticleDetails';

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
          <LatestArticles currentFiliereId={filiere.id} filieres={filieres} />
          <Sectors filieres={filieres} />
          <Tags tags={filiere.tags} />
          <Share />
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
            <span className='text-lg text-text-disabled'> {formationYear.year}</span>
          </div>
        </div>
        <div className='relative'>
          <img src={getImage(files)} alt={title} className='h-72 w-full rounded-xl object-cover sm:h-96' />
          <div className='absolute bottom-24 right-8 flex items-center justify-center rounded-lg bg-primary p-2 font-bold'>
            <span className='text-white'>Places : {max_stagiaires}</span>
          </div>
          <div
            className={`absolute bottom-80 right-5 flex items-center justify-center rounded-lg ${isActive === 'true' ? 'animate-pulse bg-green-600' : 'bg-red-600'} p-2 font-bold`}
          >
            <span className='text-white'>Inscription {isActive === 'true' ? ' Ouvert' : ' Termine'}</span>
          </div>
          <div className='absolute bottom-48 left-5 flex items-center justify-center rounded-lg bg-secondary p-2 font-bold'>
            <span className='text-white'> {sector}</span>
          </div>
        </div>
        <p className='text-center text-xl font-bold'>Présentation de la filière</p>
        <div
          className='filiere leading-relaxed text-text-primary'
          dangerouslySetInnerHTML={{ __html: sanitize(details) }}
        />
      </div>
    </div>
  );
}

function LatestArticles({ filieres, currentFiliereId }) {
  const latestArticles = filieres?.filter((filiere) => +filiere.id !== +currentFiliereId).slice(-4);

  const render = () => {
    if (!latestArticles.length) return <p className='text-sm font-medium text-text-secondary'>No filieres found...</p>;
    return (
      <ul className='space-y-3'>
        {latestArticles.map(({ id, title, files, sector }) => (
          <li key={id}>
            <Link
              href={`/filieres/${id}`}
              className='grid grid-cols-[100px_auto] gap-5 rounded-lg bg-background-secondary p-2 transition-transform duration-300 hover:scale-95'
            >
              <img
                src={getImage(files)}
                alt={title.slice(0, 10) + '...'}
                className='h-20 w-full rounded-lg object-cover'
              />
              <div className='space-y-2 overflow-hidden'>
                <h4 className='truncate text-sm font-bold text-text-primary sm:text-base' title={title}>
                  {title}
                </h4>
                <p className='line-clamp-1 text-sm font-medium text-text-secondary'>{sector}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='relative min-h-[400px] rounded-xl'>
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
      <div className='flex flex-col gap-3'>
        {Object.entries(sectorsCount).map(([sector, count]) => (
          <Link key={sector} href={`/filieres?sector=${sector}`}>
            <div className='flex items-center justify-between rounded-lg'>
              <h4 className='text-md text-text-primary'>{sector}</h4>
              <span className='count text-xs'>{count} </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
