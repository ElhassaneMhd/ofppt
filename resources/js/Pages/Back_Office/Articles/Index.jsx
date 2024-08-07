import PageLayout from '@/layouts/Back_Office/PageLayout';
import ArticlesList from './ArticlesList';

export default function Index({ articles = [], categories = [] }) {
  return (
    <PageLayout title='Articles' count={articles.length}>
      <ArticlesList articles={articles} categories={categories}  />
    </PageLayout>
  );
}
