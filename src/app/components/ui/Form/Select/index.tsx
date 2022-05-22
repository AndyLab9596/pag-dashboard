import { Box } from '@chakra-ui/react';
import ReactSelect, { components, createFilter } from 'react-select';

export const baseOptionStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
};

export const customStylesSelect = {
  option: (styles, { isSelected }) => ({
    ...styles,
    ...baseOptionStyles,
    backgroundColor: isSelected ? '#2684FF' : 'none',
  }),
  container: (base: any) => ({
    ...base,
  }),
  control: (base: any) => ({
    ...base,
  }),
  menu: (base: any) => ({
    ...base,
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  menuList: (base: any) => ({
    ...base,
    color: '#373535',
  }),
  singleValue: (provided: any) => {
    return { ...provided };
  },
  placeholder: (base: any) => ({
    ...base,
    color: 'rgb(128, 128, 128)',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '3px 8px',
  }),
};

const customStyleForFlatInput = {
  option: (styles, { isSelected }) => ({
    ...styles,
    ...baseOptionStyles,
    backgroundColor: isSelected ? '#2684FF' : 'none',
  }),
  container: (base: any) => ({
    ...base,
  }),
  control: (base: any) => ({
    ...base,
    border: 'none',
    borderRadius: 0,
  }),
  indicatorsContainer: base => ({
    ...base,
    display: 'none',
  }),
  menu: (base: any) => ({
    ...base,
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  menuList: (base: any) => ({
    ...base,
    color: '#373535',
  }),
  singleValue: (provided: any) => {
    return { ...provided, textAlign: 'center' };
  },
  placeholder: (base: any) => ({
    ...base,
    color: 'rgb(128, 128, 128)',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '3px 8px',
  }),
};

const Option = (props: any) => {
  const { isMulti } = props;
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <Box
      sx={{
        _hover: {
          background: '#deebff',
        },
        '&.custom-select__option--is-focused': {
          background: 'none',
        },
        '&.custom-select__option--is-selected': {
          background: '#2684FF',
        },
      }}
    >
      <components.Option {...newProps}>
        {isMulti && <input className="mr-3" type="checkbox" checked={props.isSelected} onChange={(e: any) => {}} />}

        <Box>{props.label}</Box>
      </components.Option>
    </Box>
  );
};

const Select = (props: any) => {
  const {
    customOption,
    hideSelectedOptions = false,
    placeholder,
    options,
    onChange,
    defaultValue,
    isMulti = false,
    isSearchable = true,
    isClearable = true,
    isFlatInputField = false,
  } = props;

  const onChangeSelect = (event: any) => {
    onChange && onChange(event);
  };
  return (
    <div id="scrollContainer" className={`text-13 ${props.className && props.className}`}>
      <ReactSelect
        className="shadow-7 text-left"
        placeholder={placeholder || 'Select …'}
        closeMenuOnSelect={!isMulti}
        styles={!isFlatInputField ? customStylesSelect : customStyleForFlatInput}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isMulti={isMulti}
        components={customOption ? { Option: customOption } : { Option }}
        options={options}
        defaultValue={defaultValue || ''}
        hideSelectedOptions={hideSelectedOptions}
        onChange={onChangeSelect}
        menuPlacement="auto"
        maxMenuHeight={300}
        filterOption={createFilter({ ignoreAccents: false })}
        {...props}
      />
    </div>
  );
};

export default Select;
