import { Role } from 'app/generated/graphql';
import { UserRole } from 'app/components/Auth/useRole';

const rolesAdmin = [UserRole.SUPER_ADMIN, UserRole.SPECIAL_ADMIN, UserRole.COUNTRY_ADMIN, UserRole.CITY_ADMIN];

export const isAdminRole = (roles?: Role[]): boolean => {
  return roles ? roles.some(role => rolesAdmin.includes(role.id)) : false;
};
