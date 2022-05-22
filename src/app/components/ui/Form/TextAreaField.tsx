import { Textarea, TextareaProps as TextareaChakraProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type TextAreaProps = TextareaChakraProps & { name: string; resize?: 'none' | 'vertical' | 'horizontal' };

export const TextAreaField: React.FC<TextAreaProps> = ({ name, resize = 'none', ...props }) => {
  const { register, formState } = useFormContext();
  const onChangeTextArea = event => {
    props.onChange && props.onChange(event);
  };
  return (
    <>
      <Textarea resize={resize} {...register(name)} {...props} onChange={onChangeTextArea} />
      {formState.errors && formState.errors[name] && (
        <ErrorMessage
          name={name}
          render={() => <p className="text-error text-left mt-5 p-0 m-0 text-13">{formState.errors[name].message}</p>}
        />
      )}
    </>
  );
};
