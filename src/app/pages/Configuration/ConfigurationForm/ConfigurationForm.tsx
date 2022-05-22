import { Box, Flex } from '@chakra-ui/react';
import Button from 'app/components/ui/Button/Button';
import { Form, InputField } from 'app/components/ui/Form';
import React, { useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  factor: yup.string().required('Normalisation factor is required'),
  average: yup.string().required('Normalisation average is required'),
});

const ConfigurationForm: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const defaultValues = () => {
    // TODO: Missing API
    return {
      factor: 112,
      average: 453,
    };
  };

  const onSubmit = values => {
    // TODO: Missing API
  };

  return (
    <Form validationSchema={validationSchema} onSubmit={onSubmit} defaultValues={defaultValues()}>
      <Box w="25%">
        <div className="grid gap-10">
          <InputField name="factor" label="Normalisation Factor" isDisabled />
          <InputField name="average" label="Normalisation Average" isDisabled />
        </div>
        <Flex mt="17px" gridGap="10px">
          {isEdit ? (
            <React.Fragment>
              <Button variant="outline" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="solid">
                Save
              </Button>
            </React.Fragment>
          ) : (
            <Button disabled variant="solid" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </Flex>
      </Box>
    </Form>
  );
};

export default ConfigurationForm;
