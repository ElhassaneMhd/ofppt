import { useForm } from '@/hooks/useForm';
import { useNavigate } from '@/hooks/useNavigate';
import { ModalFormLayout } from '@/layouts/Back_Office/ModalFormLayout';
import { RULES } from '@/utils/constants';

export default function Password() {
  const { navigate } = useNavigate();

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
    onSubmit: (data) => navigate({ url: 'password.update', method: 'post', data }),
    gridLayout: false,
    submitOnEnter: true,
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
