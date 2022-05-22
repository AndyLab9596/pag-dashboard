import type { LinkProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import { color } from 'app/components/GlobalStyleVariable';
import { RoutesPath } from 'app/routes/routesPath';
import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';

interface Props extends LinkProps {
  isCompleted?: boolean;
  userId: string;
  cycleId: string | null;
  onSavePreviousPage: () => void;
}

const PerfSummaryLink: React.FC<Props> = ({ isCompleted = false, userId, cycleId, onSavePreviousPage, ...rest }) => {
  let href = cycleId
    ? `${RoutesPath.PERFORMANCE_SUMMARY_OF_USER.replace(':userId', userId)}?cycleId=${cycleId}`
    : RoutesPath.PERFORMANCE_SUMMARY_OF_USER.replace(':userId', userId);
  const { canViewEvaluationOrReportOf } = useUserPermissions();

  if (isCompleted) {
    if (!canViewEvaluationOrReportOf(parseInt(userId))) {
      return <div style={{ color: color.blackColor2 }}>Yes</div>;
    }

    return (
      <Link
        color={color.blackColor2}
        href={href}
        isExternal
        _hover={{
          textDecoration: 'none',
        }}
        {...rest}
      >
        Yes
      </Link>
    );
  }

  if (!canViewEvaluationOrReportOf(parseInt(userId))) {
    return <div style={{ color: 'red' }}>No</div>;
  }

  return (
    <Link
      onClick={() => onSavePreviousPage()}
      color="red"
      href={href}
      isExternal
      _hover={{
        textDecoration: 'none',
      }}
      {...rest}
    >
      No
    </Link>
  );
};

export default PerfSummaryLink;
