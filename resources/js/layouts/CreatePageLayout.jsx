import { cloneElement, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Details, Tags } from '@/Pages/Shared';
import { useForm } from '@/hooks';
import { useNavigate } from '@/hooks/useNavigate';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { filterObject } from '@/utils/helpers';

export default function CreatePageLayout({ children, name, formOptions, isEdit }) {
  const navigate = useNavigate();
  const { options } = useForm({
    ...formOptions,
    onSubmit: (data) => {
      const newData = {
        ...filterObject(data, ['image', 'formationYear'], 'exclude'),
        tags: data.tags?.join(','),
        files: data.files?.map((f) => f.file || f.id),
        ...(isEdit && { year_id: data.formationYear.id }),
      };

      console.log(newData);
      navigate({
        url: `${name.toLowerCase()}s.${isEdit ? 'update' : 'store'}`,
        method: isEdit ? 'put' : 'post',
        data: newData,
        ...(isEdit && { params: [data.id] }),
      });
    },
  });
  const [editorInstance, setEditorInstance] = useState(null);
  const resetDetails = () => {
    editorInstance && editorInstance.commands.setContent(formOptions?.defaultValues?.details || '');
  };

  const { isUpdated, getValue, setValue, handleSubmit, reset } = options;

  const title = isEdit ? `Edit ${name}` : `New ${name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex h-full flex-col'>
        <h1 className='mb-5 text-2xl font-semibold text-text-primary'>{title}</h1>

        <ModalFormLayout
          submitButton={{
            text: isEdit ? 'Save Changes' : `Create ${name}`,
            disabled: !isUpdated,
            onClick: () => handleSubmit(resetDetails, { resetToDefault: true }),
          }}
          cancelButton={{
            disabled: !isUpdated,
            onClick: () => reset(resetDetails),
          }}
          backButton={{ route: `${name.toLowerCase()}s` }}
        >
          {cloneElement(children, {
            options: { ...options, reset: () => reset(resetDetails) },
            details: <Details getValue={getValue} setValue={setValue} setEditorInstance={setEditorInstance} />,
            tags: <Tags getValue={getValue} setValue={setValue} />,
          })}
        </ModalFormLayout>
      </div>
    </>
  );
}
