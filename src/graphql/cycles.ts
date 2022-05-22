import { gql } from '@apollo/client';

export const GET_ALL_CYCLES = gql`
  query GetAllCyclesWithPagination($sort: SortField, $pageSize: Float, $page: Float!) {
    getAllCyclesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
      total
      page
      pageSize
      data {
        id
        createdAt
        updatedAt
        isActive
        name
      }
    }
  }
`;

export const GET_ONE_CYCLE = gql`
  query getOneCycle($id: Float!) {
    getOneCycle(id: $id) {
      id
      name
    }
  }
`;

export const ADD_ONE_CYCLE = gql`
  mutation addOneCycle($data: CycleInput!) {
    addOneCycle(data: $data) {
      id
      name
    }
  }
`;

export const UPDATE_ONE_CYCLE = gql`
  mutation updateOneCycle($id: Float!, $data: CycleInput!) {
    updateOneCycle(id: $id, data: $data) {
      id
      name
    }
  }
`;

export const DELETE_ONE_CYCLE = gql`
  mutation deleteOneCycle($id: Float!) {
    deleteOneCycle(id: $id)
  }
`;

export const GET_ALL_CYCLES_WITHOUT_PAGINATION = gql`
  query GetAllCycles {
    getAllCycle {
      id
      createdAt
      updatedAt
      isActive
      name
    }
  }
`;

export const GET_PRE_CYCLE = gql`
  query GetPreCycle {
    getPreCycle {
      id
    }
  }
`;

export const DELETE_CYCLES = gql`
  mutation DeleteCycles($input: DeleteCyclesInput!) {
    deleteCycles(input: $input)
  }
`;
