import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@/hooks/useNavigate';
import { Head } from '@inertiajs/react';
import { Logo } from '@/components/ui/Logo';

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
      <div className='grid h-screen w-full gap-3 bg-background-primary md:grid-cols-2'>
        <div className='relative hidden place-content-center bg-background-secondary md:grid'></div>
        <div className='w- flex flex-col p-3'>
          <Logo className='w-20' />
          <div className='flex w-full flex-1 flex-col justify-center gap-3 px-4'>
            <h1 className='mb-5 text-4xl font-bold text-text-primary'>Welcome Back</h1>
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
      </div>
    </>
  );
}

Login.layout = (page) => <>{page}</>;

export default Login;
