import { useState } from 'react';
import { MdLocalPhone, MdLocationPin, MdMail } from 'react-icons/md';
import { IoShareSocial } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
import { Button } from '../components/ui/Button';
import { useForm } from '@/hooks';
import { useNavigate } from '@/hooks/useNavigate';
import { FiCheck } from 'react-icons/fi';
import { HiMiniXMark } from 'react-icons/hi2';
import { ImSpinner5 } from 'react-icons/im';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Contact() {
  return (
    <div className='flex min-h-[80vh] flex-col gap-8 px-28 py-14 md:flex-row'>
      <ContactInfo />
      <MessageForm />
    </div>
  );
}

function ContactInfo() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <div className='flex flex-1 flex-col gap-3'>
      <div className='flex items-center gap-4 rounded-lg border border-border p-4'>
        <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
          <MdLocalPhone />
        </div>
        <div className='space-y-2'>
          <h2 className='font-bold text-text-primary'>Phone Number</h2>
          <a href='tel:+212537814207' className='text-sm font-medium text-text-secondary'>
            +212 0537814207
          </a>
        </div>
      </div>
      <div className='flex items-center gap-4 rounded-lg border border-border p-4'>
        <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
          <MdMail />
        </div>
        <div className='space-y-2'>
          <h2 className='font-bold text-text-primary'>Email Address</h2>
          <a href='mailto:contact@ofppt.ma' className='text-sm font-medium text-text-secondary'>
            contact@ofppt.ma
          </a>
        </div>
      </div>
      <div className='flex flex-col rounded-lg border border-border p-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
            <MdLocationPin />
          </div>
          <div className='flex-1 space-y-2'>
            <h2 className='font-bold text-text-primary'> Location</h2>
            <a
              href='https://maps.app.goo.gl/miz9LAa9i2FCbZNa7'
              target='_blank'
              rel='noreferrer'
              className='text-sm font-medium text-text-secondary'
            >
              Hay Salam, Salé, Morocco
            </a>
          </div>
          <button
            className={`text-text-primary transition-transform duration-300 ${isMapOpen ? 'rotate-180' : ''}`}
            onClick={() => setIsMapOpen((prev) => !prev)}
          >
            <FaChevronDown />
          </button>
        </div>
        <div
          className={`overflow-hidden rounded-lg transition-[height] duration-500 ${isMapOpen ? 'mt-3 h-40' : 'h-0'}`}
        >
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6612.656190811825!2d-6.784859!3d34.035454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76a365e377477%3A0x412ef7592257e154!2sISTA%20%3A%20Institut%20Sp%C3%A9cialis%C3%A9%20de%20Technologie%20Appliqu%C3%A9e_Hay%20Salam%20Sal%C3%A9!5e0!3m2!1sfr!2sma!4v1705526202818!5m2!1sfr!2sma'
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            width='100%'
            height='200'
          ></iframe>
        </div>
      </div>
      <div className='flex items-center gap-4 rounded-lg border border-border p-4'>
        <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
          <IoShareSocial />
        </div>
        <div className='space-y-2'>
          <h2 className='font-bold text-text-primary'> Social Media</h2>
        </div>
      </div>
    </div>
  );
}

function MessageForm() {
  const [success, setSuccess] = useState(false);
  const { navigate, isLoading, error } = useNavigate();
  const [parent] = useAutoAnimate();
  const {
    options: { formInputs, handleSubmit },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
      },
      {
        name: 'message',
        label: 'Message',
        placeholder: 'Type your message here...',
        type: 'textarea',
        rows: 6,
        rules: {
          minLength: {
            value: 100,
            message: 'Message must be at least 100 characters long',
          },
        },
      },
    ],
    onSubmit: (data) =>
      navigate({
        url: '/demands',
        method: 'post',
        data,
        options: {
          onSuccess: () => setSuccess(true),
        },
      }),
  });

  const render = () => {
    if (isLoading) return <SendingMessage />;
    if (error) return <MessageError onRetry={() => handleSubmit(null, true)} />;
    if (success) return <MessageSent />;
    return (
      <>
        <div className=''>
          <h2 className='mb-2 text-2xl font-bold text-text-primary'>Send Message</h2>
          <p className='text-text-secondary'>Please fill out the form for any inquiries or feedback.</p>
        </div>
        <form className='flex flex-1 flex-col gap-4 rounded-md p-2'>
          <div className='grid grid-cols-2 gap-3'>
            {formInputs['fullName']}
            {formInputs['email']}
          </div>
          {formInputs['subject']}
          {formInputs['message']}
          <Button className='self-start' onClick={() => handleSubmit(null, true)}>
            Send Message
          </Button>
        </form>
      </>
    );
  };

  return (
    <div
      className='flex min-h-[400px] flex-[2] flex-col gap-4 rounded-lg border-[1.2px] border-border p-5'
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
