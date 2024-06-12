import { TableProvider as Table } from '@/components/shared/Table/TableProvider';
import { Button } from '@/components/ui';
import { useNavigate } from '@/hooks/useNavigate';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoTrashOutline } from 'react-icons/io5';
import { TbTrashOff } from 'react-icons/tb';

const defaultOptions = {
  displayNewRecord: true,
  haveTrashed: true,
  actions: null,
};

export function TableLayout({
  canView,
  hideAllRowsActions,
  hideRowActions,
  hiddenActionsContent,
  layoutOptions,
  ...tableProps
}) {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { navigate } = useNavigate();
  const { displayNewRecord, actions, haveTrashed } = { ...defaultOptions, ...(layoutOptions && layoutOptions) };

  return (
    <div className='flex h-full flex-col gap-5 overflow-auto'>
      <Table {...tableProps}>
        <div className='flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center'>
          <div className='flex items-center justify-between gap-3 sm:justify-normal'>
            <Table.Search />
            <Table.View />

            {haveTrashed && (
              <Button
                shape='icon'
                onClick={() =>
                  navigate({
                    url: tableProps.isTrashed ? `${tableProps.routeName}.index` : `/admin/${tableProps.routeName}/trashed`,
                  })
                }
              >
                {tableProps.isTrashed ? <TbTrashOff /> : <IoTrashOutline />}
              </Button>
            )}
          </div>
          <div className='flex items-center justify-between gap-3'>
            <Table.Download />
            {typeof displayNewRecord === 'boolean' && displayNewRecord ? (
              <Table.NewRecord empty={tableProps.data?.length === 0} />
            ) : (
              displayNewRecord
            )}
          </div>
        </div>
        <div
          className='relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border shadow-md'
          ref={parent}
        >
          <Table.Table
            canView={tableProps.isTrashed ? false : canView}
            hideRowActions={hideRowActions}
            hiddenActionsContent={hiddenActionsContent}
            actions={hideAllRowsActions ? null : <Table.Actions actions={actions} />}
          />
          <Table.Pagination />
        </div>
        <Table.Selected />
      </Table>
    </div>
  );
}
