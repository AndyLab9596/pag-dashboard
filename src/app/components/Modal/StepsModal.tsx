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
} from '@chakra-ui/react';
import Button from '../ui/Button/Button';
import { Form, FormProps } from '../ui/Form';

interface StepsModalProps extends Omit<ModalProps, 'children'> {
  modalTitle: string;
  modalBody: JSX.Element;
  formProps: FormProps;
  isLoading?: boolean;
  width?: string;
  onNext: () => void;
  onBack: () => void;
  tabIndex: number;
  totalTab: number;
}

const StepsModal: React.FC<StepsModalProps> = ({
  formProps,
  modalBody,
  isOpen,
  onClose,
  modalTitle,
  size,
  isCentered,
  isLoading = false,
  width,
  tabIndex,
  totalTab,
  onNext,
  onBack,
  ...restProps
}) => {
  return (
    <Modal
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
        <Form {...formProps}>
          <ModalHeader textAlign="left" color="black">
            <h1 className="text-15">{modalTitle}</h1>
          </ModalHeader>
          <Divider />
          <ModalBody overflowY="scroll">{modalBody}</ModalBody>
          <Divider />
          <ModalFooter justifyContent="flex-end" display="flex" gridGap="20px">
            {tabIndex === 0 && (
              <Button onClick={onClose} variant="outline" width="100px">
                Cancel
              </Button>
            )}
            {tabIndex !== 0 && tabIndex <= totalTab - 1 && (
              <Button variant="outline" onClick={onBack} width="100px">
                Back
              </Button>
            )}
            {tabIndex !== totalTab - 1 && tabIndex >= 0 && (
              <Button onClick={onNext} width="100px">
                Next
              </Button>
            )}
            {tabIndex === totalTab - 1 && (
              <Button isLoading={isLoading} type="submit" width="100px">
                Submit
              </Button>
            )}
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
export default StepsModal;
