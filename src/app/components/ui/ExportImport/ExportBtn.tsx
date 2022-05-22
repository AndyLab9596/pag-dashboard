import { useDisclosure } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import Button from '../Button/Button';
interface ExportType {
  onDownload: (onClose: Function, setLoading: React.Dispatch<boolean>) => void;
  title: string;
}

const Export: React.FC<ExportType> = ({ onDownload, title }) => {
  ///static
  const { isOpen, onOpen, onClose } = useDisclosure();

  ///hook
  const [loading, setLoading] = React.useState(false);

  ///func to handle events
  const onClickDownload = () => {
    onDownload(onClose, setLoading);
  };
  return (
    <>
      <Tooltip label="Export">
        <Button w="36px" h="36px" p="5px" variant="outline" onClick={onOpen}>
          <MdExitToApp size={20} color={BLUE} />
        </Button>
      </Tooltip>

      <ModalConfirm
        onConfirm={onClickDownload}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        isLoading={loading}
        modalTitle={title}
        confirmText="Download"
      />
    </>
  );
};

//static
const BLUE = '#000080';
export default Export;
