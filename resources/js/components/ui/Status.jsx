import { HiMiniXMark, FiCheck, BsSendFill } from '@/components/ui/Icons';
import { Button } from '.';

const NoResults = ({ heading, message, size }) => {
  return (
    <>
      <img src='/images/no_result.png' alt='no results' className={size === 'small' ? 'w-[150px]' : 'w-[200px]'} />
      <div className='space-y-2'>
        <h3 className={`font-semibold text-text-secondary ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
          {heading || 'No results found'}
        </h3>
        {message && <p className={`text-text-tertiary ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{message}</p>}
      </div>
    </>
  );
};

const Error = ({ heading, message, size }) => {
  return (
    <>
      <img src='/images/error.png' alt='no results' className={size === 'small' ? 'w-10' : 'w-14'} />
      <div className='mt-3 space-y-2'>
        <h3 className={`font-semibold text-red-500 ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
          {heading || 'Something went wrong! Please try again.'}
        </h3>
        {message && <p className={`text-red-400 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{message}</p>}
      </div>
    </>
  );
};

const Loading = () => <div className='loading'></div>;



const PageNotFound = () => {
  return (
    <div className='absolute grid h-full w-full place-content-center place-items-center gap-5 pt-5'>
      <img src='/images/empty.svg' alt='' className='w-[100px]' />
      <div className='space-y-2 text-center'>
        <h2 className='font-medium text-text-primary'> Page Not Found</h2>
        <p className='text-sm text-text-secondary'>The page you&apos;re trying to access doesn&apos;t exist.</p>
      </div>
    </div>
  );
};


export function Status({ status, heading, message, size, ...props }) {
  const prs = { heading, message, size, ...props };

  const statuses = {
    noResults: <NoResults {...prs} />,
    error: <Error {...prs} />,
    loading: <Loading size={size} />,
    pageNotFound: <PageNotFound />,
  };

  return (
    <div className='absolute left-0 top-0 z-[2] flex h-full w-full flex-col items-center justify-center text-center'>
      {statuses[status]}
    </div>
  );
}
