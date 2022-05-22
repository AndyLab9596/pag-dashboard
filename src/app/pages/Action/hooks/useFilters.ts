import { useState, useEffect, useCallback } from 'react';

import { AdminViewFullQueryVariables } from 'app/generated/graphql';
import { FilterFormData } from 'app/components/ui/User/types';
import { useActionModal } from '../contexts/ActionModalContext';

interface Props {
  filter: FilterFormData;
  page?: number;
}

const useFilters = (props: Props) => {
  const { filter } = props;
  const [filterVariables, setFilterVariables] = useState<AdminViewFullQueryVariables>({
    page: 1,
  });
  const { handleSetFilter } = useActionModal();

  useEffect(() => {
    let variables = {
      departmentIds: filter.departments?.flatMap(item => item.value.split(',').map(Number)),
      evaluationTypeIds: filter.forms?.map(item => +item.value),
      evaluatorIds: filter.evaluators?.map(item => +item.value),
      locationIds: filter.locations?.map(item => +item.value),
      strategyIds: filter.strategies?.map(item => +item.value),
      name: filter.name,
      isActive: filter.status,
      titleIds: filter.titles?.map(item => +item.value),
      locStatus: filter.contributors?.map(item => item.value) as string[],
      missingEvaluationsIds: filter.missingEvaluations?.map(item => +item.value),
      saStatus: filter.selfAssessment?.value !== undefined ? Boolean(filter.selfAssessment?.value) : undefined,
      psStatus: filter.perfSummary?.value !== undefined ? Boolean(filter.perfSummary?.value) : undefined,
      page: 1,
    };

    Object.keys(variables).forEach(key => {
      if (variables[key] === undefined || (Array.isArray(variables[key]) && variables[key].length === 0)) {
        delete variables[key];
      }
    });

    setFilterVariables(variables);

    const { page, ...rest } = variables;
    handleSetFilter(rest);
  }, [JSON.stringify(filter)]);

  const setCurrentPage = useCallback(
    (page: number) => setFilterVariables(prev => ({ ...prev, page })),
    [setFilterVariables],
  );

  return { filterVariables, setCurrentPage };
};

export default useFilters;
