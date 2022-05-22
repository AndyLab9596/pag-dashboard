import { getOperationName } from '@apollo/client/utilities';
import { Box, HStack, Radio, RadioGroup, useDisclosure } from '@chakra-ui/react';
import StaticModal from 'app/components/Modal/StaticModal';
import { ModalProperties } from 'app/components/Modal/types';
import Button from 'app/components/ui/Button/Button';
import { FormField } from 'app/components/ui/Form';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import { useFinalizePerformanceSummaryMutation } from 'app/generated/graphql';
import { defaultNavigate } from 'common/helpper';
import useChecker from 'common/useChecker';
import { GET_PERFORMANCE_SUMMARIES } from 'graphql/reports';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { QuestionTitle, SummaryContainer } from '.';
import { FormValues } from '../types';

const ratings = [
  { name: '1', value: '1' },
  { name: '1.5', value: '1.5' },
  { name: '2', value: '2' },
  { name: '2.5', value: '2.5' },
  { name: '3', value: '3' },
  { name: '3.5', value: '3.5' },
  { name: '4', value: '4' },
  { name: '4.5', value: '4.5' },
  { name: '5', value: '5' },
];

interface Props {
  name: string;
  isComplete: boolean;
  psId: number;
}

const Feedback: React.FC<Props> = ({ name, isComplete, psId }) => {
  const {
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useFormContext();

  let navigate = useNavigate();
  const { checkLockedSystemBeforeSubmitting } = useChecker();
  const formValues = getValues();
  const [finalize, { loading: finalizeLoading }] = useFinalizePerformanceSummaryMutation();

  // MODAL STATE
  const { isOpen: isOpenSubmitConfirm, onClose: onCloseSubmitConfirm, onOpen: onOpenSubmitConfirm } = useDisclosure();
  const {
    isOpen: isOpenSuccessConfirm,
    onClose: onCloseSuccessConfirm,
    onOpen: onOpenSuccessConfirm,
  } = useDisclosure();
  const { isOpen: isOpenSuccessSave, onClose: onCloseSuccessSave, onOpen: onOpenSuccessSave } = useDisclosure();
  const { isOpen: isOpenLockedSystem, onClose: onCloseLockedSystem, onOpen: onOpenLockedSystem } = useDisclosure();

  useEffect(() => {
    if (isComplete) return;
    // check user modifies any of the inputs.
    if (!isDirty) return;

    const interval = setInterval(async () => {
      setValue('isSubmit', false);
      setValue('isAutoSave', true);
      await onSave();
    }, 5 * 60 * 1000); // 5 mins

    return () => interval && clearInterval(interval);
  }, [isComplete, isDirty]);

  const finalizeFnc = async (values: FormValues | { [x: string]: any }) => {
    if (values.psId === null || !psId) return;
    await finalize({
      variables: {
        data: {
          score: parseFloat(values.score),
          feedback: values.feedback,
          isSubmit: !!values.isSubmit,
        },
        psId: values.psId || psId,
      },
      refetchQueries: [getOperationName(GET_PERFORMANCE_SUMMARIES) ?? ''],
    });
  };

  const onSubmitData = async (values: FormValues) => {
    if (values.isSubmit) {
      if (isComplete) return;

      // call mutation
      await finalizeFnc(values);
      onOpenSuccessConfirm();
    }
    setValue('isAutoSave', false);
  };

  const onSave = async () => {
    setValue('isSubmit', false);
    const isAutoSave = watch('isAutoSave');
    await finalizeFnc(formValues);
    !isAutoSave && onOpenSuccessSave();
  };

  const onSubmit = () => {
    // before open modal confirm, I want to check validation.
    // trigger validation
    handleSubmit(async () => {
      if (await checkLockedSystemBeforeSubmitting()) {
        onOpenLockedSystem();
        return;
      }
      setValue('isSubmit', true);
      onOpenSubmitConfirm();
    })();
  };

  const submit = (): Promise<void> => {
    return handleSubmit(onSubmitData)();
  };

  const _redirect = () => {
    defaultNavigate(navigate);
  };

  const submitConfirm: ModalProperties = {
    title: '',
    body: `
    Are you sure you are ready to submit the performance summary for ${name}?
    This action cannot be undone.`,
    closeButtonText: 'Cancel',
    buttonTitle: 'Submit',
    size: '5xl',
  };

  return (
    <>
      <SummaryContainer>
        <Box width="35%" pt="14px" mr="14px">
          <QuestionTitle padding="0 1rem">* Overall Rating on {name}</QuestionTitle>
        </Box>
        <Box width="65%">
          <Box display="flex" alignItems={errors.score ? 'flex-start' : 'center'} padding="14px">
            <Box as="span" minW="fit-content" color="#373535" fontSize="15px">
              Rating
            </Box>
            <Box ml="1rem" fontSize="13px">
              <FormField
                name="score"
                component={({ value, onChange }) => (
                  <RadioGroup value={value} onChange={!isComplete ? onChange : () => {}} size="md">
                    <div className="flex flex-nowrap space-x-8">
                      {ratings.map(rating => (
                        <Radio
                          value={rating.value}
                          key={`rating-${rating.value}`}
                          color="rgb(102, 102, 102)"
                          cursor="pointer"
                          disabled={isComplete}
                        >
                          <p className=" flex-shrink-0 text-14">{rating.name}</p>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              />
            </Box>
          </Box>
          <Box padding="14px">
            <TextAreaField
              sx={{
                _disabled: {
                  color: 'rgb(84, 84, 84)',
                },
              }}
              name="feedback"
              rows={8}
              fontSize="15px"
              isDisabled={isComplete}
            />
          </Box>
          {!isComplete && (
            <HStack padding="14px" spacing="1rem">
              <Button
                type="button"
                fontSize="13px"
                px="2rem"
                onClick={onSave}
                disabled={isComplete}
                isLoading={finalizeLoading && !formValues.isAutoSave}
              >
                Save
              </Button>
              <Button
                type="button"
                fontSize="13px"
                px="2rem"
                onClick={onSubmit}
                disabled={isComplete || finalizeLoading}
              >
                Submit
              </Button>
            </HStack>
          )}
        </Box>
      </SummaryContainer>
      <SummaryContainer m="52px">
        <Box as="p" fontStyle="italic" color="grey" fontSize="13px">
          Once all required fields in your performance summary have been completed you can save or click “Submit” to
          proceed to the next step. Your form will not be submitted unless you proceed.
        </Box>
      </SummaryContainer>

      <StaticModal
        isOpen={isOpenSubmitConfirm}
        onClose={onCloseSubmitConfirm}
        config={submitConfirm}
        onSubmit={async () => {
          await submit();
          onCloseSubmitConfirm();
        }}
        isSubmitLoading={finalizeLoading}
      />
      <StaticModal
        isOpen={isOpenSuccessConfirm}
        onClose={() => {
          onCloseSuccessConfirm();
          _redirect();
        }}
        variant="successSubmit"
        onSubmit={() => {
          onCloseSuccessConfirm();
          _redirect();
        }}
      />
      <StaticModal
        isOpen={isOpenSuccessSave}
        onClose={() => {
          onCloseSuccessSave();
          _redirect();
        }}
        variant="successSave"
        onSubmit={() => {
          onCloseSuccessSave();
          _redirect();
        }}
      />
      <StaticModal
        isOpen={isOpenLockedSystem}
        onClose={onCloseLockedSystem}
        variant="lockSystem"
        onSubmit={() => {
          onCloseLockedSystem();
        }}
      />
    </>
  );
};

export default Feedback;
