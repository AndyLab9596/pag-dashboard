import { useEffect, useState, useRef } from 'react';

import { useAuthState } from 'app/components/Auth/useAuthState';
import { AdminEditForm, UserRole } from 'app/components/Auth/useRole';

const rolesAdmin = [UserRole.SUPER_ADMIN, UserRole.SPECIAL_ADMIN, UserRole.COUNTRY_ADMIN, UserRole.CITY_ADMIN];

export const useUserPermissions = () => {
  const { identity } = useAuthState();

  const [isAdminEditForm, setIsAdminEditForm] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isCityAdmin, setIsCityAdmin] = useState(false);
  const [isSpecialAdmin, setIsSpecialAdmin] = useState(false);
  const [isCountryAdmin, setIsCountryAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isHead, setIsHead] = useState(false);
  const [isEvaluator, setIsEvaluator] = useState(false);
  const adminRef = useRef({
    isSuperAdmin: false,
    isAdminEditForm: false,
  });

  useEffect(() => {
    setIsEvaluator(identity?.isEvaluator ?? false);

    if (!identity || !Array.isArray(identity?.roles) || identity?.roles.length === 0) {
      return;
    }
    const isAdminEditForm = identity.roles.some(r => AdminEditForm.includes(r.id));
    const isSuperAdmin = identity.roles.some(r => r.id === UserRole.SUPER_ADMIN);
    const isCityAdmin = identity.roles.some(r => r.id === UserRole.CITY_ADMIN);
    const isSpecialAdmin = identity.roles.some(r => r.id === UserRole.SPECIAL_ADMIN);
    const isCountryAdmin = identity.roles.some(r => r.id === UserRole.COUNTRY_ADMIN);
    const isAdmin = identity.roles.some(r => rolesAdmin.includes(r.id));
    const isUser = identity.roles.length > 0;
    const isHead = identity.roles.some(r => r.id === UserRole.DEPT_HEAD);

    adminRef.current = {
      isAdminEditForm,
      isSuperAdmin,
    };

    setIsAdminEditForm(isAdminEditForm);
    setIsSuperAdmin(isSuperAdmin);
    setIsCityAdmin(isCityAdmin);
    setIsSpecialAdmin(isSpecialAdmin);
    setIsAdmin(isAdmin);
    setIsUser(isUser);
    setIsHead(isHead);
    setIsCountryAdmin(isCountryAdmin);
  }, [identity]);

  const isLimitedToViewDataOf = (userId: number) => {
    if (!identity) return false;

    if (!identity.permissionsLimitedUsers || identity.permissionsLimitedUsers.length === 0) {
      return false;
    }
    const limitedUserIds = identity.permissionsLimitedUsers.map(r => r.limited.id);
    return limitedUserIds.includes(userId);
  };

  const canViewEvaluationOrReportOf = (userId?: number, isSelfAssessment: boolean = false) => {
    if (userId == null) return false;

    if (isLimitedToViewDataOf(userId)) {
      return false;
    }

    if (adminRef.current.isSuperAdmin) {
      return true;
    }

    // if evaluation is SA type => can view your self evaluation
    const isCanViewSelf = isSelfAssessment || userId !== identity?.id;
    if (!adminRef.current.isAdminEditForm || !isCanViewSelf) {
      return false;
    }
    return true;
  };

  const canViewLOC = (userId?: number, contributorId?: number) => {
    if (userId && userId === identity?.id) return false;
    return canViewEvaluationOrReportOf(userId) && canViewEvaluationOrReportOf(contributorId);
  };

  return {
    isAdminEditForm,
    isSuperAdmin,
    isCityAdmin,
    isSpecialAdmin,
    isLimitedToViewDataOf,
    canViewEvaluationOrReportOf,
    canViewLOC,
    isAdmin,
    isUser,
    isHead,
    isEvaluator,
    isCountryAdmin,
  };
};
