import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useTheme } from '@/hooks';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

function PageLayout({ children }) {
  const { url } = usePage();
  const { changeTheme } = useTheme();

  useEffect(() => {
    changeTheme('light');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex min-h-screen flex-col gap-5'>
      <Head title={url === '/' ? 'Home' : url.slice(1).charAt(0).toUpperCase() + url.slice(2)} />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default PageLayout;
