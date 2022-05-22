import { gql } from '@apollo/client';

export const VARIABLES_ADD_TITLE = gql`
  mutation addOneTitle($data: TitleInput!) {
    addOneTitle(data: $data) {
      id
      name
      isMDOrAbove
    }
  }
`;

export const VARIABLES_UPDATE_TITLE = gql`
  mutation updateOneTitle($id: Float!, $data: TitleInput!) {
    updateOneTitle(id: $id, data: $data) {
      id
      name
      isMDOrAbove
    }
  }
`;

export const VARIABLES_ADD_LOCATION = gql`
  mutation addOneLocation($data: LocationInput!) {
    addOneLocation(data: $data) {
      id
      name
      countryCode
    }
  }
`;

export const VARIABLES_UPDATE_LOCATION = gql`
  mutation updateOneLocation($id: Float!, $data: LocationInput!) {
    updateOneLocation(id: $id, data: $data) {
      id
      name
      countryCode
    }
  }
`;

export const VARIABLES_ADD_STRATEGY = gql`
  mutation addOneStrategy($data: StrategyInput!) {
    addOneStrategy(data: $data) {
      id
      name
    }
  }
`;

export const VARIABLES_UPDATE_STRATEGY = gql`
  mutation updateOneStrategy($id: Float!, $data: StrategyInput!) {
    updateOneStrategy(id: $id, data: $data) {
      id
      name
    }
  }
`;

export const VARIABLES_ADD_DEPARTMENT = gql`
  mutation addOneDepartment($data: DepartmentInput!) {
    addOneDepartment(data: $data) {
      id
      name
    }
  }
`;

export const VARIABLES_UPDATE_DEPARTMENT = gql`
  mutation updateOneDepartment($id: Float!, $data: DepartmentInput!) {
    updateOneDepartment(id: $id, data: $data) {
      id
      name
    }
  }
`;

export const VARIABLES_SET_ALL_DEADLINES_DEPARTMENTS = gql`
  mutation setAllDeadlineForDepartment($strategyId: Float!, $data: DeadlineDepartment!) {
    setAllDeadlineForDepartment(strategyId: $strategyId, data: $data)
  }
`;
