import { toast } from 'sonner';
import { filterObject, getFile } from '@/utils/helpers';
import { useConfirmationModal } from './useConfirmationModal';
import { router } from '@inertiajs/react';

const login = () => {};
const register = () => {};
const logout = () => {};
const getUser = () => {};
const getSettings = () => {};
const updateProfile = () => {};
const uploadFile = () => {};

const useRedirect = () => {
  return (message) => {
    localStorage.setItem('in', 'true');
    toast.success(message);
    router.visit('/Dashboard');
  };
};

export function useLogin() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => redirect("Logged in successfully. You'll be redirected now.", data?.role || data?.data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogging: isPending, error };
}

export function useRegister() {
  const redirect = useRedirect();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register'],
    mutationFn: (user) => register(user),
    onSuccess: (data) =>
      redirect("Registered in successfully. You'll be redirected now.", data?.role || data?.data?.role),
    onError: (error) => toast.error(error.message),
  });

  return { register: mutate, isRegistering: isPending, error };
}

export function useLogout() {
  const { openModal } = useConfirmationModal();

  const logout = () =>
    openModal({
      message: 'You are about to log out. Do you wish to proceed?',
      title: 'Logout',
      confirmText: 'Logout',
      onConfirm: () => {
        localStorage.removeItem('in');
        location.assign('/');
      },
    });

  return { logout };
}

export function useUser() {
  // const { data, error, isPending } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: getUser,
  //   retry: 1,
  //   enabled: localStorage.getItem('in') === 'true' || reason === 'detect',
  // });

  return {
    user: {
      fullName: 'Walid Za',
      email: 'Walid.za@gmail.com',
      role: 'super-admin',
      gender: 'M',
    },
  };
}

export function useSettings() {
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    retry: 1,
  });

  const settings = data ? { ...data, appLogo: { src: getFile(data, 'appLogo') || '/SVG/logo.svg', file: null } } : null;

  if (settings) localStorage.setItem('settings', JSON.stringify(settings));

  if (isFetching || !settings) {
    const localSettings = localStorage.getItem('settings');
    if (localSettings) {
      return {
        settings: JSON.parse(localSettings),
        isLoading: false,
        error,
      };
    }
  }

  return {
    settings,
    isLoading: isPending,
    error,
  };
}

export function useUpdateProfile() {
  return useMutate({
    queryKey: ['user', 'update'],
    mutationFn: ({ id, user }) => {
      if (Object.keys(filterObject(user, ['avatar', 'cv'], 'exclude')).length) {
        updateProfile(id, filterObject(user, ['avatar', 'cv'], 'exclude'));
      }
      if (user?.avatar) uploadFile(id, user.avatar?.file, 'avatar');
      if (user?.cv) uploadFile(id, user.cv?.file, 'cv');
    },
    loadingMessage: 'Updating profile...',
    successMessage: 'Profile updated successfully',
  });
}

export function useUpdatePassword() {
  const { user } = useUser();
  return useMutate({
    queryKey: ['user', 'updatePassword'],
    mutationFn: (passwords) => updatePassword(user?.profile_id, passwords),
    loadingMessage: 'Updating password...',
    successMessage: 'Password updated successfully',
  });
}
