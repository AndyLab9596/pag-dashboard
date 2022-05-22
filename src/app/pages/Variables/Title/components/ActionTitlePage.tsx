import Button from 'app/components/ui/Button/Button';
import { RoutesPath } from 'app/routes/routesPath';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddTitleModal from './AddTitleModal';

export const ActionTitlePage = () => {
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
        Add Title
      </Button>
      <Routes>
        <Route path={RoutesPath.VARIABLES_ADD} element={<AddTitleModal onClose={handleCloseModal} />} />
      </Routes>
    </>
  );
};
