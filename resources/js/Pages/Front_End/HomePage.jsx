import { Head } from '@inertiajs/react';
import HeroSection from '@/components/Front_End/HeroSection';
import FilieresSection from './Filieres/FilieresSection';
import ArticlesSection from './Blog/ArticlesSection';
import EventsSection from './Events/EventsSection';
import SectorsSection from './Filieres/SectorsSection';

export default function HomePage({ articles, events, filieres, sectorsWithCount }) {
  return (
    <>
      <Head title='Home' />
      <HeroSection />
      <SectorsSection sectors={sectorsWithCount} />
      <FilieresSection filieres={filieres} />
      <EventsSection events={events} />
      <ArticlesSection articles={articles} />
    </>
  );
}
