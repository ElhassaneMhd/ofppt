import { useTable } from './useTable';
import { Button, DropDown } from '@/components/ui';

export function Pagination({ name }) {
  const { totalItems, totalPages, page, limit, onChangeLimit, onPaginate, disabled } = useTable();

  if (totalItems === 0 || disabled) return null;

  return (
    <div className='relative z-10 mt-auto flex flex-col justify-between gap-3 border-t border-border px-6 pb-2 pt-2 sm:flex-row sm:items-center'>
      <div className='flex flex-1 flex-col items-center justify-between gap-3 mobile:flex-row'>
        <div className='flex items-center gap-3'>
          <Span>Rows per page :</Span>
          <DropDown
            toggler={
              <DropDown.Option size='small' className='bg-background-secondary text-text-primary'>
                {limit}
              </DropDown.Option>
            }
          >
            {[5, 10, 15, 20, 30].map((el) => (
              <DropDown.Option
                key={el}
                color='tertiary'
                size='small'
                className='justify-center'
                isCurrent={el === limit}
                onClick={() => onChangeLimit(el)}
              >
                {el}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
        <Details {...{ totalItems, totalPages, page, limit, name }} />
      </div>
      <div className='flex justify-between gap-2 sm:justify-normal'>
        <Button
          color='tertiary'
          type='outline'
          className='w-20'
          size='small'
          onClick={() => page !== 1 && onPaginate(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          color='tertiary'
          type='outline'
          className='w-20'
          size='small'
          onClick={() => page <= totalPages && onPaginate(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function Details({ totalItems, totalPages, page, limit, name }) {
  return (
    <p className='no_scrollbar flex-1 overflow-auto text-center text-xs'>
      <Span>Showing</Span>
      <Span variable>{page * limit - limit + 1}</Span>
      <Span>to</Span>
      <Span variable>{page * limit > totalItems ? totalItems : page * limit}</Span>
      <Span>of</Span>
      <Span variable>{totalItems}</Span>
      <Span>{name || 'records'}</Span>
      <Span>(Page</Span>
      <Span variable>{page}</Span>
      <Span>of</Span>
      <Span variable>{totalPages}</Span>
      <Span>)</Span>
    </p>
  );
}

function Span({ children, variable }) {
  return (
    <span
      className={`ml-1 text-center text-xs sm:text-start ${
        variable ? 'font-semibold text-text-primary' : 'text-text-tertiary'
      }`}
    >
      {children ? children : '-'}
    </span>
  );
}
