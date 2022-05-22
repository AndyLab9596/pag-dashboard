import { useAuthContext } from './authContext';

export const useAuthProvider = () => {
  const { authProvider } = useAuthContext();
  return authProvider;
};
