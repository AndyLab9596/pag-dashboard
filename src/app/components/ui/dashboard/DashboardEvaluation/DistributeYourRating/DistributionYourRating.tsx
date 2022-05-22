import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { useGetDistributionRatingsLazyQuery } from 'app/generated/graphql';
import { ChartToolTip } from '../../Chart';
import Wrapper from './WrapperDistributeYourRating';
import EvaluationTypesDropdown from '../../EvaluationTypeDropdown';
import QuestionDropdown from '../../QuestionDropdown';
import { CardContentLeft } from '../../Card/CardWrapper';

const DistributionYourRating: React.FC = () => {
  const [evaluationTypeId, setEvaluationTypeId] = React.useState<number | undefined>();
  const [questionId, setQuestionId] = React.useState<number | undefined>();
  const [distributionRating, setDistributionRating] = React.useState<{ name: string; pv: number }[]>();

  const [getRating] = useGetDistributionRatingsLazyQuery({
    onCompleted: data => {
      const result = data.getDistributionRatings.ratings
        .filter(rating => rating.score !== 0 && rating.score !== null && rating.score !== undefined)
        .map((item, index) => {
          return {
            name: item.score?.toString() ?? '',
            pv: item.entries,
          };
        });
      setDistributionRating(result);
    },
  });

  React.useEffect(() => {
    getRating({
      variables: {
        evaluationType: evaluationTypeId,
        question: questionId,
      },
    });
  }, [evaluationTypeId, questionId, getRating]);

  return (
    <Wrapper className=" ">
      <CardContentLeft>
        <Box width="100%" px={0} py={0} variants="with-shadow">
          <Center
            p={6}
            fontSize="17px"
            fontWeight="medium"
            color="#3f536e"
            borderBottom="1px solid #c5dbea"
            textAlign="center"
          >
            Distribution of your ratings on evaluatees for this cycle
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={2} className="flex flex-col gap-y-3">
          <Center mb={2}>
            <EvaluationTypesDropdown
              onChange={(evaluationTypeId: number | undefined) => setEvaluationTypeId(evaluationTypeId)}
            />
          </Center>
          <Center>
            <QuestionDropdown evaluationTypeId={evaluationTypeId} onChange={questionId => setQuestionId(questionId)} />
          </Center>
        </Box>

        <div className="contribution__FormChart">
          <ChartToolTip data={distributionRating} />
        </div>
      </CardContentLeft>
    </Wrapper>
  );
};

export default DistributionYourRating;
