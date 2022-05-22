import { gql } from '@apollo/client';

export const STRATEGY_FRAGMENT = gql`
  fragment Strategy on Strategy {
    id
    name
    createdAt
    updatedAt
  }
`;

export const GET_ALL_STRATEGIES = gql`
  query getAllStrategies {
    getAllStrategies {
      ...Strategy
    }
  }
  ${STRATEGY_FRAGMENT}
`;

export const GET_ALL_STRATEGIES_PAGINATION = gql`
  query getAllStrategiesWithPagination($sort: StrategySortField, $pageSize: Float, $page: Float!) {
    getAllStrategiesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
      total
      page
      pageSize
      data {
        ...Strategy
      }
    }
  }
  ${STRATEGY_FRAGMENT}
`;

export const GET_ONE_STRATEGY = gql`
  query getOneStrategy($id: Float!) {
    getOneStrategy(id: $id) {
      ...Strategy
    }
  }
  ${STRATEGY_FRAGMENT}
`;

export const DELETE_MULTI_STRATEGY = gql`
  mutation deleteStrategy($ids: [Float!]!) {
    deleteStrategy(ids: $ids)
  }
`;
