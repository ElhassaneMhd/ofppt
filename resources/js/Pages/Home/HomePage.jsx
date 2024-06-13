import Hero from '@/Pages/Home/Hero';
import Sectors from '@/Pages/Filieres/Sectors';
import FilieresSection from '../Filieres/FilieresSection';
import EventsSection from '../Events/EventsSection';
import ArticlesSection from '../Articles/ArticlesSection';

function Homepage({ sectorsWithStats, filieres, sectors, events, articles }) {
  return (
    <>
      <Hero />
      {/* <Sectors sectorsWithStats={sectorsWithStats} /> */}
      <FilieresSection filieres={filieres} sectors={sectors} />
      <EventsSection events={events} />
      <ArticlesSection articles={articles} />
    </>
  );
}

export default Homepage;
