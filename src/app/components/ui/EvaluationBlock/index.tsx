import React from 'react';
import { Box, HStack, SimpleGrid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { BlockWrapper, Col, Desc, FieldName, FieldValue, Promoted, Row, Title } from './components';
import UserTitle from './components/UserTitle';
import { EvaluationConfig, EvaluationType } from './types';
import { EvaluateeFragment } from 'app/generated/graphql';
import { config as appConfig } from 'config';

const config: EvaluationConfig = {
  perfSummary: {
    title: 'PAG Performance Summary for',
  },
  selfAssessment: {
    title: 'Self Assessment for',
    desc: `Fields marked with * are required. You must enter at least three words where comments are required.`,
  },
  evaluation: {
    title: 'PAG Evaluation for',
    desc: `Fields marked with * are required. You must enter at least three words
    where comments are required. If
    you do not have enough exposure to this candidate you may opt-out, but
    you will be asked to comment on the individual’s performance based on
    your limited exposure.`,
  },
  overallPS: {
    title: 'PAG Overall Performance Summary for',
  },
};

interface Props {
  variant?: EvaluationType;
  evaluatee?: EvaluateeFragment | null;
  startDate?: string;
  isUserPromoted?: boolean;
}

const EvaluationBlock: React.FC<Props> = ({ variant = 'evaluation', evaluatee, startDate, isUserPromoted }) => {
  let content = config[variant];
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const openEvaluationUserPromoted = query.get('promoted');

  if (!evaluatee) {
    return null;
  }

  return (
    <BlockWrapper>
      <HStack justifyContent="space-between">
        <Title>
          {content.title} {evaluatee?.name}
        </Title>
        <Title as="span" fontSize="17px" fontWeight="bold">
          {startDate && dayjs(startDate).format(appConfig.DATE_FORMAT)}
        </Title>
      </HStack>
      <SimpleGrid columns={variant !== 'selfAssessment' && evaluatee?.evaluator ? 4 : 3} row={1}>
        <Col>
          <FieldName>Evaluation for:</FieldName>
          <UserTitle image={evaluatee?.image} name={evaluatee?.name ?? ''} title={evaluatee?.title?.name} />
        </Col>
        {variant !== 'selfAssessment' && evaluatee?.evaluator && (
          <Col>
            <FieldName>Evaluator:</FieldName>
            <UserTitle
              image={evaluatee?.evaluator.image}
              name={evaluatee?.evaluator.name}
              title={evaluatee?.evaluator?.title?.name}
            />
          </Col>
        )}
        <Col>
          <Row>
            <FieldName>Department:</FieldName>
            <FieldValue>{evaluatee?.department?.name}</FieldValue>
          </Row>
        </Col>
        <Col>
          <Row>
            <FieldName>Evaluation Type:</FieldName>
            <FieldValue>{evaluatee?.evaluationType?.name}</FieldValue>
          </Row>
        </Col>
      </SimpleGrid>
      {variant !== 'perfSummary' && variant !== 'overallPS' && (
        <Desc>
          Rating System
          <Box ml="25px">
            1 Performance issue - Demonstrates performance issues which must be resolved
            <br />
            2 Below Standard - Needs further skill development to meet the standard
            <br />
            3 Meets Standard - Meets the high standard of PAG within his/her role
            <br />
            4 Exceeds Standard - Consistently exceeds PAG&apos;s high standard
            <br />
            5 Outstanding - Excels in this dimension
            <br />
            N/A Not applicable
          </Box>
          <br />
          {content.desc}
        </Desc>
      )}
      {(isUserPromoted ||
        (variant !== 'perfSummary' && variant !== 'overallPS' && openEvaluationUserPromoted === 'true')) && (
        <Promoted>{evaluatee?.name} was promoted in the last cycle.</Promoted>
      )}
    </BlockWrapper>
  );
};

export default EvaluationBlock;
