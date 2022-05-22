import { Checkbox, CheckboxProps as ChakraCheckboxProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from './Label';

type CheckBoxProps = ChakraCheckboxProps & { name: string; checkboxAfterLabel?: boolean; label?: string };

export const CheckBoxField: React.FC<CheckBoxProps> = ({
  label = '',
  checkboxAfterLabel = false,
  name,
  children,
  ...props
}) => {
  const { register, watch } = useFormContext();
  const { onChange, ...res } = register(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    props?.onChange && props.onChange(event);
  };

  return checkboxAfterLabel ? (
    <div className="flex gap-5">
      {label && <Label label={label} mb={0} />}
      <Checkbox {...res} {...props} onChange={handleChange} />
    </div>
  ) : (
    <div className="flex gap-10">
      <Checkbox isFocusable={false} {...res} isChecked={watch(name)} {...props} onChange={handleChange}>
        {children}
      </Checkbox>
      {label && <Label label={label} mb={0} />}
    </div>
  );
};
