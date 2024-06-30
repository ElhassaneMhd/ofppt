import { useAutoAnimate } from '@formkit/auto-animate/react';
import Article from './Article';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { Operations } from '@/components/shared/Operations/Operations';

export default function ArticlesList() {
  const { data: articles, layout, renderData } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  return (
    <div className='flex flex-1 flex-col gap-8 overflow-hidden'>
      <div className='flex items-center justify-between gap-3 pt-2'>
        <div className='flex gap-3'>
          <Operations.Search />
          <div className='flex gap-3'>
            <Operations.Sort />
            <Operations.Filter />
          </div>
        </div>
      <Operations.Layout />
      </div>

      <div
        className={`relative min-h-screen flex-1 gap-6 overflow-auto p-1 pr-2 ${
          layout === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-content-start sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {renderData(
          () => articles.map((article) => <Article key={article.id} article={article} layout={layout} />),
          'articles'
        )}
      </div>
      <Operations.Pagination onlyButtons={true} name='projects' />
    </div>
  );
}
