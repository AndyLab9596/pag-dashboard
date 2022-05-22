import dayjs from 'dayjs';

import { useAuthState } from 'app/components/Auth/useAuthState';
import { UserRole } from 'app/components/Auth/useRole';
import { useGetUserLockedSystemQuery } from 'app/generated/graphql';

const useChecker = () => {
  const { identity } = useAuthState();
  const { refetch: getLockedSystemStatus } = useGetUserLockedSystemQuery({
    variables: {
      id: identity?.id ?? 0,
    },
    skip: true,
  });

  const checkLockedSystemBeforeSubmitting = async () => {
    try {
      // check is super admin role
      let isSuperAdmin = identity?.roles.some(r => r.id === UserRole.SUPER_ADMIN);
      if (isSuperAdmin) {
        return false;
      }
      if (identity?.id === undefined) return true;
      // Check user.isLockedSystem
      let { data } = await getLockedSystemStatus({
        id: identity.id,
      });

      if (!data.getOneUser.isLockedSystem) {
        return false;
      }
      // Check departments.lockDate
      let currentDate = dayjs();
      const lockDate = data.getOneUser?.department?.lockDate
        ? dayjs(data.getOneUser?.department?.lockDate)
        : currentDate;
      // Invalid date => don't select lockDate
      if (!lockDate.isValid()) {
        return false;
      }
      // Check lockDate with today
      if (currentDate.diff(lockDate, 'days') <= 0) {
        return false;
      }
      return true;
    } catch (error) {
      return true;
    }
  };

  return {
    checkLockedSystemBeforeSubmitting,
  };
};

export default useChecker;
