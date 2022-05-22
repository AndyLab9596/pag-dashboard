import Button from 'app/components/ui/Button/Button';
import { RoutesPath } from 'app/routes/routesPath';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddStrategyModal from './AddStrategyModal';

export const ActionStrategyPage = () => {
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
        Add Strategy
      </Button>
      <Routes>
        <Route path={RoutesPath.VARIABLES_ADD} element={<AddStrategyModal onClose={handleCloseModal} />} />
      </Routes>
    </>
  );
};
