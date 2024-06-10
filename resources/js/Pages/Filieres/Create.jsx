import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { DataDropDown } from '../Shared';
import { FaCamera } from 'react-icons/fa';
import { Switch } from '@/components/ui';

export default function Create({
  sectors = [],
  defaultValues = {
    image:{src : null,file : null},
    title: '',
    details: '',
    sector: '',
    tags: [],
    max_stagiaires: '',
    visibility: 'true',
    isActive: 'true',
  },
  isEdit = false,
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
      isEdit={isEdit}
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
          className='group relative h-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat'
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
        <div className='col-span-2 flex flex-col gap-5'>
          {formInputs['title']}
          {formInputs['max_stagiaires']}
          {tags}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <DataDropDown type='sector' getValue={getValue} setValue={setValue} data={sectors} />
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Inscription Status </label>
            <Switch
              checked={getValue('isActive') === 'true'}
              onChange={(e) => setValue('isActive', String(e.target.checked))}
            />
          </div>
          <span
            className={`w-fit rounded-full px-5 py-1 text-xs font-medium text-white ${getValue('isActive') === 'true' ? 'bg-green-600' : 'bg-red-500'}`}
          >
            {getValue('isActive') === 'true' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      {details}
    </div>
  );
}
