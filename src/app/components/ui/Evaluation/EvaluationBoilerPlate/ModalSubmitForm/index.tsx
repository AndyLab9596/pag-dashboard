import React from 'react';
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Divider,
  ModalCloseButton,
  Skeleton,
  Button,
} from '@chakra-ui/react';

interface ModalSubmitFormProps extends Omit<ModalProps, 'children'> {
  modalTitle: string;
  modalBody?: JSX.Element;
  confirmText?: string;
  isDisabledConfirm?: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
  isLoadingModal?: boolean;
  width?: string;
  isError: boolean;
}

const ModalSubmitForm: React.FC<ModalSubmitFormProps> = ({
  isOpen,
  onClose,
  modalTitle,
  modalBody,
  size,
  isCentered,
  isLoading = false,
  isLoadingModal = false,
  confirmText = 'Save',
  isDisabledConfirm = false,
  width,
  onConfirm,
  isError,
  ...restProps
}) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size={size ?? 'sm'}
      isCentered={isCentered ?? true}
      autoFocus={false}
      {...restProps}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} width={width}>
        <ModalHeader textAlign="center" color="black">
          {isLoadingModal ? (
            <Skeleton margin="0 auto" w="100px" h="15px" />
          ) : (
            <h1 className="text-15 text-darkBlack font-medium">{modalTitle}</h1>
          )}
        </ModalHeader>
        <ModalCloseButton />
        {modalBody && (
          <>
            <Divider />
            <ModalBody>
              <Skeleton isLoaded={!isLoadingModal}>{modalBody}</Skeleton>
            </ModalBody>
          </>
        )}
        <Divider />
        <ModalFooter justifyContent="center" display="flex" gridGap="10px">
          {isError ? (
            <>
              <Skeleton isLoaded={!isLoadingModal}>
                <Button onClick={onClose}>Close</Button>
              </Skeleton>
            </>
          ) : (
            <>
              <Skeleton isLoaded={!isLoadingModal}>
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
              </Skeleton>
              <Skeleton isLoaded={!isLoadingModal}>
                <Button disabled={isDisabledConfirm} onClick={() => onConfirm()} isLoading={isLoading}>
                  {confirmText}
                </Button>
              </Skeleton>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalSubmitForm;
