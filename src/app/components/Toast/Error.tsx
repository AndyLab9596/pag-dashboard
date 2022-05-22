import { Wrap } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import React from 'react';

const Error: React.FC = () => {
  const toast = useToast();
  const statuses = ['error'];

  return (
    <Wrap>
      {statuses.map(
        () =>
          !toast.isActive('Sorry, Something wrong !') &&
          toast({
            id: 'Sorry, Something wrong !',
            title: 'error',
            description: 'Sorry, Something wrong !',
            status: 'error',
            duration: 3000,
            position: 'top-right',
            isClosable: true,
          }),
      )}
    </Wrap>
  );
};

export default Error;
