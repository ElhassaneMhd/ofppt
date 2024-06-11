import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/Admin/CreatePageLayout';
import { DataDropDown, FormationYear } from '../Shared';
import { FaCamera } from 'react-icons/fa';

export default function Create({
  categories = [],
  formationYears,
  defaultValues = {
    files: [{ src: null, file: null }],
    title: '',
    details: '',
    categorie: '',
    tags: [],
  },
  isEdit = false,
}) {
  return (
    <CreatePageLayout
      name='Article'
      formOptions={{
        defaultValues,
        fields: [
          {
            name: 'title',
            label: 'Title',
            placeholder: 'Enter title...',
          },
        ],
      }}
      isEdit={isEdit}
    >
      <Form categories={categories} 
            formationYears={formationYears}
            isEdit={isEdit}
      />
    </CreatePageLayout>
  );
}

function Form({ options, details, tags, categories,formationYears, isEdit}) {
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
        <div className='flex flex-col gap-3 sm:col-span-2'>
          {formInputs['title']}
          <DataDropDown type='categorie' getValue={getValue} setValue={setValue} data={categories} />
          {tags}
        </div>
        {isEdit && <FormationYear formationYears={formationYears} getValue={getValue} setValue={setValue} />}

      </div>

      {details}
    </div>
  );
}
