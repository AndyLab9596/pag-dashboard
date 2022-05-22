import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface LabelProps extends TextProps {
  label: string;
}
export const Label: React.FC<LabelProps> = props => {
  const { label, ...restProps } = props;
  return (
    <Text fontSize="13px" mb="5px" {...restProps}>
      {label}
    </Text>
  );
};
