import React from 'react';
import { Box } from '@chakra-ui/react';

import { AverageQuestionSummary } from '../types';
import { QuestionTitle } from './index';

interface Props {
  questionData: AverageQuestionSummary;
}

const Average: React.FC<Props> = ({ questionData }) => {
  return (
    <Box
      sx={{
        '& > *': {
          padding: '0 1rem',
        },
      }}
    >
      <QuestionTitle>{questionData.question.title}</QuestionTitle>
      <QuestionTitle fontSize="14px" color="grey" fontStyle="italic" mt="7px" mb="7px">
        {/* {questionData.question.subtitle} */}
      </QuestionTitle>
      <Box as="p" color="grey" fontSize="13px">
        {questionData.question.text ?? ''}
      </Box>
      {!questionData.question.isOpenQuestion && (
        <>
          <Box fontWeight={500} mt="7px" fontSize="13px">
            Rating Average: {questionData.ratingAverage === 0 ? '-' : questionData.ratingAverage.toFixed(2)}
          </Box>
          <Box bg="#eceef0">
            <Box pt="7px" pb="7px" fontSize="13px" fontWeight={500}>
              Rating Average (MD and Above):{' '}
              {questionData.ratingAverageMdAndAbove === 0 ? '-' : questionData.ratingAverageMdAndAbove.toFixed(2)}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Average;
