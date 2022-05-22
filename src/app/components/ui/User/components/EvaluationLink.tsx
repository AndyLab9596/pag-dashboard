import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { evaluationLinkColors } from 'app/components/ui/User/utils';
import { RoutesPath } from 'app/routes/routesPath';
import { EvaluationsStatus } from 'common/contributors';
import { useUserPermissions } from 'common/useUserPermissions';
import React, { useEffect, useState } from 'react';

let defaultColor = '#373535';

interface Props extends BoxProps {
  evaluationId?: number;
  status?: string;
  optOut?: boolean;
  userId?: number;
  isOpenEvaluation?: boolean;
  original: any;
  onSavePreviousPage: () => void;
}

const EvaluationLink: React.FC<Props> = ({
  children,
  evaluationId,
  userId,
  status,
  optOut,
  isOpenEvaluation,
  original,
  onSavePreviousPage,
  ...rest
}) => {
  const { canViewEvaluationOrReportOf } = useUserPermissions();
  const [color, setColor] = useState<string>(defaultColor);
  const [isAbleToViewDetail, setIsAbleToViewDetail] = useState<boolean>(false);

  useEffect(() => {
    if (optOut === true) {
      // gray
      setColor(evaluationLinkColors.gray);
    } else if (
      (status === EvaluationsStatus.IN_PROGRESS || status === EvaluationsStatus.NOT_STARTED) &&
      isOpenEvaluation === true
    ) {
      // dark-red
      setColor(evaluationLinkColors.darkRed);
    } else if (status === EvaluationsStatus.IN_PROGRESS || status === EvaluationsStatus.NOT_STARTED) {
      // red
      setColor(evaluationLinkColors.red);
    } else if (isOpenEvaluation === true) {
      // blue
      setColor(evaluationLinkColors.blue);
    }
  }, [status, optOut, isOpenEvaluation]);

  useEffect(() => {
    if ((!userId || canViewEvaluationOrReportOf(userId)) && canViewEvaluationOrReportOf(original.id)) {
      setIsAbleToViewDetail(true);
    } else {
      setIsAbleToViewDetail(false);
    }
  }, [evaluationId]);

  const handleClick = () => {
    if (!evaluationId) {
      // because of the evaluationId is not defined -> evaluation not found
      // we shouldn't go to the evaluation detail page
      return;
    }

    if (status === EvaluationsStatus.COMPLETED) {
      window.open(RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${evaluationId}`), '_blank');
    } else {
      onSavePreviousPage();
      window.open(RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${evaluationId}`), '_blank');
    }
  };

  if (!isAbleToViewDetail) {
    return (
      <Box as="span" color={color} {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="span"
      color={color}
      _hover={{
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      lineHeight={1.4}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default EvaluationLink;
