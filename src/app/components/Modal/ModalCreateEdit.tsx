import React from 'react';
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Divider,
  ModalBody,
  ModalCloseButton,
  Skeleton,
} from '@chakra-ui/react';
import Button from '../ui/Button/Button';
import { Form, FormProps } from '../ui/Form';

interface ModalCreateEditProps extends Omit<ModalProps, 'children'> {
  modalTitle: string;
  modalBody: JSX.Element;
  formProps: FormProps;
  isLoading?: boolean;
  isLoadingModal?: boolean;
  width?: string;
}

const ModalCreateEdit: React.FC<ModalCreateEditProps> = ({
  formProps,
  modalBody,
  isOpen,
  onClose,
  modalTitle,
  size,
  isCentered,
  isLoading = false,
  isLoadingModal = false,
  width,
  ...restProps
}) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size={size ?? 'xs'}
      isCentered={isCentered ?? true}
      autoFocus={false}
      {...restProps}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} width={width}>
        <ModalHeader textAlign="center" color="black">
          {isLoadingModal ? <Skeleton margin="0 auto" w="100px" h="15px" /> : <h1 className="text-13">{modalTitle}</h1>}
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Skeleton isLoaded={!isLoadingModal}>
            <Form id="modal-form" {...formProps}>
              {modalBody}
            </Form>
          </Skeleton>
        </ModalBody>
        <Divider />
        <ModalFooter justifyContent="center" display="flex" gridGap="10px">
          <Skeleton isLoaded={!isLoadingModal}>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
          </Skeleton>
          <Skeleton isLoaded={!isLoadingModal}>
            <Button form="modal-form" isLoading={isLoading} type="submit">
              Save
            </Button>
          </Skeleton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalCreateEdit;
