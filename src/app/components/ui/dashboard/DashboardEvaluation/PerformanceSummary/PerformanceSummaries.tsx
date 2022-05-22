import { Box, Center, Flex } from '@chakra-ui/react';
import { ListIcon } from 'app/components/Icons';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import PerformanceSummaryStatus from 'app/components/ui/Button/PerformanceSummaryStatus';
import Spinner from 'app/components/ui/Spinner';
import { PerformanceSummaryDetails, useGetListOfPerformanceSummaryQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
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
import Wrapper from './WrapperPerformanceSumary';

const PerformanceSummaries: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetListOfPerformanceSummaryQuery({
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

  const dataPerformanceSummary = (data?.getListOfPerformanceSummary as PerformanceSummaryDetails[]) ?? [];

  const averageComplete =
    (dataPerformanceSummary.filter(item => item.isComplete).length / dataPerformanceSummary.length) * 100;

  const percentComplete = Number(averageComplete?.toFixed(0)) || 0;

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
          <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
            Performance Summaries
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={5}>
          <Center fontSize="15px" fontWeight="medium" color="#3f536e">
            List of Performance Summaries
          </Center>
        </Box>
        <Flex h="210px" align="center" borderBottom="1px solid #c5dbea">
          <EvaluationBox icon={<ListIcon />} percentComplete={percentComplete} color="#00B5CC" />
        </Flex>

        <Box borderBottom="1px solid #c5dbea" bg="#fafbfc" height={'290px'} overflowY="auto">
          {dataPerformanceSummary.map(dataSummary => (
            <Flex key={dataSummary.id}>
              <Box width="100%" p="2">
                <CardContent>
                  <CardDetail>
                    <CardDetailPerson>
                      <Avatar src={dataSummary.user.image as string} name={dataSummary.user.name} />
                      <CardDetailPersonName>
                        {dataSummary.user.name}
                        {/* <Text className="card__detail-date">
                          {renderDay({
                            cardType: CARD_TYPE.SUMMARIES,
                            departmentInfo: dataSummary.user?.department,
                            isComplete: dataSummary.isComplete ?? false,
                            // optOut: dataSummary.status === 'Opted out',
                          })}
                        </Text> */}
                      </CardDetailPersonName>
                    </CardDetailPerson>
                    <CardDetailRating>
                      <PerformanceSummaryStatus
                        psComplete={dataSummary.isComplete ?? false}
                        evaluateeId={dataSummary.user.id.toString()}
                        evaluatorId={dataSummary.user?.evaluator?.id.toString() ?? ''}
                        percentageComplete={dataSummary.percentComplete}
                      />
                    </CardDetailRating>
                  </CardDetail>
                </CardContent>
              </Box>
            </Flex>
          ))}
          {(!dataPerformanceSummary || dataPerformanceSummary?.length === 0) && (
            <Box fontSize="13px" mt="10px" ml="10px">
              No result found.
            </Box>
          )}
        </Box>

        <Flex width="100%" px={4} py={4} variants="with-shadow" height={'98px'} justifyContent="center">
          <Center>
            <button className="viewBtn" onClick={() => navigate(RoutesPath.PERFORMANCE_SUMMARY)}>
              View
            </button>
          </Center>
        </Flex>
      </CardContentLeft>
    </Wrapper>
  );
};
export default PerformanceSummaries;
