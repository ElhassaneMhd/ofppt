import Create from './Create';

export default function Edit({ user = {}, roles, permissions }) {
  return <Create defaultValues={user} isEdit={true} roles={roles} permissions={permissions} />;
}
