/* eslint-disable no-undef */
import { Button } from '@/components/ui';
import { formatDate } from '@/utils/helpers';
import { Link } from '@inertiajs/react';
import { FaReply } from 'react-icons/fa';
import { IoChevronBackOutline } from 'react-icons/io5';

export default function Show({ demand = {} }) {
  const { fullName, email, message, subject, created_at } = demand;
  return (
    <>
      <div className='grid gap-5 xs:grid-cols-2'>
        <div className='flex flex-col gap-1.5'>
          <label className='font-medium capitalize text-text-tertiary'>Full Name :</label>
          <p className='text-sm font-medium text-text-primary'>{fullName}</p>
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='font-medium capitalize text-text-tertiary'>Email :</label>
          <p className='text-sm font-medium text-text-primary'>{email}</p>
        </div>
      </div>
      <div className='flex flex-col gap-1.5'>
        <label className='font-medium capitalize text-text-tertiary'>Subject :</label>
        <p className='text-sm font-medium text-text-primary'>{subject}</p>
      </div>
      <div className='flex flex-col gap-1.5'>
        <label className='font-medium capitalize text-text-tertiary'>Sent Date :</label>
        <p className='text-sm font-medium text-text-primary'>{formatDate(created_at, true)}</p>
      </div>
      <div className='flex flex-col gap-1.5'>
        <label className='font-medium capitalize text-text-tertiary'>Message :</label>
        <p className='text-sm font-medium text-text-primary'>{message}</p>
      </div>
      <div className='mt-auto flex justify-between'>
        <Link href={route('demands.index')}>
          <Button color='tertiary' display='with-icon'>
            <IoChevronBackOutline />
            Back
          </Button>
        </Link>
        <a href={`mailto:${email}`}>
          <Button color='secondary' display='with-icon'>
            <FaReply />
            Reply
          </Button>
        </a>
      </div>
    </>
  );
}
