import useToastStatus from 'app/components/Toast/useToastHook';
import { FormField } from 'app/components/ui/Form';
import { Label } from 'app/components/ui/Form/Label';
import Select from 'app/components/ui/Form/Select';
import { useGetAllEvaluationTypesLazyQuery } from 'app/generated/graphql';
export interface OptionProps {
  id: number;
  name: string;
}

const EvaluationTypesDropdown = (props: any) => {
  const toast = useToastStatus();
  const { label = '', value, onChange } = props;
  const [findEvaluationTypes, { loading, data }] = useGetAllEvaluationTypesLazyQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const evaluationTypes = data?.getAllEvaluationTypes || [];

  return (
    <div className="w-full">
      {label && <Label label={label} />}
      <Select
        name="title"
        isMulti={false}
        onChange={onChange}
        placeholder="Select Form Type"
        options={
          evaluationTypes &&
          evaluationTypes.map((evaluationType: OptionProps) => ({
            value: evaluationType.id,
            label: evaluationType.name,
          }))
        }
        value={
          value
            ? {
                value: value.value,
                label: value.label,
              }
            : undefined
        }
        className="w-full"
        isLoading={loading}
        onMenuOpen={() => findEvaluationTypes({ variables: {} })}
      />
    </div>
  );
};

export const SelectEvaluationTypesField = ({ name, ...props }) => {
  return <FormField name={name} component={EvaluationTypesDropdown} {...props} />;
};
