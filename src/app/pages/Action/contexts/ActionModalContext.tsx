import React, { useState, createContext } from 'react';

import { ModalType } from '../types';
import Modal from 'app/components/Modal';
import ActionModal from '../components/ActionModal';
import { UserActionFilter, UserActionSortField, UserSortField } from 'app/generated/graphql';

interface FilterProps {
  actionSort?: UserActionSortField;
  cycleId?: number;
  departmentIds?: number[];
  evaluationTypeIds?: number[];
  evaluatorIds?: number[];
  isActive?: boolean;
  isSelectAll?: boolean;
  locStatus?: string[];
  locationIds?: number[];
  missingEvaluationsIds?: number[];
  name?: string;
  psStatus?: boolean;
  saStatus?: boolean;
  sort?: UserSortField;
  strategyIds?: number[];
  titleIds?: number[];
  userIds?: number[];
}

interface ActionModalContextValues {
  isModalOpen: boolean;
  onOpenModal: (type: ModalType) => void;
  onCloseModal: () => void;
  filter: UserActionFilter;
  handleSetFilter: (value: FilterProps, isOverWrite?: boolean) => void;
}

export const ModalContext = createContext<ActionModalContextValues>({
  isModalOpen: false,
  onOpenModal: () => {},
  onCloseModal: () => {},
  filter: { isSelectAll: false, userIds: [] },
  handleSetFilter: () => {},
});

const ActionModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType | undefined>(undefined);
  const [filter, setFilter] = useState<UserActionFilter>({ isSelectAll: false, userIds: [] });

  const handleSetFilter = (newFilter: FilterProps, isOverWrite: boolean = true) => {
    setFilter(prevFilter => {
      let result;
      // is overwrite -> set other field except selectAll, userIds, cycleId
      if (isOverWrite) {
        result = {
          isSelectAll: newFilter.isSelectAll ?? prevFilter.isSelectAll,
          userIds: newFilter.userIds ?? prevFilter.userIds,
          ...(prevFilter.cycleId && { cycleId: prevFilter.cycleId }),
          ...newFilter,
        };
        // not overwrite -> only update field selectAll, userIds, cycleId if have
      } else {
        result = {
          ...prevFilter,
          ...newFilter,
        };
      }
      return result;
    });
  };

  const onOpenModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setModalType(undefined);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        onOpenModal,
        onCloseModal,
        filter,
        handleSetFilter,
      }}
    >
      {children}
      {modalType !== 'sendReminder' ? (
        <Modal isOpen={isModalOpen} onClose={onCloseModal} padding="20px 40px" size="4xl">
          <ActionModal modalType={modalType} />
        </Modal>
      ) : (
        <ActionModal modalType={modalType} />
      )}
    </ModalContext.Provider>
  );
};

export const useActionModal = () => React.useContext(ModalContext);

export default ActionModalContextProvider;
