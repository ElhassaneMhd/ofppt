import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { DataDropDown } from '../Shared';
import { FaCamera } from 'react-icons/fa';
import { Switch } from '@/components/ui';

export default function Create({
  formationYears = [],
  defaultValues = {
    image: { src: null, file: null },
    title: '',
    details: '',
    date: '',
    location: [],
    tags: [],
    duration: '',
    visibility: 'true',
    upcoming: 'true',
    formationYear: '',
  },
  isEdit = false,
}) {
  return (
    <CreatePageLayout
      name='Event'
      formOptions={{
        defaultValues,
        fields: [
          {
            name: 'title',
            label: 'Title',
            placeholder: 'Enter title...',
          },
          {
            name: 'location',
            label: 'Location',
            placeholder: 'Enter location...',
          },
          {
            name: 'date',
            label: 'Date',
            type: 'date',
          },
          {
            name: 'duration',
            label: 'Duration',
            placeholder: 'Enter number...',
            type: 'number',
            rules: { min: { value: 1, message: 'Min value is 1' } },
          },
        ],
      }}
      isEdit={isEdit}
    >
      <Form formationYears={formationYears} />
    </CreatePageLayout>
  );
}

function Form({ options, details, tags, formationYears }) {
  const { formInputs, getValue, setValue } = options;

  const { openFilePicker } = useUploadFile({ onChange: (image) => setValue('image', image) });

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid sm:grid-cols-3 gap-5'>
        <div
          className='group relative min-h-52 h-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${getValue('image')?.src})`,
          }}
        >
          <button
            className={`left 0 absolute top-0 grid h-full w-full place-content-center bg-background-secondary transition-opacity duration-300 group-hover:opacity-80 ${!getValue('image')?.src ? 'opacity-80 hover:bg-background-tertiary' : 'opacity-0'}`}
            onClick={openFilePicker}
          >
            <FaCamera />
          </button>
        </div>
        <div className='sm:col-span-2 flex flex-col gap-5'>
          {formInputs['title']}
          {formInputs['location']}
          {formInputs['duration']}
          {formInputs['date']}
          {tags}
        </div>
      </div>
      <div className='grid mobile:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Inscription Status </label>
            <Switch
              checked={getValue('upcoming') === 'true'}
              onChange={(e) => setValue('upcoming', String(e.target.checked))}
            />
          </div>
          <span
            className={`w-fit rounded-full px-5 py-1 text-xs font-medium text-white ${getValue('upcoming') === 'true' ? 'bg-green-600' : 'bg-red-500'}`}
          >
            {getValue('upcoming') === 'true' ? 'Upcoming' : 'Already Passed'}
          </span>
        </div>
      </div>
      {details}
    </div>
  );}
