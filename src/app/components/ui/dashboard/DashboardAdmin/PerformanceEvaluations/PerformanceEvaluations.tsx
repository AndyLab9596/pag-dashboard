import { Box, Flex } from '@chakra-ui/layout';
import { css } from '@emotion/css';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import { useGetListPerformanceEvaluationsQuery } from 'app/generated/graphql';
import React from 'react';
import {
  CardContent,
  CardContentLeft,
  CardDescription,
  CardDetail,
  CardDetailPerson,
  CardForm,
} from '../../Card/CardWrapper';
import PerformanceStatusButton from './PerformanceStatusButton';
import Wrapper from './WrapperPerformance';

const PerformanceEvaluations: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetListPerformanceEvaluationsQuery({
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

  if (loading) {
    return null;
  }

  const dataPerformance = data?.getListPerformanceEvaluations ?? [];

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={0} py={0} variants="with-shadow">
          <Box
            fontSize="17px"
            fontWeight="semibold"
            padding="20px 10px 10px"
            borderBottom="1px solid #c5dbea"
            color="#3f536e"
          >
            Performance Evaluations
            <CardDescription
              className={css`
                font-weight: normal;
              `}
            >
              <p>Percent completed</p>
            </CardDescription>
          </Box>
        </Box>

        <CardForm
          className={css`
            height: 496px;
          `}
        >
          {dataPerformance.map(data => (
            <Flex key={data.user.id} borderBottom="1px solid #cccccc">
              <Box
                className={css`
                  width: 100%;
                  font-size: 14px;
                `}
              >
                <CardContent>
                  <CardDetail>
                    <CardDetailPerson>
                      <Avatar src={data.user.image as string} name={data.user.name} />
                      <Box className="card__detail-person-name" flexShrink={{ sm: 0, md: 'unset' }}>
                        {data.user.name}
                      </Box>
                    </CardDetailPerson>
                    <div className="card__detail-rating self-center ml-10">
                      <PerformanceStatusButton
                        evaluateeId={data.user.id}
                        psComplete={data.isComplete}
                        percentageComplete={data.completedPercentage}
                        completePerformance={data.completePerformance}
                        totalPerformance={data.totalPerformance}
                      />
                    </div>
                  </CardDetail>
                </CardContent>
              </Box>
            </Flex>
          ))}
        </CardForm>
      </CardContentLeft>
    </Wrapper>
  );
};

export default PerformanceEvaluations;
