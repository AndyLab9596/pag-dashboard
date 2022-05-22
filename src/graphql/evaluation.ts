import { gql } from '@apollo/client';

export const GET_EVALUATION_INFO = gql`
  query GetEvaluationInfo($evaluateeId: Float!, $contributorId: Float, $cycleId: Float, $isSelfAssessment: Boolean) {
    getEvaluationInfo(
      evaluateeId: $evaluateeId
      contributorId: $contributorId
      cycleId: $cycleId
      isSelfAssessment: $isSelfAssessment
    ) {
      id
      name
      isComplete
      isSelfAssessment
      optOut
      isOpenEvaluation
      status
      contributor {
        id
        name
        image
      }
    }
  }
`;

export const GET_USER_FOR_OPEN_EVALUATION = gql`
  query GetUserForOpenEvaluation {
    getUserForOpenEvaluation {
      id
      name
      lastPromotionCycleId
    }
  }
`;

export const GET_OPEN_EVALUATION = gql`
  query GetOpenEvaluation($evaluateeId: Float!) {
    getOpenEvaluation(evaluateeId: $evaluateeId) {
      id
      name
      isSelfAssessment
      evaluatee {
        id
        name
        startDate
        image
        department {
          name
        }
        title {
          name
        }
      }
      cycle {
        id
      }
      evaluationType {
        id
        name
        key
      }
      evaluationAnswers {
        id
        feedback
        score
        evaluationTypeQuestion {
          id
          title
          subtitle
          text
          isOpenQuestion
          isRequired
          isNADisabled
          isNoExposureComment
        }
      }
    }
  }
`;

export const UPDATE_EVALUATION = gql`
  mutation updateEvaluation(
    $saveStatus: String!
    $data: EvaluationUpdate!
    $evaluationId: Float!
    $isAdminMode: Boolean!
  ) {
    updateEvaluation(saveStatus: $saveStatus, data: $data, evaluationId: $evaluationId, isAdminMode: $isAdminMode) {
      id
      name
      status
    }
  }
`;

export const REVERSE_OPT_OUT = gql`
  mutation reverseOptOut($evaluationId: Float!) {
    reverseOptOut(evaluationId: $evaluationId) {
      id
      name
    }
  }
`;
