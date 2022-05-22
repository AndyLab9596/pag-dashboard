import { useEffect } from 'react';
import { Box, Tooltip, useDisclosure } from '@chakra-ui/react';
import { MdPrint } from 'react-icons/md';

import Button from '../Button/Button';
import Loader from 'app/components/Loader/Loader';
// import exportService from 'app/services/exportService';
import StaticModal from 'app/components/Modal/StaticModal';
import useToastHook from 'app/components/Toast/useToastHook';

interface Props {
  onClick: () => any;
  isLoading?: boolean;
  error?: string | null;
  completed?: boolean;
}

const PrintBtn: React.FC<Props> = ({ onClick, isLoading, error, completed }) => {
  const toast = useToastHook();
  const { isOpen: isOpenSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();

  useEffect(() => {
    if (completed) {
      onOpenSuccess();
    }
  }, [completed]);

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error,
      });
    }
  }, [error]);

  return (
    <>
      <Tooltip label="Print">
        <Button w="36px" h="36px" p="5px" variant="outline" onClick={onClick}>
          <MdPrint size={20} color="#000080" />
        </Button>
      </Tooltip>

      <StaticModal isOpen={isOpenSuccess} onClose={onCloseSuccess} variant="successPrint" />

      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader isLoading={true} />
        </Box>
      )}
    </>
  );
};

export default PrintBtn;
