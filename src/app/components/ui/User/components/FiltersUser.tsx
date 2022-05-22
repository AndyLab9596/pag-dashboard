import { useState } from 'react';

import Button from 'app/components/ui/Button/Button';
import Input from 'app/components/ui/Form/Input';
import Select from 'app/components/ui/Form/Select';
import useSaveFilterLocalStorage from '../hooks/useSaveFilterLocalStorage';
import { FilterFormData } from '../types';
import SavedFilter from './SavedFilter';
import useFilterComponents from '../hooks/useFilterComponents';
import { ListSelectFilter } from '../types/ListSelectFilter.enum';

interface FilterUserProps {
  value: FilterFormData;
  onChange: (value: FilterFormData) => void;
  filterOptions?: ListSelectFilter[];
  localStorageName: string;
}

const FilterUser: React.FC<FilterUserProps> = props => {
  const { value, onChange, localStorageName, filterOptions = [] } = props;

  const { savedFilters, setSavedFilters, activeSavedFilter, setActiveSavedFilter, activeFilters, setActiveFilters } =
    useSaveFilterLocalStorage(localStorageName, onChange);
  const [valueOfActiveFilters, setValueOfActiveFilters] = useState([]);
  const handleChange = (field, value) => {
    onChange({ ...props.value, [field]: value });
    setActiveSavedFilter(null);
  };

  const { filterComponents, baseStylesSelectMulti } = useFilterComponents({
    value,
    handleChange,
    listSelect: filterOptions,
  });

  const handleChangeActiveFilters = activeFilters => {
    setValueOfActiveFilters(activeFilters);
    const activeFiltersValue = filterOptions.filter(ft => activeFilters.find(af => af.value === ft));
    setActiveFilters(activeFiltersValue);
    setActiveSavedFilter(null);
    if (activeFilters.length === 0) onChange({});
  };

  const onSaveFilter = name => {
    setSavedFilters(prevSavedFilters => ({
      ...prevSavedFilters,
      [name]: { filterValue: value, activeFilters },
    }));
    setActiveSavedFilter(name);
  };

  const onDeleteFilter = name => {
    setSavedFilters(prevSavedFilters => {
      delete prevSavedFilters[name];
      localStorage.setItem(localStorageName, JSON.stringify(prevSavedFilters));
      return { ...prevSavedFilters };
    });
    setActiveSavedFilter(null);
  };

  const handleChangeSavedFilter = activeSavedFilter => {
    setActiveSavedFilter(activeSavedFilter);
    if (activeSavedFilter) {
      const { filterValue, activeFilters } = savedFilters[activeSavedFilter];
      onChange(filterValue);
      setActiveFilters(activeFilters);
    }
  };

  const clearActiveFilter = () => {
    let newValues = {};
    Object.keys(value).forEach(key => {
      if (Array.isArray(value[key])) {
        newValues[key] = [];
      } else {
        newValues[key] = undefined;
      }
    });
    onChange(newValues);

    handleChangeActiveFilters(valueOfActiveFilters);
  };

  return (
    <>
      <div className="flex flex-wrap gap-10">
        <Select
          name="filters"
          isMulti
          isSearchable={false}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={handleChangeActiveFilters}
          placeholder="Select Filters"
          options={filterOptions.map(filter => ({ value: filter, label: filter.replaceAll('_', ' ') }))}
          value={activeFilters.map(filter => ({
            value: filter,
            label: filter.replaceAll('_', ' '),
          }))}
          styles={baseStylesSelectMulti}
          className="min-w-200"
        />
        <SavedFilter
          activeSavedFilter={activeSavedFilter}
          onChangeSavedFilter={handleChangeSavedFilter}
          savedFilters={Object.keys(savedFilters)}
          onSave={onSaveFilter}
          onDelete={onDeleteFilter}
        />
      </div>

      <div className="flex flex-wrap gap-10">
        <Input
          value={value.name ?? ''}
          width="auto"
          minW="200px"
          placeholder="Name"
          onChange={e => handleChange('name', e.target.value)}
        />
        {activeFilters.map(filter => (
          <div key={filter} className="filter-item">
            {filterComponents[filter].component}
          </div>
        ))}
        <Button
          onClick={() => {
            clearActiveFilter();
          }}
        >
          Clear All
        </Button>
      </div>
    </>
  );
};

export default FilterUser;
