import { useEffect, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

function Filter({ options, onFilter, onReset }) {
  const [filterIsClicked, setFilterIsClicked] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  

  function handleClick() {
    setFilterIsClicked((isClicked) => !isClicked);
  }

  

  return (
    <>
      <button className='flex w-fit items-center gap-2 bg-blue-500 px-8 py-[10px] text-white' onClick={handleClick}>
        <BsFilterLeft size={20} />
        <div className='font-me'>Filter</div>
      </button>
      {filterIsClicked && (
        <Options
          options={options}
          selectedSectors={selectedSectors}
          onFilter={onFilter}
          onReset={onReset}
          setSelectedSectors={setSelectedSectors}
          setFilterIsClicked={setFilterIsClicked}
        />
      )}
    </>
  );
}

function Options({ options, selectedSectors, setSelectedSectors, onFilter, setFilterIsClicked, onReset }) {
  return (
    <div className='absolute bottom-0 z-50 w-3/12 translate-y-[102%] bg-white px-3 py-4 shadow-xl'>
      <ul className='mb-4'>
        <h3 className='mb-3 text-xl font-medium capitalize'>sectors</h3>
        {options.map((option, i) => (
          <Option
            key={i}
            option={option}
            selectedSectors={selectedSectors}
            setSelectedSectors={setSelectedSectors}
            onFilter={onFilter}
          />
        ))}
      </ul>
      {selectedSectors.length > 0 && (
        <div className='flex gap-2'>
          <button
            className='flex-1 border-2 border-black py-2'
            onClick={() => {
              onReset(setSelectedSectors, setFilterIsClicked);
            }}
          >
            Reset
          </button>
          <button
            className='flex-1 bg-blue-500 py-2 text-white'
            onClick={() => onFilter(selectedSectors, setFilterIsClicked)}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}

function Option({ option, selectedSectors, setSelectedSectors, onFilter }) {
  console.log(selectedSectors);
  function handleSelect(option) {
    setSelectedSectors((selected) =>
      selected.includes(option) ? selected.filter((selectedOption) => selectedOption !== option) : [...selected, option]
    );
  }

  return (
    <li className='flex items-center justify-between [&:not(:last-child)]:mb-2'>
      <span className='font-light capitalize text-black/60'>{option}</span>
      <div
        className='flex h-4 w-4 cursor-pointer items-center justify-center border-[1px] border-gray-400'
        onClick={() => handleSelect(option)}
      >
        {selectedSectors.includes(option) && <FaCheck className='text-blue-500' />}
      </div>
    </li>
  );
}

export default Filter;
