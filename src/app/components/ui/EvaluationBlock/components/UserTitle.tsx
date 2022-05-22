import React from 'react';
import type { BoxProps } from '@chakra-ui/react';
import { Box, VStack } from '@chakra-ui/react';

import Avatar from 'app/components/ui/Avatar';

interface Props extends BoxProps {
  image?: string | null | undefined;
  name: string;
  title?: string;
}

const UserTitle: React.FC<Props> = ({ image, name, title, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      {...rest}
    >
      <Avatar src={image ?? ''} mr="10px" />
      <VStack spacing="0px" color="#373535" alignItems="flex-start" h="full">
        <Box as="span" fontWeight="bold" fontSize="13px">
          {name}
        </Box>
        <Box as="span" fontSize="13px">
          {title}
        </Box>
      </VStack>
    </Box>
  );
};

export default UserTitle;
