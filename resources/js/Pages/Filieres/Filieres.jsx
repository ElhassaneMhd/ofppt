import FiliereList from './FiliereList';
import Filter from '@/components/ui/Filter';
import Pagination from '@/components/ui/Pagination';
import Results from '@/components/ui/Results';
import SortBy from '@/components/ui/SortBy';
import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';

function Filieres({ filieres, sectors }) {
  console.log(filieres);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [usedFilieres, setUsedFilieres] = useState(filieres);
  const uniqueSectors = [...new Set(sectors)];
  const filieresStudents = filieres
    .map((filiere) => filiere.max_stagiaires)
    .reduce((acc, max_stagiaire) => acc + max_stagiaire, 0);
  const displayedItems = 4;
  const displayedRows = 3;
  const resultsNum = displayedItems * displayedRows;
  const resultsRetrieved = currPage * resultsNum > usedFilieres.length ? usedFilieres.length : currPage * resultsNum;
  const displayedFilieres = usedFilieres.slice((currPage - 1) * resultsNum, currPage * resultsNum);
  const paginationLinksNum = Math.ceil(usedFilieres.length / resultsNum);

  useEffect(
    function () {
      setIsLoading(true);
      setTimeout(() => {
        if (!sortBy) setUsedFilieres(filieres);
        if (sortBy === 'title-asc')
          setUsedFilieres((filieres) => filieres.toSorted((a, b) => a.title.localeCompare(b.title)));
        if (sortBy === 'title-desc')
          setUsedFilieres((filieres) => filieres.toSorted((a, b) => b.title.localeCompare(a.title)));
        setIsLoading(false);
      }, 1000);
    },
    [filieres, sortBy]
  );

  function handlePaginate(value) {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage(value);
      setIsLoading(false);
    }, 1000);
  }

  function handlePaginatePrevious() {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage((curr) => (curr > paginationLinksNum ? curr - 1 : curr));
      setIsLoading(false);
    }, 1000);
  }

  function handlePaginateNext() {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage((curr) => (curr < paginationLinksNum ? curr + 1 : curr));
      setIsLoading(false);
    }, 1000);
  }

  function handleFilter(selectedSectors, setIsFilterOpen) {
    setIsLoading(true);
    setTimeout(() => {
      setUsedFilieres((usedFilieres) => usedFilieres.filter((filiere) => selectedSectors.includes(filiere.sector)));
      setIsFilterOpen(false);
      setIsLoading(false);
    }, 1000);
  }

  function handleReset(setSelectedSectors, setIsFilterOpen) {
    setIsLoading(true);
    setTimeout(() => {
      setUsedFilieres(filieres);
      setSelectedSectors([]);
      setIsFilterOpen(false);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <section className={'mt-12 px-28'}>
      <h1 className='mb-8 text-5xl font-medium'>Filieres</h1>
      <div className='mb-10 flex gap-3'>
        <div className='flex items-center gap-1 text-sm text-black/60'>
          <IoBookOutline size={18} className='mr-1' />
          <span>{filieres?.length}</span>
          <span className='capitalize'>filieres</span>
        </div>
        <span className='text-sm text-black/60'>|</span>
        <div className='flex items-center gap-1 text-sm text-black/60'>
          <FaRegUser className='mr-1' />
          <span>{filieresStudents}</span>
          <span className='capitalize'>Students</span>
        </div>
      </div>
      <div className='relative mb-8 flex items-end justify-between'>
        <Filter options={uniqueSectors} onFilter={handleFilter} onReset={handleReset} />
        <div className='flex gap-4 text-black/80'>
          <Results items={usedFilieres} resultsRetrieved={resultsRetrieved} />
          <span className='text-gray-400'>|</span>
          <SortBy setSortBy={setSortBy} />
        </div>
      </div>
      <FiliereList isLoading={isLoading} filieres={displayedFilieres} resultsNum={resultsNum} />
      <Pagination
        paginationLinksNum={paginationLinksNum}
        activePaginationLink={currPage}
        setIsLoading={setIsLoading}
        onPaginate={handlePaginate}
        onPaginatePrevious={handlePaginatePrevious}
        onPaginateNext={handlePaginateNext}
        items={usedFilieres}
      />
    </section>
  );
}

export default Filieres;
