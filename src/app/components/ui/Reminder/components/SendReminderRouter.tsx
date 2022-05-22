import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SendReminderModal from './SendReminderModal';

const SendReminderRouter = () => {
  return (
    <Routes>
      <Route path={`send-reminder/:userId`} element={<SendReminderModal />} />
    </Routes>
  );
};

export default SendReminderRouter;
