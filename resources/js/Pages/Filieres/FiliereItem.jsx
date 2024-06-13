import parse from 'html-react-parser';
import { FaRegUser } from 'react-icons/fa6';

function FiliereItem({ filiere }) {
  console.log(filiere);
  return (
    <li>
      <div className='grid grid-rows-[180px_auto]'>
        <div className='bg-cover p-3' style={{ backgroundColor: `url(${filiere.files[0]?.url})` }}>
          <a href={route(`home.filieres.details`, filiere.id)} className='bg-white px-2 py-1 text-sm font-semibold transition-colors hover:text-blue-500'>
            {filiere.title?.split(' ')?.slice(0, 2).join(' ')}
          </a>
        </div>
      </div>
      <div className='py-2 pr-2'>
        <a href={route(`home.filieres.details`, filiere.id)}>
          <h4 className='mb-2 text-lg font-semibold transition-colors hover:text-blue-500'>{filiere.title}</h4>
        </a>
        <div className='mb-4 flex items-center gap-2 text-gray-500'>
          <FaRegUser size={14} />
          <span className='text-sm font-light'>{filiere?.max_stagiaires} Students</span>
        </div>
        <p className='mb-4 text-[15px] font-light?.url leading-6 text-[#666666]'>
          {parse(filiere.details.split(' ').slice(0, 11).join(' '))}...
        </p>
        <a
          href={route(`home.filieres.details`, filiere.id)}
          className='relative border-blue-500 pb-2 text-blue-500 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:content-[""] hover:before:w-full'
        >
          Start Learning
        </a>
      </div>
    </li>
  );
}

export default FiliereItem;
