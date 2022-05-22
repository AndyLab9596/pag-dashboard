import { useState, useLayoutEffect } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import TitlePage from 'app/components/TitlePage/TitlePage';
import Select from 'app/components/ui/Form/Select';
import useQuery from './hooks/useQuery';
import { useDebounce } from 'common/useDebounce';
import ListOfContributors from './components/ListOfContributors';
import FilterUser from 'app/components/ui/User/components/FiltersUser';
import { FilterFormData } from 'app/components/ui/User/types';
import { ListSelectFilter } from 'app/components/ui/User/types/ListSelectFilter.enum';
import { useGetAllCyclesQuery } from 'app/generated/graphql';
import Loader from 'app/components/Loader/Loader';
import Evaluations from './components/Evaluations';
import ProfileModalRouter from 'app/components/ui/UserModal/ProfileModalRouter';
import Reports from './components/Reports';
import Full from './components/Full';
import ActionModalContextProvider from './contexts/ActionModalContext';
import useAction from './hooks/useAction';
import StaticModal from 'app/components/Modal/StaticModal';
import { SelectOption } from './types';
import { useUserPermissions } from 'common/useUserPermissions';
import SendReminderRouter from 'app/components/ui/Reminder/components/SendReminderRouter';

// relative to mode query
const options = [
  {
    label: 'Full',
    value: 0,
  },
  {
    label: 'List of contributors',
    value: 1,
  },
  {
    label: 'Evaluations',
    value: 2,
  },
  {
    label: 'Reports',
    value: 3,
  },
];

let baseFilter = [
  ListSelectFilter.title,
  ListSelectFilter.location,
  ListSelectFilter.department,
  ListSelectFilter.evaluator,
  ListSelectFilter.strategy,
  ListSelectFilter.status,
  ListSelectFilter.form,
];

// relative to mode query
const ModeComponents = [
  {
    label: 'Full',
    Component: Full,
    mode: 0,
    additionalFilters: [
      ListSelectFilter.LOC,
      ListSelectFilter.selfAssessment,
      ListSelectFilter.missingEvaluations,
      ListSelectFilter.perfSummary,
    ],
  },
  {
    label: 'List of contributors',
    Component: ListOfContributors,
    mode: 1,
    additionalFilters: [ListSelectFilter.LOC],
  },
  {
    label: 'Evaluations',
    Component: Evaluations,
    mode: 2,
    additionalFilters: [ListSelectFilter.selfAssessment, ListSelectFilter.missingEvaluations],
  },
  {
    label: 'Reports',
    Component: Reports,
    mode: 3,
    additionalFilters: [ListSelectFilter.perfSummary],
  },
];

export function ActionPage() {
  return (
    <LayoutRightSide>
      <ActionModalContextProvider>
        <Main />
      </ActionModalContextProvider>
    </LayoutRightSide>
  );
}

const Main = () => {
  const query = useQuery();
  const { isSuperAdmin } = useUserPermissions();

  const [selectedCycle, setSelectedCycle] = useState<SelectOption | null>(null);
  const [Mode, setMode] = useState<typeof ModeComponents[0] | undefined>(undefined);
  const { rowAction, isActionLoading, isOpenStaticModal, onCloseStaticModal, staticModalProps } = useAction();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<FilterFormData>({});
  const debounceNameTyping = useDebounce(filter.name, 500);

  useLayoutEffect(() => {
    let mode = ModeComponents.find(({ mode }) => mode === +(query.get('mode') ?? 0));
    setMode(mode);
  }, [query.get('mode')]);

  const { data: allCycles, loading } = useGetAllCyclesQuery({
    onCompleted: data => {
      if (data?.getAllCycle.length > 0) {
        let activeCycle = data.getAllCycle.find(cycle => cycle.isActive);

        setSelectedCycle({
          label: activeCycle?.name || data.getAllCycle[0].name,
          value: activeCycle ? activeCycle.id : data.getAllCycle[0].id,
        });
      }
    },
  });

  const onChangeMode = (option: SelectOption) => {
    setTimeout(() => {
      navigate({
        search: +option.value > 0 ? `?mode=${option.value}` : '',
      });
    }, 100);
  };

  const onChangeCycle = (option: SelectOption) => {
    setTimeout(() => {
      setSelectedCycle(option);
    }, 0);
  };

  const onChangeFilter = (values: FilterFormData) => {
    if (!isEqual(values, filter)) {
      setFilter(values);
    }
  };

  return (
    <>
      <HStack justifyContent="space-between" mb="1rem">
        <VStack alignItems="flex-start">
          <TitlePage>MODE</TitlePage>
          <Select
            options={options}
            className="min-w-200"
            isClearable={false}
            isSearchable={false}
            hideSelectedOptions={false}
            value={options.filter(({ value }) => value === +(query.get('mode') ?? 0))}
            onChange={onChangeMode}
          />
        </VStack>
        {isSuperAdmin && (
          <VStack alignItems="flex-end">
            <TitlePage>CYCLE</TitlePage>
            <Select
              className="min-w-200 w-200"
              options={allCycles?.getAllCycle?.map(c => ({ value: c.id, label: c.name }))}
              value={selectedCycle}
              onChange={onChangeCycle}
              isClearable={false}
              isSearchable={false}
              isLoading={loading}
            />
          </VStack>
        )}
      </HStack>
      <FilterUser
        value={filter}
        onChange={onChangeFilter}
        filterOptions={[...baseFilter, ...(Mode?.additionalFilters ?? [])]}
        localStorageName={`views/${query.get('mode') ?? 0}/filter/1`}
      />
      {selectedCycle && Mode ? (
        <Mode.Component
          filter={{
            ...filter,
            name: debounceNameTyping,
          }}
          cycleId={+selectedCycle.value}
          rowAction={rowAction}
        />
      ) : (
        <Loader isLoading={true} />
      )}
      <SendReminderRouter />
      <ProfileModalRouter />

      {isActionLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <Loader isLoading={isActionLoading} />
        </Box>
      )}

      <StaticModal isOpen={isOpenStaticModal} onClose={onCloseStaticModal} {...staticModalProps} />
    </>
  );
};

export default ActionPage;
