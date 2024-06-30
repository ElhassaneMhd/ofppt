import { usePage } from '@inertiajs/react';
import { Button, CheckBox, Modal, SearchInput } from '../ui';
import { useState } from 'react';
import { useNavigate } from '@/hooks/useNavigate';

export function SessionYear({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const formationYears = usePage().props.formationYears || [];
  const currentYear = usePage().props.year;
  const [chosenYear, setChosenYear] = useState(currentYear?.id);
  const { navigate } = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='flex flex-col gap-4 p-5 sm:h-[550px] sm:w-[400px] sm:border'
      closeOnBlur={true}
    >
      <h1 className='mb-2 text-lg font-bold text-text-primary'>Session Formation Year</h1>
      <SearchInput placeholder='Search for year...' value={query} onChange={(q) => setQuery(q)} />
      <div className='flex flex-1 flex-col gap-1 overflow-auto'>
        {formationYears
          ?.filter((year) => year.year.toString().includes(query))
          .map((year) => (
            <div
              key={year.year}
              className={`flex items-center gap-3 rounded-lg p-2.5 transition-colors duration-300 hover:bg-background-secondary ${
                chosenYear === year.id ? 'bg-background-secondary' : ''
              }`}
            >
              <CheckBox
                checked={chosenYear === year.id}
                onChange={() => setChosenYear(chosenYear === year.id ? currentYear.id : year.id)}
              />
              <span className='text-text-primary'>{year?.year}</span>
            </div>
          ))}
      </div>

      <div className='mt-2 grid grid-cols-2 gap-4'>
        <Button
          color='tertiary'
          onClick={() => {
            onClose();
            setQuery('');
            setChosenYear(currentYear.id);
          }}
        >
          Cancel
        </Button>
        <Button
          color='secondary'
          disabled={currentYear?.id === chosenYear}
          onClick={() => {
            navigate({ url: `/admin/session/year/${chosenYear}`, method: 'put' });
            onClose();
            setQuery('');
          }}
        >
          Change
        </Button>
      </div>
    </Modal>
  );
}
