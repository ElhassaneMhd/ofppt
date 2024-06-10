import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { DataDropDown } from '../Shared';
import { FaCamera } from 'react-icons/fa';

export default function Create({
  sectors = [],
  defaultValues = {
    image: '',
    title: '',
    details: '',
    sector: '',
    tags: [],
    max_stagiaires: '',
    visibility: true,
  },
}) {
  return (
    <CreatePageLayout
      name='Filiere'
      formOptions={{
        defaultValues,
        fields: [
          {
            name: 'title',
            label: 'Title',
            placeholder: 'Enter title...',
          },
          {
            name: 'details',
            label: 'Details',
            type: 'textarea',
            placeholder: 'Enter details...',
            rows: '5',
          },
          {
            name: 'max_stagiaires',
            label: 'Max Interns',
            placeholder: 'Enter number...',
            type: 'number',
            rules: { min: { value: 1, message: 'Min value is 1' } },
          },
          {
            name: 'sector',
            hidden: true,
          },
          {
            name: 'tags',
            hidden: true,
          },
        ],
      }}
    >
      <Form sectors={sectors} />
    </CreatePageLayout>
  );
}

function Form({ options, details, tags, sectors }) {
  const { formInputs, getValue, setValue } = options;

  const { openFilePicker } = useUploadFile({ onChange: (image) => setValue('image', image) });

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid grid-cols-3 gap-5'>
        <div
          className='group relative min-h-52 self-center overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${getValue('image')?.src})`,
          }}
        >
          <button
            className={`left 0 absolute top-0 grid h-full w-full place-content-center bg-background-secondary transition-opacity duration-300 group-hover:opacity-80 ${!getValue('image')?.src ? 'opacity-80' : 'opacity-0'}`}
            onClick={openFilePicker}
          >
            <FaCamera />
          </button>
        </div>
        <div className='col-span-2 flex flex-col gap-5'>
          {formInputs['title']}
          {formInputs['max_stagiaires']}
          <DataDropDown type='sector' getValue={getValue} setValue={setValue} data={sectors} />
        </div>
      </div>
      {tags}
      {details}
    </div>
  );
}
