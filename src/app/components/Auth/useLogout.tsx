import React from 'react';
import { useAuthContext } from './authContext';

interface LogoutHook {
  logout: () => void;
  loading: boolean;
  error: Error | null;
}

export const useLogout = (): LogoutHook => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { setAuthState, authProvider } = useAuthContext();
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authProvider.logout();
      setAuthState(false, null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
