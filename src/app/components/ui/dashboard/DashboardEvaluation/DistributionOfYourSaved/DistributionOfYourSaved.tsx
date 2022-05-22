import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import { CardContentLeft } from '../../Card/CardWrapper';
import EvaluationTypeDropdown from '../../EvaluationTypeDropdown';
import QuestionDropdown from '../../QuestionDropdown';
import TableDistribution from './TableDistribution';
import Wrapper from './WrapperDistribution';

const DistributionOfYourSaved: React.FC = props => {
  const [evaluationTypeId, setEvaluationTypeId] = React.useState<number | undefined>();
  const [questionId, setQuestionId] = React.useState<number | undefined>();

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={0} py={0} variants="with-shadow">
          <Center
            p={6}
            fontSize="17px"
            fontWeight="medium"
            color="#3f536e"
            borderBottom="1px solid #c5dbea"
            h={'66px'}
            textAlign="center"
          >
            Distribution of your Saved & Submitted Ratings
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={2} className="flex flex-col gap-y-3">
          <Center mb={2}>
            <EvaluationTypeDropdown onChange={evaluationTypeId => setEvaluationTypeId(evaluationTypeId)} />
          </Center>
          <Center>
            <QuestionDropdown onChange={questionId => setQuestionId(questionId)} evaluationTypeId={evaluationTypeId} />
          </Center>
        </Box>
        <Box maxHeight="352px" overflowY="scroll">
          <TableDistribution evaluationType={evaluationTypeId} question={questionId} />
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default DistributionOfYourSaved;
