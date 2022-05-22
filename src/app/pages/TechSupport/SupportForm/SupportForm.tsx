import { Flex } from '@chakra-ui/react';
import Button from 'app/components/ui/Button/Button';
import { Form } from 'app/components/ui/Form';
import { Label } from 'app/components/ui/Form/Label';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import { useSendMailForTechSupportMutation } from 'app/generated/graphql';
import * as React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  issue: yup.string().required('Please enter issue before submit'),
});

const SupportForm: React.FC = () => {
  const [sendMail, { loading }] = useSendMailForTechSupportMutation();

  const onSubmit = async values => {
    const content = values.issue;
    await sendMail({ variables: { content } });
  };

  return (
    <Form validationSchema={validationSchema} onSubmit={onSubmit} defaultValues={{ issue: '' }}>
      <Label label="Issue" color="#373535" />
      <TextAreaField name="issue" resize="vertical" size="lg" mb="10px" fontSize="13px" />
      <Label
        label="Most requests are handled within two hours, between 9am-6pm Monday - Friday HKT and within the day on weekends"
        color="#373535"
      />
      <Flex justify="flex-end">
        <Button isLoading={loading} type="submit">
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default SupportForm;
