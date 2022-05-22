import React, { useEffect } from 'react';
import { chakra, Box, SimpleGrid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import { OpsQuestionAndAnswerFragment } from 'app/generated/graphql';

interface Props {
  data: OpsQuestionAndAnswerFragment;
  isViewOnly?: boolean;
}

const Question: React.FC<Props> = ({ data, isViewOnly = true }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (isViewOnly) return;

    setValue(`${data.id}`, data.feedback);
  }, [isViewOnly]);

  return (
    <QuestionBlock>
      <SimpleGrid columns={2} spacing={8} minHeight="140px">
        <Box>
          <Box as="h4" fontWeight={500} fontSize="15px">
            {data.evaluationTypeQuestion?.title}
          </Box>
          <Box as="h6" fontWeight={500} fontSize="13px"></Box>
          <Box color="#3f536e" fontSize="13px" fontWeight={400}>
            {data.evaluationTypeQuestion?.text}
          </Box>
        </Box>
        <Box color="#3f536e" fontSize="13px" fontWeight={400}>
          {isViewOnly ? (
            data.feedback
          ) : (
            <TextAreaField
              name={data.id.toString()}
              minHeight="100px"
              fontSize="13px"
              sx={{
                bg: 'rgba(0, 103, 172, 0.08)',
                border: '1px solid #b7d2e5',
                boxShadow: 'inset 0 -1px 0 0 #7e95a7',
              }}
            />
          )}
        </Box>
      </SimpleGrid>
    </QuestionBlock>
  );
};

const QuestionBlock = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #c5d9e8',
    borderRadius: '4px',
    bg: 'linear-gradient(0deg, #ffffff 0%, #fafbfc 100%)',
    boxShadow: 'inset 0 -1px 0 0 #7e95a7',
    height: 'auto',
    padding: '1.9em',
    margin: '0.9em',
  },
});

export default Question;
