import { Heading } from '@/components/Heading';
import { Head } from '@inertiajs/react';
import FilieresList from './FilieresList';

export default function Index({ filiers }) {
  return (
    <>
      <Head>
        <title>Filieres</title>
      </Head>
      <Heading count={filiers.length}>Filieres</Heading>
      <FilieresList filieres={filiers} />
    </>
  );
}
