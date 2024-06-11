import { CiImageOff } from 'react-icons/ci';
import { DetailsPreview, TagsPreview } from '../Shared';
import { getFile } from '@/utils/helpers';

export default function Show({ filiere = {} }) {
  const { title, files, max_stagiaires, sector, details, tags, isActive } = filiere;

  return (
    <>
      <div className='grid gap-5 sm:grid-cols-3'>
        <div
          className='group relative grid h-full min-h-52 place-content-center overflow-hidden rounded-lg bg-background-secondary bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${getFile(files[0])?.src})`,
          }}
        >
          {~files[0]?.src && <CiImageOff className='text-4xl' />}{' '}
        </div>
        <div className='flex flex-col gap-3 sm:col-span-2'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Title :</label>
            <p className='font-medium text-text-primary'>{title}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Max Stagiaires :</label>
            <p className='font-medium text-text-primary'>{max_stagiaires}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Sector :</label>
            <p className='font-medium text-text-primary'>{sector}</p>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium capitalize text-text-tertiary'>Inscription Status :</label>
            <span
              className={`w-fit rounded-full px-5 py-1 text-xs font-medium text-white ${isActive === 'true' ? 'bg-green-600' : 'bg-red-500'}`}
            >
              {isActive === 'true' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
      <TagsPreview tags={tags} />
      <DetailsPreview details={details} />
    </>
  );
}
