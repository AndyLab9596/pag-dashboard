import React, { useState } from 'react';
import { Box, Divider, Flex, HStack, ModalBody, useDisclosure } from '@chakra-ui/react';
import { ApolloQueryResult } from '@apollo/client';

import { useAuthState } from 'app/components/Auth/useAuthState';
import TitleTable from 'app/components/TitlePage/TitleTable';
import Button from 'app/components/ui/Button/Button';
import Export from 'app/components/ui/ExportImport/ExportBtn';
import Import from 'app/components/ui/ExportImport/ImportBtn';
import useChecker from 'common/useChecker';
import StaticModal from 'app/components/Modal/StaticModal';
import type { ModalProperties } from 'app/components/Modal/types';
import ModalLayout from 'app/components/Modal';
import MissingFieldsTable from './MissingFieldsTable';
import { MyEvaluationServices } from '../MyEvaluationServices';
import {
  GetMyEvaluationsQuery,
  useExportMyEvaluationsLazyQuery,
  useSubmitEvaluationMutation,
} from 'app/generated/graphql';
import useToastStatus from 'app/components/Toast/useToastHook';
import { ConvertedData } from './MissingFieldsTable';

export interface MyEvaluationsHeaderProps {
  refetch: (
    variables?:
      | {
          pageSize?: number;
          page: number;
        }
      | undefined,
  ) => Promise<ApolloQueryResult<GetMyEvaluationsQuery>>;
}

const MyEvaluationsHeader: React.FC<MyEvaluationsHeaderProps> = ({ refetch }) => {
  const toast = useToastStatus();
  const { identity } = useAuthState();
  const { checkLockedSystemBeforeSubmitting } = useChecker();
  const [exportMyEvaluations] = useExportMyEvaluationsLazyQuery({
    onCompleted: ({ exportMyEvaluations }) => {
      window.open(exportMyEvaluations.url);
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
    fetchPolicy: 'no-cache',
  });

  //local state
  const [modalConfig, setModalConfig] = useState<ModalProperties>({
    body: '',
  });
  const [importErrorData, setImportErrorData] = useState<ConvertedData[]>([]);

  //#region modal state
  const { isOpen: isOpenLockSystem, onOpen: onOpenLockSystem, onClose: onCloseLockSystem } = useDisclosure();
  const { isOpen: isOpenMessageModal, onOpen: onOpenMessageModal, onClose: onCloseMessageModal } = useDisclosure();
  const {
    isOpen: isOpenSubmitAllConfirm,
    onOpen: onOpenSubmitAllConfirm,
    onClose: onCloseSubmitAllConfirm,
  } = useDisclosure();
  const { isOpen: isOpenErrorTable, onOpen: onOpenErrorTable, onClose: onCloseErrorTable } = useDisclosure();
  //#endregion

  const [submitAllEvaluation, { data: submitAllData, loading: submitAllLoading }] = useSubmitEvaluationMutation({
    fetchPolicy: 'no-cache',
  });

  const title = `Evaluations - ${identity?.firstName} ${identity?.lastName}`;

  const onSubmitAll = async () => {
    try {
      if (await checkLockedSystemBeforeSubmitting()) {
        // open locked system modal
        onOpenLockSystem();
        return;
      }
      // call query here
      const { data } = await submitAllEvaluation();
      // if successful
      if (!data?.submitEvaluation.error) {
        setModalConfig({
          body: 'Submit all evaluations successfully',
          closeButtonText: 'Close',
        });
        refetch();
        onOpenMessageModal();
      } else {
        onOpenErrorTable();
      }
    } catch (error) {
      setModalConfig({
        body: 'Submit all evaluations failed',
        closeButtonText: 'Close',
      });
      onOpenMessageModal();
    } finally {
      onCloseSubmitAllConfirm();
    }
  };

  return (
    <Flex justify="space-between" align="center">
      <TitleTable textTransform="capitalize" ml="13px">
        {title}
      </TitleTable>
      <Box>
        <Button h="36px" onClick={onOpenSubmitAllConfirm}>
          Submit All
        </Button>
        <Box m="5px" d="inline-block">
          <Export
            title="Export Evaluations"
            onDownload={onClose => {
              // toast({ status: 'info', title: 'Please wait a moment ...' });
              exportMyEvaluations();
              onClose();
            }}
          />
        </Box>
        <Box m="5px" d="inline-block">
          <Import
            onImport={async (file, setLoading, setSuccess) => {
              try {
                setImportErrorData([]);
                const evaluationServices = new MyEvaluationServices();
                // call query here
                // if successful
                setLoading(true);
                const { data } = await evaluationServices.import(file);
                setSuccess(true);
                setTimeout(() => {
                  setLoading(false);
                  setSuccess(false);
                }, 2000);
                refetch();
                onOpenSubmitAllConfirm();
                if (!data?.status) {
                  let convertedData = data.data.sort((a, b) => a.answerId - b.answerId);
                  setImportErrorData(convertedData);
                }
              } catch (error) {
                setModalConfig({
                  body: 'Cannot import file',
                  closeButtonText: 'Close',
                });
                onOpenMessageModal();
                // if failed
                setLoading(false);
                setSuccess(false);
              }
            }}
          />
        </Box>
      </Box>
      <ModalLayout
        isOpen={isOpenErrorTable}
        onClose={onCloseErrorTable}
        minWidth="90vw"
        minHeight="90vh"
        isCentered={false}
      >
        <ModalBody>
          <Box textAlign="center" color="#2c405a" fontWeight="semibold" fontSize="15px" mt="0.8rem">
            Missing Fields
          </Box>
          <Divider
            sx={{
              my: '1rem !important',
            }}
            color="#d8e5ee"
          />
          <MissingFieldsTable data={submitAllData?.submitEvaluation.data} convertedData={importErrorData} />
          <Box fontSize="13px" textAlign="center" mt="4px">
            There is a number of missing fields, please complete the Excel file and import it again or complete the
            evaluations in the system directly.
          </Box>
          <HStack mt="1rem" mb="1rem" justifyContent="flex-end">
            <Button onClick={onCloseErrorTable}>Close</Button>
          </HStack>
        </ModalBody>
      </ModalLayout>

      <StaticModal isOpen={isOpenLockSystem} onClose={onCloseLockSystem} variant="lockSystem" />
      <StaticModal isOpen={isOpenMessageModal} onClose={onCloseMessageModal} config={modalConfig} />
      <StaticModal
        isOpen={isOpenSubmitAllConfirm}
        onClose={onCloseSubmitAllConfirm}
        config={{
          body: 'Are you sure you want to submit all?',
          closeButtonText: 'Close',
          buttonTitle: 'Submit',
        }}
        onSubmit={onSubmitAll}
        isSubmitLoading={submitAllLoading}
      />
    </Flex>
  );
};

export default MyEvaluationsHeader;
