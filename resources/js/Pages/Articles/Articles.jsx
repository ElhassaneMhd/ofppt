import Results from '@/components/ui/Results';
import { useState } from 'react';
import { IoPricetagOutline } from 'react-icons/io5';

function Articles({ articles }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [usedArticles, setUsedArticles] = useState(articles);
  const displayedItems = 2;
  const displayedRows = 5;
  const resultsNum = displayedItems * displayedRows;
  const resultsRetrieved = currPage * resultsNum > usedArticles.length ? usedArticles.length : currPage * resultsNum;
  const displayedFilieres = usedArticles.slice((currPage - 1) * resultsNum);
  const paginationLinksNum = Math.ceil(usedArticles.length / resultsNum);
  return (
    <section className='mt-12 px-28'>
      <h1 className='mb-12 text-5xl font-medium'>Articles</h1>
      <Results resultsRetrieved={resultsRetrieved} items={usedArticles} />
    </section>
  );
}

function ArticlesList({ usedArticles }) {
  return (
    <ul className='grid-2 grid gap-4'>
      {usedArticles.slice(0, 2).map((article, i) => (
        <ArticleItem article={article} key={i} />
      ))}
    </ul>
  );
}

function ArticleItem({ article }) {
  return (
    <li>
      <div>
        <img src='' alt='' />
      </div>
      <div>
        <h3></h3>
        <p></p>
        <div>
          <div>
            <IoPricetagOutline />
            <span>{article.title}</span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Articles;
