import { Button } from '@chakra-ui/button';
import { Box, Center, Flex } from '@chakra-ui/layout';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { CycleContributor, useMyContributorsQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { LOCStatus, LOCStatusText } from 'common/contributors';
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
import Wrapper from './WrapperMyContributor';

const MyContriButor: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useMyContributorsQuery({
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

  const dataMyContributor = (data?.myContributors as CycleContributor) ?? {};

  return (
    <Wrapper>
      <CardContentLeft>
        {isUser && (
          <Box width="100%" px={2} py={2} variants="with-shadow" borderBottom="1px solid #c5dbea">
            <Center p={4} fontSize="17px" fontWeight="medium" color="#3f536e">
              List Of Contributors
            </Center>
          </Box>
        )}
        <Box borderBottom="1px solid #c5dbea" px={6} py={5}>
          <Center fontSize="15px" fontWeight="medium" color="#3f536e">
            My Contributors
          </Center>
        </Box>
        <Box className="" borderBottom="1px solid #c5dbea" _last={{ borderBottom: 'none' }} bg="#fafbfc">
          <Flex>
            <Box width="100%">
              <CardContent>
                <CardDetail>
                  <CardDetailPerson>
                    <Avatar src={dataMyContributor?.user?.image as string} name={dataMyContributor?.user?.name} />
                    <CardDetailPersonName>{dataMyContributor?.user?.name}</CardDetailPersonName>
                  </CardDetailPerson>
                  <CardDetailRating>
                    <Button
                      variant="link"
                      as="u"
                      color="#000"
                      textTransform="capitalize"
                      cursor="pointer"
                      onClick={() => navigate(RoutesPath.USER_CONTRIBUTORS)}
                    >
                      {LOCStatusText[dataMyContributor?.status ?? LOCStatus.NOT_STARTED]}
                    </Button>
                  </CardDetailRating>
                </CardDetail>
              </CardContent>
            </Box>
          </Flex>
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default MyContriButor;
