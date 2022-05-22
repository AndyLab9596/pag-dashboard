import { Box, chakra } from '@chakra-ui/react';

export const QuestionTitle = chakra(Box, {
  baseStyle: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#3f536e',
  },
});

export const SummaryContainer = chakra(Box, {
  baseStyle: {
    display: 'flex',
    margin: '14px',
  },
});
