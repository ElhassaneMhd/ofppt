import { useForm, useUploadFile } from '@/hooks/index';
import { ModalFormLayout } from '@/layouts/Admin/ModalFormLayout';
import { GrFacebookOption, GrInstagram, GrLinkedin, GrMapLocation, GrTwitter, GrYoutube } from 'react-icons/gr';
import { FaCamera } from 'react-icons/fa6';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { ToolTip } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';
import { getFile } from '@/utils/helpers';
import { usePage } from '@inertiajs/react';
import { FormationYear } from '../Shared';

export default function General({ settings = {} }) {
  const { navigate } = useNavigate();
  const currentYear = usePage().props.year;

  const {
    options: { formInputs, isUpdated, errors, handleSubmit, reset, getValue, setValue },
  } = useForm({
    defaultValues: {
      appLogo: getFile(settings?.files?.[0]),
      email: settings?.email,
      phone: settings?.phone,
      location: settings?.location,
      maps: settings?.maps,
      facebook: settings?.facebook,
      twitter: settings?.twitter,
      instagram: settings?.instagram,
      linkedin: settings?.linkedin,
      youtube: settings?.youtube,
      formationYear: currentYear,
    },
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        rules: { required: false },
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'phone',
        rules: { required: false },
      },
      {
        name: 'location',
        label: 'Location ',
        type: 'location',
        rules: { required: false },
      },
      {
        name: 'maps',
        label: (
          <>
            <ToolTip
              content={
                <span className='text-xs text-text-secondary'>
                  To get the embed maps link from Google Maps, please watch this{' '}
                  <a
                    href='https://www.youtube.com/watch?v=R7m0e-7JCQk'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-bold text-secondary'
                  >
                    video
                  </a>
                  .
                </span>
              }
              interactive={true}
            >
              <span>
                <BsFillInfoCircleFill className='text-blue-500' />
              </span>
            </ToolTip>
            <label className='text-sm font-medium text-text-tertiary'>Embedded Google Maps</label>
          </>
        ),
        type: 'maps',
        placeholder: 'https://www.google.com/maps/embed?',
        rules: {
          pattern: {
            value: new RegExp(
              '^\\s*(https://www\\.google\\.com/maps/embed\\?|<iframe src="https://www\\.google\\.com/maps/embed\\?).*\\s*$',
              'i'
            ),
            message: 'Invalid URL. Please enter a valid Google Maps embed link.',
          },
          required: false,
        },
      },
      ...[
        {
          href: 'https://www.facebook.com',
          icon: <GrFacebookOption />,
          color: '#1877f2',
          name: 'Facebook',
        },
        {
          href: 'https://www.twitter.com',
          icon: <GrTwitter />,
          color: '#0a66c2',
          name: 'Twitter',
        },
        {
          href: 'https://www.instagram.com',
          icon: <GrInstagram />,
          color: '#e1306c',
          name: 'Instagram',
        },
        {
          href: 'https://www.linkedin.com',
          icon: <GrLinkedin />,
          color: '#1da1f2',
          name: 'Linkedin',
        },
        {
          href: 'https://www.youtube.com',
          icon: <GrYoutube />,
          color: '#ff0000',
          name: 'Youtube',
        },
      ].map((s, i, arr) => ({
        name: s.name.toLocaleLowerCase(),
        label: s.name,
        placeholder: s.href,
        ...(i === arr.length - 1 && { parentClassName: 'mobile:col-span-2' }),
        rules: {
          pattern: {
            value: new RegExp(`^((http|https):\\/\\/)?(www\\.)?${s.name.toLocaleLowerCase()}\\.com/.*$`),
            message: `Invalid URL. Please enter a valid ${s.name} link.`,
          },
          required: false,
        },
        customIcon: (
          <span
            className='absolute left-0 top-0 z-10 grid h-full w-7 place-content-center border-r border-border text-white'
            style={{ backgroundColor: s.color }}
          >
            {s.icon}
          </span>
        ),
      })),
    ],
    onSubmit: (data) => {
      navigate({
        url: 'settings.update',
        method: 'put',
        data: { ...data, files: [data.appLogo?.file], maps: extractSrc(data.maps),year_id: data.formationYear?.id},
      });
    },
    gridLayout: true,
  });
  const { openFilePicker } = useUploadFile({ onChange: (logo) => setValue('appLogo', logo) });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
      className='space-y-7'
    >
      <div className='space-y-5'>
        <h3 className='mb-3 font-bold text-text-secondary'>Basic Info</h3>
        <div className='grid gap-5 mobile:grid-cols-[208px,auto]'>
          <div
            className='group relative h-full min-h-40 overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${getValue('appLogo')?.src})`,
            }}
          >
            <button
              className={`left 0 absolute top-0 grid h-full w-full place-content-center bg-background-secondary transition-opacity duration-300 group-hover:opacity-50 ${!getValue('appLogo')?.src ? 'opacity-80 hover:bg-background-tertiary' : 'opacity-0'}`}
              onClick={openFilePicker}
            >
              <FaCamera />
            </button>
          </div>
          <div className='grid w-full items-center gap-x-5 gap-y-3 mobile:grid-cols-2'>
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']?.map((s) => formInputs[s])}
          </div>
        </div>
      </div>
      <div>
        <h3 className='mb-4 font-bold text-text-secondary'>Contact Info</h3>
        <div className='grid gap-3 sm:grid-cols-2'>
          <div className='space-y-5'>
            {formInputs['email']}
            {formInputs['phone']}
            {formInputs['location']}
            {formInputs['maps']}
          </div>

          <div className='relative rounded-lg border border-border p-3'>
            {(errors?.['maps'] || !getValue('maps')) && (
              <div className='absolute left-0 top-0 grid h-full w-full place-content-center place-items-center gap-1.5 bg-background-secondary'>
                <GrMapLocation className='text-2xl' />
                <p className='text-xs font-medium text-text-tertiary'>Invalid maps link. Please check and try again.</p>
              </div>
            )}
            <iframe
              src={extractSrc(getValue('maps'))}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='rounded-lg'
              width='100%'
              height='100%'
            ></iframe>
          </div>
        </div>
        <div className='mt-4'>
          <FormationYear getValue={getValue} setValue={setValue} />
        </div>
      </div>
    </ModalFormLayout>
  );
}

const extractSrc = (input) => {
  if (!input) return null;
  const iframeMatch = input.match(/<iframe.*?src="(.*?)".*?<\/iframe>/);
  return iframeMatch ? iframeMatch[1] : input;
};
