import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
} from '@/components/ui/Icons';
import { useTable } from './useTable';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useNavigate } from '@/hooks/useNavigate';

export function Actions({ row, actions }) {
  const { confirmOptions, rows, page, onPaginate, routeName } = useTable();
  const { openModal } = useConfirmationModal();
  const navigate = useNavigate();

  const defaultActions = {
    view: {
      text: 'View',
      icon: <IoEyeOutline />,
      onClick: () => navigate({ url: `${routeName}.show`, params: row.id }),
    },
    edit: {
      text: 'Edit',
      icon: <MdDriveFileRenameOutline />,
      onClick: () => navigate({ url: `${routeName}.edit`, params: row.id }),
    },
    delete: {
      text: 'Delete',
      icon: <IoTrashOutline />,
      onClick: () => {
        openModal({
          ...confirmOptions,
          onConfirm: () => {
            navigate({ url: `${routeName}.destroy`, params: row.id, method: 'delete' });
            rows?.length === 1 && onPaginate(page - 1);
          },
        });
      },
    },
  };

  const getActions = () => {
    if (typeof actions === 'function') return actions(defaultActions);
    if (Array.isArray(actions)) return actions;
    if (actions === 'defaultActions') return Object.values(defaultActions);
    return [];
  };

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <IoEllipsisHorizontalSharp />
        </Button>
      }
    >
      {getActions()
        .filter((action) => !action.hidden?.(row))
        .map((action) => (
          <DropDown.Option
            key={action.text}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(row);
            }}
          >
            {action.icon}
            {action.text}
          </DropDown.Option>
        ))}
    </DropDown>
  );
}
