import { useState, useEffect, useCallback } from 'react';

import { GetAllUsersWithDetailQueryVariables } from 'app/generated/graphql';
import { FilterFormData } from 'app/components/ui/User/types';

interface Props {
  filter: FilterFormData;
  page?: number;
}

const useFilters = (props: Props) => {
  const { filter } = props;
  const [filterVariables, setFilterVariables] = useState<GetAllUsersWithDetailQueryVariables>({
    page: 1,
  });

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
      page: 1,
    };

    Object.keys(variables).forEach(key => {
      if (variables[key] === undefined || (Array.isArray(variables[key]) && variables[key].length === 0)) {
        delete variables[key];
      }
    });

    setFilterVariables(variables);
  }, [JSON.stringify(filter)]);

  const setCurrentPage = useCallback(
    (page: number) => setFilterVariables(prev => ({ ...prev, page })),
    [setFilterVariables],
  );

  return { filterVariables, setCurrentPage };
};

export default useFilters;
