import { Head, usePage } from '@inertiajs/react';
import { LongDetails } from '@/components/Front_End/Details';

export default function About() {
  const settings = usePage().props.settings;

  return (
    <>
      <Head title='About Us' />
      <div className='w-full space-y-3 px-5 py-8'>
        <LongDetails details={settings?.aboutDetails} />
      </div>
    </>
  );
}
