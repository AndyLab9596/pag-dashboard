import React, { useState } from 'react';
import { HStack, Divider, VStack, Box } from '@chakra-ui/react';

import ModalLayout from 'app/components/Modal';
import Button from 'app/components/ui/Button/Button';
import { ModalProperties, ModalVariantKey, ModalVariants } from './types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (sendReminder?: boolean) => any;
  variant?: ModalVariantKey;
  config?: ModalProperties;
  isSubmitLoading?: boolean;
  withReminder?: boolean;
}

const StaticModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  variant = 'lockSystem',
  config,
  children,
  isSubmitLoading = false,
  withReminder = false,
}) => {
  const [sendReminder, setIsSendReminder] = useState<boolean>(true);

  let modalContent = modalVariants[variant];
  if (config) modalContent = config;

  const handleSubmit = async () => {
    onSubmit && (await onSubmit(withReminder ? sendReminder : false));
  };

  return (
    <>
      <ModalLayout isOpen={isOpen} onClose={onClose} size={modalContent?.size ?? '2xl'}>
        <VStack py="1.5rem">
          {modalContent?.title && (
            <>
              <Box as="p" color="secondary" fontSize="23px">
                {modalContent.title}
              </Box>
              <Divider
                sx={{
                  my: '1rem !important',
                }}
                color="#d8e5ee"
              />
            </>
          )}
          {modalContent?.body && (
            <>
              <Box color="secondary" fontSize="15px" fontWeight="500" px="4rem" textAlign="center">
                {modalContent.body}
              </Box>
              {withReminder && (
                <HStack>
                  <Box as="p" color="secondary" fontSize="15px" fontWeight="500">
                    With notification
                  </Box>
                  <input
                    type="checkbox"
                    name="notification"
                    checked={sendReminder}
                    onChange={() => setIsSendReminder(prev => !prev)}
                  />
                </HStack>
              )}
              <Divider
                sx={{
                  my: '1.2rem !important',
                }}
                color="#d8e5ee"
              />
            </>
          )}
          {children}
          <HStack>
            {modalContent?.closeButtonText && (
              <Button
                variant={modalContent?.buttonTitle ? 'outline' : 'solid'}
                color={modalContent?.buttonTitle ? '#000' : '#fff'}
                border="1px solid #d8dce6"
                boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
                fontSize="13px"
                px="2rem"
                fontWeight="500"
                w="120px"
                onClick={onClose}
              >
                {modalContent?.closeButtonText}
              </Button>
            )}
            {modalContent?.buttonTitle && (
              <Button
                fontSize="13px"
                fontWeight="500"
                px="2rem"
                w="120px"
                onClick={handleSubmit}
                isLoading={isSubmitLoading}
              >
                {modalContent.buttonTitle}
              </Button>
            )}
          </HStack>
        </VStack>
      </ModalLayout>
    </>
  );
};

// modal variants
const successSubmit: ModalProperties = {
  body: 'Submitted',
  closeButtonText: 'Close',
  size: 'sm',
};

const successApprove: ModalProperties = {
  body: 'Approved',
  closeButtonText: 'Close',
  size: 'sm',
};

const successExport: ModalProperties = {
  body: 'Exported',
  closeButtonText: 'Close',
  size: 'sm',
};

const successPrint: ModalProperties = {
  body: 'Printed',
  closeButtonText: 'Close',
  size: 'sm',
};

const successSave: ModalProperties = {
  body: 'Saved',
  closeButtonText: 'Close',
  size: 'sm',
};

const confirmDelete: ModalProperties = {
  body: 'Are you sure you want to delete?',
  buttonTitle: 'Yes',
  closeButtonText: 'Cancel',
};

const confirmExport: ModalProperties = {
  body: 'Are you sure you want to export?',
  buttonTitle: 'Yes',
  closeButtonText: 'Cancel',
};

const lockSystem: ModalProperties = {
  title: 'Overdue',
  body: 'The system is closed for this cycle. Please contact Human Capital for help.',
  closeButtonText: 'Close',
};

const confirmSubmitLOC: ModalProperties = {
  title: 'Submit LOC',
  body: 'Are you sure you are ready to submit? This action cannot be undone.',
  buttonTitle: 'Submit',
  closeButtonText: 'Cancel',
};

const confirmApproveLOC: ModalProperties = {
  title: 'Approve LOC',
  body: 'Are you sure you are ready to approve? This action cannot be undone.',
  buttonTitle: 'Approve',
  closeButtonText: 'Cancel',
};

const modalVariants: ModalVariants = {
  successSubmit,
  successApprove,
  confirmDelete,
  lockSystem,
  successExport,
  successPrint,
  successSave,
  confirmExport,
  confirmSubmitLOC,
  confirmApproveLOC,
};

export default StaticModal;
