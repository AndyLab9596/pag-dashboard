import { Role, UsersLimited } from 'app/generated/graphql';

export interface UserIdentity {
  id?: number;
  name?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roleCountryCode?: string;
  roleLocationId?: string;
  image?: string;
  roleCityCode?: string;
  roles: Role[];
  isEvaluator: boolean;
  permissionsLimitedUsers?: UsersLimited[];
  showPreviousComment?: number;
  title?: {
    id: number;
    name: string;
  };
  department?: {
    id: number;
    name: string;
    showPreviousComment: number;
  };
  location?: {
    id: number;
    name: string;
  };
}

/* --- STATE --- */
export interface AuthState {
  authenticated: boolean;
  identity?: UserIdentity | null;
  loading: boolean;
  updateAuthState: () => Promise<void>;
}
