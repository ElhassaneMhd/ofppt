import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoLocationSharp, IoMail } from 'react-icons/io5';
import { FiCheck } from 'react-icons/fi';
import { ImSpinner5 } from 'react-icons/im';
import { HiMiniXMark } from 'react-icons/hi2';
import PageLayout from '@/layouts/Front_End/PageLayout';
import { useForm } from '@/hooks';
import { Button } from '@/components/ui';
import { SocialMedia, isSet } from '@/components/ui/SocialMedia';
import { useNavigate } from '@/hooks/useNavigate';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { BsTelephoneFill } from 'react-icons/bs';
import { usePage } from '@inertiajs/react';

export default function Contact() {
  return (
    <PageLayout title='Contact' image='contact'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <Socials />
        <SendMessage />
        <ContactInfo />
      </div>
    </PageLayout>
  );
}

function ContactInfo() {
  const settings = usePage().props.settings;

  if (!settings.phone && !settings.email && !settings.location && !settings.maps) return null;

  return (
    <div className='relative flex flex-1 flex-col gap-5 rounded-lg border border-border bg-background-secondary'>
      <img src='/SVG/contact.svg' alt='' className='-translate- absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2' />
      <div>
        <Info label='about.phone' value={settings?.phone} icon={<BsTelephoneFill />} />
        <Info label='about.email' value={settings?.email} icon={<IoMail />} />
        <Info label='about.location' value={settings?.location} icon={<IoLocationSharp />} />
      </div>

      {settings?.maps && (
        <div className='min-h-[200px] flex-1 px-5 pb-5'>
          <iframe
            src={settings?.maps}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            width='100%'
            height='100%'
            className='rounded-xl'
          ></iframe>
        </div>
      )}
    </div>
  );
}

const Info = ({ value, label, icon }) => {
  const { t } = useTranslation();

  if (!value) return null;

  return (
    <div
      className='flex cursor-pointer items-center gap-4 border-b border-border px-4 py-3 transition-colors duration-300 hover:bg-background-tertiary'
      onClick={() => navigator.clipboard.writeText(value).then(() => toast.success(`${t(label)} copied successfully`))}
    >
      <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>{icon}</div>
      <div className='space-y-1'>
        <h3 className='text-xs font-medium text-text-secondary'> {t(label)}</h3>
        <h2 className='text-sm font-semibold text-text-primary'>{value}</h2>
      </div>
    </div>
  );
};

function Socials() {
  const settings = usePage().props.settings;

  if (!isSet(settings)) return null;

  return (
    <div className='flex gap-4 flex-col items-center'>
      <div className='h-10 w-0.5 bg-border'></div>
      <h3 className='vertical text-xs font-medium uppercase text-text-tertiary'>Follow Us</h3>
      <div className='h-10 w-0.5 bg-border'></div>
      <SocialMedia settings={settings} className='flex-col gap-2' />
    </div>
  );
}

function SendMessage() {
  const { isLoading, isSuccess, error, navigate } = useNavigate();
  const onSend = (data) => navigate({ url: '/demands', method: 'POST', data });
  const {
    options: { formInputs, handleSubmit, values },
  } = useForm({
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'phone',
      },
      {
        name: 'subject',
        label: 'Subject',
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        rows: 6,
        parentClassName: 'sm:col-span-2',
      },
    ],
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    onSubmit: onSend,
  });
  const [parent] = useAutoAnimate({ duration: 400 });

  const render = () => {
    if (isSuccess) return <MessageSent />;
    if (error) return <MessageError onRetry={() => onSend(values)} />;
    if (isLoading) return <SendingMessage />;
    return (
      <>
        <div>
          <h2 className='mb-2 text-2xl font-bold text-text-primary'>Send Message</h2>
          <p className='text-text-secondary'>Please fill out the form for any inquiries or feedback.</p>
        </div>
        <div className='grid gap-5 sm:grid-cols-2'>{Object.values(formInputs).map((input) => input)}</div>
        <Button onClick={handleSubmit}>Send Message</Button>
      </>
    );
  };

  return (
    <div
      className='flex min-h-[400px] flex-[2] flex-col gap-4 rounded-lg border border-border bg-background-secondary p-5'
      ref={parent}
    >
      {render()}
    </div>
  );
}
function SendingMessage() {
  return (
    <div className='flex flex-1 items-center justify-center gap-3'>
      <ImSpinner5 className='animate-spin text-3xl text-secondary' />
      <h2 className='text-lg font-bold text-text-primary'>Sending Message...</h2>
    </div>
  );
}
function MessageSent() {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='mb-3 grid h-14 w-14 place-content-center rounded-full bg-green-500 shadow-md'>
        <FiCheck className='text-2xl text-white' />
      </div>
      <h2 className='text-lg font-bold text-text-primary sm:text-xl md:text-2xl'>Message Sent</h2>
      <p className='text-sm font-medium text-text-secondary sm:text-base'>Your message was sent successfully.</p>
    </div>
  );
}
function MessageError({ onRetry }) {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='grid h-14 w-14 place-content-center rounded-full bg-red-500 shadow-md'>
        <HiMiniXMark className='text-3xl text-white' />
      </div>
      <div className='my-3'>
        <h2 className='text-lg font-bold text-text-primary sm:text-xl md:text-2xl'>Failed To Send Message</h2>
        <p className='text-sm font-medium text-text-secondary sm:text-base'>
          An error occurred while sending your message
        </p>
      </div>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}
