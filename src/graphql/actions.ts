import { gql } from '@apollo/client';

export const ACTION_USER_FRAGMENT = gql`
  fragment ActionUserFragment on User {
    id
    name
    firstName
    lastName
    startDate
    image
    title {
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
      firstName
      lastName
    }
    strategy {
      id
      name
    }
    evaluationType {
      id
      name
    }
    cycleId
  }
`;

export const GET_LIST_USER_ACTION_EVALUATION = gql`
  ${ACTION_USER_FRAGMENT}
  query adminViewEvaluations(
    $name: String
    $locationIds: [Float!]
    $strategyIds: [Float!]
    $departmentIds: [Float!]
    $titleIds: [Float!]
    $evaluatorIds: [Float!]
    $evaluationTypeIds: [Float!]
    $isActive: Boolean
    $actionSort: UserActionSortField
    $cycleId: Int
    $saStatus: Boolean
    $missingEvaluationsIds: [Int!]
    $page: Float!
  ) {
    adminViewEvaluations: getListUserAction(
      name: $name
      locationIds: $locationIds
      strategyIds: $strategyIds
      departmentIds: $departmentIds
      titleIds: $titleIds
      evaluatorIds: $evaluatorIds
      evaluationTypeIds: $evaluationTypeIds
      isActive: $isActive
      actionSort: $actionSort
      cycleId: $cycleId
      saStatus: $saStatus
      missingEvaluationsIds: $missingEvaluationsIds
      page: $page
    ) {
      total
      page
      pageSize
      data {
        user {
          ...ActionUserFragment
        }
        evaluationsFor {
          evaluations {
            id
            contributor {
              id
              name
            }
            isComplete
            optOut
            isOpenEvaluation
            status
          }
          percentComplete
        }
        evaluationsBy {
          evaluations {
            id
            evaluatee {
              id
              name
            }
            contributor {
              id
              name
            }
            isComplete
            optOut
            isOpenEvaluation
            status
          }
          percentComplete
        }
        selfAssessment {
          id
          status
          isComplete
        }
      }
    }
  }
`;

export const GET_LIST_USER_ACTION_REPORTS = gql`
  ${ACTION_USER_FRAGMENT}
  query adminViewReports(
    $name: String
    $locationIds: [Float!]
    $strategyIds: [Float!]
    $departmentIds: [Float!]
    $titleIds: [Float!]
    $evaluatorIds: [Float!]
    $evaluationTypeIds: [Float!]
    $isActive: Boolean
    $actionSort: UserActionSortField
    $cycleId: Int
    $psStatus: Boolean
    $page: Float!
  ) {
    adminViewReports: getListUserAction(
      name: $name
      locationIds: $locationIds
      strategyIds: $strategyIds
      departmentIds: $departmentIds
      titleIds: $titleIds
      evaluatorIds: $evaluatorIds
      evaluationTypeIds: $evaluationTypeIds
      isActive: $isActive
      actionSort: $actionSort
      cycleId: $cycleId
      psStatus: $psStatus
      page: $page
    ) {
      total
      page
      pageSize
      data {
        user {
          ...ActionUserFragment
        }
        performanceSummary {
          id
          isComplete
        }
        overallPerformanceSummary {
          id
          isShare
          sharedDate
        }
      }
    }
  }
`;

export const GET_LIST_USER_ACTION_FULL = gql`
  ${ACTION_USER_FRAGMENT}
  query adminViewFull(
    $name: String
    $locationIds: [Float!]
    $strategyIds: [Float!]
    $departmentIds: [Float!]
    $titleIds: [Float!]
    $evaluatorIds: [Float!]
    $evaluationTypeIds: [Float!]
    $isActive: Boolean
    $actionSort: UserActionSortField
    $cycleId: Int
    $locStatus: [String!]
    $saStatus: Boolean
    $missingEvaluationsIds: [Int!]
    $psStatus: Boolean
    $page: Float!
  ) {
    adminViewFull: getListUserAction(
      name: $name
      locationIds: $locationIds
      strategyIds: $strategyIds
      departmentIds: $departmentIds
      titleIds: $titleIds
      evaluatorIds: $evaluatorIds
      evaluationTypeIds: $evaluationTypeIds
      isActive: $isActive
      actionSort: $actionSort
      cycleId: $cycleId
      locStatus: $locStatus
      saStatus: $saStatus
      missingEvaluationsIds: $missingEvaluationsIds
      psStatus: $psStatus
      page: $page
    ) {
      total
      page
      pageSize
      data {
        user {
          ...ActionUserFragment
        }
        listOfContributors {
          id
          status
        }
        evaluationsFor {
          evaluations {
            id
            contributor {
              id
              name
            }
            isComplete
            optOut
            isOpenEvaluation
            status
          }
          percentComplete
        }
        evaluationsBy {
          evaluations {
            id
            evaluatee {
              id
              name
            }
            isComplete
            optOut
            isOpenEvaluation
            status
          }
          percentComplete
        }
        selfAssessment {
          id
          status
          isComplete
        }
        performanceSummary {
          id
          isComplete
        }
        overallPerformanceSummary {
          id
          isShare
          sharedDate
        }
      }
    }
  }
`;

