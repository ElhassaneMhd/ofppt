import { useForm, useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { DataDropDown, Details, Tags } from '../Shared';
import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';

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
  const {
    options: { formInputs, isUpdated, handleSubmit, reset, getValue, setValue },
  } = useForm({
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
    onSubmit: (data) => {
      console.log(data);
    },
  });
  const { openFilePicker } = useUploadFile({ onChange: (image) => setValue('image', image) });
  const [editorInstance, setEditorInstance] = useState(null);

  const resetDetails = () => editorInstance && editorInstance.commands.setContent(defaultValues?.details || '');

  return (
    <CreatePageLayout
      title='New Filiere'
      buttons={{
        submitButton: {
          text: 'Create Filiere',
          disabled: !isUpdated,
          onClick: () => handleSubmit(resetDetails, { resetToDefault: true }),
        },
        cancelButton: { onClick: () => reset(resetDetails) },
        backButton: { route: 'filieres' },
      }}
      getValue={getValue}
      setValue={setValue}
    >
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
        <Tags getValue={getValue} setValue={setValue} />
        <Details getValue={getValue} setValue={setValue} setEditorInstance={setEditorInstance} />
      </div>
    </CreatePageLayout>
  );
}
