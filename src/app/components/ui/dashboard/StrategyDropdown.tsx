import useToastStatus from 'app/components/Toast/useToastHook';
import Select from 'app/components/ui/Form/Select';
import { useGetAllStrategiesLazyQuery } from 'app/generated/graphql';
import { Label } from '../Form/Label';
export interface OptionProps {
  id: number;
  name: string;
  defaultOptions?: {
    value: number | string;
    label: string;
  }[];
}

const StrategyDropdown = (props: any) => {
  const toast = useToastStatus();
  const { label = '', value, onChange, defaultOptions = [] } = props;
  const [findStrategy, { loading, data }] = useGetAllStrategiesLazyQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const strategies = data?.getAllStrategies || [];
  const options = [...defaultOptions, ...strategies.map(s => ({ value: s.id, label: s.name }))];

  return (
    <div className="w-full">
      {label && <Label label={label} />}
      <Select
        name="strategy"
        isMulti={false}
        onChange={onChange}
        placeholder="Select Strategy"
        options={options}
        value={value ?? undefined}
        className="w-full"
        isLoading={loading}
        onMenuOpen={() => findStrategy({ variables: {} })}
      />
    </div>
  );
};

export default StrategyDropdown;
