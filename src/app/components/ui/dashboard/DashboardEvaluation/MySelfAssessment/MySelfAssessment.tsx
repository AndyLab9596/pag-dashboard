import { Button } from '@chakra-ui/button';
import { Box, Center, Flex } from '@chakra-ui/layout';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { useMySelfAssessmentQuery, UserEvaluationStatus } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatusText } from 'common/contributors';
import { useUserPermissions } from 'common/useUserPermissions';
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
import Wrapper from './WrapperMySelfAssessment';

const MySelfAssessment: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useMySelfAssessmentQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { isUser } = useUserPermissions();
  let navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full mt-6 text-center">
        <Spinner />
      </div>
    );
  }

  const { evaluatee, evaluationStatus } = (data?.mySelfAssessment as UserEvaluationStatus) ?? {};

  return (
    <Wrapper>
      <CardContentLeft>
        {isUser && (
          <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
            <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
              Self Assessment
            </Center>
          </Box>
        )}
        <Box borderBottom="1px solid #c5dbea" px={6} py={5}>
          <Center fontSize="15px" fontWeight="medium" color="#3f536e">
            My Self Assessment
          </Center>
        </Box>
        <Box className="" bg="#fafbfc">
          <Flex>
            {evaluatee && (
              <Box width="100%">
                <CardContent>
                  <CardDetail>
                    <CardDetailPerson>
                      <Avatar src={evaluatee?.image as string} name={evaluatee?.name} />
                      <CardDetailPersonName>{evaluatee?.name}</CardDetailPersonName>
                    </CardDetailPerson>
                    <CardDetailRating>
                      <Button
                        variant="link"
                        color="#000"
                        textTransform="capitalize"
                        onClick={() => navigate(RoutesPath.EVALUATIONS_SELF_ASSESSMENT)}
                      >
                        {evaluationStatus
                          ? EvaluationsStatusText[evaluationStatus]
                          : EvaluationsStatusText['not-started']}
                      </Button>
                    </CardDetailRating>
                  </CardDetail>
                </CardContent>
              </Box>
            )}
          </Flex>
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default MySelfAssessment;
