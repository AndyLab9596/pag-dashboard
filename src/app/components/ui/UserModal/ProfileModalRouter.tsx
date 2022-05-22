import { useAuthState } from 'app/components/Auth/useAuthState';
import { Route, Routes } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { PrivateRoute } from 'app/routes/Route';

const ProfileModalRouter = () => {
  const { loading } = useAuthState();

  if (loading) return null;

  return (
    <Routes>
      <Route path={'profile/:userID/*'} element={<PrivateRoute />}>
        <Route path="*" element={<ProfileModal isOpen={true} />} />
      </Route>
    </Routes>
  );
};
export default ProfileModalRouter;
