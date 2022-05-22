import { extendTheme, withDefaultProps, ThemeConfig } from '@chakra-ui/react';
import { ButtonStyles as Button } from './ButtonStyles';
import { InputStyles as Input } from './InputStyles';

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const theme = extendTheme(
  withDefaultProps({
    defaultProps: {
      variant: 'outline',
      size: 'lg',
    },
    components: ['Input', 'NumberInput', 'PinInput'],
  }),
  {
    fonts: {
      body: "'Heebo', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'",
    },
  },
  {
    colors: {
      primary: '#845EC2',
      secondary: '#000080',
      highlight: '#00C9A7',
      warning: '#FFC75F',
      danger: '#C34A36',
      inputForm: '#d834eb',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      15: '0.9375rem',
    },

    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    sizes: {
      max: 'max-content',
      min: 'min-content',
      full: '100%',
      '3xs': '14rem',
      '2xs': '16rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      '8xl': '90rem',
      container: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    components: {
      Input,
      Button,
    },
  },
  { config },
);

export default theme;
