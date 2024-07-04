import { Head } from '@inertiajs/react';
import HeroSection from '@/components/Front_End/HeroSection';
import FilieresSection from './Filieres/FilieresSection';
import ArticlesSection from './Blog/ArticlesSection';
import EventsSection from './Events/EventsSection';
import SectorsSection from './Filieres/SectorsSection';

export default function HomePage({ articles, events, filieres, sectors, sectorsWithCount }) {
  console.log(filieres);
  return (
    <>
      <Head title='Home' />
      <HeroSection />
      <SectorsSection
      // sectors={sectors}
      />
      <FilieresSection filieres={filieres?.slice(0, 10)} />
      <EventsSection events={events.slice(0, 10)} />
      <ArticlesSection articles={articles.slice(0, 3)} />
    </>
  );
}
