import { Box, BoxProps } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useGetDistributionRatingsQuery } from 'app/generated/graphql';
import React, { ReactElement } from 'react';

interface TableItemsProps {
  evaluationType?: number;
  question?: number;
}

let scores = [1, 2, 3, 4, 5, 0];

const TableDistribution: React.FC<TableItemsProps> = ({ evaluationType, question }) => {
  const toast = useToastStatus();
  const { data } = useGetDistributionRatingsQuery({
    variables: {
      evaluationType: evaluationType,
      question: question,
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const dataDistribution = data?.getDistributionRatings;
  const totalPercent = dataDistribution?.ratings?.reduce((prev, current) => prev + current.percentage, 0);
  const renderRow = (params: { label: string; render: ReactElement }) => {
    return (
      <Box
        sx={{
          '&:first-of-type': {
            my: '1rem',
          },
        }}
        my="2rem"
        display="table-row"
        lineHeight="45px"
      >
        <Item fontWeight={500}>{params.label}</Item>
        {params.render}
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" className="bg-gray-1 p-10">
      <Box fontSize="11px" overflowX="scroll" display="table">
        {renderRow({
          label: 'Rating',
          render: (
            <>
              {scores
                .filter(score => score !== 0)
                .map(score => (
                  <Item key={`label-${score}`} fontWeight={500}>
                    {score}
                  </Item>
                ))}
              <Item fontWeight={500}>N/A</Item>
              <Item fontWeight={500}>Total</Item>
            </>
          ),
        })}
        {renderRow({
          label: '# Entries',
          render: (
            <>
              {scores.map(score => (
                <Item key={`entries-${score}`}>
                  {dataDistribution?.ratings.find(rating => rating.score === score)?.entries}
                </Item>
              ))}
              <Item>{dataDistribution?.total}</Item>
            </>
          ),
        })}
        {renderRow({
          label: '% of Total',
          render: (
            <>
              {scores.map(score => (
                <Item key={`entries-${score}`}>
                  {dataDistribution?.ratings.find(rating => rating.score === score)?.percentage ?? 0}%
                </Item>
              ))}
              <Item>{totalPercent?.toFixed(0)}%</Item>
            </>
          ),
        })}
        {renderRow({
          label: 'Median',
          render: <Item>{dataDistribution?.mean}</Item>,
        })}
        {renderRow({
          label: 'Std Dev',
          render: <Item>{dataDistribution?.stdDev}</Item>,
        })}
        {renderRow({
          label: 'Nrm Rating',
          render: (
            <>
              {scores.map(score => (
                <Item key={`nrm-${score}`}>
                  {dataDistribution?.ratings.find(rating => rating.score === score)?.normalize}
                </Item>
              ))}
            </>
          ),
        })}
      </Box>
    </Box>
  );
};

const Item: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box display="table-cell" {...rest}>
      {children}
    </Box>
  );
};

export default TableDistribution;
