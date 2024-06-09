import { TableProvider as Table } from '@/components/shared/Table/TableProvider';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const defaultOptions = {
  displayNewRecord: true,
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
  const { displayNewRecord, actions } = { ...defaultOptions, ...(layoutOptions && layoutOptions) };

  return (
    <div className='flex h-full flex-col gap-5 overflow-auto'>
      <Table {...tableProps}>
        {( tableProps.data?.length === 0) || (
          <div className='flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center'>
            <div className='flex items-center justify-between gap-3 sm:justify-normal'>
              <Table.Search />
              <Table.View />
            </div>
            <div className='flex items-center justify-between gap-3'>
              <Table.Download />
              {typeof displayNewRecord === 'boolean' && displayNewRecord ? <Table.NewRecord /> : displayNewRecord}
            </div>
          </div>
        )}
        <div
          className='relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border shadow-md'
          ref={parent}
        >
          <Table.Table
            canView={canView}
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
