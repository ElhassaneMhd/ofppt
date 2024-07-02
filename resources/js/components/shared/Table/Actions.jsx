import { Button, DropDown } from '@/components/ui';
import {
  IoEllipsisHorizontalSharp,
  IoEyeOutline,
  IoTrashOutline,
  MdDriveFileRenameOutline,
  MdOutlineSettingsBackupRestore,
} from '@/components/ui/Icons';
import { useTable } from './useTable';
import { useConfirmationModal } from '@/hooks/useConfirmationModal';
import { useNavigate } from '@/hooks/useNavigate';

export function Actions({ row, actions }) {
  const { confirmOptions, rows, page, onPaginate, routeName, isTrashed, resourceName } = useTable();
  const { openModal } = useConfirmationModal();
  const { navigate } = useNavigate();

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
          message: isTrashed
            ? `Are you sure you want to delete this ${resourceName.toLowerCase()} permanently ?`
            : confirmOptions.message,
          title: isTrashed ? `Delete ${resourceName} Permanently` : confirmOptions.title,
          onConfirm: () => {
            navigate({ url: `${routeName}.${isTrashed ? 'forceDelete' : 'destroy'}`, params: row.id, method: 'delete' });
            rows?.length === 1 && onPaginate(page - 1);
          },
        });
      },
    },
    ...(isTrashed && {
      restore: {
        text: 'Restore',
        icon: <MdOutlineSettingsBackupRestore />,
        onClick: () => {
          openModal({
            message: `Are you sure you want to restore this ${resourceName.toLowerCase()} ?`,
            title: `Restore ${resourceName}`,
            confirmText: 'Restore',
            buttonClassName: 'bg-green-600 hover:bg-green-700',
            icon: <MdOutlineSettingsBackupRestore />,
            iconBg: 'bg-green-600',
            onConfirm: () => {
              navigate({ url: `${routeName}.restore`, params: row.id, method: 'post' });
              rows?.length === 1 && onPaginate(page - 1);
            },
          });
        },
      },
    }),
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
