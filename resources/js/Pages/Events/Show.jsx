import { getFile } from '@/utils/helpers';
import Create from './Create';

export default function Show({ event = {} }) {
  return (
    <div>
      <div>
        <h1 className='mb-5 text-2xl font-semibold text-text-primary'>{event?.title}</h1>
      </div>
      <div className='flex'>
        {event.files.length < 1 && (
          <div>
            <h1 className='mb-5 text-2xl font-semibold text-text-primary'>No Image Provided</h1>
          </div>
        )}
        {event.files.map((file) => (
          <div key={file.id} className='flex items-center justify-between border-b border-border p-2'>
            <div className='flex items-center gap-2'>
              <img src={file.url} alt={file.name} className='h-48 w-48' />
            </div>
          </div>
        ))}
          </div>
          <div>
           {event?.details}
          </div>
    </div>
  );
}
