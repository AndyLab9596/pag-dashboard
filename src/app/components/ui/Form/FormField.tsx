import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const FormField = ({ name, className, component, children, ...props }: any) => {
  const formHandlers = useFormContext();

  const { control, formState } = formHandlers;

  return (
    <div className={`${className}`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) =>
          React.createElement(component, { onChange, onBlur, value, ...props })
        }
        {...props}
      />

      {formState.errors && formState.errors[name] && (
        <ErrorMessage
          name={name}
          render={() => <p className="text-error text-left mt-5 p-0 m-0 text-13">{formState.errors[name].message}</p>}
        />
      )}
    </div>
  );
};
