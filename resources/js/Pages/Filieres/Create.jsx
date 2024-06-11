import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { DataDropDown } from '../Shared';
import { FaCamera } from 'react-icons/fa';
import { Switch } from '@/components/ui';

export default function Create({
  sectors = [],
  defaultValues = {
    files: [{ src: null, file: null }],
    title: '',
    details: '',
    sector: '',
    tags: [],
    max_stagiaires: '',
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
            name: 'max_stagiaires',
            label: 'Max Interns',
            placeholder: 'Enter number...',
            type: 'number',
            rules: { min: { value: 1, message: 'Min value is 1' } },
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

  const { openFilePicker } = useUploadFile({ onChange: (image) => setValue('files', [image]) });

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid gap-5 sm:grid-cols-3'>
        <div
          className='group relative h-full min-h-52 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${getValue('files')[0]?.src})`,
          }}
        >
          <button
            className={`left 0 absolute top-0 grid h-full w-full place-content-center bg-background-secondary transition-opacity duration-300 group-hover:opacity-50 ${!getValue('files')[0]?.src ? 'opacity-80 hover:bg-background-tertiary' : 'opacity-0'}`}
            onClick={openFilePicker}
          >
            <FaCamera />
          </button>
        </div>
        <div className='flex flex-col gap-5 sm:col-span-2'>
          {formInputs['title']}
          {formInputs['max_stagiaires']}
          {tags}
        </div>
      </div>
      <div className='grid gap-5 mobile:grid-cols-2'>
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
