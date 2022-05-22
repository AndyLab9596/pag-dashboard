import { Box, Flex, Radio, RadioGroup, RadioProps, StackDirection } from '@chakra-ui/react';
import * as React from 'react';
import { FormField } from '.';
import { Label } from './Label';

export interface OptionsProps {
  name: string;
  value: string;
  subOption?: JSX.Element;
  uncheckedShow?: boolean;
}

type RadioFieldProps = RadioProps & {
  name: string;
  label?: string;
  direction?: StackDirection;
  options: OptionsProps[];
};

const RadioField: React.FC<RadioFieldProps> = ({
  label = '',
  name,
  direction = 'row',
  children,
  options,
  ...props
}) => {
  return (
    <Box {...props}>
      {label && <Label label={label} />}
      <FormField
        name={name}
        component={({ value, onChange }) => (
          <RadioGroup defaultValue="0" value={value} onChange={onChange}>
            <Flex direction={direction}>
              {options.map((opt, i) => {
                const isChecked = value === opt.value;
                const subOption = () => {
                  if (opt.uncheckedShow) return opt.subOption;
                  return isChecked && opt.subOption;
                };
                return (
                  <Box key={i} w={direction === 'row' ? '50%' : '100%'}>
                    <Radio value={opt.value} my="13px">
                      <Label label={opt.name} mb="0" />
                    </Radio>
                    <Box>{subOption()}</Box>
                  </Box>
                );
              })}
            </Flex>
          </RadioGroup>
        )}
      />
    </Box>
  );
};

export default RadioField;
