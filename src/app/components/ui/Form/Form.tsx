import React, { useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Errors {
  [key: string]: string;
}

export interface FormProps {
  className?: string;
  children?: any;
  onSubmit?: (values: any, defaultValues?: any) => any;
  validationSchema: yup.AnyObjectSchema;
  defaultValues?: any;
  mode?: 'onBlur' | 'onSubmit' | 'onChange' | undefined;
  style?: any;
  id?: string;
}

export class SubmitError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super('SubmitError');
    this.name = 'SubmitError'; // (2)
    this.errors = errors;
  }
}

export const Form = ({ mode = 'onSubmit', defaultValues, validationSchema, ...props }: FormProps) => {
  const formHandlers = useForm<any>({
    defaultValues: React.useMemo(() => defaultValues, [defaultValues]),
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
  });

  // Call use effect to keep track of defaultValues if any of the defaultValues's value changed.
  // Because by default, defaultValues from react-hook-form updates ONLY ONCE at the initial render, even if defaultValues props changed, defaultValues wont update.
  React.useEffect(() => {
    if (defaultValues) {
      formHandlers.reset(defaultValues);
    }
  }, [JSON.stringify(defaultValues)]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = formHandlers.handleSubmit(async values => {
    try {
      props.onSubmit && (await props.onSubmit(values, defaultValues));
      const formValues = formHandlers.getValues();
      formHandlers.reset(formValues);
    } catch (e: any) {
      if (e instanceof SubmitError && e.errors) {
        Object.keys(e.errors).map(name => formHandlers.setError(name, { type: 'error' }, e.errors[name]));
      }
    }
  });

  return (
    <FormProvider {...formHandlers}>
      <form {...props} onSubmit={onSubmit} ref={formRef}>
        {props.children}
      </form>
    </FormProvider>
  );
};

export default Form;
