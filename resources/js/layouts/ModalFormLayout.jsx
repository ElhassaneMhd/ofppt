import { Button } from '@/components/ui';
import { Link } from '@inertiajs/react';
import { IoChevronBackOutline } from 'react-icons/io5';

export function ModalFormLayout({ children, submitButton, cancelButton, backButton, className = '' }) {
  return (
    <div className='flex flex-1 flex-col rounded-lg border border-border p-5 pb-3'>
      <div className={`flex-1 overflow-auto pr-2 ${className}`}>{children}</div>
      <div className='mt-5 flex flex-col-reverse justify-between gap-3 xs:flex-row'>
        {backButton && (
          // eslint-disable-next-line no-undef
          <Link href={route(`${backButton.route}.index`)}>
            <Button color='tertiary' {...backButton} display='with-icon'>
              <IoChevronBackOutline />
              {backButton.text || 'Back'}
            </Button>
          </Link>
        )}
        <div className='flex justify-between gap-3 xs:ml-auto'>
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
