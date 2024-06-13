import parse from 'html-react-parser';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaArrowRightLong, FaRegUser } from 'react-icons/fa6';
import { IoPricetagOutline, IoTicketOutline } from 'react-icons/io5';
import { MdDomain, MdOutlineDateRange } from 'react-icons/md';
import FiliereItem from './FiliereItem';

export default function Details({ element: filiere = {}, elements: filieres = {} }) {
  const interestedFilieres = filieres.filter((fill) => fill.id !== +filiere.id);
  return (
    <section className='mt-12 px-28'>
      <div className='mb-12 grid grid-cols-[3fr_1fr] gap-4'>
        <div>
          <h1 className='mb-4 text-3xl font-semibold'>{filiere?.title}</h1>
          <div className='mb-6'>
            <img src={filiere.files[0]} alt='' />
          </div>
          <div className='mb-12 border-b-[1px] border-b-black/20 pb-8'>
            <p className='mb-8 text-black/60'>{parse(filiere.details)}</p>
          </div>
        </div>
        <Info filiere={filiere} />
      </div>
      {interestedFilieres.length > 0 && (
        <div>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>You Might Be Intersted In</h2>
            <a
              href={route(`home.filieres`)}
              className='flex w-fit items-center gap-2 border-[1px] border-black px-6 py-2 font-semibold transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white'
            >
              View All Filieres
            </a>
          </div>
          <MaghtBeInterestedFilieres filieres={filieres} />
        </div>
      )}
    </section>
  );
}

function MaghtBeInterestedFilieres({ filieres }) {
  return (
    <ul className='grid grid-cols-3 gap-6'>
      {filieres.slice(0, 3).map((filiere, i) => (
        <FiliereItem filiere={filiere} />
      ))}
    </ul>
  );
}

function MaghtBeInterestedFiliere({ filiere }) {
  console.log(filiere);
  return (
    <li className='grid grid-rows-[auto_1fr]'>
      <div>
        <img src={filiere?.files[0]} alt='' />
      </div>
      <div className='grid bg-gray-100 px-3 py-4'>
        <a href={route(`home.filieres.details`, filiere.id)}>
          <h3 className='mb-4 text-xl font-semibold transition-colors hover:text-blue-500'>{filiere.title}</h3>
        </a>
        <p className='mb-2 leading-6 text-black/60'>
          {filiere.details.split(' ').length > 14
            ? parse(filiere.details.split(' ').slice(0, 14).join(' ')) + '...'
            : parse(filiere.details)}
        </p>
        <div className='mb-4 flex items-center gap-4 text-black/60'>
          <div className='flex items-center gap-2'>
            <IoPricetagOutline />
            <span className='capitalize'>{filiere.tags.slice(0, 3).join(' ')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegCalendarAlt />
            <span>{filiere.date?.replaceAll('-', '/')}</span>
          </div>
        </div>
        <a href='' className='flex w-fit items-center gap-2 self-end transition-colors hover:text-blue-500'>
          <span>Read More</span>
          <FaArrowRightLong size={14} />
        </a>
      </div>
    </li>
  );
}

function Info({ filiere }) {
  return (
    <div className='self-start bg-gray-100 p-4'>
      <h3 className='mb-4 text-xl font-medium'>Information</h3>
      <div className='mb-3 flex items-center gap-2 text-black/90'>
        <FaRegUser />
        <span>{filiere.max_stagiaires} Stagiaires</span>
      </div>
      <div className='mb-3 flex items-center gap-2 text-black/90'>
        <MdDomain />
        <span>{filiere.sector}</span>
      </div>
      <div>
        <span>Tags</span>
        <ul className='mt-3 flex gap-2'>
          {filiere.tags.map((tag) => (
            <li className='border-[1px] border-black px-2 py-1 text-sm'>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
