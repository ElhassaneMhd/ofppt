import CreatePageLayout from '@/layouts/CreatePageLayout';

export default function Create({
  roles = [],
  permissions = [],
  defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    permissions: [],
  },
  isEdit = false,
}) {
  console.log(roles, permissions);

  return (
    <CreatePageLayout
      name='Filiere'
      formOptions={{
        defaultValues,
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            placeholder: 'Enter firstName...',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter lastName...',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email...',
          },
          {
            name: 'phone',
            label: 'Phone',
            type: 'phone',
            placeholder: 'Enter phone...',
          },
          {
            name: 'role',
            hidden: true,
          },
          {
            name: 'permissions',
            hidden: true,
          },
        ],
      }}
      isEdit={isEdit}
    >
      <Form roles={roles} permissions={permissions} />
    </CreatePageLayout>
  );
}

function Form({ options, roles, permissions }) {
  const { formInputs, getValue, setValue } = options;

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid grid-cols-2 gap-5'></div>
    </div>
  );
}
