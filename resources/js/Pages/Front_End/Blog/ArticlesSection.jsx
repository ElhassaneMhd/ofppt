import Section from '@/components/Front_End/Section';
import Article from './Article';

export default function ArticlesSection({ articles }) {
  return (
    <Section>
      <h2 className='text-center text-4xl font-bold tracking-widest text-text-primary sm:text-5xl'>Latest Articles</h2>
      <div className='mt-12 grid gap-x-5 gap-y-8 p-3 sm:grid-cols-2 lg:grid-cols-3'>
        {articles?.slice(articles?.length - 3)?.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </Section>
  );
}
