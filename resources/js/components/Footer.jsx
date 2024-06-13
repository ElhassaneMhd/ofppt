import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';

export default function Footer() {
  return (
    <footer className='relative mt-8 flex items-center justify-between gap-6 border-t border-border bg-background-primary px-28 py-3 shadow-md'>
      <Logo className='w-16' link='https://www.ofppt.ma' />
      <div className='flex justify-end gap-4'>
        <SocialMedia />
      </div>
    </footer>
  );
}

function SocialMedia() {
  return (
    <>
      <a
        href='https://www.facebook.com/ofppt.page.officielle/'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#1877f2]'
      >
        <GrFacebookOption className='text-text-primary transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.youtube.com/c/ofpptchaineofficielle'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#ff0000]'
      >
        <GrYoutube className='text-text-primary transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://twitter.com/OFPPT_Officiel'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#1da1f2]'
      >
        <GrTwitter className='text-text-primary transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.instagram.com/ofppt.officiel/'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#e1306c]'
      >
        <GrInstagram className='text-text-primary transition-colors duration-300 group-hover:text-white' />
      </a>
      <a
        href='https://www.linkedin.com/company/ofpptpageofficielle/'
        className='group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[#0a66c2]'
      >
        <GrLinkedin className='text-text-primary transition-colors duration-300 group-hover:text-white' />
      </a>
    </>
  );
}

export function Logo({ className }) {
  return (
    <a href=''>
      <img src='/images/logo.png' alt='logo' className={className} />
    </a>
  );
}
