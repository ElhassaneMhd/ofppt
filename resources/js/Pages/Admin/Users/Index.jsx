import UsersList from './UsersList';
import PageLayout from '@/layouts/Admin/PageLayout';

export default function Index({ users = [], roles=[] }) {
  return (
    <PageLayout title='Users' count={users.length}>
      <UsersList users={users} roles={roles} />
    </PageLayout>
  );
}
