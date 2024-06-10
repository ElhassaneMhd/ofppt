import { ModalFormLayout } from '@/layouts/ModalFormLayout';
import { Head } from '@inertiajs/react';

export default function CreatePageLayout({ children, title, buttons }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex h-full flex-col'>
        <h1 className='text-2xl font-semibold text-text-primary'>{title}</h1>

        <ModalFormLayout {...buttons}>{children}</ModalFormLayout>
      </div>
    </>
  );
}
