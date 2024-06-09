import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/components/ui';
import { useTable } from './useTable';
import { router } from '@inertiajs/react';

export function NewRecord({ component }) {
  const { resourceName, disabled } = useTable();

  const onAdd = () => router.get(`${router?.page?.url}/create`);

  if (component) return component(onAdd);

  return (
    <Button display='with-icon' className='text-nowrap' onClick={onAdd} disabled={disabled}>
      <FaPlus />
      {`New ${resourceName}`}
    </Button>
  );
}
