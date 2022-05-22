import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  register?: UseFormRegisterReturn;
}
const Input: React.FC<InputProps> = props => {
  const { register, ...restProps } = props;
  return (
    <ChakraInput
      variant="outline"
      fontSize="13px"
      height="38px"
      padding="10px"
      borderColor="#a8c6df"
      lineHeight="none"
      {...register}
      {...restProps}
    />
  );
};

export default Input;
