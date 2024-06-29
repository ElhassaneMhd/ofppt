import { Avatar } from '@/components/Back_Office/DropDownProfile';
import { Button } from '@/components/ui';
import { ModalFormLayout } from '@/layouts/Back_Office/ModalFormLayout';
import { HiMiniXMark } from 'react-icons/hi2';
import { useForm, useUploadFile, useUser } from '@/hooks/index';
import { useNavigate } from '@/hooks/useNavigate';
import { getFile } from '@/utils/helpers';

export default function Profile() {
  const { user } = useUser();
  const { navigate } = useNavigate();

  const {
    Form,
    options: { isUpdated, handleSubmit, reset, setValue, getValue },
  } = useForm({
    defaultValues: {
      avatar: getFile(user?.files?.[0]),
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    },
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
      },
      {
        name: 'lastName',
        label: 'Last Name',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'phone',
      },
    ],
    onSubmit: (data) => {
      navigate({ url: 'user.update', method: 'put', data: { ...data, files: [data.avatar?.file] } });
    },
    gridLayout: true,
  });

  return (
    <ModalFormLayout
      submitButton={{
        onClick: handleSubmit,
        disabled: !isUpdated,
      }}
      cancelButton={{
        onClick: reset,
        disabled: !isUpdated,
      }}
    >
      <div className='space-y-5'>
        <ProfileAvatar
          avatar={getValue('avatar')}
          onChange={(avatar) => setValue('avatar', avatar)}
          role={user?.role}
        />

        {Form}
      </div>
    </ModalFormLayout>
  );
}

function ProfileAvatar({ avatar, onChange, disabled, role }) {
  const { openFilePicker, options } = useUploadFile({ onChange });

  return (
    <div className='grid mobile:grid-cols-[7rem_auto] max-mobile:place-content-center max-mobile:place-items-center items-center gap-5'>
      <div className='relative'>
        <Avatar className='h-28 w-28' avatar={avatar?.src} role={role} />
        <Button
          shape='icon'
          color='red'
          size='small'
          className={`absolute -right-1 top-1 rounded-full text-base shadow-md transition-transform duration-300 ${disabled || !avatar?.src ? 'scale-0' : 'scale-100'}`}
          onClick={() => onChange({ src: null, file: null })}
        >
          <HiMiniXMark />
        </Button>
      </div>
      <div className='max-mobile:flex max-mobile:flex-col max-mobile:text-center max-mobile:justify-center max-mobile:items-center'>
        <Button
          type='outline'
          className='disabled:text-text-disabled disabled:hover:bg-background-disabled'
          disabled={disabled}
          onClick={openFilePicker}
        >
          Upload Avatar
        </Button>
        <p className='mb-1 mt-3 text-xs text-text-tertiary'>At least 80x80 px recommended.</p>
        <p className='text-xs text-text-tertiary'>
          {options.accept.map((type) => type.replace('.', '').toUpperCase()).join(', ')} are allowed (Max size of 5MB)
        </p>
      </div>
    </div>
  );
}
