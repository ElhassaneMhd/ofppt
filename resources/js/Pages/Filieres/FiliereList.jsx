import FiliereItem from './FiliereItem';
import Overlay from '@/components/Overlay';

function FiliereList({ filieres, isLoading, resultsNum = 8 }) {
  return (
    <>
      {filieres.slice(0, resultsNum).length > 0 && (
        <ul className='relative mb-4 grid grid-cols-4 gap-6'>
          {filieres.slice(0, resultsNum).map((filiere, i) => (
            <FiliereItem key={i} filiere={filiere} />
          ))}
          <Overlay isLoading={isLoading} />
        </ul>
      )}

      {filieres.slice(0, resultsNum).length < 1 && (
        <div className='flex justify-center'>
          {' '}
          <img src='/images/no_result.png' alt='' className='w-3/12' />
        </div>
      )}
    </>
  );
}

export default FiliereList;
