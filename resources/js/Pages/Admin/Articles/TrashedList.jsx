import PageLayout from '@/layouts/Admin/PageLayout';
import ArticlesList from './ArticlesList';

export default function TrashedList({ data = [], additionalData = {} }) {
  const { categories, formationYears } = additionalData;

  return (
    <PageLayout title='Trashed Articles' count={data.length}>
      <ArticlesList articles={data} categories={categories} formationYears={formationYears} isTrashed={true} />
    </PageLayout>
  );
}
