export interface SelectOption {
  label: string;
  value: any;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  //previous comment
  showPreviousComment: null | SelectOption;
  //option select
  evaluator: null | SelectOption;
  department: null | SelectOption;
  startDate: Date;
  location: null | SelectOption;
  title: null | SelectOption;
  strategy: null | SelectOption;
  pastTitle: null | SelectOption;
  formType: null | SelectOption;
  //others admin
  specialAdmin: boolean;
  superAdmin: boolean;
  departmentHead: boolean;
  //country admin
  countryAdmin: boolean;
  countryAdminCode: undefined | any[];
  //city admin
  cityAdmin: boolean;
  city: undefined | any[];
  //active&lock
  lockSystem: boolean;
  active: boolean;
  //user related
  limitedViewUser: SelectOption[];
  extraViewUser: SelectOption[];
}
