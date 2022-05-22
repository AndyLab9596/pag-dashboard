import { Box, Input, useDisclosure } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import ModalImport from 'app/components/Modal/ModalImport';
import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import Button from '../Button/Button';

interface ImportType {
  onImport: (file: any, setLoading: React.Dispatch<boolean>, setSuccess: React.Dispatch<boolean>) => void;
}

const Import: React.FC<ImportType> = ({ onImport }) => {
  ///static
  const { isOpen, onOpen, onClose } = useDisclosure();

  ///hook
  const [file, setFile] = React.useState<string | Blob>('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  ///func to handle events
  const onInput = event => {
    setFile(event.target.files['0']);
  };
  const onClickImport = () => {
    const formData = new FormData();
    formData.append('file', file);
    onImport(formData, setLoading, setSuccess);
  };
  const handleCloseModal = () => {
    onClose();
    setSuccess(false);
  };
  return (
    <>
      <Tooltip label="Import">
        <Button w="36px" h="36px" p="5px" variant="outline" onClick={onOpen}>
          <MdExitToApp size={20} color={BLUE} className="transform -rotate-180" />
        </Button>
      </Tooltip>

      <ModalImport
        onConfirm={onClickImport}
        isOpen={isOpen}
        onClose={handleCloseModal}
        isCentered={true}
        modalTitle="Import Users"
        confirmText="Import"
        isLoading={loading}
        isSuccess={success}
        modalBody={
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Input
              width={'auto'}
              height={'auto'}
              fontSize={'sm'}
              className="text-black mx-auto my-19"
              type="file"
              onChange={onInput}
              accept=".xlsx,.xlsm,.xls"
              border="none"
              _focus={{ outline: 0 }}
            />
          </Box>
        }
        isDisabledConfirm={file ? false : true}
      />
    </>
  );
};

//static
const BLUE = '#000080';
export default Import;
