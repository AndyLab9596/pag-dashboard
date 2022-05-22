import React from 'react';
import { Modal, ModalOverlay, ModalContent, BoxProps } from '@chakra-ui/react';

interface ModalType extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  width?: string;
  modalTitle?: string;
  children: JSX.Element;
  isCentered?: boolean;
}

const ModalLayout: React.FC<ModalType> = ({ isOpen, onClose, children, size, width, isCentered, ...rest }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size={size}
      isCentered={isCentered ?? true}
      autoFocus={false}
      blockScrollOnMount={true}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={'white'} width={width} {...rest}>
        {children}
      </ModalContent>
    </Modal>
  );
};
export default ModalLayout;
