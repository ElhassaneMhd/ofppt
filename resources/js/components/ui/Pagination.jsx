import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

function Pagination({
  items,
  paginationLinksNum,
  activePaginationLink,
  onPaginate,
  onPaginatePrevious,
  onPaginateNext,
}) {
  if (!items.length) return null;

  return (
    <div className='flex items-center justify-center gap-4'>
      <div
        className={`flex items-center self-stretch border-2 border-gray-300 px-4 py-2 ${activePaginationLink > 1 ? 'hover:bg-blue-950 hover:text-white' : ''}`}
        onClick={() => onPaginatePrevious()}
      >
        <FaArrowLeftLong size={16} />
      </div>
      <PaginationLinks
        paginationLinksNum={paginationLinksNum}
        activePaginationLink={activePaginationLink}
        onPaginate={onPaginate}
      />
      <div
        className={`${activePaginationLink < paginationLinksNum ? 'hover:bg-blue-950 hover:text-white' : ''} flex items-center self-stretch border-2 border-gray-300 px-4 py-2`}
        onClick={() => onPaginateNext()}
      >
        <FaArrowRightLong size={16} />
      </div>
    </div>
  );
}

function PaginationLinks({ paginationLinksNum, activePaginationLink, onPaginate }) {
  return (
    <ul className='flex items-center gap-4'>
      {Array.from({ length: paginationLinksNum }).map((_, i) => (
        <PaginationLink key={i} link={i + 1} activePaginationLink={activePaginationLink} onPaginate={onPaginate} />
      ))}
    </ul>
  );
}

function PaginationLink({ link, activePaginationLink, onPaginate }) {
  return (
    <li
      className={`list-none border-2 px-5 py-2 ${activePaginationLink === link ? 'border-blue-950 bg-blue-950 text-white' : 'border-gray-300 transition-colors hover:border-blue-950 hover:bg-blue-950 hover:text-white'}`}
      onClick={() => onPaginate(link)}
    >
      {link}
    </li>
  );
}

export default Pagination;
