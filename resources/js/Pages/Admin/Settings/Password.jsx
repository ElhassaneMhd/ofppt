import { useForm } from '@/hooks/useForm';
import { ModalFormLayout } from '@/layouts/Admin/ModalFormLayout';
import { RULES } from '@/utils/constants';

export default function Password() {

  const {
    Form,
    options: { isUpdated, isValid, handleSubmit, reset },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      password_confirmation: '',
    },
    fields: [
      {
        name: 'currentPassword',
        type: 'password',
        label: 'Current Password',
      },
      {
        name: 'password',
        type: 'password',
        label: 'New Password',
      },
      {
        name: 'password_confirmation',
        type: 'password',
        label: 'Confirm New Password',
        rules: { ...RULES.passwordConfirmation },
      },
    ],
    onSubmit: (data) => console.log(data),
    gridLayout: false,
    submitOnEnter : true
  });

  return (
    <ModalFormLayout
      submitButton={{
        text: 'Change Password',
        onClick: handleSubmit,
        disabled: !isUpdated || !isValid,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      {Form}
    </ModalFormLayout>
  );
}
