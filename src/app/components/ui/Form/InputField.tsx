import React from 'react';
import { InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Input from './Input';
import { Label } from './Label';
type InputProps = ChakraInputProps & { name: string; label?: string };

export const InputField: React.FC<InputProps> = ({ name, label = '', ...props }) => {
  const { register } = useFormContext();

  const registerResult = register(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    registerResult.onChange(event);
    props.onChange && props.onChange(event);
  };

  return (
    <div>
      {label && <Label label={label} />}
      <Input register={registerResult} {...props} onChange={handleChange} />
      <ErrorMessage
        name={name}
        render={({ message }) => <p className="text-error text-left mt-5 p-0 m-0 text-13">{message}</p>}
      />
    </div>
  );
};
