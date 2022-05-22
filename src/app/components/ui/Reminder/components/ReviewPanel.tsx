import { Box, Flex } from '@chakra-ui/react';
import TitlePage from 'app/components/TitlePage/TitlePage';
import { EditorField } from 'app/components/ui/Form/EditorField';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { SendReminderFieldID as FieldName } from '../types';

export interface ReviewPanelProps {}

const ReviewPanel: React.FC<ReviewPanelProps> = () => {
  const { getValues } = useFormContext();

  return (
    <>
      <TitlePage fontWeight="400" textTransform="capitalize" mb="18px">
        Review/Confirm
      </TitlePage>
      <Flex ml="1rem">
        <Box w="50%" pr="20px">
          <Box fontSize="13px" color="#373535" mb="4px">
            Date of Sent Out:
          </Box>
          <Box fontSize="13px" color="#373535" ml="20px">
            {getValues(FieldName.reviewSchedule)}
          </Box>
          <Box fontSize="13px" color="#373535" mt="10px" mb="4px">
            Recipients:
          </Box>
          {getValues(FieldName.reviewRecipient).map((name: string, index: number) => (
            <Box key={`${name}-${index}`} fontSize="13px" color="#373535" ml="20px">
              {name}
            </Box>
          ))}
        </Box>
        <Box w="50%">
          <Box mb="10px">
            <EditorField name={FieldName.reviewReminderTitle} label="Title" />
          </Box>
          <EditorField name={FieldName.reviewReminderMessage} label="Message" />
        </Box>
      </Flex>
    </>
  );
};

export default ReviewPanel;
