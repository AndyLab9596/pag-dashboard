import React from 'react';

import config from 'config';
import { UserIdentity } from './types';
export enum UserRole {
  SUPER_ADMIN = 1,
  SPECIAL_ADMIN = 2,
  COUNTRY_ADMIN = 3,
  CITY_ADMIN = 4,
  DEPT_HEAD = 5,
  EVALUATOR = 6,
  REG_USER = 0,
}

export const EvaluatorRole = {
  id: UserRole.EVALUATOR,
  name: 'Evaluators',
};

export const AdminEditForm = [UserRole.SUPER_ADMIN, UserRole.SPECIAL_ADMIN, UserRole.COUNTRY_ADMIN];

export interface RoleProps {
  id: number;
  name: string;
}

export const convertRoleName = (id, oldLabel) => {
  let label = '';
  switch (id) {
    case UserRole.DEPT_HEAD:
      label = 'Evaluations';
      break;

    case UserRole.SUPER_ADMIN:
    case UserRole.SPECIAL_ADMIN:
    case UserRole.CITY_ADMIN:
    case UserRole.COUNTRY_ADMIN:
      label = 'Admin';
      break;

    default:
      label = oldLabel && oldLabel;
      break;
  }
  return label;
};

export const defaultRole = {
  id: 0,
  name: 'Regular user',
};

export const useRole = () => {
  const [selectedRole, setSelectedRole] = React.useState<RoleProps>(defaultRole);

  const _setSelectedRole = (user: UserIdentity | null) => {
    const rolesArr = user?.roles || [];

    let prevSelectedRole: any = localStorage.getItem(config.STORE_ROLE);

    if (prevSelectedRole) {
      prevSelectedRole = JSON.parse(prevSelectedRole);
    }

    const biggestRoleKey = Math.min.apply(
      Math,
      rolesArr.map(function (o) {
        return o.id;
      }),
    );

    const biggestRole = rolesArr.find(role => role.id === biggestRoleKey);

    const selectedRole: RoleProps =
      (!!prevSelectedRole && prevSelectedRole) ||
      (biggestRole && {
        id: biggestRole.id,
        name: convertRoleName(biggestRole.id, biggestRole.name),
      }) ||
      defaultRole;

    setSelectedRole(selectedRole);
  };

  const changeRole = (role: RoleProps) => {
    const data = {
      id: role.id,
      name: role.name,
    };
    localStorage.setItem(config.STORE_ROLE, JSON.stringify(data));
    setSelectedRole(data);
  };

  const isAdminMode = [
    UserRole.SUPER_ADMIN,
    UserRole.SPECIAL_ADMIN,
    UserRole.COUNTRY_ADMIN,
    UserRole.CITY_ADMIN,
  ].includes(selectedRole.id)
    ? true
    : false;

  const isEvaluationMode = selectedRole.id === UserRole.EVALUATOR ? true : false;

  return {
    selectedRole,
    setSelectedRole: _setSelectedRole,
    changeRole,
    isAdminMode,
    isEvaluationMode,
  };
};
