import has from 'lodash/has';
export interface SelectOption {
  label: string;
  value: any;
}

export const mapSelectOptionList = (options: any[]) => {
  return options.map((option: any) => ({
    label: option.name,
    value: option.id,
  }));
};

export const mapSelectOption = (option: any) => {
  if (has(option, 'name') && has(option, 'id')) {
    return {
      label: option.name,
      value: option.id,
    };
  }

  return option;
};

export const getSelectedValue = (option: SelectOption) => {
  return option.value;
};

export const mappingValueFromArray = (array?: SelectOption[]) => array?.map(item => item.value) ?? [];
