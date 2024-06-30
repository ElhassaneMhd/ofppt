import { Head, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function About() {
  const settings = usePage().props.settings;

  return (
    <>
      <Head title='About Us' />
      <div className='w-full space-y-3 px-5 py-8'>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(settings?.aboutDescription) }} />
      </div>
    </>
  );
}
