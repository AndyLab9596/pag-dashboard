import { gql } from '@apollo/client';

export const DEPARTMENT_FRAGMENT = gql`
  fragment Department on Department {
    id
    name
    deadlineLOC
    deadlineConfirmLOC
    deadlineSelfAssessment
    deadlinePerformanceEvaluation
    strategy {
      id
      name
    }
    lockDate
    showPreviousComment
  }
`;

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments($strategyId: Float, $departmentId: Float) {
    getAllDepartments(strategyId: $strategyId, departmentId: $departmentId) {
      ...Department
    }
  }
  ${DEPARTMENT_FRAGMENT}
`;

export const GET_ALL_DEPARTMENTS_PAGINATION = gql`
  query getAllDepartmentsWithPagination(
    $strategyId: Float
    $sort: DepartmentSortField
    $pageSize: Float
    $page: Float!
  ) {
    getAllDepartmentsWithPagination(strategyId: $strategyId, sort: $sort, pageSize: $pageSize, page: $page) {
      total
      page
      pageSize
      data {
        ...Department
      }
    }
  }
  ${DEPARTMENT_FRAGMENT}
`;

export const GET_ONE_DEPARTMENT = gql`
  query getOneDepartment($id: Float!) {
    getOneDepartment(id: $id) {
      ...Department
    }
  }
  ${DEPARTMENT_FRAGMENT}
`;

export const DELETE_MULTI_DEPARTMENT = gql`
  mutation deleteDepartment($ids: [Float!]!) {
    deleteDepartment(ids: $ids)
  }
`;
