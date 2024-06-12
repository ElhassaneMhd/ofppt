import FiliereItem from './FiliereItem';
import Overlay from './Overlay';

function FiliereList({ filieres, isLoading, resultsNum = 8 }) {
  return (
    <ul className='relative mb-4 grid grid-cols-4 gap-6'>
      {filieres.slice(0, resultsNum).map((filiere, i) => (
        <FiliereItem key={i} filiere={filiere} />
      ))}
      <Overlay isLoading={isLoading} />
    </ul>
  );
}

export default FiliereList;
