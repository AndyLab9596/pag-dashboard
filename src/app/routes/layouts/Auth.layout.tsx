import { LoginPage } from 'app/pages/Login';
import { NotFoundPage } from 'app/pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from '../Route';

export const AuthLayout = () => {
  return (
    <Routes>
      <Route path="*" element={<PublicRoute restricted={true} />}>
        <Route path="" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
