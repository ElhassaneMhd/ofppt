import { Tags } from './ArticleDetails/Tags';
import { LatestArticles } from './ArticleDetails/LatestArticles';
import { Details } from './ArticleDetails/Details';
import { Breadcrumbs } from '@/components/ui/BreadCrumbs';

export default function ArticleDetails({ article = {} }) {
  return (
    <>
      <div className='text-text-primary'>
        <Breadcrumbs />
      </div>
      <div className='mt-3 grid-cols-3 gap-10 lg:grid'>
        {Object.keys(article).length > 0 && <Details article={article} />}
        <Aside currentArticleId={article.id} />
      </div>
    </>
  );
}

function Aside({ currentArticleId }) {
  return (
    <aside className='mt-10 space-y-8 lg:mt-0'>
      <LatestArticles currentArticleId={currentArticleId} />
      <Tags />
    </aside>
  );
}
