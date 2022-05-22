import React from 'react';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import { useFormContext } from 'react-hook-form';

const FormOptOut = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <React.Fragment>
      <TextAreaField name="optOutContent" rows={5} placeholder="Comments" />
      {!!errors['optOutContent'] && <p className="text-13 text-error my-5">*{errors['optOutContent'].message}</p>}
    </React.Fragment>
  );
};

export default FormOptOut;
