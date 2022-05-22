import React from 'react';
import { Box } from '@chakra-ui/react';

import { AnswerOfContributor } from '../types';

const ratingMap = {
  1: 'Performance Issue',
  2: 'Below Standard',
  3: 'Meets Standard',
  4: 'Exceeds Standard',
  5: 'Outstanding',
};

interface Props {
  answers: AnswerOfContributor[];
}

const Answers: React.FC<Props> = ({ answers }) => {
  return (
    <>
      {answers
        .sort(a => (a.contributor?.title?.isMDOrAbove ? 1 : -1))
        .map(ans => {
          let score = ans?.answer?.score ?? null;
          let rating = `Rating - ${score} - ${score !== null && score !== 0 ? ratingMap[score] : ''}`;
          let isMDOrAbove = ans.contributor?.title?.isMDOrAbove ?? false;

          return (
            <Box
              key={`${ans.contributor?.id}-${ans.answer?.evaluationTypeQuestion?.id}`}
              bg={isMDOrAbove ? '#eceef0' : 'none'}
              padding="14px"
              fontWeight={500}
              color="#373535"
            >
              <Box as="p" fontSize="13px">
                {ans.contributor?.name}
              </Box>
              {score !== null && score !== 0 && (
                <Box as="p" fontSize="13px">
                  {rating}
                </Box>
              )}
              <Box fontWeight={400} color="grey" fontSize="13px">
                {ans.answer?.feedback}
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default Answers;
