import { Box } from '@chakra-ui/layout';
import { css } from '@emotion/css';
import useToastStatus from 'app/components/Toast/useToastHook';
import Avatar from 'app/components/ui/Avatar';
import { useGetPendingLocApprovalQuery } from 'app/generated/graphql';
import React from 'react';
import {
  CardContent,
  CardContentLeft,
  CardDetail,
  CardDetailPerson,
  CardDetailPersonName,
  CardForm,
} from '../../Card/CardWrapper';
import Wrapper from './PendingLOCWrapper';

const PendingLOCApprovalFor: React.FC = () => {
  const toast = useToastStatus();
  const { data, loading } = useGetPendingLocApprovalQuery({
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

  const dataPendingLoc = data?.getPendingLOCApproval ?? [];

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={0} variants="with-shadow">
          <Box
            fontSize="17px"
            fontWeight="semibold"
            padding="20px 10px 30px"
            borderBottom="1px solid #c5dbea"
            color="#3f536e"
          >
            Pending LOC Approval For
          </Box>
        </Box>

        <CardForm
          className={css`
            height: 496px;
          `}
        >
          {dataPendingLoc.map(data => (
            <Box key={data.id} borderBottom="1px solid #cccccc" w="full">
              <CardContent>
                <CardDetail>
                  <CardDetailPerson>
                    <Avatar src={data.user?.image as string} name={data.user?.name} />
                    <CardDetailPersonName>{data.user?.name}</CardDetailPersonName>
                  </CardDetailPerson>
                </CardDetail>
              </CardContent>
            </Box>
          ))}
        </CardForm>
      </CardContentLeft>
    </Wrapper>
  );
};

export default PendingLOCApprovalFor;
