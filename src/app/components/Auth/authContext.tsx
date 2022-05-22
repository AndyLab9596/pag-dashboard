/* eslint-disable react-hooks/exhaustive-deps */
import config from 'config';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, defaultProvider } from './authProvider';
import { UserIdentity } from './types';
import { useRole, RoleProps, defaultRole } from './useRole';

interface AuthContextValues {
  loading: boolean;
  authenticated: boolean;
  identity?: UserIdentity | null;
  error?: Error;
  authProvider: AuthProvider;
  setAuthState: (authenticated: boolean, identity?: UserIdentity | null) => void;
  selectedRole: RoleProps;
  changeRole: (_role: RoleProps) => void;
  isAdminMode: boolean;
  isEvaluationMode: boolean;
  updateAuthState: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextValues>({
  authProvider: defaultProvider,
  loading: true,
  authenticated: false,
  identity: null,
  setAuthState: (_authenticated: boolean, _identity?: UserIdentity | null) => {},
  selectedRole: defaultRole,
  changeRole: (_role: RoleProps) => {},
  isAdminMode: false,
  isEvaluationMode: false,
  updateAuthState: async () => {},
});

export const useAuthContextProvider = (authProvider: AuthProvider): AuthContextValues => {
  //loading must always be true, if not, when refreshing will redirect to default page
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(undefined);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [identity, setIdentity] = React.useState<UserIdentity | null>();
  const { selectedRole, setSelectedRole, changeRole, isAdminMode, isEvaluationMode } = useRole();
  const navigate = useNavigate();

  const setAuthState = React.useCallback((authenticated: boolean, identity?: UserIdentity | null) => {
    setAuthenticated(authenticated);
    setIdentity(identity);
  }, []);

  const updateAuthState = React.useCallback(async () => {
    const identity = await authProvider.getIdentity();
    if (!identity) {
      navigate(config.LOGIN_PATH, { replace: true });
    }
    setIdentity(identity);
    setSelectedRole(identity);
    setAuthenticated(identity ? true : false);
  }, [authProvider]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await updateAuthState();
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [identity]);

  return {
    loading,
    authenticated,
    identity,
    error,
    authProvider,
    setAuthState,
    selectedRole,
    changeRole,
    isAdminMode,
    isEvaluationMode,
    updateAuthState,
  };
};

export const AuthContextProvider = ({ authProvider, children }) => {
  const contextValue = useAuthContextProvider(authProvider);
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => React.useContext(AuthContext) as unknown as AuthContextValues;
