import Layout from 'app/components/Layout';
import { Navigate, Routes, useLocation, Route } from 'react-router-dom';
import routes from '../config';
import { PrivateRoute } from '../Route';
import { Location } from 'history';

interface LocationState {
  background?: Location;
}

export const AdminLayout = () => {
  let location = useLocation();
  let background: Location | undefined = location.state ? (location.state as LocationState).background : undefined;

  return (
    <Layout>
      <Routes location={background || location}>
        {/* <> */}
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path + (route.exact ? '' : '/*')}
            element={<PrivateRoute onlyAdmin={route.onlyAdmin} />}
          >
            <Route path={route.exact ? '' : '*'} element={route.component()} />
          </Route>
        ))}
        <Route path={'*'} element={<Navigate state={{ from: '/' }} to="/dashboard" />} />
      </Routes>
      <Routes>
        {background &&
          routes
            .filter(route => route.isModal === true)
            .map(route => (
              <Route key={route.path} path={route.path + '/*'} element={<PrivateRoute />}>
                <Route path={route.exact ? '' : '/*'} element={route.component()} />
              </Route>
            ))}
      </Routes>
    </Layout>
  );
};
