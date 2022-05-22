import * as yup from 'yup';

import Form from 'app/components/ui/Form/Form';

const validationSchema = yup.object({
  details: yup
    .mixed()
    .required('3 words required for submission')
    .test(
      '3 words',
      '3 words required for submission',
      values => values && (values as string).trim().split(' ').length >= 3,
    ),
});

interface Props {}

const ActionFormWrapper: React.FC<Props> = ({ children }) => {
  return <Form validationSchema={validationSchema}>{children}</Form>;
};

export default ActionFormWrapper;
