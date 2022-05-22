import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import config from '../../config';
import { useAuthState } from '../components/Auth/useAuthState';
import Spinner from '../components/ui/Spinner';

export const PrivateRoute: React.FC<any> = ({ onlyAdmin }: { onlyAdmin: boolean | undefined }) => {
  const { authenticated, loading } = useAuthState();
  const { isAdmin } = useUserPermissions();

  // Show the component only when the user is logged in
  // and is the page require admin role, check if is
  // Otherwise, redirect the user to /login page if not logged
  // redirect to /dashboard if not admin
  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : authenticated ? (
    onlyAdmin ? (
      isAdmin ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace={true} />
      )
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate replace to={{ pathname: config.LOGIN_PATH }} />
  );
};

export const PublicRoute = ({ restricted }) => {
  const { authenticated, loading } = useAuthState();

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  ) : authenticated && restricted ? (
    <Navigate replace to={{ pathname: config.DASHBOARD_PATH }} />
  ) : (
    <Outlet />
  );
};
