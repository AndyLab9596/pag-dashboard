import { Box, Flex, Spacer } from '@chakra-ui/react';
import { DepartmentFragment } from 'app/generated/graphql';
import config from 'config';
import calculatorDay from 'utils/calculatorDay';
import { CardContent, CardDescription, CardDetail, CardName } from '../../Card/CardWrapper';
import dayjs from 'dayjs';

export interface KeyDateItemProps {
  department: DepartmentFragment;
  date: string;
  day: string | JSX.Element;
}

export default function KeyDateItem({ department, date, day }: KeyDateItemProps) {
  return (
    <Flex borderBottom="1px solid #c5dbea">
      <CardContent>
        <Box>
          <CardName>{`${department.strategy?.name} - ${department.name}`}</CardName>
          <CardDescription>{day}</CardDescription>
          <CardDetail>
            <div>{calculatorDay(date)}</div>
            <Spacer />
            <div>{dayjs(date).format(config.DATE_FORMAT)}</div>
          </CardDetail>
        </Box>
      </CardContent>
    </Flex>
  );
}
