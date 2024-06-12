import { useEffect, useState } from 'react';
import Section from './Section';
import { FaRegUser } from 'react-icons/fa6';

function Filieres({ filieres, sectors }) {
  const [activeSector, setActiveSector] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedFilieres = filieres.filter((filiere) => filiere.sector === activeSector);

  function handleClick(value) {
    setIsLoading(true);
    setTimeout(function () {
      setActiveSector((active) => (active !== value ? value : active));
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Section className={'mb-28'}>
      <ul className='mb-10 flex justify-center gap-4'>
        {[].slice(0, 3).map((sector, i) => (
          <li
            key={i}
            className={`cursor-pointer text-3xl font-semibold capitalize hover:text-blue-500 ${sector === activeSector ? 'text-blue-500' : ''}`}
            onClick={(e) => handleClick(e.target.textContent)}
          >
            {sector?.split(' ')?.slice(0, 3).join(' ')}
          </li>
        ))}
      </ul>
      <FiliereList filieres={selectedFilieres} isLoading={isLoading} />
      <a href=''>
        <div className='mx-auto w-fit border-[1px] border-black px-6 py-2 font-medium transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white'>
          View All Courses
        </div>
      </a>
    </Section>
  );
}

function FiliereList({ filieres, isLoading }) {
  return (
    <ul className='relative mb-4 grid grid-cols-4 gap-6'>
      {filieres.slice(0, 8).map((filiere, i) => (
        <FiliereItem key={i} filiere={filiere} />
      ))}
      <Overlay isLoading={isLoading} />
    </ul>
  );
}

function FiliereItem({ filiere }) {
  return (
    <li>
      <div className='grid grid-rows-[180px_auto]'>
        <div className='bg-[url("/images/hero-bg.png")] bg-cover p-3'>
          <a href='' className='bg-white px-2 py-1 text-sm font-semibold transition-colors hover:text-blue-500'>
            {filiere.title?.split(' ')?.slice(0, 2).join(' ')}
          </a>
        </div>
      </div>
      <div className='py-2 pr-2'>
        <a href=''>
          <h4 className='mb-2 text-lg font-semibold transition-colors hover:text-blue-500'>{filiere.title}</h4>
        </a>
        <div className='mb-4 flex items-center gap-2 text-gray-500'>
          <FaRegUser size={14} />
          <span className='text-sm font-light'>{filiere?.max_stagiaires} Students</span>
        </div>
        <p className='mb-4 text-[15px] font-light leading-6 text-[#666666]'>
          {filiere.details.split(' ').slice(0, 11).join(' ')}...
        </p>
        <a
          href=''
          className='relative border-blue-500 pb-2 text-blue-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:content-[""] hover:before:w-full'
        >
          Start Learning
        </a>
      </div>
    </li>
  );
}

function Overlay({ isLoading }) {
  return (
    <div
      className={`absolute flex h-full w-full items-center justify-center bg-white bg-opacity-20 ${!isLoading ? 'hidden' : 'block'}`}
    >
      <div className='spinning-animation h-12 w-12 rounded-full border-4 border-dashed border-black border-r-transparent'></div>
    </div>
  );
}

export default Filieres;
