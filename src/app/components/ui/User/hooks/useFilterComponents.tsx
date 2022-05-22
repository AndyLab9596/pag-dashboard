import { useMemo } from 'react';

import Select, { baseOptionStyles, customStylesSelect } from 'app/components/ui/Form/Select';
import useFilterData from './useFilterData';
import { FilterFormData } from '../types';
import { ListSelectFilter } from '../types/ListSelectFilter.enum';

const statusOptions = [
  {
    label: 'Inactive',
    value: true,
  },
  {
    label: 'Active',
    value: false,
  },
];

const selfAssessmentOptions = [
  {
    label: 'In progress',
    value: false,
  },
  {
    label: 'Complete',
    value: true,
  },
];

const perfSummaryOptions = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

interface Props {
  value: FilterFormData;
  handleChange: (field: string, value: string) => void;
  listSelect?: ListSelectFilter[];
}

export default function useFilterComponents(props: Props) {
  const { value, handleChange, listSelect = [] } = props;

  // get select options data here
  const filterData = useFilterData();
  const { titles, locations, departments, evaluators, strategies, forms, contributors } = filterData;

  // Base styles select multi
  const baseStylesSelectMulti = useMemo(() => {
    return {
      ...customStylesSelect,
      option: (provided, { isSelected }) => ({
        ...provided,
        ...baseOptionStyles,
        backgroundColor: isSelected ? 'white' : 'none',
        color: isSelected ? '#000' : 'none',
      }),
    };
  }, []);

  const originalFilterComponents = {
    [ListSelectFilter.title]: {
      key: 'titleId',
      component: (
        <Select
          isMulti
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          defaultValue={''}
          isLoading={titles.loading}
          name="titles"
          placeholder="Title"
          options={titles.data}
          value={value.titles}
          onChange={value => handleChange('titles', value)}
          onMenuOpen={() => !titles.data && titles.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.location]: {
      key: 'locations',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isMulti
          isLoading={locations.loading}
          name="locations"
          placeholder="Location"
          options={locations.data}
          value={value.locations}
          onChange={value => handleChange('locations', value)}
          onMenuOpen={() => !locations.data && locations.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.department]: {
      key: 'departments',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isMulti
          isLoading={departments.loading}
          name="departments"
          placeholder="Department"
          options={departments.data}
          value={value.departments}
          onChange={value => handleChange('departments', value)}
          onMenuOpen={() =>
            (!departments.data || (Array.isArray(departments.data) && departments.data?.length === 0)) &&
            departments.executeQuery()
          }
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.evaluator]: {
      key: 'evaluator',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isMulti
          isLoading={evaluators.loading}
          name="evaluator"
          placeholder="Evaluator"
          options={evaluators.data}
          value={value.evaluators}
          onChange={value => handleChange('evaluators', value)}
          onMenuOpen={() => !evaluators.data && evaluators.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.strategy]: {
      key: 'strategyId',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isLoading={strategies.loading}
          name="strategy"
          placeholder="Strategy"
          options={strategies.data}
          value={value.strategies}
          onChange={value => handleChange('strategies', value)}
          onMenuOpen={() => !strategies.data && strategies.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.form]: {
      key: '',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          isLoading={forms.loading}
          name="forms"
          placeholder="Form"
          options={forms.data}
          value={value.forms}
          onChange={value => handleChange('forms', value)}
          onMenuOpen={() => !forms.data && forms.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.status]: {
      key: 'status',
      component: (
        <Select
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          name="Status"
          placeholder="Status"
          options={statusOptions}
          value={typeof value.status === 'boolean' && statusOptions.find(option => option.value === value.status)}
          onChange={v => handleChange('status', v?.value)}
          cacheOptions={true}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.LOC]: {
      key: 'loc',
      component: (
        <Select
          styles={baseStylesSelectMulti}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          name="contributors"
          placeholder="List of contributors"
          options={contributors.data}
          value={value?.contributors}
          onChange={v => handleChange('contributors', v)}
          cacheOptions={true}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.selfAssessment]: {
      key: ListSelectFilter.selfAssessment,
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          name="selfAssessment"
          placeholder="Self-assessment"
          options={selfAssessmentOptions}
          value={value?.selfAssessment}
          onChange={v => handleChange('selfAssessment', v)}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.missingEvaluations]: {
      key: ListSelectFilter.missingEvaluations,
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          isMulti
          name="missingEvaluations"
          placeholder="Missing evaluations"
          options={evaluators?.data}
          isLoading={evaluators.loading}
          value={value?.missingEvaluations}
          onChange={v => handleChange('missingEvaluations', v)}
          onMenuOpen={() => !evaluators.data && evaluators.executeQuery()}
          className="min-w-200"
        />
      ),
    },
    [ListSelectFilter.perfSummary]: {
      key: ListSelectFilter.perfSummary,
      component: (
        <Select
          styles={baseStylesSelectMulti}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          name="perfSummary"
          placeholder="Performance Summary"
          options={perfSummaryOptions}
          value={value?.perfSummary}
          onChange={v => handleChange('perfSummary', v)}
          className="min-w-200"
        />
      ),
    },
    // add more filters here
    // name of the select is follow FilterFormData type
  };

  const filterComponents = useMemo(() => {
    let matched = listSelect.reduce((prev, current) => {
      if (originalFilterComponents[current]) {
        return {
          ...prev,
          [current]: originalFilterComponents[current],
        };
      }

      return prev;
    }, {});

    return matched;
  }, [listSelect, filterData]);

  return { filterComponents, baseStylesSelectMulti };
}
