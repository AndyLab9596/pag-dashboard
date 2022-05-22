import React from 'react';
import './LeftNavStyles.scss';

import RowMenu from './RowMenu';
import { GetMenuTemplate, MenuSection, others } from './LeftNavTemplates';
import ModeSections from './ModeSections';

export interface linkProps {
  title: string;
  to: string;
  icon?: any;
  isActive?: () => boolean;
}
export interface navbarsProps {
  logo: any;
  name: string;
  links: linkProps[];
}

const LeftNav = () => {
  const navbars = GetMenuTemplate() || [];

  return (
    <>
      <input type="checkbox" className="nav-toggle-menu" id="nav-toggle-menu" />
      <div className="left-nav-menu">
        {navbars && navbars.map((navbar: MenuSection, idx: number) => <RowMenu navbar={navbar} key={idx} />)}

        <ModeSections />

        {/* Other section */}
        <RowMenu navbar={others} />
      </div>
    </>
  );
};

export default LeftNav;
