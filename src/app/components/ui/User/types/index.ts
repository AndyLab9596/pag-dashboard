import { ListUsersColumnID } from './ListUsersColumnID.enum';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterFormData {
  evaluators?: SelectOption[];
  locations?: SelectOption[];
  titles?: SelectOption[];
  departments?: SelectOption[];
  strategies?: SelectOption[];
  forms?: SelectOption[];
  status?: any;
  name?: string;
  contributors?: SelectOption[];
  selfAssessment?: SelectOption;
  missingEvaluations?: SelectOption[];
  perfSummary?: SelectOption;
}

export interface SortState {
  sortDirection: string;
  columnId: string;
}

export interface FilterDataLazyLoad {
  [key: string]: {
    executeQuery: () => void;
    loading: boolean;
    data?: SelectOption[]; // | any
  };
}

export interface EvaluationState {
  status?: string;
  optOut?: boolean;
  isOpenEvaluation?: boolean;
}

export interface ColumnOptions {
  id: ListUsersColumnID;
  header?: string | React.ReactNode;
  minWidth?: number | string;
  width?: number | string;
  disableSortBy?: boolean;
  className?: string;
  clickAble?: boolean;
}
