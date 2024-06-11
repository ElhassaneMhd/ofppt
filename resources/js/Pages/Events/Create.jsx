import { useUploadFile } from '@/hooks';
import CreatePageLayout from '@/layouts/CreatePageLayout';
import { FormationYear } from '../Shared';
import { FaCamera, FaPlus } from 'react-icons/fa';
import { Switch } from '@/components/ui';

export default function Create({
  formationYears = [],
  defaultValues = {
    files: [],
    title: '',
    details: '',
    date: '',
    location: [],
    tags: [],
    duration: '',
    upcoming: 'true',
  },
  isEdit = false,
}) {
  return (
    <CreatePageLayout
      name='Event'
      formOptions={{
        defaultValues: { ...defaultValues, ...(isEdit && { formationYear: '' }) },
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
      <Form formationYears={formationYears} isEdit={isEdit} />
    </CreatePageLayout>
  );
}

function Form({ options, details, tags, formationYears, isEdit }) {
  const { formInputs, getValue, setValue } = options;

  return (
    <div className='flex h-full flex-col gap-5'>
      <MultipleImages getValue={getValue} setValue={setValue} />
      <div className='grid gap-5 mobile:grid-cols-2'>
        {formInputs['title']}
        {formInputs['location']}
        {formInputs['duration']}
        {formInputs['date']}
        {tags}
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Event Status </label>
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
      {isEdit && <FormationYear formationYears={formationYears} getValue={getValue} setValue={setValue} />}
      {details}
    </div>
  );
}

function MultipleImages({ getValue, setValue }) {
  const { openFilePicker } = useUploadFile({
    onChange: (image) => {
      const images = getValue('files');
      images[images.length] = image;
      setValue('files', images);
    },
  });

  return (
    <div className='relative mb-8 h-60'>
      {getValue('files')?.map((image, i) => (
        <Image
          key={i}
          image={image}
          index={i}
          setImage={(image) => {
            const images = getValue('files');
            images[i] = image;
            setValue('files', images);
          }}
        />
      ))}
      <button
        className='group absolute grid h-full min-h-52 w-52 place-content-center overflow-hidden rounded-lg border border-border bg-background-secondary bg-cover bg-center bg-no-repeat hover:z-[99] hover:bg-background-tertiary'
        style={{
          transform: `translateX(${getValue('files')?.length * 60}px) translateY(${getValue('files')?.length * 5}px)`,
        }}
        onClick={() => {
          const images = getValue('files');
          if (images.length >= 10) return;
          if (images[images.length - 1]?.src === null) return;
          setValue('files', [...images, { src: null, file: null }]);
          openFilePicker();
        }}
      >
        <span className='rounded-full bg-background-tertiary p-5 text-lg'>
          <FaPlus />
        </span>
      </button>
    </div>
  );
}

function Image({ image, setImage, index }) {
  const { openFilePicker } = useUploadFile({ onChange: (image) => setImage(image) });

  return (
    <div
      className='group absolute h-full min-h-52 w-52 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat shadow-lg hover:z-[99]'
      style={{
        backgroundImage: `url(${image?.src})`,
        transform: `translateX(${index * 60}px) translateY(${index * 5}px)`,
      }}
    >
      <button
        className={`left 0 absolute top-0 grid h-full w-full place-content-center border border-border bg-background-secondary transition-opacity duration-300 ${!image?.src ? 'opacity-100 hover:bg-background-tertiary' : 'opacity-0 group-hover:opacity-50'}`}
        onClick={openFilePicker}
      >
        <FaCamera />
      </button>
    </div>
  );
}
