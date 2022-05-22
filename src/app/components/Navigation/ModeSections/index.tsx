/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import { UserRole as Role, convertRoleName } from 'app/components/Auth/useRole';
import { useAuthContext } from '../../Auth/authContext';
import { ReactComponent as Mode } from '../Logo/mode.svg';
import EvaluatorItem from './EvaluatorItem';

const ModeSections = () => {
  const { selectedRole, changeRole, identity, isEvaluationMode } = useAuthContext();

  const rolesData = identity?.roles || [];

  const roleOptions =
    rolesData &&
    rolesData.map(role => {
      return {
        id: role.id,
        name: convertRoleName(role.id, role.name),
      };
    });

  if (
    !roleOptions.length ||
    selectedRole.id === Role.REG_USER ||
    (roleOptions.length === 1 && selectedRole.id === Role.DEPT_HEAD)
  ) {
    return null;
  }

  const onRoleChange = newRole => () => {
    changeRole(newRole);
  };

  const checkRoleExistence = () => roleOptions.some(({ id }) => id === Role.DEPT_HEAD);

  return (
    <ul className="row-menu">
      <li className="col-logo active">
        <Mode />
      </li>
      <li className="col-menu">
        <span className="title uppercase">Mode</span>
        <ul>
          {!checkRoleExistence() && <EvaluatorItem isEvaluationMode={isEvaluationMode} onRoleChange={onRoleChange} />}

          {roleOptions.map((role, i) => (
            <li key={'roles-list-' + i} onClick={onRoleChange(role)}>
              <Link
                to="/dashboard"
                key={i}
                className={`left-nav-menu-modal ${role.id === selectedRole.id && 'active-role'}`}
              >
                {role.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default ModeSections;
