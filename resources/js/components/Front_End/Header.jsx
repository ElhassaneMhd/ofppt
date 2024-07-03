import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import { FaChevronDown } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Logo } from '@/components/ui/Logo';
import { routes } from '@/utils/constants';
import { MobileHeader } from './MobileHeader';
import { ThemeToggler } from '../Back_Office/ThemeToggler';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '../ui';
import { useIndicator } from '@/hooks/useIndicator';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [url]);

  return (
    <header className='relative flex items-center justify-between border-b border-border bg-background-primary px-5 py-3 shadow-md'>
      <Logo className='w-20' />
      <Links />

      <div className='flex items-center gap-2'>
        <ThemeToggler layout='' />
        <Button shape='icon' onClick={() => setIsMobileMenuOpen(true)} className='bg-transparent lg:hidden'>
          <RxHamburgerMenu size={18} />
        </Button>
      </div>

      <MobileHeader isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

// Links

function Links() {
  const { url } = usePage();
  const { ref, indicator } = useIndicator('/', 'bottom-0');

  return (
    <ul className='hidden gap-8 lg:flex lg:flex-1 lg:justify-center' ref={ref}>
      {indicator}
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.path}
          data-tab={route.label.toLowerCase()}
          className={` ${url.startsWith(route.path) ? 'active' : ''}`}
        >
          <DropDown paths={route.nested}>
            <li className='relative flex items-center gap-3 text-sm font-semibold text-text-secondary transition-colors duration-300'>
              <span>{route.label}</span>
              {route.nested && <FaChevronDown />}
            </li>
          </DropDown>
        </Link>
      ))}
    </ul>
  );
}

function DropDown({ children, paths }) {
  return (
    <Tippy
      content={
        paths && (
          <ul>
            {paths.map((option) => (
              <li
                key={option.label}
                className='border-t border-border px-5 py-3 font-semibold text-text-secondary first:border-none hover:text-text-tertiary'
              >
                {option.label}
              </li>
            ))}
          </ul>
        )
      }
      arrow={false}
      interactive={true}
      trigger='mouseenter'
      className='mt-3 border border-border bg-background-primary shadow-lg'
      placement='bottom-start'
    >
      {children}
    </Tippy>
  );
}
