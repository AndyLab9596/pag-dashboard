import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TitlePageProps extends TextProps {}
const TitlePage: React.FC<TitlePageProps> = ({ children, ...restProps }) => {
  return (
    <Text textTransform={'uppercase'} fontWeight="600" fontSize="13" display="block" {...restProps}>
      {children}
    </Text>
  );
};

export default TitlePage;
