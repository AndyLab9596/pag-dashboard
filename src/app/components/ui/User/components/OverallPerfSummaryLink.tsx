import React from 'react';
import dayjs from 'dayjs';
import { Box, Link } from '@chakra-ui/react';

import { useUserPermissions } from 'common/useUserPermissions';
import { color } from 'app/components/GlobalStyleVariable';
import { RoutesPath } from 'app/routes/routesPath';
import { OverallPerformanceSummary } from 'app/generated/graphql';
import config from 'config';

interface Props {
  userId: string;
  cycleId?: string;
  overAllPerfSummary: OverallPerformanceSummary | null;
}

const OverallPerfSummaryLink: React.FC<Props> = ({ userId, cycleId, overAllPerfSummary }) => {
  const { canViewEvaluationOrReportOf } = useUserPermissions();
  if (!overAllPerfSummary) {
    return (
      <Box as="p" color="red">
        N/A
      </Box>
    );
  }

  let href = `${RoutesPath.OVERALL_PERFORMANCE_SUMMARY.replace(':id', overAllPerfSummary.id.toString())}`;

  if (overAllPerfSummary?.isShare) {
    if (!canViewEvaluationOrReportOf(parseInt(userId))) {
      return (
        <Box color="#000">
          Shared <br />
          {overAllPerfSummary.sharedDate && dayjs(overAllPerfSummary.sharedDate).format(config.DATE_FORMAT)}
        </Box>
      );
    }

    return (
      <Box color="#000">
        <Link
          color={color.blackColor2}
          _hover={{
            textDecoration: 'none',
          }}
          isExternal
          href={href}
        >
          Shared <br />
          {overAllPerfSummary.sharedDate && dayjs(overAllPerfSummary.sharedDate).format(config.DATE_FORMAT)}
        </Link>
      </Box>
    );
  }

  if (!canViewEvaluationOrReportOf(parseInt(userId))) {
    return <Box color="#000">Created</Box>;
  }

  return (
    <Link
      color={color.blackColor2}
      _hover={{
        textDecoration: 'none',
      }}
      href={href}
      isExternal
    >
      Created
    </Link>
  );
};

export default OverallPerfSummaryLink;
