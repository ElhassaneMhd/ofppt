import { SocialMedia } from '@/components/ui/SocialMedia';
import { Logo } from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className='relative mt-auto flex items-center justify-between gap-6 border-t border-border bg-background-primary px-5 py-3 shadow-md'>
      <Logo className='w-20' link='https://www.ofppt.ma' />
      <div className='flex justify-end gap-4'>
        <SocialMedia />
      </div>
    </footer>
  );
}

// function Link({ children }) {
//   return (
//     <li className='relative h-8 w-fit overflow-hidden text-text-tertiary transition-colors duration-300 before:absolute  before:bottom-0 before:left-0 before:h-[1px] before:w-full  before:-translate-x-full before:bg-white before:transition-transform before:duration-500 hover:text-text-tertiary hover:text-white hover:before:translate-x-0'>
//       {children}
//     </li>
//   );
// }
