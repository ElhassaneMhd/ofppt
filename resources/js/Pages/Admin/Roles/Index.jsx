import PageLayout from '@/layouts/Admin/PageLayout';

export default function Index({ items = [] }) {
  return (
    <PageLayout title='Items' count={items.length}>
      {/* <ItemsList items={items} /> */}
    </PageLayout>
  );
}
