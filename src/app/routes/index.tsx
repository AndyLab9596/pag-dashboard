import React from 'react';
import { PrivateRoute, PublicRoute } from './Route';
import Layout from 'app/components/Layout';

interface AppRoutesProps {
  component: (props: unknown) => JSX.Element;
  path: string;
  isPrivate: boolean;
  isRestricted?: boolean;
  exact?: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  component: Component,
  path,
  isPrivate,
  isRestricted,
  exact,
  ...rest
}) => {
  return isPrivate ? (
    <Layout>
      <PrivateRoute />
    </Layout>
  ) : (
    <PublicRoute restricted={isRestricted} />
  );
};

export default AppRoutes;
