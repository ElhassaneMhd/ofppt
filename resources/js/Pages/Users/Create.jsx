import { DropDown } from '@/components/ui';
import CreatePageLayout from '@/layouts/CreatePageLayout';

export default function Create({
  roles = [],
  permissions = [],
  defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    permissions: [],
  },
  isEdit = false,
}) {

  return (
    <CreatePageLayout
      name='User'
      formOptions={{
        defaultValues,
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            placeholder: 'Enter first name...',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter last name...',
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

function Form({ options, roles }) {
  const { formInputs, getValue, setValue } = options;

  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='grid  mobile:grid-cols-2 gap-5'>
        {formInputs['firstName']}
        {formInputs['lastName']}
        {formInputs['email']}
        {formInputs['phone']}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium capitalize text-text-tertiary'>Role</label>
          <DropDown
            toggler={
              <DropDown.Toggler>
                <span className='capitalize'>{getValue('role') || `Select role...`}</span>
              </DropDown.Toggler>
            }
            options={{ className: 'overflow-auto max-h-[300px] w-[230px]', shouldCloseOnClick: false }}
          >
            {roles.map((role) => (
              <DropDown.Option key={role.id} onClick={() => setValue('role', role.name)} className='capitalize'>
                {role.name}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
      </div>
    </div>
  );
}
