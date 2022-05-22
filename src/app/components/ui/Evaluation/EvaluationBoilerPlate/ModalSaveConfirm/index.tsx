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

interface ModalConfirmProps extends Omit<ModalProps, 'children'> {
  modalTitle: string;
  modalBody?: JSX.Element;
  confirmText?: string;
  isDisabledConfirm?: boolean;
  onConfirm: () => void;
  isLoading?: boolean;
  isLoadingModal?: boolean;
  width?: string;
}

const FormButtonBlue = {
  minHeight: '36px',
  fontSize: '13px',
  fontWeight: 500,
  _hover: { color: 'rgba(255,255,255,0.8)' },
  borderRadius: '3px',
  borderColor: 'rgba(121,122,125,0.5)',
  borderWith: '1px',
  borderStyle: 'solid',
};

const ModalSaveConfirm: React.FC<ModalConfirmProps> = ({
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
          <Skeleton isLoaded={!isLoadingModal}>
            <Button
              disabled={isDisabledConfirm}
              onClick={() => onConfirm()}
              isLoading={isLoading}
              sx={FormButtonBlue}
              width={'120px'}
            >
              {confirmText}
            </Button>
          </Skeleton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalSaveConfirm;
