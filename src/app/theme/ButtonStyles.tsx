import { whiten } from '@chakra-ui/theme-tools';

// Inide of `ButtonStyles`
export const ButtonStyles = {
  baseStyle: {
    fontWeight: '400',
    fontSize: '15px',
    py: '5px',
    width: 'fit-content',
    minWidth: '2.5rem',
  },
  sizes: {
    regular: {
      px: '1rem',
      minWidth: '2.5rem',
      height: '38px',
    },
  },
  variants: {
    solid: props => ({
      bg: 'secondary',
      color: 'white',
      _hover: {
        boxShadow: 'md',
        bg: whiten('#0067ac', 10),
      },
      _focus: {
        boxShadow: 'none',
      },
      _active: {
        bg: '#57579c',
      },
      _disabled: {
        opacity: 1,
        bg: '#7d7dbf',

        _hover: {
          bg: '#7d7dbf !important',
        },
      },
    }),
    outline: props => ({
      bg: '#fff',
      color: '#7b808e',
      border: '1px solid #dadadb',
      _hover: {
        bg: whiten('#f9f9f9', 10),
      },
    }),
    outlineSecondary: props => ({
      bg: '#0000001a',
      color: '#00000099',
      _hover: {
        bg: 'rgba(0,0,0,0.3)',
        color: '#fff',
      },
      _disabled: {
        bg: '#0000001a !important',
        color: '#00000099 !important',
      },
    }),
    link: props => ({
      textDecoration: 'underline',
      opacity: '1',
      fontWeight: 'medium',
      fontSize: '13px',
      color: '#3f536e',
      _focus: {
        boxShadow: 'none',
      },
      _hover: {
        color: '#8dabc4',
      },
    }),
  },
  defaultProps: {
    variant: 'solid',
    size: 'regular',
  },
};
