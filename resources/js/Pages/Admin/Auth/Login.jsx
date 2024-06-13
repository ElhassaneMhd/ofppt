import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@/hooks/useNavigate';
import { Head } from '@inertiajs/react';

function Login() {
  const { t } = useTranslation();
  const { navigate, isLoading } = useNavigate();

  const {
    Form,
    options: { isValid, handleSubmit },
  } = useForm({
    defaultValues: { email: '', password: '' },
    fields: [
      { name: 'email', type: 'email', label: t('form.email.label') },
      { name: 'password', type: 'password', label: t('form.password.label'), rules: { pattern: null } },
    ],
    onSubmit: (data) =>
      navigate({
        url: 'login',
        method: 'POST',
        data: { email: data['email'], password: data['password'] },
      }),
    submitOnEnter: true,
  });

  return (
    <>
      <Head title='Login' />
      <div className='grid h-screen bg-background-primary w-full place-content-center'>
        <div className='flex w-full flex-col gap-3 rounded-xl bg-background-secondary p-5 shadow-md sm:w-[600px]'>
        <div>
          <img src='/images/logo.png' alt='Logo' className='mx-auto w-16' />
        </div>
          {Form}
          <Button
            className={'my-4 w-full self-end'}
            disabled={!isValid}
            isLoading={isLoading}
            color={'secondary'}
            onClick={() => handleSubmit()}
          >
            {isLoading ? 'Logging In...' : t('form.login')}
          </Button>
        </div>
      </div>
    </>
  );
}

Login.layout = (page) => <>{page}</>;

export default Login;
