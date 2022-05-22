import { Box, Flex, Icon } from '@chakra-ui/react';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import TitlePage from 'app/components/TitlePage/TitlePage';
import { Label } from 'app/components/ui/Form/Label';
import * as React from 'react';
import { FaUsers } from 'react-icons/fa';
import SupportForm from './SupportForm/SupportForm';
export function TechSupportPage() {
  return (
    <LayoutRightSide>
      <TitlePage color="#2c405a" fontSize={17} fontWeight={500} mb="16px">
        Need help? Let us know how we can assist you.
      </TitlePage>
      <Flex mb="10px">
        <Icon as={FaUsers} color="#373535" boxSize="20px" mr="10px" />
        <Label
          label="Please fill in the details below and we will respond to your request as soon as possible"
          color="#373535"
        ></Label>
      </Flex>
      <Box ml={30} w={550}>
        <SupportForm />
      </Box>
    </LayoutRightSide>
  );
}
