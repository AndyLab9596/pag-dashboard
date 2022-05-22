import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

import { SummaryContainer, QuestionTitle } from './index';
import { OptOutEvaluation } from '../types';

interface Props extends BoxProps {
  data: OptOutEvaluation[];
}

const OptOutComments: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      <SummaryContainer display="flex" margin="14px">
        <Box width="35%" pt="14px" mr="14px">
          <QuestionTitle padding="0 1rem">No Exposure Comment</QuestionTitle>
        </Box>
        <Box width="65%">
          {data.map(item => (
            <Box key={`${item.contributor?.id}-optOut`}>
              <Box as="p" fontSize="13px" fontWeight={500} color="#3f536e" mt="10px">
                {item.contributor?.name}
              </Box>
              <Box as="p" fontSize="13px" fontWeight={400} color="grey">
                {item.optOutReason}
              </Box>
            </Box>
          ))}
        </Box>
      </SummaryContainer>
      <Divider height="2px" my="1.5rem" />
    </>
  );
};

export default OptOutComments;
