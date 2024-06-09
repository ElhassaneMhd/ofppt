import { Heading } from '@/components/Heading';
import { Head } from '@inertiajs/react';
import DemandsList from './DemandsList';

export default function Index({ demands = [] }) {
  return (
    <>
      <Head>
        <title>Demands</title>
      </Head>
      <Heading count={demands.length}>Demands</Heading>
      <DemandsList demands={demands} />
    </>
  );
}
