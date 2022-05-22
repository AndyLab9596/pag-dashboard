import {
  useGetAllDepartmentsLazyQuery,
  useGetAllEvaluationTypesLazyQuery,
  useGetAllLocationsLazyQuery,
  useGetAllStrategiesLazyQuery,
  useGetAllTitlesLazyQuery,
  useGetAllUsersLazyQuery,
} from 'app/generated/graphql';
import type { FilterDataLazyLoad } from '../types';
import { contributorStatus } from '../utils';
import { groupOptionsByLabel } from 'utils/groupBy';

const useFilterData = () => {
  let filterData: FilterDataLazyLoad = {};

  const [getLocations, { loading: locationLoading, data: dataLocations }] = useGetAllLocationsLazyQuery();
  const [getTitles, { data: dataTitles, loading: titlesLoading }] = useGetAllTitlesLazyQuery();
  const [getDepartments, { data: dataDepartments, loading: departmentsLoading }] = useGetAllDepartmentsLazyQuery();
  const [getAllUsers, { data: dataEvaluators, loading: evaluatorsLoading }] = useGetAllUsersLazyQuery();
  const [getAllStrategies, { data: dataStrategies, loading: allStrategiesLoading }] = useGetAllStrategiesLazyQuery();
  const [getForms, { data: dataForms, loading: formsLoading }] = useGetAllEvaluationTypesLazyQuery();

  filterData = {
    ...filterData,
    locations: {
      executeQuery: getLocations,
      loading: locationLoading,
      data: dataLocations?.getAllLocations.map(r => ({ value: `${r.id}`, label: r.name })),
    },
    titles: {
      executeQuery: getTitles,
      loading: titlesLoading,
      data: dataTitles?.getAllTitles.map(r => ({ value: `${r.id}`, label: r.name })),
    },
    departments: {
      executeQuery: getDepartments,
      loading: departmentsLoading,
      data: groupOptionsByLabel(
        dataDepartments?.getAllDepartments.map(r => ({ value: `${r.id}`, label: r.name })) ?? [],
      ),
    },
    evaluators: {
      executeQuery: getAllUsers,
      loading: evaluatorsLoading,
      data: dataEvaluators?.getAllUsers.map(r => ({ value: `${r.id}`, label: r.name })),
    },
    strategies: {
      executeQuery: getAllStrategies,
      loading: allStrategiesLoading,
      data: dataStrategies?.getAllStrategies.map(r => ({ value: `${r.id}`, label: r.name })),
    },
    forms: {
      executeQuery: getForms,
      loading: formsLoading,
      data: dataForms?.getAllEvaluationTypes.map(r => ({ value: `${r.id}`, label: r.name })),
    },
    contributors: {
      executeQuery: () => {},
      loading: false,
      data: contributorStatus,
    },
  };

  return filterData;
};

export default useFilterData;
