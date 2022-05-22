import useToastStatus from 'app/components/Toast/useToastHook';
import Select from 'app/components/ui/Form/Select';
import { useGetAllDepartmentsLazyQuery } from 'app/generated/graphql';
import { groupOptionsByLabel } from 'utils/groupBy';

interface DepartmentDropdownProps {
  onChange: Function;
  strategyId?: number;
  defaultOptions?: {
    value: number | string;
    label: string;
  }[];
}

export interface OptionProps {
  id: number;
  name: string;
}

const DepartmentDropdown = (props: DepartmentDropdownProps) => {
  const toast = useToastStatus();
  const { onChange, strategyId, defaultOptions = [] } = props;
  const [findDepartment, { loading, data }] = useGetAllDepartmentsLazyQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const departments = data?.getAllDepartments || [];
  const options = [...defaultOptions, ...departments.map(s => ({ value: s.id, label: s.name }))];

  return (
    <Select
      name="department"
      isMulti={false}
      placeholder="Select Department"
      onChange={onChange}
      options={groupOptionsByLabel(options)}
      className="w-full"
      isLoading={loading}
      onMenuOpen={() => findDepartment({ variables: { strategyId } })}
    />
  );
};

export default DepartmentDropdown;
