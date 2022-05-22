// import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Box, Button, Flex, Grid, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import Export from 'app/components/ui/ExportImport/ExportBtn';
import { Form, InputField } from 'app/components/ui/Form';
import * as yup from 'yup';
import dayjs from 'dayjs';
import config from 'config';
import { TextAreaField } from 'app/components/ui/Form/TextAreaField';
import { NumberInputField } from 'app/components/ui/Form/NumberInputField';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import TitlePage from 'app/components/TitlePage/TitlePage';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import { useAddEvaluationTypeMutation } from 'app/generated/graphql';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useNavigate } from 'react-router-dom';
import { client } from 'app/GraphqlProvider';
import { getOperationName } from '@apollo/client/utilities';
import { GET_EVALUATION_TYPES } from '../../../../graphql/evaluationType';

interface FormValue {
  name: string;
  question: any[];
}

export function EvaluationTypeAddPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const toast = useToastStatus();

  const [formValue, setFormValue] = React.useState<FormValue>({ name: '', question: [] });

  ///schema
  const validationSchema = yup.object().shape({
    name: yup.string().trim().required('Title is required !'),
  });
  ///hook
  const currentDate = dayjs(new Date()).format(config.DATE_FORMAT);
  const [question, setQuestion] = React.useState([1]);

  const [addEvalutionType, { loading }] = useAddEvaluationTypeMutation();

  ///func to hande events
  const onSubmit = vals => {
    const obj = vals;
    const array: any[] = [];
    for (var i = 0; i < question.length; i++) {
      let objCopy = { name: obj.name };
      for (const property in obj) {
        if (Number(property[property.length - 1]) === question[i]) {
          objCopy = { ...objCopy, [property.substring(0, property.length - 2)]: obj[property] };
        }
      }
      array.push(objCopy);
    }

    setFormValue({ name: obj.name, question: array });

    onOpen();
  };

  const onModalConfirm = () => {
    const data = {
      name: formValue.name,
      evaluationTypeQuestions: formValue.question.map(q => ({
        title: q.title,
        subtitle: q.subTitle,
        text: q.text,
        isOpenQuestion: q.isOpenQuestion,
        isRequired: q.isRequired,
        isNADisabled: q.isNADisabled,
        isSelfAssessment: q.isSelfAssessment,
        isEvaluation: q.isEvaluation,
        priority: Number(q.priority),
        isNoExposureComment: q.isNoExposureComment,
      })),
    };

    addEvalutionType({
      variables: {
        data: data,
      },
    })
      .then(() => {
        onClose();
        client.refetchQueries({
          include: [getOperationName(GET_EVALUATION_TYPES) ?? ''],
        });
        toast({ status: 'success', title: 'Add new form successfully!' });
        navigate('/evaluation-types');
      })
      .catch(() => {
        onClose();
        toast({ status: 'error', title: 'Failed to add new form!' });
      });
  };

  const SaveButton = () => {
    return <Button type="submit">Save</Button>;
  };

  ///comps
  const ButtonAddQuestion = () => {
    const onAddQuestion = () => {
      setQuestion(prev => [...prev, prev.length + 1]);
    };
    return (
      <Button
        leftIcon={
          <Box {...defaultIcon}>
            <AddIcon h={'10px'} w={'10px'} />
          </Box>
        }
        textTransform="capitalize"
        {...defaultButtonIcon}
        onClick={onAddQuestion}
      >
        add question
      </Button>
    );
  };

  return (
    <LayoutRightSide>
      <TitlePage>Create New Form</TitlePage>
      <Flex justifyContent="flex-end" alignItems="center">
        <Box>
          <Export title="Exported Forms" onDownload={() => {}} />
        </Box>
      </Flex>
      <Grid templateRows="repeat(2)" gap={5}>
        {/* form header */}
        <Form onSubmit={onSubmit} validationSchema={validationSchema}>
          <Flex {...defaultContainer} direction={'column'}>
            <HStack spacing={2}>
              <Text
                fontFamily={`'Heebo script=all rev=1', 'Adobe Blank'`}
                casing="capitalize"
                color="#3f536e"
                fontSize="3xl"
                fontWeight={'semibold'}
              >
                form title:
              </Text>
              <InputField {...defaultInputTitleField} _focus={{ outline: 0 }} name="name" placeholder="Name..." />
            </HStack>
            <HStack spacing={2} fontSize={'xs'} mt={2}>
              <Text fontWeight={'semibold'} casing={'capitalize'}>
                created date:
              </Text>
              <Text>{currentDate}</Text>
            </HStack>
          </Flex>
          {/* form body */}
          <VStack {...defaultContainer} align="stretch" mt="10px" spacing={6}>
            <Flex justifyContent="flex-end">
              <SaveButton />
            </Flex>
            {question.map(item => (
              <FormBody index={item} key={item} setQuestion={setQuestion} question={question} />
            ))}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <ButtonAddQuestion />
              <Box alignSelf="flex-start">
                <SaveButton />
              </Box>
            </Box>
          </VStack>
        </Form>
      </Grid>
      <ModalConfirm
        onConfirm={onModalConfirm}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        modalTitle="Are you sure you want to save?"
        confirmText="Yes"
        isLoading={loading}
      />
    </LayoutRightSide>
  );
}

