import parse from 'html-react-parser';
import Overlay from '@/components/Overlay';
import Pagination from '@/components/ui/Pagination';
import Results from '@/components/ui/Results';
import { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoPricetagOutline } from 'react-icons/io5';

function Articles({ articles, categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [usedArticles, setUsedArticles] = useState(articles);
  console.log(usedArticles);
  const displayedItems = 2;
  const displayedRows = 3;
  const resultsNum = displayedItems * displayedRows;
  const resultsRetrieved = currPage * resultsNum > usedArticles.length ? usedArticles.length : currPage * resultsNum;
  const displayedArticles = usedArticles.slice((currPage - 1) * resultsNum, currPage * resultsNum);
  console.log(displayedArticles.length);
  const paginationLinksNum = Math.ceil(usedArticles.length / resultsNum);

  function handlePaginate(value) {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage(value);
      setIsLoading(false);
    }, 1000);
  }

  function handlePaginatePrevious() {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage((curr) => (curr > 1 ? curr - 1 : curr));
      setIsLoading(false);
    }, 1000);
  }

  function handlePaginateNext() {
    setIsLoading(true);
    setTimeout(() => {
      setCurrPage((curr) => (curr < paginationLinksNum ? curr + 1 : curr));
      setIsLoading(false);
    }, 1000);
  }

  return (
    <section className='mt-12 px-28'>
      <h1 className='mb-12 text-5xl font-medium'>Articles</h1>
      <div className='mb-8 grid grid-cols-[3fr_1fr] gap-8'>
        <div>
          <Results resultsRetrieved={resultsRetrieved} items={usedArticles} />
          <ArticlesList usedArticles={displayedArticles} isLoading={isLoading} />
        </div>
        <div className='self-start bg-gray-100 p-4'>
          <h3 className='mb-4 text-xl font-semibold'>Categories</h3>
          {categories.map((category) => (
            <li className='mb-2 list-none font-light'>
              <span className='hover:text-blue-500'>{category}</span>
            </li>
          ))}
        </div>
      </div>
      <Pagination
        paginationLinksNum={paginationLinksNum}
        activePaginationLink={currPage}
        setIsLoading={setIsLoading}
        onPaginate={handlePaginate}
        onPaginatePrevious={handlePaginatePrevious}
        onPaginateNext={handlePaginateNext}
        items={usedArticles}
      />
    </section>
  );
}

export function ArticlesList({ usedArticles, isLoading, gridNum = 2 }) {
  return (
    <ul className={`relative mt-6 grid grid-cols-${gridNum} gap-6`}>
      {usedArticles.map((article, i) => (
        <ArticleItem article={article} key={i} />
      ))}
      <Overlay isLoading={isLoading} />
    </ul>
  );
}

function ArticleItem({ article }) {
  return (
    <li className='grid grid-rows-[auto_1fr]'>
      <div>
        <img src={article.files[0]} alt='' />
      </div>
      <div className='grid bg-gray-100 px-3 py-4'>
        <a href={route(`home.articles.details`, article.id)}>
          <h3 className='mb-4 text-xl font-semibold transition-colors hover:text-blue-500'>{article.title}</h3>
        </a>
        <p className='mb-4 leading-6 text-black/80'>
          {article.details.split(' ').length > 14
            ? parse(article.details.split(' ').slice(0, 14).join(' ')) + '...'
            : parse(article.details)}
        </p>
        <div className='mb-4 flex items-center gap-4 text-black/60'>
          <div className='flex items-center gap-2'>
            <IoPricetagOutline />
            <span className='capitalize'>{article.tags.slice(0, 3).join(' ')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <FaRegCalendarAlt />
            <span>{article.date.replaceAll('-', '/')}</span>
          </div>
        </div>
        <a
          href={route(`home.articles.details`, article.id)}
          className='flex w-fit items-center gap-2 self-end transition-colors hover:text-blue-500'
        >
          <span>Read More</span>
          <FaArrowRightLong size={14} />
        </a>
      </div>
    </li>
  );
}

export default Articles;
