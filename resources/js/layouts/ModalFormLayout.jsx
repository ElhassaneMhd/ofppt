import { Button } from '@/components/ui';
import { Link } from '@inertiajs/react';
import { IoChevronBackOutline } from 'react-icons/io5';

export function ModalFormLayout({ children, submitButton, cancelButton, backButton, className = '' }) {
  return (
    <div className='border border-border flex flex-col flex-1 p-5 pb-3 rounded-lg'>
      <div className={`flex-1 overflow-auto pr-2 ${className}`}>{children}</div>
      <div className='mt-5 flex justify-between gap-3'>
        {backButton && (
          // eslint-disable-next-line no-undef
          <Link href={route(`${backButton.route}.index`)}>
            <Button color='tertiary' {...backButton} display='with-icon'>
              <IoChevronBackOutline />
              {backButton.text || 'Back'}
            </Button>
          </Link>
        )}
        <div className='flex gap-3 ml-auto'>
          {cancelButton && (
            <Button color='tertiary' {...cancelButton}>
              {cancelButton.text || 'Cancel'}
            </Button>
          )}
          <Button {...submitButton}>{submitButton.text || 'Save Changes'}</Button>
        </div>
      </div>
    </div>
  );
}
