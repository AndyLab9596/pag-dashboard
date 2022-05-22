import { Box, chakra } from '@chakra-ui/react';
export * from './UserTitle';

export const BlockWrapper = chakra(Box, {
  baseStyle: {
    border: '1px solid #c5d9e8',
    borderRadius: '4px',
    background: 'linear-gradient(0deg, #fff 0%, #fafbfc 100%)',
    boxShadow: 'inset 0 -1px 0 0 #7e95a7',
    height: 'auto',
    padding: '2rem',
    margin: '1rem',
    color: '#373535',
  },
});

export const Title = chakra(Box, {
  baseStyle: {
    as: 'span',
    fontSize: '17px',
    fontWeight: 'bold',
    mb: '8px',
  },
});

export const Col = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

export const Row = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
});

export const FieldName = chakra(Box, {
  baseStyle: {
    as: 'span',
    fontSize: '13px',
    fontWeight: 'bold',
    mb: '10px',
  },
});

export const FieldValue = chakra(Box, {
  baseStyle: {
    as: 'span',
    fontSize: '13px',
    ml: '10px',
  },
});

export const Promoted = chakra(Box, {
  baseStyle: {
    as: 'p',
    fontSize: '15px',
    color: 'red',
    textAlign: 'center',
    mt: '1rem',
  },
});

export const Desc = chakra(Box, {
  baseStyle: {
    color: '#8dabc4',
    fontSize: '13px',
    mt: '17px',
  },
});
