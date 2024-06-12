import Header from '@/components/Header';

function PageLayout({ children, pages }) {
  return (
    <>
      <Header pageName={'filieres'} pages={pages} />
      {children}
    </>
  );
}

export default PageLayout;
