import useToastStatus from 'app/components/Toast/useToastHook';
import { useListContributorsQuery } from 'app/generated/graphql';
import React from 'react';
import EvaluationBox from './EvaluationBox';

interface ListOfContributorItemsProps {
  strategyId?: number;
  departmentIds?: number[];
}

const ListOfContributor: React.FC<ListOfContributorItemsProps> = ({ strategyId, departmentIds }) => {
  const toast = useToastStatus();

  const { data } = useListContributorsQuery({
    variables: {
      strategyId,
      departmentIds,
    },
    fetchPolicy: 'no-cache',
    onError: error => {
      toast({
        status: 'error',
        title: error.message,
      });
    },
  });

  const listContributor = data?.listContributors;

  return (
    <EvaluationBox
      title="List Of Contributors"
      complete={listContributor?.complete}
      overall={listContributor?.overall}
      percentComplete={listContributor?.percentComplete ?? 0}
      color="#0093ee"
    />
  );
};

export default ListOfContributor;
