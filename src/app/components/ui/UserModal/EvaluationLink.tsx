import React from 'react';
import { Link, Text, useDisclosure } from '@chakra-ui/react';

import { RoutesPath } from 'app/routes/routesPath';
import StaticModal from 'app/components/Modal/StaticModal';

interface Props {
  id?: number;
  isComplete?: boolean;
  optOut?: boolean;
  isClickAble: boolean;
  evaluateeId?: number;
}

const EvaluationLink: React.FC<Props> = ({
  id,
  isComplete = undefined,
  optOut = false,
  isClickAble,
  children,
  evaluateeId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isClickAble ? (
    <>
      <Link
        onClick={() => {
          if (!id) {
            onOpen();
          }
        }}
        href={
          isComplete
            ? `${RoutesPath.EVALUATIONS_VIEW.replace(':evaluationId', `${id}`)}`
            : id
            ? `${RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', `${id}`)}`
            : undefined
        }
        textTransform="capitalize"
        {...defaultLink}
        color={optOut ? '#d2d2d2' : isComplete === false ? 'red' : 'rgb(63, 83, 110)'}
      >
        {children}
      </Link>
      <StaticModal
        isOpen={isOpen}
        onClose={() => onClose()}
        config={{
          title: 'The Evaluations not started',
          closeButtonText: 'Close',
        }}
      />
    </>
  ) : (
    <Text
      textTransform="capitalize"
      {...defaultLink}
      cursor="text"
      color={optOut ? '#d2d2d2' : isComplete === false ? 'red' : 'rgb(63, 83, 110)'}
    >
      {children}
    </Text>
  );
};

const defaultLink = {
  target: '_blank',
  fontSize: 'sm',
  _focus: { outline: 0 },
  cursor: 'default',
  color: 'rgb(63, 83, 110)',
  fontWeight: 400,
};

export default EvaluationLink;
