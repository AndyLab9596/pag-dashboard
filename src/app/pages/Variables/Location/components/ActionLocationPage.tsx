import Button from 'app/components/ui/Button/Button';
import { RoutesPath } from 'app/routes/routesPath';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddLocationModal from './AddLocationModal';

export const ActionLocationPage = () => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate(-1);
  };
  return (
    <>
      <Button
        onClick={() => {
          navigate(RoutesPath.VARIABLES_ADD);
        }}
      >
        Add Location
      </Button>
      <Routes>
        <Route path={RoutesPath.VARIABLES_ADD} element={<AddLocationModal onClose={handleCloseModal} />} />
      </Routes>
    </>
  );
};
