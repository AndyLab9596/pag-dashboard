import React, { useState } from 'react';
import { Box, Center } from '@chakra-ui/react';
import Spinner from 'app/components/ui/Spinner';
import { useGetAllDepartmentsQuery } from 'app/generated/graphql';
import DepartmentDropdown from '../../DepartmentDropdown';
import StrategyDropdown from '../../StrategyDropdown';
import KeyDateItem from './KeyDateItem';
import { Wrapper } from './keyDatesWrapper';
import '../style.scss';
import { CardContentLeft, CardForm } from '../../Card/CardWrapper';
import { css } from '@emotion/css';
interface SelectOptionProps {
  value: number;
  label: string;
}
interface SelectGroupOptionProps {
  value: string;
  label: string;
}

const defaultOptions = [
  {
    value: '',
    label: 'All',
  },
];

const KeyDates: React.FC<{}> = () => {
  const [strategyId, setStrategyId] = useState<number | undefined>();
  const [departmentIds, setDepartmentIds] = useState<number[]>([]);

  const { loading, data } = useGetAllDepartmentsQuery({
    variables: {
      strategyId,
    },
  });

  const allDepartments = data?.getAllDepartments ?? [];
  const departments =
    Array.isArray(departmentIds) && departmentIds.length > 0
      ? allDepartments.filter(d => departmentIds.includes(d.id))
      : allDepartments;

  const deadlineType = {
    deadlineConfirmLOC: 'Confirm LOC',
    deadlineLOC: 'List Of Contributors',
    deadlinePerformanceEvaluation: 'Performance Summary',
    deadlineSelfAssessment: 'Self Assessments',
  };

  const handleChangeStrategy = (e: SelectOptionProps) => {
    setStrategyId(e && e.value ? Number(e.value) : undefined);
  };
  const handleChangeDepartment = (e: SelectGroupOptionProps) => {
    if (e && e.value === '' && e.label === 'All') {
      setDepartmentIds([]);
      return;
    }
    setDepartmentIds(e && e.value.split(',').map(Number));
  };

  return (
    <Wrapper>
      <CardContentLeft className="h-full">
        <Box width="100%" px={0} py={0} variants="with-shadow">
          <Center
            fontSize="17px"
            fontWeight="semibold"
            padding="20px 10px"
            borderBottom="1px solid #c5dbea"
            color="#3f536e"
          >
            Deadlines
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={2}>
          <Center mb={2}>
            <StrategyDropdown defaultOptions={defaultOptions} onChange={handleChangeStrategy} />
          </Center>
          <Center>
            <DepartmentDropdown
              defaultOptions={defaultOptions}
              onChange={handleChangeDepartment}
              strategyId={strategyId}
            />
          </Center>
        </Box>
        {loading && <Spinner />}
        <CardForm
          className={css`
            font-size: 13px;
          `}
        >
          {departments.map(department => (
            <Box key={department.id}>
              <KeyDateItem
                department={department}
                date={department.deadlineConfirmLOC}
                day={deadlineType.deadlineConfirmLOC}
              />
              <KeyDateItem department={department} date={department.deadlineLOC} day={deadlineType.deadlineLOC} />
              <KeyDateItem
                department={department}
                date={department.deadlinePerformanceEvaluation}
                day={deadlineType.deadlinePerformanceEvaluation}
              />
              <KeyDateItem
                department={department}
                date={department.deadlineSelfAssessment}
                day={deadlineType.deadlineSelfAssessment}
              />
            </Box>
          ))}
        </CardForm>
      </CardContentLeft>
    </Wrapper>
  );
};

export default KeyDates;
