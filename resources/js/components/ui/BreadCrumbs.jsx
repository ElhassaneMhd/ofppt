import { Link } from '@inertiajs/react';

export function Breadcrumbs() {
  return (
    <div className='flex gap-2'>
      {location.pathname.split('/').map((crumb) => (
        <Link
          key={crumb}
          className='font-bold capitalize text-white/50 transition-colors duration-300 before:mr-2 before:content-[">"] first:before:content-none hover:text-secondary'
          href={`/${crumb}`}
        >
          {crumb === '' ? 'home' : crumb}
        </Link>
      ))}
    </div>
  );
}
