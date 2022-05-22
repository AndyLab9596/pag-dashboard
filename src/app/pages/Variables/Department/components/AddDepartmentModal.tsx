import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import useToastStatus from 'app/components/Toast/useToastHook';
import { InputField } from 'app/components/ui/Form';
import { DatePickerInputField } from 'app/components/ui/Form/DatePickerInputField';
import { SelectStrategiesField } from 'app/components/ui/Form/SelectStrategiesField';
import {
  useAddOneDepartmentMutation,
  useGetOneDepartmentQuery,
  useUpdateOneDepartmentMutation,
} from 'app/generated/graphql';
import { GET_ALL_DEPARTMENTS } from 'graphql/department';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { VariablesContext } from '../..';
const validationSchema = yup.object().shape({
  name: yup.string().strict(false).trim().required('Department name is required'),
  strategyId: yup
    .object()
    .shape({
      value: yup.number(),
      label: yup.string(),
    })
    .nullable()
    .required('Strategy is required'),
  deadlineLOC: yup.date().nullable().default(undefined),
  deadlineConfirmLOC: yup.date().nullable().default(undefined),
  deadlineSelfAssessment: yup.date().nullable().default(undefined),
  deadlinePerformanceEvaluation: yup.date().nullable().default(undefined),
  lockDate: yup.date().nullable().default(undefined),
});

interface AddDepartmentModalProps {
  onClose: () => void;
  currentPage?: number;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ currentPage = 1, onClose }) => {
  const toast = useToastStatus();
  const { departmentId } = useParams<{ departmentId: string | undefined }>();
  const [addOneDepartmentMutation, { loading: loadingAdd }] = useAddOneDepartmentMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [updateOneDepartmentMutation, { loading: loadingUpdate }] = useUpdateOneDepartmentMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const isEdit = Boolean(departmentId);
  const { loading, data } = useGetOneDepartmentQuery({
    skip: !departmentId,
    variables: {
      id: parseFloat(departmentId as string),
    },
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
    if (isEdit) {
      return {
        name: data?.getOneDepartment?.name,
        strategyId: {
          label: data?.getOneDepartment?.strategy?.name,
          value: data?.getOneDepartment?.strategy?.id,
        },
        deadlineLOC: data?.getOneDepartment?.deadlineLOC,
        deadlineConfirmLOC: data?.getOneDepartment?.deadlineConfirmLOC,
        deadlineSelfAssessment: data?.getOneDepartment?.deadlineSelfAssessment,
        deadlinePerformanceEvaluation: data?.getOneDepartment?.deadlinePerformanceEvaluation,
        lockDate: data?.getOneDepartment?.lockDate,
      };
    }
    return {
      name: '',
      strategyId: '',
      deadlineLOC: undefined,
      deadlineConfirmLOC: undefined,
      deadlineSelfAssessment: undefined,
      deadlinePerformanceEvaluation: undefined,
      lockDate: undefined,
    };
  };
  const onSubmit = async values => {
    if (isEdit) {
      await updateOneDepartmentMutation({
        variables: {
          id: +departmentId!,
          data: {
            name: values.name,
            strategyId: values.strategyId.value,
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
          },
        ],
      });
    } else {
      await addOneDepartmentMutation({
        variables: {
          data: {
            name: values.name,
            strategyId: values.strategyId.value,
            deadlineLOC: values.deadlineLOC,
            deadlineConfirmLOC: values.deadlineConfirmLOC,
            deadlineSelfAssessment: values.deadlineSelfAssessment,
            deadlinePerformanceEvaluation: values.deadlinePerformanceEvaluation,
            lockDate: values.lockDate,
            showPreviousComment: false,
          },
        },
        refetchQueries: [
          {
            query: GET_ALL_DEPARTMENTS,
          },
        ],
      });
    }
    onClose();
    onOpenSave();
  };

  return (
    <ModalCreateEdit
      isOpen={true}
      onClose={onClose}
      isCentered={false}
      formProps={{
        onSubmit: onSubmit,
        validationSchema: validationSchema,
        defaultValues: defaultValues(),
      }}
      isLoadingModal={loading}
      isLoading={loadingAdd || loadingUpdate}
      modalTitle={`${data ? 'Edit' : 'Add'} Department & Deadlines`}
      modalBody={
        <div className="grid gap-10">
          <InputField name="name" label="Department Name" />
          <DatePickerInputField name="deadlineLOC" label="Deadline for List Of Contributors" />
          <SelectStrategiesField name="strategyId" label="Strategy" />
          <DatePickerInputField name="deadlineConfirmLOC" label="Deadline to confirm LOC" />
          <DatePickerInputField name="deadlineSelfAssessment" label="Deadline for Self Assessment" />
          <DatePickerInputField name="deadlinePerformanceEvaluation" label="Deadline for Performance Evaluation" />
          <DatePickerInputField name="lockDate" label="Lock Date" />
        </div>
      }
    />
  );
};

export default AddDepartmentModal;
