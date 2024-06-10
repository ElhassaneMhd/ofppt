import { Details, Tags } from '@/Pages/Shared';
import { Switch } from '@/components/ui';
import { useForm } from '@/hooks';
import { useNavigate } from '@/hooks/useNavigate';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { Head } from '@inertiajs/react';
import { cloneElement, useState } from 'react';

export default function CreatePageLayout({ children, name, formOptions }) {
  const navigate = useNavigate();
  const { options } = useForm({
    ...formOptions,
    onSubmit: (data) => {
      console.log(data);
      navigate({ url: `${name.toLowerCase()}s.store`, method: 'post', data });
    },
  });
  const [editorInstance, setEditorInstance] = useState(null);
  const resetDetails = () => {
    editorInstance && editorInstance.commands.setContent(formOptions?.defaultValues?.details || '');
  };

  const { isUpdated, getValue, setValue, handleSubmit, reset } = options;

  return (
    <>
      <Head>
        <title>{`New ${name}`}</title>
      </Head>
      <div className='flex h-full flex-col'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-text-primary'>{`New ${name}`}</h1>
          {getValue && (
            <Switch checked={getValue('visibility')} onChange={(e) => setValue('visibility', e.target.checked)} />
          )}
        </div>
        <ModalFormLayout
          submitButton={{
            text: `Create ${name}`,
            disabled: !isUpdated,
            onClick: () => handleSubmit(resetDetails, { resetToDefault: true }),
          }}
          cancelButton={{ onClick: () => reset(resetDetails) }}
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
