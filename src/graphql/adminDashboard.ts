import { gql } from '@apollo/client';

export const GET_PERFORMANCE_EVALUATION = gql`
  query performanceEvaluation($strategyId: Float, $departmentIds: [Float!]) {
    performanceEvaluation(strategyId: $strategyId, departmentIds: $departmentIds) {
      percentComplete
      complete
      overall
    }
  }
`;
export const GET_SELF_ASSESSMENT = gql`
  query selfAssessments($strategyId: Float, $departmentIds: [Float!]) {
    selfAssessments(strategyId: $strategyId, departmentIds: $departmentIds) {
      percentComplete
      complete
      overall
    }
  }
`;

export const LIST_OF_CONTRIBUTOR = gql`
  query listContributors($strategyId: Float, $departmentIds: [Float!]) {
    listContributors(strategyId: $strategyId, departmentIds: $departmentIds) {
      percentComplete
      complete
      overall
    }
  }
`;

export const OVER_ALL_PROGRESS = gql`
  query OverallProgress($departmentIds: [Float!], $strategyId: Float) {
    overallProgress(departmentIds: $departmentIds, strategyId: $strategyId) {
      percentComplete
      complete
      overall
    }
  }
`;

export const GET_LIST_OF_PERFORMANCE_SUMMARIES = gql`
  query getListOfPerformanceSummary {
    getListOfPerformanceSummary {
      id
      percentComplete
      isComplete
      status
      user {
        id
        name
        image
        department {
          id
          name
          deadlinePerformanceEvaluation
        }
        evaluator {
          id
        }
      }
    }
  }
`;

export const GET_PENDING_LOC_APPROVAL = gql`
  query getPendingLOCApproval {
    getPendingLOCApproval {
      id
      user {
        id
        name
        image
      }
    }
  }
`;
