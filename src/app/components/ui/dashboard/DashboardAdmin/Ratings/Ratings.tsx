import { Box, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import { css } from '@emotion/css';
import Avatar from 'app/components/ui/Avatar';
import Spinner from 'app/components/ui/Spinner';
import { useGetAllHighestRatingsQuery } from 'app/generated/graphql';
import React from 'react';
import { CardContent, CardContentLeft, CardDescription, CardDetail, CardDetailPerson } from '../../Card/CardWrapper';
import Wrapper from './WrapperRating';

const Ratings: React.FC = () => {
  const { data, loading } = useGetAllHighestRatingsQuery({
    fetchPolicy: 'no-cache',
  });
  const highestRatingUsers = data?.getHighestRating ?? [];

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
            Highest Ratings
            <Tooltip label="Users with 60% and above of ratings of 4 and above">
              <CardDescription
                className={css`
                  font-weight: normal;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
              >
                Users with 60% and above of ratings of 4 and above
              </CardDescription>
            </Tooltip>
          </Box>
        </Box>
        {loading && <Spinner />}
        {highestRatingUsers.map(highestRatingUser => (
          <Flex key={highestRatingUser.user.id} borderBottom="1px solid #cccccc">
            <Box
              className={css`
                width: 100%;
                font-size: 14px;
              `}
            >
              <CardContent>
                <Flex
                  className={css`
                    justify-content: space-between;
                    align-items: center;
                  `}
                >
                  <CardDetail>
                    <CardDetailPerson
                      className={css`
                        align-items: center;
                      `}
                    >
                      <Avatar src={highestRatingUser.user.image as string} name={highestRatingUser.user.name} />
                    </CardDetailPerson>
                    <div
                      className={css`
                        align-self: center;
                      `}
                    >
                      {highestRatingUser.user.name}
                    </div>
                  </CardDetail>

                  <div>{highestRatingUser.averageScore}</div>
                </Flex>
              </CardContent>
            </Box>
          </Flex>
        ))}
      </CardContentLeft>
    </Wrapper>
  );
};

export default Ratings;