export const GET_LIST_USER_ACTION_LOC = gql`
  ${ACTION_USER_FRAGMENT}
  query adminViewLOC(
    $name: String
    $locationIds: [Float!]
    $strategyIds: [Float!]
    $departmentIds: [Float!]
    $titleIds: [Float!]
    $evaluatorIds: [Float!]
    $evaluationTypeIds: [Float!]
    $isActive: Boolean
    $actionSort: UserActionSortField
    $cycleId: Int
    $locStatus: [String!]
    $page: Float!
  ) {
    adminViewLOC: getListUserAction(
      name: $name
      locationIds: $locationIds
      strategyIds: $strategyIds
      departmentIds: $departmentIds
      titleIds: $titleIds
      evaluatorIds: $evaluatorIds
      evaluationTypeIds: $evaluationTypeIds
      isActive: $isActive
      actionSort: $actionSort
      cycleId: $cycleId
      locStatus: $locStatus
      page: $page
    ) {
      total
      page
      pageSize
      data {
        user {
          ...ActionUserFragment
        }
        listOfContributors {
          id
          status
        }
      }
    }
  }
`;

export const MAIN_RESET_FORMS_FRAGMENT = gql`
  fragment MainResetFormsFragment on User {
    cycleContributors {
      id
      status
    }
    evaluationsOnMe {
      id
      evaluatee {
        id
        name
      }
      isComplete
    }
    evaluationsByMe {
      id
      evaluatee {
        id
        name
      }
      isComplete
    }
    completedPSsByUser {
      id
      user {
        id
        name
      }
    }
  }
`;

export const GET_RESET_FORMS = gql`
  query GetResetForms($filter: UserActionFilter) {
    getResetForms(filter: $filter) {
      total
      data {
        id
        name
        ...MainResetFormsFragment
      }
    }
  }
  ${MAIN_RESET_FORMS_FRAGMENT}
`;

export const RESET_LOC = gql`
  mutation ResetListOfContributors($locIds: [Float!]!) {
    resetListOfContributors(locIds: $locIds) {
      id
      status
    }
  }
`;

export const RESET_EVALUATIONS = gql`
  mutation ResetEvaluations($eIds: [Float!]!) {
    resetEvaluation(eIds: $eIds) {
      id
      name
      isComplete
      isOpenEvaluation
      status
      optOut
      contributor {
        id
        name
      }
      evaluatee {
        id
        name
      }
    }
  }
`;

export const RESET_PERFORMANCE_SUMMARIES = gql`
  mutation ResetPerformanceSummary($psIds: [Float!]!) {
    resetPerformanceSummary(psIds: $psIds) {
      id
      isComplete
      cycle {
        id
      }
    }
  }
`;

export const EXPORT_ALL_USERS = gql`
  query ExportAllUsers {
    exportAllUsers {
      url
    }
  }
`;

export const EXPORT_DETAIL_USERS_EXCEL = gql`
  query ExportDetailUsersExcel($filter: UserActionFilter!) {
    exportDetailUsersExcel(filter: $filter) {
      url
    }
  }
`;

export const GET_LIST_APPROVE_FORMS = gql`
  query ListSubmit($filter: UserActionFilter!) {
    listSubmit(filter: $filter) {
      listSubmitted {
        id
        status
        user {
          id
          name
        }
      }
      listUnSubmitted {
        id
        status
        user {
          id
          name
        }
      }
    }
  }
`;
