import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useAuthContext } from 'app/components/Auth/authContext';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import useToastStatus from 'app/components/Toast/useToastHook';
import { Form } from 'app/components/ui/Form';
import Spinner from 'app/components/ui/Spinner';
import {
  EvaluateeFragment,
  GetUserEvaluationQuery,
  GetUserEvaluationQueryVariables,
  useGetPreCycleLazyQuery,
  useGetUserEvaluationLazyQuery,
  useUpdateEvaluationMutation,
} from 'app/generated/graphql';
import { client } from 'app/GraphqlProvider';
import { RoutesPath } from 'app/routes/routesPath';
import { isApolloError } from 'common';
import { GET_LIST_USER_ACTION_EVALUATION, GET_LIST_USER_ACTION_FULL } from 'graphql/actions';
import { GET_LIST_OF_SELF_ASSESSMENT } from 'graphql/selfAssessment';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../Button/Button';
import EvaluationBlock from '../../EvaluationBlock';
import EvaluationEditBody from '../EvaluationEditBody';
import { EvaluationResult } from '../hooks/useEvaluationQuery';
import EvaluateAction, { SaveStatus } from './EvaluateAction';
import ModalOptOut from './ModalOptOut';
import ModalSaveConfirm from './ModalSaveConfirm';

// Styling
const wrapperStyle = {
  border: '1px',
  borderColor: '#a8c6df',
  borderRadius: 'md',
  padding: '26px',
  margin: '16px',
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  bg: 'linear-gradient(0deg, #fff 0%, #fafbfc 100%)',
};

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
// interface

export interface EvaluationAnswers {
  feedback?: string | null | undefined;
  isNADisabled?: boolean;
  isOpenQuestion?: boolean;
  isRequired?: boolean;
  questionId?: number | null | undefined;
  score?: number | null | undefined;
  subtitle?: string | null | undefined;
  text?: string | null | undefined;
  title?: string | null | undefined;
  id?: string;
  isSelfAssessment: boolean;
  isEvaluation: boolean;
}

export interface Evaluation {
  answers: EvaluationAnswers[] | [];
}

enum ShowPreviousComment {
  Inherit = 0,
  Hide = 1,
  Show = 2,
}

interface EvaluationBoilerPlateProps {
  evaluation?: EvaluationResult;
  refetch: (
    variables?: Partial<GetUserEvaluationQueryVariables> | undefined,
  ) => Promise<ApolloQueryResult<GetUserEvaluationQuery>>;

  loading?: boolean;
  error?: ApolloError | undefined;
}

