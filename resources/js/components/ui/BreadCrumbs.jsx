import { Link } from '@inertiajs/react';

export function Breadcrumbs() {
  const crumbs = location.pathname.split('/').map((crumb) => {
    return (
      <Link
        key={crumb}
        className='font-bold capitalize transition-colors duration-300 before:mr-2 before:content-[">"] first:before:content-none hover:text-text-tertiary'
        to={`/${crumb}`}
      >
        {crumb === '' ? 'home' : crumb}
      </Link>
    );
  });

  return <div className='flex gap-2'>{crumbs}</div>;
}
