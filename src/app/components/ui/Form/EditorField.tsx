import { DefaultEditor } from 'react-simple-wysiwyg';
import { Label } from './Label';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ChangeEvent, useState } from 'react';

type EditorFieldProps = { name: string; label?: string };

export const EditorField: React.FC<EditorFieldProps> = ({ name, label = '', ...props }) => {
  const formHandlers = useFormContext();
  const { control, formState } = formHandlers;
  const [html, setHtml] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FieldValues, string>) => {
    setHtml(e.target.value);

    field.onChange({
      target: { value: e.target.value, name: field.name },
    });
  };

  return (
    <div>
      {label && <Label label={label} />}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <DefaultEditor
              value={field.value || html}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, field)}
            />
          );
        }}
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
