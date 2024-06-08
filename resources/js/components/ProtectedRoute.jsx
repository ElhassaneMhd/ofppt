import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useUser } from '@/hooks/useUser';
import { LoadingScreen } from './ui/LoadingScreen';
import { ErrorScreen } from './ui/ErrorScreen';

export function ProtectedRoute({ children }) {
  const { isLoading, user, error } = useUser('detect');

  // return children;

  useEffect(() => {
    if (!user && !isLoading) router.visit('/login', { replace: true });
  }, [user, isLoading]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (user) return children;
}
