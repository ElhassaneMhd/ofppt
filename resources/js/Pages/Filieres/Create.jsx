import { useForm } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';

export default function Create() {
  const {
    Form,
    options: { isUpdated, dirtyFields, handleSubmit, reset, updateValues },
  } = useForm({
    defaultValues: {
      title: '',
      details: '',
      sector: '',
      publisher: '',
      tags: '',
      max_stagiaires: '',
      formationYear: '',
    },
    fields: [],
    onSubmit: (data) => {},
  });

  return (
    <CreatePageLayout
      title='New Filiere'
      buttons={{
        submitButton: {
          text: 'Create Filiere',
          disabled: !isUpdated,
          // onClick: () => handleSubmit(close, { resetToDefault }),
        },
        cancelButton: { onClick: () => reset(close) },
        backButton: { route: 'filieres' },
      }}
    >
      <div className='flex h-full flex-col'>
        <h1 className='text-2xl font-semibold text-text-primary'>New Filiere</h1>
        {Form}
      </div>
    </CreatePageLayout>
  );
}
