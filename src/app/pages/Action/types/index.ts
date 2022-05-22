import { FilterFormData } from 'app/components/ui/User/types';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';

export interface ModeComponentProps {
  filter: FilterFormData;
  cycleId: number | null;
  rowAction: {
    id: ListUsersColumnID;
    Header: (original: any) => JSX.Element;
    Cell: (original: any) => JSX.Element;
  };
}

export type ModalType = 'reset' | 'export' | 'sendReminder' | 'approve';

export interface ActionModalOption {
  type?: 'Checkbox' | 'RadioButton';
  label: string;
  name: string;
  value?: any;
  options?: ActionModalOption[];
  defaultOptions?: any;
}

export interface ResetFormValues {
  [key: string]: boolean;
}

export interface SelectedField {
  label: string;
  value: number;
}

export interface SelectOption {
  label: string;
  value: number;
}
