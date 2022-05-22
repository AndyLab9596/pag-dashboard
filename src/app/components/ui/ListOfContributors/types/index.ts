export interface ContributorState {
  id: number;
  firstName: string;
  lastName: string;
  title: {
    name: string;
  };
  strategy: {
    name: string;
  };
  department: {
    name: string;
  };
  location: {
    name: string;
  };
  projectDetails?: string | null;
}

export interface FormState {
  details: string;
  contributor: {
    value: string;
    label: string;
  };
}

export interface LastYearSelectedUser {
  id: number;
  name: string;
}

export interface PermissionState {
  canDelete: boolean;
  canAdd: boolean;
  canSubmit: boolean;
  canApprove: boolean;
}

export interface ModalProperties {
  title?: string;
  body?: string;
  buttonTitle?: string;
  closeButtonText?: string;
}

export type ModalVariantKey =
  | 'confirmSubmit'
  | 'confirmApprove'
  | 'successSubmit'
  | 'successApprove'
  | 'confirmDelete'
  | 'lockSystem';

export type ModalVariants = {
  [key in ModalVariantKey]: ModalProperties;
};

export interface ConfigContributorsPage {
  LOCStatusAfterAddContributor?: string;
  isActionVisible?: boolean;
  isSubmitVisible?: boolean;
  sendReminder?: boolean;
  handleDisableRow?: (original: any) => boolean;
  closeCallback?: () => void;
}
