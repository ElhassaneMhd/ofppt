import { useState } from 'react';
import FiliereList from './FiliereList';

function FilieresSection({ filieres, sectors }) {
  const [activeSector, setActiveSector] = useState(sectors?.at(0));
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
    <section className={'px-28 mb-28'}>
      <ul className='mb-10 flex justify-center gap-4'>
        {sectors.slice(0, 3).map((sector, i) => (
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
    </section>
  );
}

export default FilieresSection;
