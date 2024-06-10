import { cloneElement, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Details, Tags } from '@/Pages/Shared';
import { Switch } from '@/components/ui';
import { useForm } from '@/hooks';
import { useNavigate } from '@/hooks/useNavigate';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { filterObject } from '@/utils/helpers';

export default function CreatePageLayout({ children, name, formOptions, isEdit }) {
  const navigate = useNavigate();
  const { options } = useForm({
    ...formOptions,
    onSubmit: (data) => {
      console.log(data);
      const newData = {
        ...data,
        tags: data.tags?.join(','),
        files: [data?.image?.file],
      };
      navigate({
        url: `${name.toLowerCase()}s.${isEdit ? 'update' : 'store'}`,
        method: isEdit ? 'put' : 'post',
        data: filterObject(newData, ['image'], 'exclude'),
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
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-text-primary'>{title}</h1>
          {getValue && (
            <Switch
              checked={getValue('visibility') === 'true'}
              onChange={(e) => setValue('visibility', String(e.target.checked))}
            />
          )}
        </div>
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
