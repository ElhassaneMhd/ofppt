import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaArrowRightLong, FaRegUser } from 'react-icons/fa6';
import { IoPricetagOutline, IoTicketOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';

export default function Details({ element: article = {}, elements: articles = {} }) {
  return (
    <section className='mt-12 px-28'>
      <div className='grid grid-cols-[3fr_1fr] gap-4'>
        <div>
          <div className='mb-6'>
            <img src='/images/hero-bg.png' alt='' />
          </div>
          <div className='mb-12 border-b-[1px] border-b-black/20 pb-8'>
            <h1 className='mb-4 text-3xl font-semibold'>{article?.title}</h1>
            <div className='mb-4 flex items-center gap-6 text-black/60'>
              <div className='flex items-center gap-1'>
                <FaRegUser />
                <span>{article.publisher}</span>
              </div>
              <div className='flex items-center gap-1'>
                <MdOutlineDateRange />
                <span>{article.date.replaceAll('-', '/')}</span>
              </div>
              <div className='flex items-center gap-1'>
                <IoTicketOutline />
                <span>{article.categorie}</span>
              </div>
            </div>
            <p className='mb-8 text-black/60'>{article.details}</p>
            <div className='flex items-center gap-4 text-black/70'>
              <span>Tag:</span>
              <ul className='flex flex-wrap gap-2'>
                {article.tags.map((tag, i) => (
                  <li className='border-[1px] border-black px-3' key={i}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Tags tags={article.tags} />
      </div>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>You May Also Like</h2>
          <a href='' className='flex w-fit items-center gap-2 transition-colors hover:text-blue-500'>
            <span>Read More</span>
            <FaArrowRightLong size={14} />
          </a>
        </div>
        <MayAlsoLikeArticles articles={articles} />
      </div>
    </section>
  );
}

function MayAlsoLikeArticles({ articles }) {
  return (
    <ul className='grid grid-cols-3 gap-6'>
      {articles.slice(0, 3).map((article, i) => (
        <MayAlsoLikeArticle key={i} article={article} />
      ))}
    </ul>
  );
}

function MayAlsoLikeArticle({ article }) {
  return (
    <li className='grid grid-rows-[auto_1fr]'>
      <div>
        <img src='/images/hero-bg.png' alt='' />
      </div>
      <div className='grid bg-gray-100 px-3 py-4'>
        <a href=''>
          <h3 className='mb-4 text-xl font-semibold transition-colors hover:text-blue-500'>{article.title}</h3>
        </a>
        <p className='mb-2 leading-6 text-black/60'>
          {article.details.split(' ').length > 14
            ? article.details.split(' ').slice(0, 14).join(' ') + '...'
            : article.details}
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
        <a href='' className='flex w-fit items-center gap-2 self-end transition-colors hover:text-blue-500'>
          <span>Read More</span>
          <FaArrowRightLong size={14} />
        </a>
      </div>
    </li>
  );
}

export function Tags({ tags }) {
  return (
    <div className='self-start bg-gray-100 p-4'>
      <h3 className='mb-4 text-xl font-semibold'>Tags</h3>
      <ul className='flex flex-wrap gap-2'>
        {tags.map((tag, i) => (
          <li key={i} className='border-[1px] border-black/70 px-3 text-black/70'>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
