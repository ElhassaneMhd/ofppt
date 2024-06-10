import { TableLayout } from '@/layouts/TableLayout';
import { useOptions } from '../Shared';

export default function UsersList({ users }) {
  const { columns, options } = useOptions({ routeName: 'users', resourceName: 'User' });

  return (
    <TableLayout
      data={users}
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
        },
        columns.createdAt,
      ]}
      {...options}
      fieldsToSearch={['title', 'details', 'location', 'publisher']}
      selectedOptions={{ deleteOptions: options.selectedOptions.deleteOptions }}
    />
  );
}
