import PageLayout from '@/layouts/PageLayout';
import ArticlesList from './ArticlesList';

export default function Index({ articles = [] }) {
  return (
    <PageLayout title="Articles" count={articles.length}>
      <ArticlesList articles={articles} />
    </PageLayout>
  );
}