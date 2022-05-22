import { gql } from '@apollo/client';

export const TITLE_FRAGMENT = gql`
  fragment Title on Title {
    id
    name
    createdAt
    updatedAt
    isMDOrAbove
  }
`;

export const GET_ALL_TITLES = gql`
  query getAllTitles {
    getAllTitles {
      ...Title
    }
  }
  ${TITLE_FRAGMENT}
`;

export const GET_ALL_TITLES_PAGINATION = gql`
  query getAllTitlesWithPagination($sort: TitleSortField, $pageSize: Float, $page: Float!) {
    getAllTitlesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
      total
      page
      pageSize
      data {
        ...Title
      }
    }
  }
  ${TITLE_FRAGMENT}
`;

export const GET_ONE_TITLE = gql`
  query getOneTitle($id: Float!) {
    getOneTitle(id: $id) {
      ...Title
    }
  }
  ${TITLE_FRAGMENT}
`;

export const DELETE_MULTI_TITLE = gql`
  mutation deleteTitle($ids: [Float!]!) {
    deleteTitle(ids: $ids)
  }
`;
