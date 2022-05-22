import { gql } from '@apollo/client';

export const GET_PERFORMANCE_SUMMARIES = gql`
  query GetPerformanceSummaries($sort: UserSortField) {
    getReportPerformanceSummary(sort: $sort) {
      id
      percentComplete
      isComplete
      status
      user {
        id
        firstName
        lastName
        name
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
        evaluator {
          id
          name
        }
        image
      }
    }
  }
`;

export const ANSWER_CONTRIBUTOR_FRAGMENT = gql`
  fragment AnswerContributor on User {
    id
    name
    title {
      id
      name
      isMDOrAbove
    }
  }
`;

export const ANSWER_SUMMARY_FRAGMENT = gql`
  fragment AnswerSummary on EvaluationAnswer {
    score
    evaluationTypeQuestion {
      id
      title
    }
    feedback
  }
`;

export const PERFORMANCE_SUMMARY_FRAGMENT = gql`
  fragment PerformanceSummary on PerformanceSummary {
    id
    score
    feedback
    isComplete
    cycle {
      id
      isActive
    }
  }
`;

export const GET_PERFORMANCE_SUMMARY_DETAILS = gql`
  query GetPerformanceSummaryDetails($userId: Float!, $cycleId: Float) {
    getPerformanceSummaryDetails: getPerformanceSummaryDetails(userId: $userId, cycleId: $cycleId) {
      questionSummary {
        question {
          id
          title
          subtitle
          text
          isOpenQuestion
        }
        ratingAverage
        ratingAverageMdAndAbove
      }
      evaluations {
        optOut
        optOutReason
        contributor {
          ...AnswerContributor
        }
        evaluationAnswers {
          ...AnswerSummary
        }
      }
      performanceSummary {
        ...PerformanceSummary
      }
    }
  }
  ${ANSWER_SUMMARY_FRAGMENT}
  ${ANSWER_CONTRIBUTOR_FRAGMENT}
  ${PERFORMANCE_SUMMARY_FRAGMENT}
`;

export const FINALIZE_PERFORMANCE_SUMMARY = gql`
  mutation FinalizePerformanceSummary($data: PerformanceSummaryFinalizeInput!, $psId: Float!) {
    finalizePerformanceSummary(data: $data, psId: $psId) {
      id
      score
      feedback
      isComplete
      status
    }
  }
`;

// export report queries
export const GET_REPORT_LOC = gql`
  query GetLOCApproval($payload: PayLoad!, $filter: UserActionFilter!) {
    getLOCApproval(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_OPS = gql`
  query ExportOverallPerformanceSummary($payload: PayLoad!, $filter: UserActionFilter!) {
    exportOverallPerformanceSummary(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const SHARE_OPS = gql`
  query ShareOverallPerformanceSummary($payload: PayLoad!, $filter: UserActionFilter!) {
    shareOps: shareOverallPerformanceSummary(payload: $payload, filter: $filter) {
      status
      error
    }
  }
`;

export const CREATE_OPS = gql`
  mutation AddOneOverallPerformanceSummary($data: OverallPerformanceSummaryInput!) {
    addOneOverallPerformanceSummary(data: $data) {
      id
      isShare
      sharedDate
    }
  }
`;

export const GET_REPORT_MISSING_EVALUATIONS = gql`
  query ExportMissingEvaluations($payload: PayLoad!, $filter: UserActionFilter!) {
    exportMissingEvaluations(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_CONTRIBUTORS_PER_PERSON = gql`
  query ExportContributorsPerPerson($filter: UserActionFilter!) {
    exportContributorsPerPerson(filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_PERFORMANCE_SUMMARY = gql`
  query ExportPerformanceSummary($payload: PerformanceSummaryPayload!, $filter: UserActionFilter!) {
    exportPerformanceSummary(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_RATING_SUMMARY = gql`
  query ExportRatingSummary($payload: PayLoad!, $filter: UserActionFilter!) {
    exportRatingSummary(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_RANKING_SUMMARY = gql`
  query exportRankingSummary($payload: PayLoad!, $filter: UserActionFilter!) {
    exportRankingSummary(payload: $payload, filter: $filter) {
      url
    }
  }
`;

export const GET_REPORT_SELF_ASSESSMENT = gql`
  query ExportSAs($payload: PayLoad!, $filter: UserActionFilter) {
    exportSAs(payload: $payload, filter: $filter) {
      url
    }
  }
`;
