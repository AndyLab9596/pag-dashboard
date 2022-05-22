import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ListIcon } from 'app/components/Icons';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { EvaluationDetails, useGetListOfPerformanceEvaluationsQuery } from 'app/generated/graphql';
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
import Wrapper from './WrapperListPerformance';

const ListPerformance: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetListOfPerformanceEvaluationsQuery({
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

  if (loading) {
    return (
      <div className="w-full mt-6 text-center">
        <Spinner />
      </div>
    );
  }

  const dataPerformanceEvaluations = (data?.getListOfPerformanceEvaluations as EvaluationDetails) ?? {};

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
          <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
            Performance Evaluations
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={5}>
          <Center fontSize="15px" fontWeight="medium" color="#3f536e">
            List of Your Performance Evaluations
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea">
          <EvaluationBox
            icon={<ListIcon />}
            percentComplete={dataPerformanceEvaluations?.percentComplete ?? 0}
            color="#00b5cc"
          />
        </Box>

        <Box h="232px" overflowY="scroll" borderBottom="1px solid #c5dbea" bg="#fafbfc">
          {dataPerformanceEvaluations?.evaluationStatus?.map(({ evaluatee: user, evaluationStatus, evaluationId }) => {
            return (
              <Flex key={`dashboard-ps-of-${user?.id}`} minH="58px">
                <Box width="100%">
                  <CardContent>
                    <CardDetail>
                      <CardDetailPerson>
                        <Avatar src={user?.image as string} name={user?.name} />
                        <CardDetailPersonName>
                          <div>{user?.name}</div>
                          <Text className="card__detail-date">
                            {renderDay({
                              cardType: CARD_TYPE.EVALUATIONS,
                              departmentInfo: user?.department,
                              isComplete: evaluationStatus === EvaluationsStatus.COMPLETED,
                              optOut: evaluationStatus === 'Opted out',
                            })}
                          </Text>
                        </CardDetailPersonName>
                      </CardDetailPerson>
                      <CardDetailRating>
                        {user?.id && (
                          <>
                            {evaluationStatus === EvaluationsStatus.COMPLETED || evaluationStatus === 'Opted out' ? (
                              <Button
                                variant="link"
                                as="u"
                                color="#000"
                                fontSize="13px"
                                fontWeight="semibold"
                                textTransform={'capitalize'}
                                minWidth="100px"
                                textAlign="center"
                                cursor="pointer"
                                onClick={() =>
                                  evaluationId &&
                                  navigate(RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${evaluationId}`), {
                                    state: { isEvaluationMode: true },
                                  })
                                }
                              >
                                {evaluationStatus !== 'Opted out'
                                  ? EvaluationsStatusText[evaluationStatus]
                                  : 'Opted out'}
                              </Button>
                            ) : (
                              <Button
                                // bg="primary"
                                fontSize="13px"
                                bg="#000080"
                                fontWeight="semibold"
                                variant="primary"
                                color="white"
                                textTransform={'capitalize'}
                                minWidth="100px"
                                textAlign="center"
                                onClick={() =>
                                  evaluationId &&
                                  navigate(RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${evaluationId}`), {
                                    state: { isEvaluationMode: true },
                                  })
                                }
                              >
                                {evaluationStatus
                                  ? EvaluationsStatusText[evaluationStatus]
                                  : EvaluationsStatusText['not-started']}
                              </Button>
                            )}
                          </>
                        )}
                      </CardDetailRating>
                    </CardDetail>
                  </CardContent>
                </Box>
              </Flex>
            );
          })}
          {(!dataPerformanceEvaluations || dataPerformanceEvaluations?.evaluationStatus?.length === 0) && (
            <Box fontSize="13px" mt="10px" ml="10px">
              No result found.
            </Box>
          )}
        </Box>

        <Box width="100%" px={4} py={4} variants="with-shadow">
          <Center>
            <button className="viewBtn" onClick={() => navigate(RoutesPath.EVALUATIONS)}>
              View
            </button>
          </Center>
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default ListPerformance;
