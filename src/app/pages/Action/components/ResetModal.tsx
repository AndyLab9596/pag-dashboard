import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Button, HStack, useDisclosure, VStack } from '@chakra-ui/react';

import Loader from 'app/components/Loader/Loader';
import StaticModal from 'app/components/Modal/StaticModal';
import useToast from 'app/components/Toast/useToastHook';
import { Form } from 'app/components/ui/Form';
import {
  MainResetFormsFragmentFragment,
  useGetResetFormsQuery,
  useResetEvaluationsMutation,
  useResetListOfContributorsMutation,
  useResetPerformanceSummaryMutation,
} from 'app/generated/graphql';
import { useActionModal } from '../contexts/ActionModalContext';
import { ActionModalOption, ResetFormValues, SelectedField } from '../types';
import { ResetKey } from '../types/FormKey.enum';
import { BodyContainer, Description, PartCheckboxField, PartItem, Subtitle, Title } from './ActionModal';

const validationSchema = yup.object().shape({});

interface Props {}

const ResetModal: React.FC<Props> = () => {
  const { onCloseModal, filter } = useActionModal();

  const { data, loading } = useGetResetFormsQuery({
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
  const [resetLOC] = useResetListOfContributorsMutation({
    onError: error => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message,
      });
    },
  });
  const [resetEvaluation] = useResetEvaluationsMutation({
    onError: error => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message,
      });
    },
  });
  const [resetPS] = useResetPerformanceSummaryMutation({
    onError: error => {
      toast({
        status: 'error',
        title: 'Error',
        description: error.message,
      });
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

  const mapSelfAssessmentOption = (value: Evaluation): ActionModalOption => {
    return {
      type: 'Checkbox',
      name: `${value.id}-${ResetKey.SA}`,
      value: value.id,
      label: 'Self Assessment',
    };
  };

  const mapPerformanceSummaryOption = (value: PerformanceSummary): ActionModalOption => {
    return {
      type: 'Checkbox',
      name: `${value.id}-${ResetKey.PS}`,
      value: value.id,
      label: `Performance Summary for ${value.user.name}`,
    };
  };

  const mapPerformanceEvaluationOption = (value: Evaluation): ActionModalOption => {
    return {
      type: 'Checkbox',
      name: `${value.id}-${ResetKey.EVALUATION}`,
      value: value.id,
      label: `Performance Evaluation for ${value.evaluatee?.name}`,
    };
  };

  const convertOptions = (item: MainResetFormsFragmentFragment): ActionModalOption[] => {
    let result: ActionModalOption[] = [];

    if (item.cycleContributors && item.cycleContributors.length > 0) {
      let LOCOption = mapLOCOption(item.cycleContributors[0]);
      result.push(LOCOption);
    }

    if (item.evaluationsOnMe && item.evaluationsOnMe.length > 0) {
      let SAOption = mapSelfAssessmentOption(item.evaluationsOnMe[0]);
      result.push(SAOption);
    }

    let PSOptions =
      item.completedPSsByUser.map(ps => {
        return mapPerformanceSummaryOption(ps);
      }) ?? [];

    let EVOptions =
      item.evaluationsByMe?.map(ev => {
        return mapPerformanceEvaluationOption(ev);
      }) ?? [];
    return result.concat([...PSOptions, ...EVOptions]);
  };
  //#endregion Map options

  const onSelectedFieldsChange = (value: SelectedField, isChecked?: boolean) => {
    if (!isChecked) {
      setSelectedLabels(selectedLabels.filter(label => label !== value.label));
      return;
    }

    setSelectedLabels(Array.from(new Set([...selectedLabels, value.label])));
  };

  const onReset = async (values: ResetFormValues) => {
    try {
      setIsResetLoading(true);
      let keys = Object.keys(values).filter(key => values[key] === true);

      // key = [id]-[ResetKey]
      // map to Array<id: number>
      let locSelected = keys.filter(key => key.includes(ResetKey.LOC)).map(key => +key.split('-')[0]);
      let evalSelected = keys
        .filter(key => key.includes(ResetKey.EVALUATION) || key.includes(ResetKey.SA))
        .map(key => +key.split('-')[0]);
      let psSelected = keys.filter(key => key.includes(ResetKey.PS)).map(key => +key.split('-')[0]);

      await Promise.all([
        locSelected.length > 0 ? resetLOC({ variables: { locIds: locSelected } }) : null,
        psSelected.length > 0 ? resetPS({ variables: { psIds: psSelected } }) : null,
        evalSelected.length > 0 ? resetEvaluation({ variables: { eIds: evalSelected } }) : null,
      ]);
    } catch (error) {
    } finally {
      setIsResetLoading(false);
      onOpenSuccess();
    }
  };

  return (
    <Box>
      <Form validationSchema={validationSchema} onSubmit={onReset}>
        <Title>Reset Forms</Title>
        {data && <Subtitle>{data?.getResetForms.total} people available</Subtitle>}
        <Description>Select a form to change the status from submitted to saved but not submitted</Description>
        <BodyContainer>
          {data?.getResetForms.data.map(item => {
            return (
              <PartItem key={item.id} title={`${item.name}'s submitted forms`}>
                {convertOptions(item).map(option => {
                  return <PartCheckboxField key={option.value} option={option} onChange={onSelectedFieldsChange} />;
                })}
              </PartItem>
            );
          })}
          <Loader isLoading={loading} />
        </BodyContainer>
        <Footer
          isLoading={isResetLoading}
          onSubmit={onReset}
          labelList={selectedLabels}
          isSelectMulti={data && data?.getResetForms.total > 1}
        />
      </Form>
      <StaticModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
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
  onSubmit: (values: ResetFormValues) => Promise<void>;
  labelList?: string[];
  isSelectMulti?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLoading, onSubmit, labelList, isSelectMulti }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { onCloseModal } = useActionModal();
  const { watch, handleSubmit } = useFormContext();
  const watchValues = watch();

  // static modal state
  const { isOpen: isOpenConfirmLabels, onClose: onCloseConfirmLabels, onOpen: onOpenConfirmLabels } = useDisclosure();
  const { isOpen: isOpenConfirm, onClose: onCloseConfirm, onOpen: onOpenConfirm } = useDisclosure();

  useEffect(() => {
    const newStatus = !Object.values(watchValues).some(value => value === true);
    newStatus !== isDisabled && setIsDisabled(newStatus);
  }, [watchValues]);

  const handleResetClicked = () => {
    if (isSelectMulti) {
      onOpenConfirm();
    } else {
      onOpenConfirmLabels();
    }
  };

  const onSubmitWrapper = async () => {
    handleSubmit(async values => {
      await onSubmit(values);
      onCloseConfirmLabels();
    })();
  };

  return (
    <>
      <HStack my="1rem" justifyContent="flex-end" spacing="1rem">
        <Button variant="outline" w="140px" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="solid" w="140px" isDisabled={isDisabled} onClick={handleResetClicked}>
          Reset
        </Button>
      </HStack>
      <StaticModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        config={{
          body: 'Are you sure you want to reset?',
          closeButtonText: 'Cancel',
          buttonTitle: 'Ok',
        }}
        onSubmit={onSubmitWrapper}
        isSubmitLoading={isLoading}
      />
      <StaticModal
        isOpen={isOpenConfirmLabels}
        onClose={onCloseConfirmLabels}
        config={{
          body: (
            <>
              <VStack alignItems="flex-start" color="#373535" fontWeight={400}>
                <Box>You have reset the following form(s).</Box>
                <Box
                  as="ul"
                  sx={{
                    marginTop: '1rem !important',
                    marginLeft: '2rem !important',
                    paddingRight: '2rem !important',
                    listStyle: 'circle',
                    listStylePosition: 'inside',
                    textAlign: 'left',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  {labelList?.map(label => (
                    <Box as="li" key={label}>
                      {label}
                    </Box>
                  ))}
                </Box>
              </VStack>
            </>
          ),
          closeButtonText: 'Cancel',
          buttonTitle: 'Ok',
        }}
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

interface Evaluation {
  __typename?: 'Evaluation' | undefined;
  id: number;
  isComplete?: boolean | null | undefined;
  evaluatee?:
    | {
        __typename?: 'User' | undefined;
        id: number;
        name: string;
      }
    | null
    | undefined;
}

interface PerformanceSummary {
  __typename?: 'PerformanceSummary' | undefined;
  id: number;
  user: {
    __typename?: 'User' | undefined;
    id: number;
    name: string;
  };
}

export default ResetModal;
