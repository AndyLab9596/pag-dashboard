import { gql } from '@apollo/client';
import { EVALUATEE_FRAGMENT } from './evaluations';

export const USER_FRAGMENT = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    name
    isEvaluator
    title {
      id
      name
    }
    department {
      id
      name
      showPreviousComment
    }
    location {
      id
      name
    }
    evaluationType {
      id
      name
    }
  }
`;

export const USER_DETAIL_FRAGMENT = gql`
  fragment UserDetail on User {
    id
    image
    email
    firstName
    lastName
    title {
      id
      name
    }
    name
    lastLogin
    location {
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
    evaluator {
      id
      firstName
      lastName
    }
    evaluationType {
      id
      name
    }
  }
`;

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    id
    name
    firstName
    lastName
    email
    image
    startDate
    isEvaluator
    isLockedSystem
    isInactive
    showPreviousComment
    roles {
      id
      name
    }
    evaluationType {
      id
      name
    }
    evaluator {
      id
      name
    }
    previousTitle {
      id
      name
    }
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
    strategy {
      id
      name
    }
    userAdminCountry {
      id
      countryCode
    }
    userAdminLocation {
      id
      location {
        id
        name
        countryCode
      }
    }
    listOfContributors {
      id
      cycleContributorsUser {
        id
        user {
          id
          name
        }
      }
    }
    permissionsLimitedUsers {
      id
      limited {
        id
        name
      }
    }
    permissionsExtraUsers {
      id
      extra {
        id
        name
      }
    }
  }
`;

export const QUERY_GET_ALL_USERS_WITH_DETAIL = gql`
  query getAllUsersWithDetail(
    $name: String
    $locationIds: [Float!]
    $strategyIds: [Float!]
    $departmentIds: [Float!]
    $titleIds: [Float!]
    $evaluatorIds: [Float!]
    $evaluationTypeIds: [Float!]
    $isActive: Boolean
    $sort: UserSortField
    $page: Float!
  ) {
    getAllUsersWithDetail(
      name: $name
      locationIds: $locationIds
      strategyIds: $strategyIds
      departmentIds: $departmentIds
      titleIds: $titleIds
      evaluatorIds: $evaluatorIds
      evaluationTypeIds: $evaluationTypeIds
      isActive: $isActive
      sort: $sort
      page: $page
    ) {
      total
      page
      pageSize
      data {
        ...UserDetail
      }
    }
  }
  ${USER_DETAIL_FRAGMENT}
`;

export const QUERY_GET_ALL_USER = gql`
  query GetAllUsers {
    getAllUsers {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

export const QUERY_GET_ONE_USER = gql`
  query GetOneUsers($id: Float!) {
    getOneUser(id: $id) {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_HIGHESTRATINGS = gql`
  query getAllHighestRatings {
    getHighestRating {
      user {
        id
        name
        image
      }
      averageScore
      percentageFourOrGreater
    }
  }
`;

export const GET_ALL_EVALUATION_TYPES = gql`
  query getAllEvaluationTypes {
    getAllEvaluationTypes {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      ...User
      roleCountryCode
      roleLocationId
      image
      roleCityCode
      showPreviousComment
      roles {
        id
        name
      }
      permissionsLimitedUsers {
        id
        limited {
          id
          name
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_ALL_USER_ROLES = gql`
  query getAllRoles {
    getAllRoles {
      id
      name
    }
  }
`;

export const GET_PROFILE_USER_BY_ID = gql`
  query getUserProfile($userId: Float!) {
    getUserProfile(userId: $userId) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($id: Float!, $data: UserProfileInput!) {
    updateUserProfile(id: $id, data: $data) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const GET_USER_INFO_BY_ID = gql`
  query GetOneUsersByIdWithManyFields($id: Float!) {
    getOneUser(id: $id) {
      id
      name
      image
      isEvaluatorFor {
        id
        name
        image
      }
      openEvaluations {
        id
        name
        status
        isComplete
        optOut
        evaluatee {
          id
          firstName
          lastName
          image
        }
        contributor {
          id
          name
          image
        }
      }
      selfAssessment {
        evaluation {
          id
          name
          status
          isComplete
          optOut
        }
        duration
      }
      listOfContributors {
        evaluatorId
        status
        user {
          id
          name
          image
        }
        cycleContributorsUser {
          id
          user {
            id
            name
            image
          }
        }
      }
      evaluations {
        evaluation {
          id
          name
          status
          isComplete
          optOut
          evaluatee {
            id
            firstName
            lastName
            image
          }
        }
        duration
      }
    }
  }
`;

export const UPDATE_ONE_CYCLE_CONTRIBUTOR = gql`
  mutation UpdateOneCycleContributor($id: Float!, $data: CycleContributorInput!) {
    updateOneCycleContributor(id: $id, data: $data) {
      id
      status
    }
  }
`;

export const GET_USER_WITH_CONTRIBUTOR = gql`
  query GetUserWithContributor($id: Float!) {
    getOneUser(id: $id) {
      id
      firstName
      lastName
      listOfContributors {
        id
        status
        evaluatorId
        cycleContributorsUser {
          id
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
      }
      evaluator {
        id
      }
    }
  }
`;

export const ADD_CONTRIBUTOR_USER = gql`
  mutation AddContributorUser($data: CycleContributorUserInput!) {
    addOneCycleContributorUser(data: $data) {
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
  }
`;

export const DELETE_CYCLE_CONTRIBUTOR_USER = gql`
  mutation DeleteCycleContributorUser(
    $isSelectAll: Boolean!
    $cycleContributorUserIds: [Float!]!
    $userId: Float
    $cycleId: Float
  ) {
    deleteCycleContributorUser(
      isSelectAll: $isSelectAll
      cycleContributorUserIds: $cycleContributorUserIds
      userId: $userId
      cycleId: $cycleId
    )
  }
`;

export const GET_USER_LOCKED_SYSTEM = gql`
  query GetUserLockedSystem($id: Float!) {
    getOneUser(id: $id) {
      isLockedSystem
      department {
        id
        lockDate
      }
    }
  }
`;

export const GET_USER_EVALUATEE = gql`
  query GetUserEvaluatee($id: Float!) {
    getOneUser(id: $id) {
      ...Evaluatee
      lastPromotionCycleId
    }
  }
  ${EVALUATEE_FRAGMENT}
`;

export const DELETE_MULTI_USER = gql`
  mutation deleteUsers($filter: UserActionFilter!) {
    deleteUsers(filter: $filter)
  }
`;

export const INACTIVE_USER = gql`
  mutation inactiveUser($filter: UserActionFilter!) {
    inactiveUser(filter: $filter) {
      id
    }
  }
`;

export const ADD_NEW_USER = gql`
  mutation AddNewUser($data: UserProfileInput!) {
    addUserProfile(data: $data) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;
export const PROMOTE_USER = gql`
  mutation promoteUser($id: Float!, $data: PromoteData!) {
    promoteUser(id: $id, data: $data) {
      id
    }
  }
`;
