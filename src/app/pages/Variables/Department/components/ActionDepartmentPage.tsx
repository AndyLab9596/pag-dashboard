import { useDisclosure } from '@chakra-ui/react';
import Button from 'app/components/ui/Button/Button';
import { RoutesPath } from 'app/routes/routesPath';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddDepartmentModal from './AddDepartmentModal';
import SetAllDeadlinesModal from './SetAllDeadlinesModal';

interface ActionDepartmentPageProps {
  strategyId?: number;
  strategyName?: string;
}

export const ActionDepartmentPage: React.FC<ActionDepartmentPageProps> = props => {
  const { strategyName, strategyId } = props;
  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate(-1);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenSetAllDeadlinesModal = () => {
    if (strategyName) {
      onOpen();
    }
  };

  return (
    <div className="flex gap-x-10">
      <SetAllDeadlinesModal strategyId={strategyId} strategyName={strategyName} open={isOpen} onClose={onClose} />
      <Button variant="outline" onClick={handleOpenSetAllDeadlinesModal}>
        Set All Deadlines
      </Button>
      <Button
        onClick={() => {
          navigate(RoutesPath.VARIABLES_ADD);
        }}
      >
        Add Department
      </Button>
      <Routes>
        <Route path={RoutesPath.VARIABLES_ADD} element={<AddDepartmentModal onClose={handleCloseModal} />} />
      </Routes>
    </div>
  );
};
