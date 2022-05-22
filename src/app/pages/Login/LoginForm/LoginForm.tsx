import { Button, Center, Stack } from '@chakra-ui/react';
import { useLogin } from 'app/components/Auth/useLogin';
import { Form, InputField } from 'app/components/ui/Form';
import { LoginMutationVariables } from 'app/generated/graphql';
import config from 'config';
import React from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import './LoginFormStyle.scss';

const validationSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').strict(false).trim().required('Email is required'),
  password: yup.string().strict(false).trim().required('Password is required'),
});

export const LoginForm: React.FC = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginMutationVariables): Promise<void> => {
    await login(values);
    navigate(config.DASHBOARD_PATH);
  };

  return (
    <Form onSubmit={onSubmit} className="form" validationSchema={validationSchema}>
      <Stack spacing={3} padding="1.5rem 1.5rem 0">
        <span className="login-title mb-3">Login to your account</span>
        <InputField name="email" placeholder="Username" color="rgb(26, 32, 44)" />
        <InputField name="password" placeholder="Password" type="password" color="rgb(26, 32, 44)" />
        {error && <LoginError />}
        <Center>
          <Button type="submit" isLoading={loading} width="121px" height="35px">
            Sign in
          </Button>
        </Center>
      </Stack>
    </Form>
  );
};

const LoginError: React.FC = () => {
  return (
    <p className="text-error text-13 text-left">
      The user name or password you entered is not correct. Try entering it again
    </p>
  );
};
