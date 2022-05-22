import { AuthProvider } from 'app/components/Auth/authProvider';
import { UserIdentity } from 'app/components/Auth/types';
import { useLoginMutation, useMeQuery } from 'app/generated/graphql';
import config from 'config';
import jwtDecode from 'jwt-decode';

export const useAuthProvider = (): AuthProvider => {
  const [loginMutation, { client }] = useLoginMutation();
  const { refetch } = useMeQuery({ skip: true });

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const r = await loginMutation({
        variables: {
          email: username,
          password,
        },
      });
      const accessToken = r.data?.login.accessToken ?? '';
      localStorage.setItem(config.STORE_ACCESS_TOKEN, accessToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem(config.STORE_ACCESS_TOKEN);
    localStorage.removeItem(config.STORE_ROLE);
    await client.clearStore();
  };

  const checkAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem(config.STORE_ACCESS_TOKEN);
    if (accessToken) {
      const { exp } = jwtDecode<{ exp: number }>(accessToken);
      const remainingTime = exp * 1000 - Date.now();
      if (remainingTime < 1 * 60 * 1000) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const getIdentity = async (): Promise<UserIdentity | null> => {
    try {
      if (!(await checkAuth())) {
        await logout();
        return null;
      }
      const r = await refetch();
      return r.data.me as unknown as UserIdentity;
    } catch (error) {
      return null;
    }
  };

  return { login, logout, checkAuth, getIdentity };
};
