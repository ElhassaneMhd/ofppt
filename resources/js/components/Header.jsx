/* eslint-disable no-undef */
import { usePage } from '@inertiajs/react';

function Header() {
  const { url } = usePage();

  return (
    <section className={'px-28 py-4'}>
      <div className='flex items-center'>
        <div>
          <img src='/images/logo.png' alt='Logo' className='w-16' />
        </div>
        <ul className='flex flex-1 justify-center gap-8 text-lg'>
          {['home', 'blog', 'filieres', 'events', 'contact'].map((page, i) => (
            <li
              key={i}
              className={`${page === url.slice(1) ? 'border-b-2 border-blue-500 text-blue-500' : ''} capitalize hover:text-blue-500`}
            >
              <a href={`${route(`home.${page}`)}`}>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Header;
