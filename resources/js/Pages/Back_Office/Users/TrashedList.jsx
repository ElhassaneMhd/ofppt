import PageLayout from '@/layouts/Back_Office/PageLayout';
import UsersList from './UsersList';

export default function TrashedList({ data = [], additionalData = {} }) {
  const { roles } = additionalData;

  return (
    <PageLayout title='Trashed Users' count={data.length}>
      <UsersList users={data} roles={roles} isTrashed={true} />
    </PageLayout>
  );
}
