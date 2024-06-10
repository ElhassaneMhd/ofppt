import { useForm } from '@/hooks/useForm';
import { Button } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@/hooks/useNavigate';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    Form,
    options: { isValid, handleSubmit },
  } = useForm({
    defaultValues: { email: '', password: '' },
    fields: [
      { name: 'email', type: 'email', label: t('form.email.label') },
      { name: 'password', type: 'password', label: t('form.password.label'), rules: { pattern: null } },
    ],
    onSubmit: () => {
      navigate({
        url: '/login',
        method: 'POST',
        data: { email: 'email', password: 'password' },
      });
    },
    submitOnEnter: true,
  });

  return (
    <div className='relative flex h-full w-full flex-col justify-center gap-3 p-2 md:px-10 lg:px-20'>
      <h1 className='mb-8 text-2xl font-bold text-text-primary sm:text-3xl'>Welcome</h1>
      {Form}
      <Button
        className={'my-4 w-full self-end'}
        disabled={!isValid}
        onClick={() => handleSubmit()}
        // isLoading={isLogging}
      >
        {
          // isLogging ? 'Logging In...' :
          t('form.login')
        }
      </Button>

      <p className='flex items-center justify-center gap-1 border-t border-border py-4 text-center text-text-primary'>
        {t('form.dontHaveAccount')}
      </p>
    </div>
  );
}
