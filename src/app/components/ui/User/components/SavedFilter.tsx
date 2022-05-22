import Button from 'app/components/ui/Button/Button';
import Input from 'app/components/ui/Form/Input';
import Select from 'app/components/ui/Form/Select';
import { useState } from 'react';
import { MdClear } from 'react-icons/md';
import { components } from 'react-select';
interface SavedFilterProps {
  onSave(name: string): void;
  onDelete(name: string): void;
  savedFilters: string[];
  onChangeSavedFilter(string): void;
  activeSavedFilter: string | null;
}

const SavedFilter: React.FC<SavedFilterProps> = props => {
  const { onDelete, onChangeSavedFilter, onSave, activeSavedFilter, savedFilters } = props;
  const [filterName, setFilterName] = useState('');
  const savedFiltersOptions = savedFilters.map(sf => ({ value: sf, label: sf }));
  const selectedValue = activeSavedFilter ? { value: activeSavedFilter, label: activeSavedFilter } : '';

  const CustomOption = props => {
    return (
      <div>
        <components.Option {...props}>
          <div className="w-full flex justify-between items-center" onClick={e => onChangeSavedFilter(props.label)}>
            <div>{props.label}</div>
            <div
              onClick={e => {
                e.stopPropagation();
                onDelete(props.label);
              }}
            >
              <MdClear />
            </div>
          </div>
        </components.Option>
      </div>
    );
  };

  return (
    <>
      {savedFiltersOptions.length > 0 && (
        <Select
          name="filters"
          isSearchable={false}
          onChange={e => {
            if (!e) onChangeSavedFilter(null);
          }}
          customOption={CustomOption}
          placeholder="Select Saved Filter"
          options={savedFiltersOptions}
          value={selectedValue}
          className="min-w-200"
        />
      )}
      {!selectedValue && (
        <>
          <Input
            value={filterName}
            width="auto"
            placeholder="Filter Name"
            onChange={e => setFilterName(e.target.value)}
          />
          <Button
            onClick={() => {
              if (!filterName) return;
              onSave(filterName);
              setFilterName('');
            }}
          >
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default SavedFilter;
