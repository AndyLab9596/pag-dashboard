import { useDisclosure } from '@chakra-ui/react';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import { EvaluateeFragment } from 'app/generated/graphql';
import useChecker from 'common/useChecker';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Evaluation } from '..';
import Button from '../../../Button/Button';
import ModalSubmitForm from '../ModalSubmitForm';

const FormButtonBlue = {
  minHeight: '36px',
  fontSize: '13px',
  fontWeight: 500,
  _hover: { color: 'rgba(255,255,255,0.8)' },
  borderRadius: '3px',
  borderColor: 'rgba(121,122,125,0.5)',
  borderWith: '1px',
  borderStyle: 'solid',
};

const FormButtonOutline = {
  minHeight: '36px',
  fontSize: '13px',
  fontWeight: 500,
  _hover: { color: '#3F536E', backgroundColor: '#f9f9f9' },
  borderRadius: '3px',
  borderColor: 'rgba(121,122,125,0.5)',
  borderWith: '1px',
  borderStyle: 'solid',
};

export enum SaveStatus {
  STATUS_SAVE = 'save',
  STATUS_SUBMIT = 'submit',
}
interface EvaluateActionProps {
  evaluationAnswerInput?: Evaluation;
  handleSaveSubmitForm: (data: any, saveStatus: string, isShowModal?: boolean) => Promise<void>;
  isSelfAssessmentPath: boolean;
  evaluateeInfo: EvaluateeFragment | null;
  evaluateLoading?: boolean;
}

interface OnSaveSubmitFormProps {
  mode: SaveStatus.STATUS_SAVE | SaveStatus.STATUS_SUBMIT;
  isShowModal?: boolean;
}

const EvaluateAction = ({
  evaluationAnswerInput,
  handleSaveSubmitForm,
  isSelfAssessmentPath,
  evaluateeInfo,
  evaluateLoading,
}: EvaluateActionProps) => {
  const {
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
  } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: openError, onClose: closeError } = useDisclosure();
  const values = getValues();
  const { checkLockedSystemBeforeSubmitting } = useChecker();

  const [validateErrors, setValidateErrors] = React.useState('');
  const handleCloseErrorModal = () => {
    closeError();
  };
  const validateAnswers = inputDataValues => {
    const scoreQuestions = inputDataValues.filter(value => !value.isOpenQuestion);
    const numbScoreQuesCount = scoreQuestions.length;
    const numbScoreCanNA = scoreQuestions.filter(value => !value.isNADisabled);

    // Check if all scores are 5
    if (numbScoreQuesCount > 0 && scoreQuestions.every(value => Number(value.score) === 5)) {
      setValidateErrors('Unable to submit. You cannot submit an evaluation with ratings of 5 across all categories.');
      return false;
    }
    // Check if all can be NA questions are NA
    if (numbScoreQuesCount > 0 && numbScoreCanNA.every(value => Number(value.score) === 0)) {
      setValidateErrors('Unable to submit. You cannot submit an evaluation with ratings of N/A across all categories.');
      return false;
    }
    setValidateErrors('');
    return true;
  };

  const onSaveSubmitForm = async ({ mode = SaveStatus.STATUS_SUBMIT, isShowModal = true }: OnSaveSubmitFormProps) => {
    const data = evaluationAnswerInput?.answers?.map((evAns, index) => {
      evAns.feedback = values.answers[index].feedback;
      evAns.score = values.answers[index].score;
      const { questionId, feedback, score } = evAns;
      return { feedback, score: score !== '' ? Number(score) : null, questionId };
    });
    if (mode === SaveStatus.STATUS_SUBMIT) {
      if (await checkLockedSystemBeforeSubmitting()) {
        return;
      }
      if (!validateAnswers(evaluationAnswerInput?.answers)) {
        onClose();
        openError();
        return;
      }
    }
    handleSaveSubmitForm(data, mode, isShowModal);
  };

  const errorsMessageArray = () => {
    if (Array.isArray(errors?.answers)) {
      const errorsMessageArray = errors?.answers?.filter(error => error !== undefined);
      return errorsMessageArray[0]?.feedback?.message || errorsMessageArray[0]?.score?.message;
    }
  };
  const buildModalTitle = () => {
    if (!errors.answers) {
      if (isSelfAssessmentPath) {
        return 'Are you sure you are ready to submit your self-assessment? This action cannot be undone.';
      } else {
        return `Are you sure you are ready to submit the performance evaluation for ${evaluateeInfo?.name}? This action cannot be undone.`;
      }
    } else {
      return errorsMessageArray();
    }
  };
  // Auto save after 5 minutes
  const autoSaveTime = 5 * 60 * 1000;
  useEffect(() => {
    const interval = setTimeout(() => {
      if (isDirty) {
        onSaveSubmitForm({ mode: SaveStatus.STATUS_SAVE, isShowModal: false });
      } else {
        // do nothing
      }
    }, autoSaveTime);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <Button
        sx={FormButtonBlue}
        width={'104px'}
        type="button"
        onClick={() => onSaveSubmitForm({ mode: SaveStatus.STATUS_SAVE })}
      >
        Save
      </Button>
      <Button
        sx={FormButtonOutline}
        marginLeft={'39px'}
        variant="outline"
        width={'104px'}
        type="button"
        onClick={() => onOpen()}
      >
        Submit
      </Button>
      <ModalSubmitForm
        isOpen={isOpen}
        isError={!!errors.answers}
        confirmText={'Submit'}
        onConfirm={handleSubmit(onSaveSubmitForm)}
        size={'4xl'}
        onClose={() => onClose()}
        isLoading={evaluateLoading}
        modalTitle={buildModalTitle()}
      />
      <ModalConfirm
        isOpen={isErrorOpen}
        onClose={handleCloseErrorModal}
        modalTitle={`${validateErrors}`}
        size={'4xl'}
        confirmText={'Close'}
        onConfirm={handleCloseErrorModal}
        hideCancelButton={true}
      />
    </div>
  );
};

export default EvaluateAction;
