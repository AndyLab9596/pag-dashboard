import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, useDisclosure } from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormContext } from 'react-hook-form';

import { Title, Subtitle, Description, BodyContainer, PartItem, PartCheckboxField } from './ActionModal';
import { useActionModal } from '../contexts/ActionModalContext';
import { Form } from 'app/components/ui/Form';
import { useListSubmitQuery, useApproveLocMutation } from 'app/generated/graphql';
import { ActionModalOption, ResetFormValues, SelectedField } from '../types';
import { ResetKey } from '../types/FormKey.enum';
import useToast from 'app/components/Toast/useToastHook';
import StaticModal from 'app/components/Modal/StaticModal';
import Loader from 'app/components/Loader/Loader';
import { useUserPermissions } from 'common/useUserPermissions';

const validationSchema = yup.object().shape({});

interface Props {}

const ApproveModal: React.FC<Props> = () => {
  const { onCloseModal, filter } = useActionModal();
  const isSelectAll = filter.isSelectAll;
  const { data, loading } = useListSubmitQuery({
    variables: {
      filter: (() => {
        // this query dont need cycleId
        const { cycleId, ...rest } = filter;
        return rest;
      })(),
    },
    fetchPolicy: 'no-cache',
  });
  const [isResetLoading, setIsResetLoading] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  let toast = useToast();

  //modal state
  const { isOpen: isOpenSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();

  // mutations
  const [approveLOC] = useApproveLocMutation({
    onError: error => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message,
      });
    },
    onCompleted: () => {
      onOpenSuccess();
    },
  });

  //#region Map options
  const mapLOCOption = (value: LOC): ActionModalOption => {
    return {
      type: 'Checkbox',
      name: `${value.id}-${ResetKey.LOC}`,
      value: value.id,
      label: 'List of contributors',
    };
  };
  //#endregion Map options

  const onSelectedFieldsChange = (value: SelectedField, isChecked?: boolean) => {
    if (!isChecked) {
      setSelectedLabels(selectedLabels.filter(label => label !== value.label));
      return;
    }

    setSelectedLabels(Array.from(new Set([...selectedLabels, value.label])));
  };

  const onApprove = async (values: ResetFormValues, isSendReminder?: boolean) => {
    try {
      setIsResetLoading(true);
      let keys = Object.keys(values).filter(key => values[key] === true);

      // key = [id]-[ResetKey]
      // map to Array<id: number>
      let locSelected = keys.filter(key => key.includes(ResetKey.LOC)).map(key => +key.split('-')[0]);
      if (locSelected.length > 0) {
        await approveLOC({
          variables: {
            ids: {
              cycleContributorIds: locSelected,
            },
            isSendReminder: !!isSendReminder,
          },
        });
      }
    } catch (error) {
    } finally {
      setIsResetLoading(false);
    }
  };

  const availableCount = (data?.listSubmit.listSubmitted.length || 0) + (data?.listSubmit.listUnSubmitted.length || 0);

  return (
    <Box>
      <Form validationSchema={validationSchema} onSubmit={onApprove}>
        <Title>Approve Forms</Title>
        {availableCount > 1 && <Subtitle>{availableCount} people available</Subtitle>}
        <Description>Select a form to change the status to approved</Description>
        <BodyContainer>
          {data?.listSubmit.listSubmitted.map(item => {
            return (
              <PartItem key={item.id} title={`${item.user.name}'s submitted forms`}>
                <PartCheckboxField key={item.id} option={mapLOCOption(item)} onChange={onSelectedFieldsChange} />
              </PartItem>
            );
          })}
          {data?.listSubmit.listUnSubmitted.map(item => {
            return <PartItem key={item.id} title={`${item.user.name}'s submitted forms`}></PartItem>;
          })}
          <Loader isLoading={loading} />
        </BodyContainer>
        <Footer isLoading={isResetLoading} onSubmit={onApprove} labelList={selectedLabels} isSelectAll={isSelectAll} />
      </Form>
      <StaticModal
        isOpen={isOpenSuccess}
        onClose={() => {
          onCloseSuccess();
          onCloseModal();
        }}
        config={{
          body: 'Completed',
          buttonTitle: 'Close',
        }}
        onSubmit={() => {
          onCloseSuccess();
          onCloseModal();
        }}
      />
    </Box>
  );
};

interface FooterProps {
  isLoading: boolean;
  onSubmit: (values: ResetFormValues, sendReminder?: boolean) => Promise<void>;
  labelList?: string[];
  isSelectAll: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoading, onSubmit, labelList, isSelectAll }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const {
    onCloseModal,
    filter: { userIds },
  } = useActionModal();
  const { watch, handleSubmit } = useFormContext();
  const watchValues = watch();
  const { isSuperAdmin } = useUserPermissions();

  // static modal state
  const { isOpen: isOpenConfirm, onClose: onCloseConfirm, onOpen: onOpenConfirm } = useDisclosure();

  useEffect(() => {
    const newStatus = !Object.values(watchValues).some(value => value === true);
    newStatus !== isDisabled && setIsDisabled(newStatus);
  }, [watchValues]);

  const handleResetClicked = () => {
    if (userIds.length > 0 || isSelectAll) {
      onOpenConfirm();
    }
  };

  const onSubmitWrapper = async (sendReminder?: boolean) => {
    handleSubmit(async values => {
      await onSubmit(values, sendReminder);
    })();
  };

  return (
    <>
      <HStack my="1rem" justifyContent="flex-end" spacing="1rem">
        <Button variant="outline" w="140px" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="solid" w="140px" isDisabled={isDisabled} onClick={handleResetClicked}>
          Approve
        </Button>
      </HStack>
      <StaticModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        variant="confirmApproveLOC"
        withReminder={isSuperAdmin}
        onSubmit={onSubmitWrapper}
        isSubmitLoading={isLoading}
      />
    </>
  );
};

interface LOC {
  __typename?: 'CycleContributor' | undefined;
  id: number;
  status: string;
}

export default ApproveModal;
