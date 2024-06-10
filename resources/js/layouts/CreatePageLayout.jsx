import { Switch } from '@/components/ui';
import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { Head } from '@inertiajs/react';

export default function CreatePageLayout({ children, title, buttons, getValue, setValue }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex h-full flex-col'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-text-primary'>{title}</h1>
          {getValue && (
            <Switch checked={getValue('visibility')} onChange={(e) => setValue('visibility', e.target.checked)} />
          )}
        </div>
        <ModalFormLayout {...buttons}>{children}</ModalFormLayout>
      </div>
    </>
  );
}
