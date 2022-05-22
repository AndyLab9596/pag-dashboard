import { gql } from '@apollo/client';

export const GET_LIST_OF_SELF_ASSESSMENT = gql`
  query GetListOfSelfAssessment($page: Float!, $sort: SortUserEvaluation) {
    getSelfAssessmentList(page: $page, sort: $sort) {
      page
      total
      pageSize
      data {
        id
        status
        evaluatee {
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
`;
