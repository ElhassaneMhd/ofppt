import { Head, usePage } from '@inertiajs/react';
import { sanitize } from '@/utils/helpers/';

export default function About() {
  const settings = usePage().props.settings;

  return (
    <>
      <Head title='About Us' />
      <div className='w-full space-y-3 px-5 py-8'>
        <div dangerouslySetInnerHTML={{ __html: sanitize(settings?.aboutDescription) }} />
      </div>
    </>
  );
}
