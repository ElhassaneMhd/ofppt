import { Heading } from '@/components/Back_Office/Heading';
import { Head } from '@inertiajs/react';

export default function PageLayout({ title, count, children }) {
  return (
    <>
      <Head title={title} />
      <Heading count={count}>{title}</Heading>
      {children}
    </>
  );
}
