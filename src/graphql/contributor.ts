import { gql } from '@apollo/client';

export const USER_CONTRIBUTOR_FRAGMENT = gql`
  fragment UserContributorFragment on CycleContributorUser {
    id
    projectDetails
    user {
      id
      firstName
      lastName
      image
      title {
        id
        name
      }
      department {
        id
        name
      }
      strategy {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`;

export const GET_CONTRIBUTORS_OF_USER = gql`
  query GetContributorsOfUser(
    $pageSize: Float
    $page: Float!
    $userId: Float!
    $sort: UserSortField
    $isEvaluator: Boolean!
  ) {
    getContributorsOfUser: getContributorsOfEvaluatee(
      pageSize: $pageSize
      page: $page
      userId: $userId
      sort: $sort
      isEvaluator: $isEvaluator
    ) {
      total
      page
      pageSize
      data {
        ...UserContributorFragment
      }
    }
  }
  ${USER_CONTRIBUTOR_FRAGMENT}
`;

export const ADD_CONTRIBUTOR_OF_USER = gql`
  mutation AddContributorOfUser($userId: Float!, $data: [CreateContributorInput!]!) {
    addContributors(userId: $userId, data: $data) {
      ...UserContributorFragment
    }
  }
`;

export const GET_LAST_YEAR_CONTRIBUTORS = gql`
  query GetLastYearContributors($pageSize: Float, $page: Float!, $userId: Float!, $sort: UserSortField) {
    getLastYearContributors: getLastYearContributors(pageSize: $pageSize, page: $page, userId: $userId, sort: $sort) {
      total
      page
      pageSize
      data {
        ...UserContributorFragment
      }
    }
  }
`;

export const GET_MY_TEAM_LIST_OF_CONTRIBUTOR = gql`
  query GetMyLOCs($page: Float!, $sort: UserSortField) {
    getLOCsMyTeamForm(page: $page, sort: $sort) {
      total
      page
      pageSize
      data {
        id
        listOfContributors {
          id
          status
          user {
            id
            firstName
            lastName
            image
            title {
              name
            }
            strategy {
              name
            }
            department {
              name
            }
            location {
              name
            }
          }
        }
      }
    }
  }
`;

export const SUBMIT_LOC = gql`
  mutation SubmitLOC($isSendReminder: Boolean!, $evaluateeId: Float) {
    submitLOC(isSendReminder: $isSendReminder, evaluateeId: $evaluateeId) {
      id
      status
    }
  }
`;

export const APPROVE_LOC = gql`
  mutation ApproveLOC($isSendReminder: Boolean!, $ids: CycleContributorID!) {
    approveLOC(isSendReminder: $isSendReminder, ids: $ids) {
      id
      status
    }
  }
`;
