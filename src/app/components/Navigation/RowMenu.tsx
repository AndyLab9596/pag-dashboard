import { Flex } from '@chakra-ui/react';
import { UserRole as Role } from 'app/components/Auth/useRole';
import ModalCreateEdit from 'app/components/Modal/ModalCreateEdit';
import { useGetAllSettingsQuery } from 'app/generated/graphql';
import userGuideService from 'app/services/UserGuideService';
import config from 'config';
import { isEmpty } from 'lodash';
import React from 'react';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '../Auth/authContext';
import { useLogout } from '../Auth/useLogout';
import { linkProps, MenuSection } from './LeftNavTemplates';

const SectionsMenu = {
  mode: 'Mode',
  other: 'Others',
};

export interface RowMenuProp {
  navbar: MenuSection;
}

const validationSchema = yup.object().shape({});

const RowMenu = React.memo(({ navbar }: RowMenuProp) => {
  const location = useLocation();

  const { logout } = useLogout();

  const { selectedRole } = useAuthContext();

  const navigate = useNavigate();

  const { data } = useGetAllSettingsQuery();

  const link = data?.getAllSettings.find(s => s.key === 'USER_GUIDE')?.value || '';

  const handleLogout = async () => {
    await logout();

    navigate(config.LOGIN_PATH, { replace: true });
  };

  const handleUserGuideClick = () => {
    window.open(link, '_blank');
  };

  const findParentPath = () => {
    if (!isEmpty(navbar.items.filter(item => location.pathname.includes(item.link)))) return navbar;
    return null;
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const renderUploadButton = () => {
    if (selectedRole.id === Role.SUPER_ADMIN || selectedRole.id === Role.SPECIAL_ADMIN) {
      return <BsBoxArrowInLeft onClick={handleUploadClick} />;
    }
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formData = new FormData();

  const onChooseFile = e => {
    formData.append('file', e.target.files[0]);
  };

  const onSubmitModal = async () => {
    const response = await userGuideService.uploadUserGuide(formData);
    if (response.status === 200) {
      setIsModalOpen(false);
    }
  };

  return (
    <ul className="row-menu last:flex-1">
      <li className={`col-logo ${findParentPath()?.label === navbar.label ? 'active' : ''}`}>{navbar.icon()}</li>
      <li className="col-menu">
        <span className="title uppercase">{navbar.label}</span>
        {navbar &&
          navbar.items &&
          navbar.items.map((item: linkProps, idx: number) => {
            let [pathname, search] = item.link.split('?');

            return (
              <NavLink
                key={idx}
                to={{
                  pathname,
                  search: search ?? '',
                }}
                state={item.isModal ? { background: location } : null}
                className={
                  item.isActive === undefined
                    ? 'left-nav-menu-modal'
                    : item.isActive()
                    ? 'left-nav-menu-modal'
                    : 'left-nav-menu-modal--not-active'
                }
              >
                {item.label} {item.icon && item.icon()}
              </NavLink>
            );
          })}
        {navbar.label === SectionsMenu.other && (
          <div className="pb-10">
            <div className="left-nav-menu-modal">
              <span onClick={handleUserGuideClick}>User Guide</span>
              {renderUploadButton()}
            </div>
            <div className="left-nav-menu-modal" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </li>
      <ModalCreateEdit
        isOpen={isModalOpen}
        width="350px"
        onClose={handleCloseModal}
        formProps={{
          onSubmit: onSubmitModal,
          validationSchema: validationSchema,
        }}
        modalTitle="UpLoad User Guide"
        modalBody={
          <Flex jusity="center">
            <input
              style={{ fontSize: '13px', marginLeft: '50px' }}
              name="userGuideFile"
              type="file"
              accept="application/pdf"
              onChange={onChooseFile}
            />
          </Flex>
        }
      />
    </ul>
  );
});

export default RowMenu;
