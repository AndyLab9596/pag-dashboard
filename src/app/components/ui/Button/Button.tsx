import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';
interface ButtonProps extends ChakraButtonProps {
  type?: 'button' | 'submit';
  variant?: 'solid' | 'outline' | 'outlineSecondary' | 'link';
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, type = 'button', children, onClick } = props;
  return (
    <ChakraButton ref={ref} variant={variant} type={type} onClick={onClick} {...props}>
      {children}
    </ChakraButton>
  );
});
export default Button;
