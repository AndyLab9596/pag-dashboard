import React from 'react';

import SendReminderModal from 'app/components/ui/Reminder/components/SendReminderModal';
import { useActionModal } from '../contexts/ActionModalContext';

const SendReminderWrapper = () => {
  const { onCloseModal, filter } = useActionModal();

  return (
    <SendReminderModal
      selectedUserIds={filter.userIds}
      isSelectAll={filter.isSelectAll}
      onClose={onCloseModal}
      filter={filter}
    />
  );
};

export default SendReminderWrapper;
