import PageLayout from '@/layouts/PageLayout';
import ArticlesList from './ArticlesList';

export default function Index({ articles = [], categories = [], formationYears }) {
  return (
    <PageLayout title='Articles' count={articles.length}>
      <ArticlesList articles={articles} categories={categories} formationYears={formationYears} />
    </PageLayout>
  );
}
