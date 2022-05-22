import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { PersonBadgeIcon } from 'app/components/Icons';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { EvaluationDetails, useGetSelfAssessmentForEvaluateesQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatus, EvaluationsStatusText } from 'common/contributors';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardContent,
  CardContentLeft,
  CardDetail,
  CardDetailPerson,
  CardDetailPersonName,
  CardDetailRating,
} from '../../Card/CardWrapper';
import EvaluationBox from '../../DashboardAdmin/Evalutions/EvaluationBox';
import { CARD_TYPE } from '../types';
import { renderDay } from '../utils';
import Wrapper from './WrapperListSelfAssessment';

const ListSelfAssessment: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetSelfAssessmentForEvaluateesQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  let navigate = useNavigate();

  const onStatusClicked = (evaluationStatus: string, evaluationId?: number | null) => {
    return evaluationStatus === EvaluationsStatus.COMPLETED && evaluationId !== undefined && evaluationId !== null
      ? navigate(RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${evaluationId}`), {
          state: {
            isEvaluationMode: true,
          },
        })
      : null;
  };

  if (loading) {
    return (
      <div className="w-full mt-6 text-center">
        <Spinner />
      </div>
    );
  }

  const dataSelfAssessmentEval = (data?.getSelfAssessmentForEvaluatees as EvaluationDetails) ?? {};

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
          <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
            Self Assessment
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={5}>
          <Center fontSize="15px" fontWeight="medium" color="#3f536e">
            Self Assessments for Evaluatees
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea">
          <EvaluationBox
            icon={<PersonBadgeIcon />}
            percentComplete={dataSelfAssessmentEval.percentComplete}
            color="#000080"
          />
        </Box>

        <Box h="232px" overflowY="scroll" borderBottom="1px solid #c5dbea" bg="#fafbfc">
          {dataSelfAssessmentEval.evaluationStatus.map(({ evaluationStatus, evaluatee, evaluationId }) => {
            return (
              <Flex key={`dashboard-sa-of-${evaluatee?.id}`} minH="58px">
                <Box width="100%">
                  <CardContent>
                    <CardDetail>
                      <CardDetailPerson>
                        <Avatar src={evaluatee?.image as string} name={evaluatee?.name} />
                        <CardDetailPersonName>
                          <div>{evaluatee?.name}</div>
                          <Text className="card__detail-date">
                            {renderDay({
                              cardType: CARD_TYPE.ASSESSMENT,
                              departmentInfo: evaluatee?.department,
                              isComplete: evaluationStatus === EvaluationsStatus.COMPLETED,
                            })}
                          </Text>
                        </CardDetailPersonName>
                      </CardDetailPerson>
                      <CardDetailRating>
                        {evaluationStatus === EvaluationsStatus.IN_PROGRESS ? (
                          <Button
                            variant="link"
                            color="#3f536e"
                            opacity={0.5}
                            cursor="not-allowed"
                            textTransform={'capitalize'}
                          >
                            {EvaluationsStatusText[evaluationStatus]}
                          </Button>
                        ) : evaluationStatus === EvaluationsStatus.COMPLETED ? (
                          <Button
                            variant="link"
                            color="#000"
                            textTransform={'capitalize'}
                            onClick={() => onStatusClicked(evaluationStatus, evaluationId)}
                          >
                            {EvaluationsStatusText[evaluationStatus]}
                          </Button>
                        ) : (
                          <Button
                            variant="link"
                            color="#000"
                            textTransform={'capitalize'}
                            onClick={() => onStatusClicked(evaluationStatus ?? 'not-started', evaluationId)}
                          >
                            {evaluationStatus
                              ? EvaluationsStatusText[evaluationStatus]
                              : EvaluationsStatusText['not-started']}
                          </Button>
                        )}
                      </CardDetailRating>
                    </CardDetail>
                  </CardContent>
                </Box>
              </Flex>
            );
          })}
          {(!dataSelfAssessmentEval || dataSelfAssessmentEval?.evaluationStatus?.length === 0) && (
            <Box fontSize="13px" mt="10px" ml="10px">
              No result found.
            </Box>
          )}
        </Box>

        <Box width="100%" px={4} py={4} variants="with-shadow">
          <Center>
            <button className="viewBtn" onClick={() => navigate(RoutesPath.EVALUATIONS_SELF_ASSESSMENT_LIST)}>
              View
            </button>
          </Center>
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default ListSelfAssessment;
