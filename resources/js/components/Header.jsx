import { route } from 'ziggy-js';
import Section from './Section';

function Header({ pageName, pages }) {
  return (
    <Section className={'py-4'}>
      <div className='flex items-center'>
        <div>
          <img src='/images/logo.png' alt='Logo' className='w-16' />
        </div>
        <ul className='flex flex-1 justify-center gap-8 text-lg'>
          {pages.map((page, i) => (
            <li
              key={i}
              className={`${page === pageName ? 'border-b-2 border-blue-500 text-blue-500' : ''} capitalize hover:text-blue-500`}
            >
              <a href={`${route(`home.index`)}`}>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default Header;
