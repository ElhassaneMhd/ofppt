import { usePage } from '@inertiajs/react';

export const useUser = () => {
  const { props } = usePage();

  return { user: props.auth };
};