interface FormBodyType {
  index: number;
  setQuestion: React.Dispatch<React.SetStateAction<number[]>>;
  question: number[];
}

const FormBody: React.FC<FormBodyType> = ({ index, setQuestion, question }) => {
  ///func to handle events
  const ButtonDeleteQuestion = () => {
    const onDeleteQuestion = () => {
      setQuestion(prev => {
        const array = [...prev];
        array.splice(index - 1, 1);
        return [...array];
      });
    };
    return (
      <Button
        leftIcon={
          <Box {...defaultIcon}>
            <MinusIcon h={'10px'} w={'10px'} />
          </Box>
        }
        textTransform="capitalize"
        {...defaultButtonIcon}
        onClick={onDeleteQuestion}
      >
        delete question
      </Button>
    );
  };
  return (
    <VStack align="stretch" py={10} spacing={6} borderBottom={'1px'} borderBottomColor="#a8c6df">
      {/* category */}
      <Flex direction="row" alignItems="center">
        <Text {...defaultLabel} casing="capitalize">
          category
        </Text>
        <Box flex={0.3}>
          <InputField {...defaultInputStyleField} name={`title_${index}`} />
        </Box>
      </Flex>
      {/* sub category */}
      <Flex direction="row" alignItems="center">
        <Text {...defaultLabel} casing="capitalize">
          sub category
        </Text>
        <Box flex={0.3}>
          <InputField {...defaultInputStyleField} name={`subTitle_${index}`} />
        </Box>
      </Flex>
      {/* body */}
      <Flex direction="row" alignItems="center">
        <Text {...defaultLabel} casing="capitalize">
          body
        </Text>
        <Box flex={0.4}>
          <TextAreaField {...defaultInputStyleField} rows={10} cols={4} name={`text_${index}`} />
        </Box>
      </Flex>
      {/* priority */}
      <Flex direction="row" alignItems="center">
        <Text {...defaultLabel} casing="capitalize">
          priority
        </Text>
        <Box flex={0.3}>
          <NumberInputField
            borderRadius="sm"
            borderColor="#a8c6df"
            name={`priority_${index}`}
            min={0}
            defaultValue={0}
            clampValueOnBlur={false}
          />
        </Box>
      </Flex>
      {/* check box */}
      {checkBoxOption.map(({ name, id, isDefault }) => (
        <Flex direction="row" alignItems="center" key={id}>
          <Text {...defaultLabel} casing="capitalize">
            {name}
          </Text>
          <Box display="flex" flex={0.3} justifyContent="center" alignItems="center">
            <CheckBoxField name={`${id}_${index}`} defaultIsChecked={isDefault}>
              <></>
            </CheckBoxField>
          </Box>
        </Flex>
      ))}
      {question.length > 1 && <ButtonDeleteQuestion />}
    </VStack>
  );
};

//function

//static
const defaultContainer = {
  border: '1px',
  borderColor: '#a8c6df',
  borderRadius: 'md',
  padding: 5,
};
const defaultInputTitleField = {
  border: 0,
  borderRadius: 0,
  borderBottom: '1px',
  padding: 1,
  borderBottomColor: '#3f536e',
  fontSize: 'sm',
};
const defaultLabel = {
  flex: 0.2,
  fontSize: 'xs',
};
const defaultInputStyleField = {
  borderRadius: 'sm',
  borderColor: '#a8c6df',
  _hover: { outline: 0 },
};
const defaultIcon = {
  borderWidth: '1.5px',
  borderRadius: 'full',
  borderColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  h: '20px',
  w: '20px',
};
const defaultButtonIcon = {
  variant: 'unstyled',
  display: 'flex',
  justify: 'center',
  align: 'center',
  fontSize: 'sm',
  alignSelf: 'flex-start',
};
const checkBoxOption = [
  { name: 'open question', id: 'isOpenQuestion' },
  { name: 'mandatory comments', id: 'isRequired' },
  { name: 'Hide N/A Option', id: 'isNADisabled' },
  { name: 'for self assessment', id: 'isSelfAssessment', isDefault: true },
  { name: 'for evaluation', id: 'isEvaluation', isDefault: true },
  { name: 'no exposure comment', id: 'isNoExposureComment' },
];
