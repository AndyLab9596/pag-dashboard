import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { UsersIcon } from 'app/components/Icons';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { LoCsDetail, useGetLoCsAwaitingApprovalQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { LOCStatus, LOCStatusText } from 'common/contributors';
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
import Wrapper from './WrapperListOfContributor';

const ListOfContriButor: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetLoCsAwaitingApprovalQuery({
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

  const dataContributorAwaiting = (data?.getLOCsAwaitingApproval as LoCsDetail) ?? {};

  return (
    <Box>
      <CardContentLeft>
        <Wrapper>
          <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
            <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
              List Of Contributors
            </Center>
          </Box>
          <Box borderBottom="1px solid #c5dbea" px={6} py={5} color="#3f536e">
            <Center fontSize="15px" fontWeight="medium">
              List Of Contributors Awaiting Approval
            </Center>
          </Box>
          <Box borderBottom="1px solid #c5dbea">
            <EvaluationBox
              icon={<UsersIcon />}
              percentComplete={dataContributorAwaiting.percentComplete}
              color="#0093ee"
            />
          </Box>

          <Box h="232px" overflowY="scroll" borderBottom="1px solid #c5dbea" bg="#fafbfc">
            {dataContributorAwaiting.users.map(user => (
              <Flex key={`dashboard-loc-of-${user.id}`} minH="58px">
                <Box width="100%">
                  <CardContent>
                    <CardDetail>
                      <CardDetailPerson>
                        <Avatar src={user.image as string} name={user.name} />

                        <CardDetailPersonName>
                          {user.name}
                          <Text className="card__detail-date">
                            {renderDay({
                              cardType: CARD_TYPE.CONTRIBUTORS,
                              departmentInfo: user?.department,
                              status: user.cycleContributors[0].status ?? LOCStatus.NOT_STARTED,
                            })}
                          </Text>
                        </CardDetailPersonName>
                      </CardDetailPerson>

                      <CardDetailRating>
                        {user.cycleContributors.length === 0 ||
                        user.cycleContributors[0].status === LOCStatus.NOT_STARTED ||
                        user.cycleContributors[0].status === LOCStatus.IN_PROGRESS ? (
                          <Button
                            variant="link"
                            textTransform="capitalize"
                            cursor="not-allowed"
                            minWidth="80px"
                            textAlign="center"
                          >
                            {user.cycleContributors[0].status
                              ? LOCStatusText[user.cycleContributors[0].status]
                              : LOCStatusText['not-started']}
                          </Button>
                        ) : (
                          <Button
                            fontSize="13px"
                            textTransform="capitalize"
                            variant="link"
                            color="#000"
                            minWidth="80px"
                            textAlign="center"
                            onClick={() =>
                              navigate(RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER.replace(':userId', `${user.id}`))
                            }
                          >
                            {user.cycleContributors[0].status
                              ? LOCStatusText[user.cycleContributors[0].status]
                              : LOCStatusText['not-started']}
                          </Button>
                        )}
                      </CardDetailRating>
                    </CardDetail>
                  </CardContent>
                </Box>
              </Flex>
            ))}
            {(!dataContributorAwaiting || dataContributorAwaiting?.users?.length === 0) && (
              <Box fontSize="13px" mt="10px" ml="10px">
                No result found.
              </Box>
            )}
          </Box>

          <Box width="100%" px={4} py={4} variants="with-shadow">
            <Center>
              <button className="viewBtn" onClick={() => navigate(RoutesPath.LIST_OF_CONTRIBUTORS)}>
                View
              </button>
            </Center>
          </Box>
        </Wrapper>
      </CardContentLeft>
    </Box>
  );
};

export default ListOfContriButor;
