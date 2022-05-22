import {
  NumberInput,
  NumberInputField as NumberInputChakraField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps as NumberInputChakraProps,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type NumberInputProps = NumberInputChakraProps & { name: string; size?: 'xs' | 'sm' | 'md' | 'lg' };

export const NumberInputField: React.FC<NumberInputProps> = ({ name, size = 'sm', ...props }) => {
  const { register } = useFormContext();
  return (
    <NumberInput {...props} size={size}>
      <NumberInputChakraField {...register(name)} _hover={{ outline: 0 }} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
