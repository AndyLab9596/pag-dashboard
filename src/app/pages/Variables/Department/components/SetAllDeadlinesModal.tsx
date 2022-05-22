import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { DatePickerInputField } from 'app/components/ui/Form/DatePickerInputField';
import { useSetAllDeadlineForDepartmentMutation } from 'app/generated/graphql';
import { GET_ALL_DEPARTMENTS } from 'graphql/department';
import React, { useContext } from 'react';
import * as yup from 'yup';
import { VariablesContext } from '../..';
const validationSchema = yup.object().shape({
  deadlineLOC: yup.date().nullable().default(undefined),
  deadlineConfirmLOC: yup.date().nullable().default(undefined),
  deadlineSelfAssessment: yup.date().nullable().default(undefined),
  deadlinePerformanceEvaluation: yup.date().nullable().default(undefined),
  lockDate: yup.date().nullable().default(undefined),
});

interface SetAllDeadlinesModalProps {
  open?: boolean;
  onClose: () => void;
  strategyName?: string;
  strategyId?: number;
}

const SetAllDeadlinesModal: React.FC<SetAllDeadlinesModalProps> = ({
  strategyId,
  strategyName,
  open = false,
  onClose,
}) => {
  const toast = useToastStatus();
  const [setAllDeadlineForDepartmentMutation, { loading }] = useSetAllDeadlineForDepartmentMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { onOpenSave } = useContext(VariablesContext);
  const defaultValues = () => {
    return {
      deadlineLOC: undefined,
      deadlineConfirmLOC: undefined,
      deadlineSelfAssessment: undefined,
      deadlinePerformanceEvaluation: undefined,
      lockDate: undefined,
    };
  };

  const onSubmit = async values => {
    await setAllDeadlineForDepartmentMutation({
      variables: {
        strategyId: +strategyId!,
        data: {
          deadlineLOC: values.deadlineLOC,
          deadlineConfirmLOC: values.deadlineConfirmLOC,
          deadlineSelfAssessment: values.deadlineSelfAssessment,
          deadlinePerformanceEvaluation: values.deadlinePerformanceEvaluation,
          lockDate: values.lockDate,
        },
      },
      refetchQueries: [
        {
          query: GET_ALL_DEPARTMENTS,
          variables: {
            strategyId,
          },
        },
      ],
    });
    onClose();
    onOpenSave();
  };

  return (
    <ModalCreateEdit
      isOpen={open}
      onClose={onClose}
      isCentered={false}
      isLoading={loading}
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      modalTitle={`All Deadlines for ${strategyName}`}
      modalBody={
        <div className="grid gap-10">
          <DatePickerInputField name="deadlineLOC" label="Deadline for List Of Contributors" />
          <DatePickerInputField name="deadlineConfirmLOC" label="Deadline to confirm LOC" />
          <DatePickerInputField name="deadlineSelfAssessment" label="Deadline for Self Assessment" />
          <DatePickerInputField name="deadlinePerformanceEvaluation" label="Deadline for Performance Evaluation" />
          <DatePickerInputField name="lockDate" label="Lock Date" />
        </div>
      }
    />
  );
};

export default SetAllDeadlinesModal;
