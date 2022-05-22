import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import TitlePage from 'app/components/TitlePage/TitlePage';
import React from 'react';
import ConfigurationForm from './ConfigurationForm/ConfigurationForm';

export function ConfigurationsPage() {
  return (
    <LayoutRightSide>
      <TitlePage>Settings</TitlePage>
      <ConfigurationForm />
    </LayoutRightSide>
  );
}
