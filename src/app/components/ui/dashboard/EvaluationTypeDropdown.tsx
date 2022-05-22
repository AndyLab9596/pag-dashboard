import Select from 'app/components/ui/Form/Select';
import { useGetAllEvaluationTypesLazyQuery } from 'app/generated/graphql';
import useToastStatus from 'app/components/Toast/useToastHook';

export interface OptionProps {
  id: number;
  name: string;
}
interface EvaluationTypeProps {
  onChange: Function;
}

const EvaluationTypeDropdown = (props: EvaluationTypeProps) => {
  const { onChange } = props;
  const toast = useToastStatus();

  const [getAllEvaluationTypes, { loading, data }] = useGetAllEvaluationTypesLazyQuery({
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const evaluationTypes = data?.getAllEvaluationTypes || [];
  const options = [
    { value: '', label: 'All' },
    ...evaluationTypes.map((evaluationType: OptionProps) => ({
      value: evaluationType.id,
      label: evaluationType.name,
    })),
  ];

  return (
    <Select
      name="select"
      isMulti={false}
      onChange={selected => onChange(selected?.value || undefined)}
      placeholder="Select Form"
      options={options}
      className="w-full"
      isLoading={loading}
      onMenuOpen={() => !data && getAllEvaluationTypes()}
    />
  );
};

export default EvaluationTypeDropdown;
