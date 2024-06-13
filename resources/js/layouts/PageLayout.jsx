import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Head, usePage } from '@inertiajs/react';

function PageLayout({ children }) {
  const { url } = usePage();
  return (
    <>
      <Head title={url === '/' ? 'Home' : url.slice(1).charAt(0).toUpperCase() + url.slice(2)} />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PageLayout;
