import PageLayout from '@/layouts/Front_End/PageLayout';
import ArticlesList from './ArticlesList';
import { Operations } from '@/components/shared/Operations/Operations';
import { getFilter } from '@/utils/helpers';

export default function Blog({ articles, categories }) {
  return (
    <PageLayout title='Blog' image='blog'>
      <Operations
        data={articles}
        sortOptions={[
          { key: 'date', display: 'Publication Date', type: 'date' },
          { key: 'title', display: 'Title', type: 'string' },
        ]}
        defaultSortBy='title'
        defaultDirection='desc'
        filters={{ ...getFilter('categorie', categories) }}
        defaultLayout='grid'
        fieldsToSearch={['title']}
      >
        <ArticlesList />
      </Operations>
    </PageLayout>
  );
}
