import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';

// eslint-disable-next-line react-refresh/only-export-components
export const socialMediaLinks = [
  { name: 'Facebook', icon: <GrFacebookOption />, url: 'https://www.facebook.com/ofppt.page.officielle/', bgColor: '#1877f2' },
  { name: 'Youtube', icon: <GrYoutube />, url: 'https://www.youtube.com/c/ofpptchaineofficielle', bgColor: '#ff0000' },
  { name: 'Twitter', icon: <GrTwitter />, url: 'https://twitter.com/OFPPT_Officiel', bgColor: '#1da1f2' },
  { name: 'Instagram', icon: <GrInstagram />, url: 'https://www.instagram.com/ofppt.officiel/', bgColor: '#e1306c' },
  { name: 'Linkedin', icon: <GrLinkedin />, url: 'https://www.linkedin.com/company/ofpptpageofficielle/', bgColor: '#0a66c2' },
];

export function SocialMedia() {
  return (
    <>
      {socialMediaLinks.map(({ icon, url, bgColor }) => (
        <a
          key={url}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className={`group grid h-8 w-8 cursor-pointer place-content-center rounded-full border border-border transition-colors duration-300 hover:border-transparent hover:bg-[${bgColor}]`}
        >
          <div className='text-text-primary transition-colors duration-300 group-hover:text-white'>{icon}</div>
        </a>
      ))}
    </>
  );
}
