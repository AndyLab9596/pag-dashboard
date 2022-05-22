import { Box, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';
import { useFormContext, useController } from 'react-hook-form';

interface RadioScoreFieldProps {
  name: string;
  withNAvailable: boolean;
  isBorderRed?: boolean;
}

export const RadioScoreField: React.FC<RadioScoreFieldProps> = ({
  name,
  withNAvailable,
  isBorderRed,
}: RadioScoreFieldProps) => {
  const options = ['0', '1', '2', '3', '4', '5'];
  const { control, setValue } = useFormContext();

  const { field } = useController({
    control,
    name,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: val => setValue(name, val, { shouldValidate: true }),
    value: field.value && field.value.toString(),
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map(value => {
        const radio = getRadioProps({ value });
        if (!withNAvailable) {
          if (value !== '0') {
            return (
              <RadioCard key={value} radio={radio} isBorderRed={isBorderRed}>
                {value}
              </RadioCard>
            );
          }
        }
        if (withNAvailable) {
          return (
            <RadioCard key={value} radio={radio} isBorderRed={isBorderRed}>
              {value === '0' ? 'N/A' : value}
            </RadioCard>
          );
        }
        return [];
      })}
    </HStack>
  );
};

const RadioCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props.radio);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box {...checkbox} {...defaultRadioItem} borderColor={props.isBorderRed ? '#dc2626' : '#000080'}>
        {props.children}
      </Box>
    </Box>
  );
};

const defaultRadioItem = {
  width: '45px',
  height: '45px',
  borderWidth: '2px',
  borderColor: '#000080',
  borderRadius: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '15px',
  _hover: { cursor: 'pointer', bg: '#0067ac', color: 'white' },
  _checked: {
    bg: '#0067ac',
    color: 'white',
  },
  color: '#3F536E',
  fontSize: '13px',
};
