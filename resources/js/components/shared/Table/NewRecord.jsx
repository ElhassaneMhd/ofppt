import { FaPlus } from 'react-icons/fa6';
import { Button } from '@/components/ui';
import { useTable } from './useTable';
import { useNavigate } from '@/hooks/useNavigate';

export function NewRecord({ component,empty }) {
  const { resourceName, disabled, routeName } = useTable();
  const { navigate } = useNavigate();

  const onAdd = () => navigate({ url: `${routeName}.create` });

  if (component) return component(onAdd);

  return (
    <Button display='with-icon' className='text-nowrap' onClick={onAdd} disabled={!empty && disabled}>
      <FaPlus />
      {`New ${resourceName}`}
    </Button>
  );
}
