import { gql } from '@apollo/client';

export const LIST_OF_CONTRIBUTOR_AWAITING_OVERALL = gql`
  query getLOCsAwaitingApproval {
    getLOCsAwaitingApproval {
      percentComplete
      users {
        id
        name
        image
        cycleContributors {
          id
          status
        }
        department {
          id
          name
          deadlineLOC
          deadlineConfirmLOC
        }
      }
      percentComplete
      complete
    }
  }
`;

export const GET_LIST_OF_PERFORMANCE_EVAL = gql`
  query getListOfPerformanceEvaluations {
    getListOfPerformanceEvaluations {
      percentComplete
      evaluationStatus {
        evaluationId
        evaluationStatus
        evaluatee {
          id
          name
          image
          updatedAt
          department {
            id
            name
            deadlinePerformanceEvaluation
          }
        }
      }
    }
  }
`;
export const GET_LIST_PERFORMANCE_EVALUATIONS = gql`
  query getListPerformanceEvaluations {
    getListPerformanceEvaluations {
      completedPercentage
      completePerformance
      totalPerformance
      isComplete
      user {
        id
        name
        image
      }
    }
  }
`;
export const SELF_ASSESSMENT_FOR_EVALUATEE = gql`
  query getSelfAssessmentForEvaluatees {
    getSelfAssessmentForEvaluatees {
      percentComplete
      evaluationStatus {
        evaluationId
        evaluationStatus
        evaluatee {
          updatedAt
          image
          id
          name
          department {
            id
            name
            deadlineSelfAssessment
          }
        }
      }
    }
  }
`;

export const MY_CONTRIBUTOR = gql`
  query myContributors {
    myContributors: myContributorStatus {
      user {
        id
        name
        image
      }
      status
      id
    }
  }
`;
export const MY_SELF_ASSESSMENT = gql`
  query mySelfAssessment {
    mySelfAssessment {
      evaluationStatus
      evaluatee {
        id
        name
        image
      }
    }
  }
`;

export const GET_EVALUATION_QUESTION_BY_EVALUATION_TYPE = gql`
  query getQuestionsWithSpecificType($evaluationType: Float!) {
    getQuestionsWithSpecificType(evaluationType: $evaluationType) {
      id
      title
      subtitle
      text
      isOpenQuestion
      isRequired
      isSelfAssessment
      isNADisabled
      isEvaluation
      priority
      isNoExposureComment
    }
  }
`;

export const GET_DISTRIBUTION_RATING = gql`
  query getDistributionRatings($evaluationType: Float, $question: Float) {
    getDistributionRatings(evaluationType: $evaluationType, question: $question) {
      ratings {
        score
        entries
        normalize
        percentage
      }
      mean
      stdDev
      total
    }
  }
`;
