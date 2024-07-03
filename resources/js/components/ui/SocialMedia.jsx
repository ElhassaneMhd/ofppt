import { useState } from 'react';
import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';
import { Button } from '.';

// eslint-disable-next-line react-refresh/only-export-components
export const socialMediaLinks = [
  {
    name: 'Facebook',
    icon: <GrFacebookOption />,
    url: 'https://www.facebook.com/ofppt.page.officielle/',
    bgColor: '#1877f2',
  },
  { name: 'Youtube', icon: <GrYoutube />, url: 'https://www.youtube.com/c/ofpptchaineofficielle', bgColor: '#ff0000' },
  { name: 'Twitter', icon: <GrTwitter />, url: 'https://twitter.com/OFPPT_Officiel', bgColor: '#1da1f2' },
  { name: 'Instagram', icon: <GrInstagram />, url: 'https://www.instagram.com/ofppt.officiel/', bgColor: '#e1306c' },
  {
    name: 'Linkedin',
    icon: <GrLinkedin />,
    url: 'https://www.linkedin.com/company/ofpptpageofficielle/',
    bgColor: '#0a66c2',
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const isSet = (settings) => socialMediaLinks.map((s) => s.name.toLocaleLowerCase()).some((s) => settings?.[s]);

export function SocialMedia({ settings, className = 'gap-3', size }) {
  const [hovered, setHovered] = useState(null);

  if (!isSet(settings)) return null;

  return (
    <div className={`relative flex items-center justify-center  ${className}`}>
      {socialMediaLinks
        .filter((s) => settings?.[s.name.toLocaleLowerCase()])
        .map((s, index) => {
          const url = settings?.[s.name.toLocaleLowerCase()];
          const href = url?.startsWith('http://') || url?.startsWith('https://') ? url : 'http://' + url;

          return (
            <a
              key={s.name}
              href={href}
              target='_blank'
              className='group'
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <Button
                shape='icon'
                className={`rounded-full text-text-primary group-hover:text-white`}
                style={{ backgroundColor: hovered === index ? s.bgColor : 'transparent' }}
                size={size}
              >
                {s.icon}
              </Button>
            </a>
          );
        })}
    </div>
  );
}
