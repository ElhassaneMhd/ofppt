import Header from '@/components/Header';

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PageLayout;
