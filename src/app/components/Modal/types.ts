export interface ModalProperties {
  title?: string;
  body?: string | React.ReactElement;
  buttonTitle?: string;
  closeButtonText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
}

export type ModalVariantKey =
  | 'successSubmit'
  | 'successApprove'
  | 'confirmDelete'
  | 'lockSystem'
  | 'successExport'
  | 'successPrint'
  | 'successSave'
  | 'confirmExport'
  | 'confirmSubmitLOC'
  | 'confirmApproveLOC';

export type ModalVariants = {
  [key in ModalVariantKey]: ModalProperties;
};
