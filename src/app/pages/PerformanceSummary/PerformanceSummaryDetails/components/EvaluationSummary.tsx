import React from 'react';
import { Box, Divider } from '@chakra-ui/react';

import Average from './Average';
import type { AnswerOfContributor, AverageQuestionSummary } from '../types';
import Answers from './Answers';
import { SummaryContainer } from './index';

interface Props {
  question: AverageQuestionSummary;
  answers?: AnswerOfContributor[];
}

const EvaluationSummary: React.FC<Props> = ({ question, answers }) => {
  return (
    <>
      <SummaryContainer display="flex" margin="14px">
        <Box width="35%" pt="14px" mr="14px">
          <Average questionData={question} />
        </Box>
        <Box width="65%">{answers && <Answers answers={answers} />}</Box>
      </SummaryContainer>
      <Divider height="2px" my="1.5rem" />
    </>
  );
};

export default EvaluationSummary;
