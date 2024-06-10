import UsersList from './UsersList';
import PageLayout from '@/layouts/PageLayout';

export default function Index({ users = [] }) {
  return (
    <PageLayout title='Users' count={users.length}>
      <UsersList users={users} />
    </PageLayout>
  );
}
