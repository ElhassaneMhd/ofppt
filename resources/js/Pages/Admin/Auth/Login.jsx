import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@/hooks/useNavigate';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { props } = usePage();

  useEffect(() => {
    const errors = Object.keys(props.errors);
    if (errors.length > 0) toast.error(props.errors[errors[0]]);
  }, [props.errors]);

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
      navigate({ url: 'login', method: 'POST', data: { email: data['email'], password: data['password'] } }),
    submitOnEnter: true,
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='grid h-full w-full place-content-center'>
        <div className='flex w-full flex-col gap-3 rounded-xl bg-background-secondary p-5 shadow-md sm:w-[600px]'>
          <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>Welcome Back</h1>
          {Form}
          <Button
            className={'my-4 w-full self-end'}
            disabled={!isValid}
            color={'secondary'}
            onClick={() => handleSubmit()}
          >
            {t('form.login')}
          </Button>
        </div>
      </div>
    </>
  );
}

Login.layout = (page) => <>{page}</>;

export default Login;
