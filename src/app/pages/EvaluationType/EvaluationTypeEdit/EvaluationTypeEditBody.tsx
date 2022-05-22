import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button as ChakraButton, Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import Button from 'app/components/ui/Button/Button';
import { InputField } from 'app/components/ui/Form';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { Label } from 'app/components/ui/Form/Label';
import { NumberInputField } from 'app/components/ui/Form/NumberInputField';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import * as React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { EvaluationQuestion } from '.';
import { RadioScoreField } from 'app/components/ui/Evaluation/RadioScoreField';

const defaultContainer = {
  border: '1px',
  borderColor: '#a8c6df',
  borderRadius: 'md',
  padding: 5,
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  bg: 'linear-gradient(0deg, #fff 0%, #fafbfc 100%)',
};

const defaultFirstHalfContainer = {
  flex: 0.5,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
};
const defaultSecondHalfContainer = {
  flex: 0.5,
  alignItems: 'flex-end',
};
const defaultTextareaStyleField = {
  borderRadius: 'sm',
  borderColor: '#a8c6df',
  padding: '5px',
  _hover: { outline: 0 },
  backgroundColor: 'rgba(0,103,172,0.08)',
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
};
const defaultIcon = {
  borderWidth: '2px',
  borderRadius: 'full',
  borderColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  h: '18px',
  w: '18px',
};
const defaultButtonIcon = {
  variant: 'unstyled',
  display: 'flex',
  justify: 'center',
  align: 'center',
  fontSize: 'sm',
  alignSelf: 'flex-start',
  m: '10px 0',
};

const FormItemEditMode = ({ idKey, questionLength, onDelete, onAdd }) => {
  return (
    <Box sx={defaultContainer} className="grid gap-10">
      <InputField placeholder="Title ..." name={`questions[${idKey}].title`} w="100%" bg="white" />
      <InputField placeholder="Subtitle ..." name={`questions[${idKey}].subtitle`} w="100%" bg="white" />
      <TextAreaField
        placeholder="Text ..."
        name={`questions[${idKey}].text`}
        w="100%"
        fontSize="13px"
        pl="10px"
        resize="vertical"
        bg="white"
      />
      <Flex align="center">
        <NumberInputField name={`questions[${idKey}].priority`} bg="white" w="10%" />
        <Label ml="10px" label="Priority" />
      </Flex>
      <CheckBoxField label="Open Question" name={`questions[${idKey}].isOpenQuestion`} />
      <CheckBoxField label="Mandatory comments" name={`questions[${idKey}].isRequired`} />
      <CheckBoxField label="Hide N/A Option" name={`questions[${idKey}].isNADisabled`} />
      <CheckBoxField label="For Self Assessment" name={`questions[${idKey}].isSelfAssessment`} />
      <CheckBoxField label="For Evaluation" name={`questions[${idKey}].isEvaluation`} />
      <CheckBoxField label="No exposure comments" name={`questions[${idKey}].isNoExposureComment`} />
      {questionLength !== 1 && <DeleteButton onDelete={onDelete} idKey={idKey} />}
      {idKey === questionLength - 1 && <AddButton onAdd={onAdd} />}
    </Box>
  );
};

const DeleteButton = ({ onDelete, idKey }) => {
  return (
    <ChakraButton
      leftIcon={
        <Box {...defaultIcon}>
          <MinusIcon h={'10px'} w={'10px'} />
        </Box>
      }
      textTransform="capitalize"
      {...defaultButtonIcon}
      onClick={() => onDelete(idKey)}
    >
      delete question
    </ChakraButton>
  );
};

const AddButton = ({ onAdd }) => {
  return (
    <ChakraButton
      leftIcon={
        <Box {...defaultIcon}>
          <AddIcon h={'10px'} w={'10px'} />
        </Box>
      }
      textTransform="capitalize"
      {...defaultButtonIcon}
      onClick={onAdd}
    >
      add question
    </ChakraButton>
  );
};

const FormItem = ({ displayScore, title, subTitle, text, name, withNAvailable }) => {
  return (
    <HStack {...defaultContainer}>
      <VStack sx={defaultFirstHalfContainer}>
        <Text fontWeight="semibold" fontSize="md">
          {title}
        </Text>
        {subTitle && (
          <Text fontWeight="semibold" fontSize="xs">
            {subTitle}
          </Text>
        )}
        {text && <Text fontSize="xs">{text}</Text>}
      </VStack>
      <VStack {...defaultSecondHalfContainer}>
        {displayScore && <RadioScoreField name={`${name}_score`} withNAvailable={withNAvailable} />}

        <TextAreaField
          {...defaultTextareaStyleField}
          _placeholder={{ fontSize: 'sm' }}
          placeholder="Add any feedback here..."
          name={name}
          rows={5}
        />
      </VStack>
    </HStack>
  );
};

export interface EvaluationTypeEditBodyProps {
  questionList: EvaluationQuestion[];
  isEditing: boolean;
  isLoading: boolean;
  handleEditSubmit: (values) => void;
}

const EvaluationTypeEditBody: React.FC<EvaluationTypeEditBodyProps> = ({
  questionList,
  isEditing,
  isLoading,
  handleEditSubmit,
}) => {
  const { getValues, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onModalConfirm = async () => {
    await handleEditSubmit(getValues());
    onClose();
  };

  const handleAdd = () => {
    append({
      title: '',
      subtitle: '',
      text: '',
      priority: 0,
      isOpenQuestion: false,
      isRequired: false,
      isNADisabled: false,
      isSelfAssessment: false,
      isEvaluation: false,
      isNoExposureComment: false,
    });
  };

  const handleDelete = idKey => {
    remove(idKey);
  };

  return (
    <>
      {isEditing
        ? fields.map((question, index) => (
            <FormItemEditMode
              key={question.id}
              idKey={index}
              questionLength={fields.length}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />
          ))
        : questionList.map((question, index) => (
            <FormItem
              key={index}
              displayScore={question.isOpenQuestion}
              title={question.title}
              subTitle={question.subtitle}
              text={question.text}
              name={question.id.toString()}
              withNAvailable={!question.isNADisabled}
            />
          ))}
      {isEditing && <Button onClick={onOpen}>Save</Button>}
      <ModalConfirm
        onConfirm={onModalConfirm}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        modalTitle="Are you sure you want to save?"
        confirmText="Yes"
        isLoading={isLoading}
      />
    </>
  );
};

export default React.memo(EvaluationTypeEditBody);
