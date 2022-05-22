import { Box } from '@chakra-ui/react';
import { EvaluationAnswer } from 'app/generated/graphql';
import React from 'react';

interface SingleEvaluateProps {
  evaluateItem: EvaluationAnswer;
}

const SingleEvaluate = React.memo(({ evaluateItem }: SingleEvaluateProps) => {
  const ratingMap = {
    0: 'N/A',
    1: 'Performance Issue',
    2: 'Below Standard',
    3: 'Meets Standard',
    4: 'Exceeds Standard',
    5: 'Outstanding',
  };

  return (
    <Box display={'flex'} flexDirection={'column'} mt={'20px'}>
      <span className="font-bold">{evaluateItem?.evaluationTypeQuestion?.title}</span>
      <span className="font-bold mt-5">
        {/* {!evaluateItem.score ? null : `Rating - ${evaluateItem.score} - ${ratingMap[evaluateItem.score]}`} */}
        {evaluateItem.score === null || evaluateItem.score === undefined
          ? null
          : evaluateItem.score === 0
          ? `Rating - ${ratingMap[evaluateItem.score]}`
          : `Rating - ${evaluateItem.score} - ${ratingMap[evaluateItem.score]}`}
      </span>
      <span className="text-lightBlack mt-5">{!evaluateItem.feedback ? null : evaluateItem.feedback}</span>
    </Box>
  );
});

export default SingleEvaluate;
