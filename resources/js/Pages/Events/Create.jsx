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

  return <div className='flex h-full flex-col gap-5'>{details}</div>;
}
