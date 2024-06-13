import Hero from '@/Pages/Home/Hero';
import Sectors from '@/Pages/Filieres/Sectors';
import FilieresSection from '../Filieres/FilieresSection';
import EventsSection from '../Events/EventsSection';

function Homepage({ sectorsWithStats, filieres, sectors, events }) {
  return (
    <>
      <Hero />
      <Sectors sectorsWithStats={sectorsWithStats} />
      <FilieresSection filieres={filieres} sectors={sectors} />
      <EventsSection events={events} />
    </>
  );
}

export default Homepage;
