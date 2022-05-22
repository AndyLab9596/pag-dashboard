import React, { useState } from 'react';
import { Box, Center, SimpleGrid } from '@chakra-ui/layout';
import './EvaluationWrapper';
import Wrapper from './EvaluationWrapper';
import StrategyDropdown from '../../StrategyDropdown';
import DepartmentDropdown from '../../DepartmentDropdown';
import PerformanceEvaluation from './PerformanceEvaluation';
import SelfAssessments from './SelfAssessment';
import ListOfContributor from './ListOfContributors';
import OverAllProgress from './OverAllProgress';
import { CardContentLeft } from '../../Card/CardWrapper';
interface EvaluationsProps {}

export interface SelectOptionProps {
  value: number;
  label: string;
}

interface SelectGroupOptionProps {
  value: string;
  label: string;
}

const Evaluations: React.FC<EvaluationsProps> = props => {
  const [strategyId, setStrategyId] = useState<number>();
  const [departmentIds, setDepartmentIds] = useState<number[]>();

  const onChange = (e: SelectOptionProps) => {
    setStrategyId(e && e.value);
  };

  const onChangeDepartment = (e: SelectGroupOptionProps) => {
    setDepartmentIds(e && e.value.split(',').map(Number));
  };

  return (
    <Wrapper>
      <CardContentLeft>
        <Box width="100%" px={0} py={0} variants="with-shadow" height="100%">
          <Center
            fontSize="17px"
            fontWeight="semibold"
            padding="20px 10px"
            borderBottom="1px solid #c5dbea"
            color="#3f536e"
          >
            Evaluations Progress & Overview
          </Center>
          <Box borderBottom="1px solid #c5dbea" px={6} py={2}>
            <Center mb={2}>
              <StrategyDropdown onChange={onChange} />
            </Center>
            <Center>
              <DepartmentDropdown onChange={onChangeDepartment} strategyId={strategyId} />
            </Center>
          </Box>

          <SimpleGrid borderBottom="1px solid #c5dbea" columns={{ sm: 1, md: 2 }}>
            <OverAllProgress strategyId={strategyId as number} departmentIds={departmentIds} />
            <PerformanceEvaluation strategyId={strategyId as number} departmentIds={departmentIds} />
          </SimpleGrid>
          <SimpleGrid columns={{ sm: 1, md: 2 }}>
            <ListOfContributor strategyId={strategyId as number} departmentIds={departmentIds} />
            <SelfAssessments strategyId={strategyId as number} departmentIds={departmentIds} />
          </SimpleGrid>
        </Box>
      </CardContentLeft>
    </Wrapper>
  );
};

export default Evaluations;
