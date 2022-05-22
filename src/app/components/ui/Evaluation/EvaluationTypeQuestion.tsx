import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioScoreField } from './RadioScoreField';

const wrapperStyle = {
  border: '1px',
  borderColor: '#a8c6df',
  borderRadius: 'md',
  padding: '26px',
  margin: '16px',
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  bg: 'linear-gradient(0deg, #fff 0%, #fafbfc 100%)',
};

const textareaStyle = {
  borderRadius: 'sm',
  borderColor: '#a8c6df',
  padding: '5px',
  _hover: { outline: 0 },
  backgroundColor: 'rgba(0,103,172,0.08)',
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  marginTop: 6,
};

export interface EvaluationTypeQuestionProps {
  idKey: number;
  title: string;
  subTitle: string;
  text: string;
  isOpenQuestion: boolean;
  isRequired: boolean;
  isNADisabled: boolean;
  score?: number;
  feedback?: string;
  id?: number;
}

const EvaluationTypeQuestion: React.FC<EvaluationTypeQuestionProps> = ({
  idKey,
  title,
  subTitle,
  text,
  isOpenQuestion,
  isRequired,
  isNADisabled,
}) => {
  const { register, setError } = useFormContext();

  return (
    <Box sx={wrapperStyle}>
      <Flex justify="space-between">
        <Box>
          <Text fontSize="15px" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="13px" fontWeight="semibold">
            {subTitle}
          </Text>
          <Text fontSize="xs">{text}</Text>
        </Box>
        <Flex minWidth="400px" justify="right">
          {!isOpenQuestion && <RadioScoreField name={`answers[${idKey}].score`} withNAvailable={!isNADisabled} />}
        </Flex>
      </Flex>
      <Box>
        <Textarea
          sx={textareaStyle}
          _placeholder={{ fontSize: 'sm' }}
          placeholder="Add any feedback here..."
          {...register(`answers[${idKey}].feedback`, { required: true })}
        />
        {/* <TextAreaField
          sx={textareaStyle}
          _placeholder={{ fontSize: 'sm' }}
          placeholder="Add any feedback here..."
          name={`answers[${idKey}].feedback`}
          rows={4}
        /> */}
      </Box>
    </Box>
  );
};

export default EvaluationTypeQuestion;
