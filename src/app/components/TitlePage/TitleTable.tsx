import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {}

const TitleTable: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Box as="h1" fontSize="17px" lineHeight="22px" {...rest}>
      {children}
    </Box>
  );
};

export default TitleTable;
