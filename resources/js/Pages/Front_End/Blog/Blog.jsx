import PageLayout from '@/layouts/Front_End/PageLayout';
import ArticlesList from './ArticlesList';

export default function Blog({ articles, categories }) {
  return (
    <PageLayout title='Blog' image='blog'>
      <div className='space-y-8'>
        <ArticlesList articles={articles} categories={categories} />
      </div>
    </PageLayout>
  );
}
