import { Box, Checkbox, Flex, Text, Textarea, VisuallyHidden } from '@chakra-ui/react';
import * as React from 'react';
import { css } from '@emotion/css';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { EvaluationAnswers } from '../EvaluationBoilerPlate';
import { RadioScoreField } from '../RadioScoreField';

const ratingMap = {
  0: 'N/A',
  1: 'Performance Issue',
  2: 'Below Standard',
  3: 'Meets Standard',
  4: 'Exceeds Standard',
  5: 'Outstanding',
};

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
  // borderColor: '#a8c6df',
  padding: '5px',
  _hover: { outline: 0 },
  backgroundColor: 'rgba(0,103,172,0.08)',
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  marginTop: 6,
};

const preAnswer = css`
  width: 475px;
  margin: 0.5rem;

  .preAnswer__title {
    margin-top: 0;
    color: #2c405a;
    font-family: Heebo;
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
  }

  .preAnswer__text-small {
    color: #373535;
    font-size: 0.8em;
    font-weight: 400;
    line-height: 1.5;
  }
`;

interface EvaluationEditBodyProps {
  preAnswers?: {};
  isShowPreviousComment?: boolean;
  evaluateeName?: string;
}

const EvaluationEditBody = ({ preAnswers, isShowPreviousComment, evaluateeName }: EvaluationEditBodyProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: 'answers',
  });

  return (
    <React.Fragment>
      {(fields as EvaluationAnswers[]).map((field, index) => {
        const ShowPreviousComment = () => {
          const data = (field.questionId && preAnswers![field.questionId]) as EvaluationAnswers | null | undefined;
          const rating = `Rating - ${data?.score || 'N/A'} - ${ratingMap[data?.score || 0] || ''}`;

          return (
            <div className={preAnswer}>
              <p className="preAnswer__title">Previous Comments</p>
              {!data?.isOpenQuestion ? <p className="preAnswer__title">{rating}</p> : null}
              <p className="preAnswer__text-small">{data?.feedback}</p>
            </div>
          );
        };

        return (
          <Box sx={wrapperStyle} key={field.id}>
            <Flex justify="space-between">
              <Box>
                <Text fontSize="15px" fontWeight="semibold">
                  {field.title}
                </Text>
                <Text fontSize="13px" fontWeight="semibold">
                  {field.subtitle}
                </Text>
                <Text fontSize="xs">{field.text}</Text>
              </Box>
              <Flex minWidth="400px" justify="flex-end">
                {!field.isOpenQuestion && (
                  <RadioScoreField
                    name={`answers[${index}].score` as const}
                    withNAvailable={!field.isNADisabled}
                    isBorderRed={!!errors['answers']?.[index]?.score}
                  />
                )}
              </Flex>
            </Flex>
            <Box>
              <Textarea
                sx={textareaStyle}
                _placeholder={{ fontSize: 'sm' }}
                placeholder={`Add any feedback for ${evaluateeName}`}
                {...register(`answers[${index}].feedback` as const)}
                rows={4}
                borderColor={!!errors['answers']?.[index]?.feedback ? '#dc2626' : '#a8c6df'}
              />
              {/* This checkbox is only for validation purpose */}
              <VisuallyHidden>
                <Checkbox {...register(`answers[${index}].isRequired`)} />
                <Checkbox {...register(`answers[${index}].isOpenQuestion`)} />
              </VisuallyHidden>
              {/*  */}
              {!!errors['answers'] && (
                <p className="text-13 text-error my-5">{errors['answers'][index]?.feedback?.message}</p>
              )}
              <p></p>
            </Box>
            {isShowPreviousComment && <ShowPreviousComment />}
          </Box>
        );
      })}
    </React.Fragment>
  );
};
export default React.memo(EvaluationEditBody);
