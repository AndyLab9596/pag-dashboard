import { gql } from '@apollo/client';
import { FRAGMENT_EVALUATION_TYPE_QUESTION } from './evaluationType';

export const EVALUATEE_FRAGMENT = gql`
  fragment Evaluatee on User {
    id
    firstName
    lastName
    name
    image
    title {
      id
      name
    }
    department {
      id
      name
      showPreviousComment
    }
    evaluationType {
      id
      name
    }
    evaluator {
      id
      firstName
      lastName
      name
      title {
        id
        name
      }
      image
    }
    updatedAt
    lastPromotionCycleId
    showPreviousComment
  }
`;

export const GET_MY_EVALUATIONS = gql`
  query getMyEvaluations($pageSize: Float, $page: Float!, $sort: UserSortField) {
    getMyEvaluations(pageSize: $pageSize, page: $page, sort: $sort) {
      total
      page
      pageSize
      data {
        id
        evaluatee {
          id
          name
          firstName
          lastName
          title {
            id
            name
          }
          strategy {
            id
            name
          }
          department {
            id
            name
          }
          location {
            id
            name
          }
          image
        }
        status
        optOut
        isOpenEvaluation
      }
    }
  }
`;

export const GET_USER_EVALUATION = gql`
  query GetUserEvaluation(
    $evaluationId: Float
    $contributorId: Float
    $cycleId: Float
    $isSelfAssessment: Boolean
    $evaluateeId: Float
    $isEvaluationMode: Boolean
  ) {
    getOneEvaluation: getUserEvaluation(
      isSelfAssessment: $isSelfAssessment
      evaluateeId: $evaluateeId
      contributorId: $contributorId
      cycleId: $cycleId
      evaluationId: $evaluationId
      isEvaluationMode: $isEvaluationMode
    ) {
      id
      name
      optOut
      optOutReason
      createdAt
      updatedAt
      contributor {
        id
      }
      evaluatee {
        ...Evaluatee
      }

      evaluationType {
        name
      }
      evaluationAnswers {
        id
        score
        feedback
        evaluationTypeQuestion {
          ...EvaluationTypeQuestion
        }
      }
      status
      cycle {
        id
      }
      isSelfAssessment
    }
  }
  ${FRAGMENT_EVALUATION_TYPE_QUESTION}
  ${EVALUATEE_FRAGMENT}
`;

export const GET_ONE_EVALUATION = gql`
  query getOneEvaluation($id: Float!) {
    getOneEvaluation(id: $id) {
      id
      name
      optOut
      optOutReason
      createdAt
      updatedAt
      contributor {
        id
      }

      evaluatee {
        ...Evaluatee
      }

      evaluationType {
        name
      }
      evaluationAnswers {
        id
        score
        feedback
        evaluationTypeQuestion {
          ...EvaluationTypeQuestion
        }
      }
      status
      cycle {
        id
      }
      isSelfAssessment
    }
  }
  ${FRAGMENT_EVALUATION_TYPE_QUESTION}
  ${EVALUATEE_FRAGMENT}
`;

export const DELETE_EVALUATION = gql`
  mutation DeleteEvaluation($evaluationId: Float!) {
    deleteEvaluation(evaluationId: $evaluationId)
  }
`;

export const EXPORT_MY_EVALUATIONS = gql`
  query ExportMyEvaluations {
    exportMyEvaluations {
      url
    }
  }
`;

export const EXPORT_MY_SELF_ASSESSMENT = gql`
  query ExportMySelfAssessment {
    exportMySelfAssessment {
      url
    }
  }
`;

export const SUBMIT_ALL_MY_EVALUATIONS = gql`
  mutation SubmitEvaluation {
    submitEvaluation {
      error
      data {
        evaluation {
          id
          status
          evaluatee {
            id
            name
          }
        }
        answerAndQuestions {
          question {
            id
            text
            isOpenQuestion
            isRequired
            isNADisabled
            title
          }
          answer {
            id
            feedback
            score
            isNoFeedback
            isNoScore
            isScore5s
            isScoreNA
          }
        }
      }
    }
  }
`;

export const OPS_QUESTION_AND_ANSWER_FRAGMENT = gql`
  fragment OpsQuestionAndAnswer on OverallPerformanceSummaryAnswer {
    id
    feedback
    evaluationTypeQuestion {
      id
      title
      text
      isEvaluation
      isRequired
      isOpenQuestion
    }
  }
`;

export const GET_OVERALL_PERFORMANCE_SUMMARY_BY_ID = gql`
  query GetOneOverallPerformanceSummary($getOneOverallPerformanceSummaryId: Float!) {
    getOneOverallPerformanceSummary(id: $getOneOverallPerformanceSummaryId) {
      id
      status
      isShare
      sharedDate
      cycle {
        id
        name
      }
      user {
        id
        name
        firstName
        lastName
        image
        updatedAt
        evaluator {
          id
          name
          firstName
          lastName
          image
          updatedAt
          title {
            id
            name
          }
        }
        title {
          id
          name
        }
        department {
          id
          name
        }
        evaluationType {
          id
          name
        }
      }
      overallPerformanceSummaryAnswers {
        ...OpsQuestionAndAnswer
      }
    }
  }
  ${OPS_QUESTION_AND_ANSWER_FRAGMENT}
`;

export const UPDATE_OVERALL_PERFORMANCE_SUMMARY = gql`
  mutation UpdateOneOverallPerformanceSummary(
    $updateOneOverallPerformanceSummaryId: Float!
    $data: OverallPerformanceSummaryInput!
  ) {
    updateOneOverallPerformanceSummary(id: $updateOneOverallPerformanceSummaryId, data: $data) {
      id
      status
      isShare
      sharedDate
      cycle {
        id
        name
      }
      user {
        id
        name
        firstName
        lastName
        image
        updatedAt
        evaluator {
          id
          name
          firstName
          lastName
          image
          updatedAt
          title {
            id
            name
          }
        }
        title {
          id
          name
        }
        department {
          id
          name
        }
        evaluationType {
          id
          name
        }
      }
      overallPerformanceSummaryAnswers {
        ...OpsQuestionAndAnswer
      }
    }
  }
  ${OPS_QUESTION_AND_ANSWER_FRAGMENT}
`;
