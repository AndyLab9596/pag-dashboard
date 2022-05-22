import useToastStatus from 'app/components/Toast/useToastHook';
import { FormField } from 'app/components/ui/Form';
import { Label } from 'app/components/ui/Form/Label';
import Select from 'app/components/ui/Form/Select';
import { useGetAllTitlesLazyQuery } from 'app/generated/graphql';
export interface OptionProps {
  id: number;
  name: string;
}

const TitleDropdown = (props: any) => {
  const toast = useToastStatus();
  const { label = '', value, onChange, placeholder, ...rest } = props;
  const [findTitle, { loading, data }] = useGetAllTitlesLazyQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const titles = data?.getAllTitles || [];

  return (
    <div className="w-full">
      {label && <Label label={label} />}
      <Select
        name="title"
        isMulti={false}
        onChange={onChange}
        placeholder={placeholder}
        options={
          titles &&
          titles.map((title: OptionProps) => ({
            value: title.id,
            label: title.name,
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
        onMenuOpen={() => findTitle({ variables: {} })}
        {...rest}
      />
    </div>
  );
};

export const SelectTitlesField = ({ name, ...props }) => {
  return <FormField name={name} component={TitleDropdown} {...props} />;
};
