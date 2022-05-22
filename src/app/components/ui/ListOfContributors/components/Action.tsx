import React from 'react';
import { HStack, Divider, VStack, Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import Button from 'app/components/ui/Button/Button';
import type { PermissionState, FormState } from '../types';
import useFilterData from 'app/components/ui/User/hooks/useFilterData';
import ModalLayout from 'app/components/Modal';
import { InputField, SelectField } from '../../Form';

interface Props {
  showDelete?: boolean;
  onDelete: () => void;
  skipUsers?: number[];
  deleteLoading?: boolean;
  addLoading?: boolean;
  permissions: PermissionState;
  onSubmit: (values: FormState) => void;
}

const Action: React.FC<Props> = ({
  showDelete,
  onDelete,
  skipUsers,
  deleteLoading,
  addLoading,
  permissions,
  onSubmit,
}) => {
  const { evaluators: users } = useFilterData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, reset, watch } = useFormContext();

  const selectedUser = watch('contributor');

  const onValid = (values: FormState) => {
    onSubmit(values);
    reset({
      details: '',
      contributor: null,
    });
  };

  const onSubmitClicked = () => {
    handleSubmit(onValid)();
  };

  return (
    <>
      {permissions.canAdd && (
        <>
          <HStack px="30px" spacing="5rem" alignItems="flex-start">
            <SelectField
              menuPlacement="top"
              isSearchable
              isMulti={false}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              name="contributor"
              placeholder="Name"
              className="min-w-200"
              isLoading={users.loading}
              options={users.data
                ?.filter(u => !skipUsers?.includes(+u.value))
                .sort((a, b) => a.label.localeCompare(b.label))}
              onMenuOpen={() => !users.data && users.executeQuery()}
            />

            <div>
              <InputField
                name="details"
                variant="outline"
                fontSize="13px"
                height="38px"
                padding="10px"
                borderColor="#a8c6df"
                lineHeight="none"
                width="auto"
                minW="220px"
                placeholder="Project Details (must enter at least three words)"
              />
            </div>
          </HStack>
          <Divider my="14px" color="#d8e5ee" />
        </>
      )}
      <>
        {((showDelete && permissions.canDelete) || (permissions.canAdd && !!selectedUser)) && (
          <>
            <HStack justifyContent="space-between" px="30px" mb="14px">
              {permissions.canAdd && !!selectedUser && (
                <Button
                  type="button"
                  fontSize="13px"
                  fontWeight="500"
                  px="2rem"
                  isLoading={addLoading}
                  onClick={onSubmitClicked}
                >
                  Add contributor
                </Button>
              )}
              {showDelete && permissions.canDelete && (
                <Button fontSize="13px" fontWeight="500" px="2rem" onClick={onOpen}>
                  Delete
                </Button>
              )}
            </HStack>
            <Divider mb="14px" color="#d8e5ee" />
          </>
        )}
      </>
      <ModalLayout isOpen={isOpen} onClose={onClose} width="50%" maxW="none">
        <VStack py="1.5rem">
          <Box as="p" color="secondary" fontSize="15px">
            Are you sure you want to delete?
          </Box>
          <Divider
            sx={{
              my: '1.5rem !important',
            }}
            color="#d8e5ee"
          />
          <HStack>
            <Button
              variant="outline"
              color="#000"
              border="1px solid #d8dce6"
              boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
              fontSize="13px"
              px="2rem"
              fontWeight="500"
              w="120px"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              fontSize="13px"
              fontWeight="500"
              px="2rem"
              w="120px"
              onClick={() => {
                onDelete();
                onClose();
              }}
              isLoading={deleteLoading}
            >
              Yes
            </Button>
          </HStack>
        </VStack>
      </ModalLayout>
    </>
  );
};

export default Action;
