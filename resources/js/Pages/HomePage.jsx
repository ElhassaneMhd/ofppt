import Events from '@/components/Events';
import Filieres from '@/components/Filieres';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sectors from '@/components/Sectors';

function Homepage({ pageName, pages, sectorsWithStats, filieres, sectors, events }) {
  return (
    <>
      <Header pageName={pageName} pages={pages} />
      <Hero />
      <Sectors sectorsWithStats={sectorsWithStats} />
      <Filieres filieres={filieres} sectors={sectors} />
      <Events events={events} />
    </>
  );
}

export default Homepage;
