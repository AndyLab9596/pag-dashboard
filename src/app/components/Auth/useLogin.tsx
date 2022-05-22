import React from 'react';
import { useAuthContext } from './authContext';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginHook {
  login: (data: LoginPayload) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export const useLogin = (): LoginHook => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { setAuthState, authProvider } = useAuthContext();
  const login = React.useCallback(
    async (data: LoginPayload): Promise<void> => {
      try {
        setLoading(true);
        await authProvider.login(data.email, data.password);
        const identity = await authProvider.getIdentity();
        setAuthState(true, identity ?? undefined);
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [authProvider, setAuthState],
  );
  return { login, loading, error };
};
