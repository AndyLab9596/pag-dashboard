import { AuthState } from './types';
import { useAuthContext } from './authContext';

export const useAuthState = (): AuthState => {
  const { authenticated, identity, loading, updateAuthState } = useAuthContext();
  return { authenticated, identity, loading, updateAuthState };
};
