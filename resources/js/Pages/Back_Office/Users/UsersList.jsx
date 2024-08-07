import { TableLayout } from '@/layouts/Back_Office/TableLayout';
import { useOptions } from '../Shared';
import { filterObject, getFilter } from '@/utils/helpers';

export default function UsersList({ users, roles, isTrashed }) {
  const { columns, options } = useOptions({ routeName: 'users', resourceName: 'User', isTrashed });

  return (
    <TableLayout
      data={users}
      canView={false}
      columns={[
        columns.id,
        {
          key: 'firstName',
          displayLabel: 'First Name',
          visible: true,
          type: 'string',
        },
        {
          key: 'lastName',
          displayLabel: 'Last Name',
          visible: true,
          type: 'string',
        },
        {
          key: 'email',
          displayLabel: 'Email',
          visible: true,
          type: 'string',
        },
        {
          key: 'phone',
          displayLabel: 'Phone',
          visible: true,
          type: 'string',
        },
        {
          key: 'role',
          displayLabel: 'Role',
          visible: true,
          type: 'string',
          filter: true,
        },
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'location', 'publisher']}
      selectedOptions={{ deleteOptions: options.selectedOptions.deleteOptions }}
      filters={{
        ...filterObject(options.filters, ['created_at'], 'include'),
        ...getFilter('role', roles, 'name'),
      }}
      layoutOptions={{
        actions: (def) => [...(isTrashed ? [def.restore] : [def.edit]), def.delete],
        displayNewRecord: !isTrashed,
      }}
      isTrashed={isTrashed}
    />
);
}