const EvaluationBoilerPlate = ({ evaluation, refetch, loading, error }: EvaluationBoilerPlateProps) => {
  const { selectedRole, identity } = useAuthContext();
  const isAdminMode = selectedRole.name === 'Admin' ? true : false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToastStatus();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigateRoute = localStorage.getItem('previousRoute');
  const isSelfAssessmentEvaluation = evaluation?.isSelfAssessment;

  const isSelfAssessmentPath = pathname === RoutesPath.EVALUATIONS_SELF_ASSESSMENT;

  const isEvaluationEditPath = pathname.includes(RoutesPath.EVALUATIONS_EDIT.replace(':evaluationId', ''));

  const variantForEvaluationBlock = () => {
    if (isSelfAssessmentPath) {
      return 'selfAssessment';
    }
    return 'evaluation';
  };

  const [defaultValues, setDefaultValues] = React.useState<Evaluation>({ answers: [] });

  // stuffs to handle show previous comments
  const [preAnswers, setPreAnswers] = React.useState({});

  const [isShowPreviousBtn, setIsShowPreviousBtn] = React.useState<boolean>(isSelfAssessmentPath);

  const [isShowingPreviousComment, setIsShowingPreviousComment] = React.useState<boolean>(false);

  const [getPreCycle] = useGetPreCycleLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: ({ getPreCycle }) => {
      if (getPreCycle) {
        if (!isSelfAssessmentPath) {
          if (evaluation?.evaluatee?.lastPromotionCycleId === getPreCycle.id) {
            setIsShowPreviousBtn(false);
            return;
          }
        }

        getPreAnswers({
          variables: {
            isEvaluationMode: true,
            ...(isSelfAssessmentPath || evaluation?.evaluatee?.id === identity?.id
              ? { isSelfAssessment: true }
              : { contributorId: identity?.id }),
            evaluateeId: evaluation?.evaluatee?.id as number,
            cycleId: getPreCycle && (getPreCycle?.id as number),
          },
        });
      } else {
        !isSelfAssessmentPath && setIsShowPreviousBtn(false);
      }
    },
    onError: _ => {
      !isSelfAssessmentPath && setIsShowPreviousBtn(false);
    },
  });

  const [getPreAnswers] = useGetUserEvaluationLazyQuery({
    onCompleted: ({ getOneEvaluation: data }) => {
      if (data && !!data.evaluationAnswers) {
        /** Map answers of pre comments for each question ID for easier to lookup
        {evaluationTypeQuestionId: EvaluationAnswer}
        */
        const mapPreAnswers = data
          ? data.evaluationAnswers.reduce((result, eAns) => {
              if (eAns.evaluationTypeQuestion) {
                result[eAns.evaluationTypeQuestion.id] = formatDataEvaluationAnswer(eAns);
              }
              return result;
            }, {})
          : {};
        setPreAnswers(mapPreAnswers);
        // this is the last step, so it must have satisfied all conditions
        // then setIsShowPreviousbtn to true
        setIsShowPreviousBtn(true);
      } else {
        !isSelfAssessmentPath && setIsShowPreviousBtn(false);
      }
    },
    onError: error => {
      !isSelfAssessmentPath && setIsShowPreviousBtn(false);
    },
  });

  useEffect(() => {
    if (!!evaluation?.evaluationAnswers) {
      const evaluationAnswerInput = evaluation?.evaluationAnswers
        ?.filter(value => {
          return !!value.evaluationTypeQuestion;
        })
        .map(eAns => {
          return formatDataEvaluationAnswer(eAns);
        }) as EvaluationAnswers[];
      setDefaultValues({
        answers: evaluationAnswerInput ?? [],
      });
    }
    if (!isSelfAssessmentPath) {
      const isCanPreviousComment =
        identity?.showPreviousComment == null || identity?.showPreviousComment === ShowPreviousComment.Inherit
          ? !!evaluation?.evaluatee?.department?.showPreviousComment
          : identity?.showPreviousComment === ShowPreviousComment.Show;
      if (isCanPreviousComment) {
        // continue to check if have preCycle + have last evaluation
        getPreCycle();
      }
    }
  }, [evaluation]);

  const formatDataEvaluationAnswer = eAns => {
    const { id, isRequired, isOpenQuestion, title, subtitle, isNADisabled, text, isSelfAssessment, isEvaluation } =
      eAns.evaluationTypeQuestion;
    const { feedback, score } = eAns;

    const resultFormat = {
      questionId: id,
      feedback: feedback ? feedback : '',
      score: score === 0 ? '0' : score ? score : '',
      isRequired,
      isOpenQuestion,
      title,
      subtitle,
      isNADisabled,
      text,
      isSelfAssessment,
      isEvaluation,
    } as EvaluationAnswers;

    return resultFormat;
  };

  const [updateEvaluationMutation, { loading: evaluateLoading }] = useUpdateEvaluationMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  // Yup schema validation
  const validationSchema = yup.object().shape({
    answers: yup.array().of(
      yup.object().shape({
        isOpenQuestion: yup.boolean(),
        isRequired: yup.boolean(),
        feedback: yup
          .string()
          .nullable(true)
          .when(['isRequired'], {
            is: true,
            then: yup
              .string()
              .test(
                'Should have at least three words',
                'Mandatory comments require three words',
                values => !!values && values.split(' ').length > 2,
              )
              .required('Required Field'),
          }),
        score: yup
          .string()
          .nullable(true)
          .when(['isOpenQuestion'], {
            is: false,
            then: yup.string().required('Missing score(s), please ensure you provide a rating for each section.'),
          }),
      }),
    ),
  });
  // OptOut Condition
  const isOptOut = evaluation?.optOut;
  const optOutReason = evaluation?.optOutReason;

  const handleModalSaveClose = () => {
    onClose();
  };

  // Handle Save
  const onSaveSubmitForm = async (data, saveStatus, isShowModal = true) => {
    try {
      await updateEvaluationMutation({
        variables: {
          saveStatus: saveStatus,
          data: {
            evaluationAnswers: data,
          },
          evaluationId: evaluation?.id as number,
          isAdminMode,
        },
      });

      await client.refetchQueries({
        include: [
          getOperationName(GET_LIST_USER_ACTION_FULL) ?? '',
          getOperationName(GET_LIST_USER_ACTION_EVALUATION) ?? '',
          getOperationName(GET_LIST_OF_SELF_ASSESSMENT) ?? '',
        ],
        optimistic: true,
      });

      refetch();
      saveStatus === SaveStatus.STATUS_SAVE && isShowModal && onOpen();
      if (saveStatus === SaveStatus.STATUS_SUBMIT) {
        if (window.history.state && window.history.state.idx > 0) {
          !isSelfAssessmentPath && navigate(RoutesPath.EVALUATIONS);
        } else {
          if (typeof navigateRoute === 'string') {
            navigate(navigateRoute);
          }
        }
      }
    } catch (error: any) {
      toast({ status: 'error', title: error.message });
    }
  };

  // Handle OptOut

  const handleOptOut = () => {
    navigate(`optOut`);
  };

  const handleReverseOptOut = () => {
    navigate('reverseOptOut');
  };

  const handleCloseOptOutModal = () => {
    navigate(-1);
  };

  // Handle View Previous Comments
  // if not show previous comment yet (false)
  const handleViewPreviousComments = () => {
    if (!isShowingPreviousComment) {
      getPreCycle();
      setIsShowingPreviousComment(true);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    if (isApolloError(error)) {
      const { graphQLErrors } = error;
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    }
  }

  return (
    <LayoutRightSide>
      {/* Evaluation Action */}
      <Form validationSchema={validationSchema} defaultValues={defaultValues}>
        <Box marginLeft={'13px'} marginRight={'13px'} marginTop={'13px'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <div>
              {!isOptOut && (
                <EvaluateAction
                  evaluationAnswerInput={defaultValues}
                  handleSaveSubmitForm={onSaveSubmitForm}
                  isSelfAssessmentPath={isSelfAssessmentPath}
                  evaluateeInfo={evaluation?.evaluatee as EvaluateeFragment}
                  evaluateLoading={evaluateLoading}
                />
              )}
            </div>
            <div>
              {isShowPreviousBtn && (
                <Button
                  disabled={isShowingPreviousComment}
                  marginRight={'39px'}
                  sx={FormButtonBlue}
                  onClick={() => handleViewPreviousComments()}
                >
                  View Previous Comments
                </Button>
              )}
              {isEvaluationEditPath &&
                !isSelfAssessmentEvaluation &&
                (!isOptOut ? (
                  <Button width={'104px'} type="button" sx={FormButtonOutline} variant="outline" onClick={handleOptOut}>
                    Opt out
                  </Button>
                ) : (
                  <Button
                    width={'104px'}
                    type="button"
                    sx={FormButtonOutline}
                    variant="outline"
                    onClick={handleReverseOptOut}
                  >
                    Reverse Opt Out
                  </Button>
                ))}
            </div>
          </Box>
        </Box>
        {/* Evaluation Block Info */}
        {!!evaluation?.evaluatee && (
          <EvaluationBlock
            variant={variantForEvaluationBlock()}
            evaluatee={evaluation?.evaluatee}
            startDate={evaluation?.createdAt}
          />
        )}
        {/* Evaluation Body & Opt out */}
        {!isOptOut ? (
          <EvaluationEditBody
            preAnswers={preAnswers}
            isShowPreviousComment={isShowingPreviousComment && Object.keys(preAnswers).length > 0}
            evaluateeName={evaluation?.evaluatee?.name}
          />
        ) : (
          <Box sx={wrapperStyle}>
            <Text fontSize="15px" fontWeight="semibold">
              No Exposure Comment
            </Text>
            <Box>
              <p className="text-13">{optOutReason}</p>
            </Box>
          </Box>
        )}
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginLeft={'13px'}
          marginRight={'13px'}
          marginTop={'13px'}
        >
          <div>
            {!isOptOut && (
              <EvaluateAction
                evaluationAnswerInput={defaultValues}
                handleSaveSubmitForm={onSaveSubmitForm}
                isSelfAssessmentPath={isSelfAssessmentPath}
                evaluateeInfo={evaluation?.evaluatee as EvaluateeFragment}
                evaluateLoading={evaluateLoading}
              />
            )}
          </div>
        </Box>
      </Form>
      {/* Modal OptOut & Reverse Opt Out & Submit Form */}
      <Routes>
        <Route
          path="optOut"
          element={
            <ModalOptOut
              handleClose={handleCloseOptOutModal}
              refetch={refetch}
              evaluationId={evaluation?.id as number}
              mode="optOut"
              isAdminMode={isAdminMode}
            />
          }
        />
        <Route
          path="reverseOptOut"
          element={
            <ModalOptOut
              handleClose={handleCloseOptOutModal}
              refetch={refetch}
              evaluationId={evaluation?.id as number}
              mode="reverseOptOut"
              isAdminMode={isAdminMode}
            />
          }
        />
      </Routes>
      {/* Modal Save*/}
      <ModalSaveConfirm
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Saved"
        confirmText="Close"
        onConfirm={handleModalSaveClose}
        isLoading={evaluateLoading}
        size={'3xl'}
      />
    </LayoutRightSide>
  );
};

export default EvaluationBoilerPlate;
