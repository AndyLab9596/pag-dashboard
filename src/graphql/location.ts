import { gql } from '@apollo/client';

export const LOCATION_FRAGMENT = gql`
  fragment Location on Location {
    id
    createdAt
    updatedAt
    name
    countryCode
  }
`;

export const GET_ALL_LOCATIONS = gql`
  query getAllLocations {
    getAllLocations {
      ...Location
    }
  }
  ${LOCATION_FRAGMENT}
`;

export const GET_ALL_LOCATIONS_PAGINATION = gql`
  query getAllLocationsWithPagination($sort: LocationSortField, $pageSize: Float, $page: Float!) {
    getAllLocationsWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
      total
      page
      pageSize
      data {
        ...Location
      }
    }
  }
  ${LOCATION_FRAGMENT}
`;

export const GET_ONE_LOCATION = gql`
  query getOneLocation($id: Float!) {
    getOneLocation(id: $id) {
      ...Location
    }
  }
  ${LOCATION_FRAGMENT}
`;

export const DELETE_MULTI_LOCATION = gql`
  mutation deleteLocation($ids: [Float!]!) {
    deleteLocation(ids: $ids)
  }
`;
