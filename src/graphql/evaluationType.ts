import { gql } from '@apollo/client';

export const FRAGMENT_EVALUATION_TYPE_QUESTION = gql`
  fragment EvaluationTypeQuestion on EvaluationTypeQuestion {
    id
    updatedAt
    title
    subtitle
    text
    isOpenQuestion
    isRequired
    isSelfAssessment
    isNADisabled
    isEvaluation
    priority
    isNoExposureComment
  }
`;

export const GET_EVALUATION_TYPE_BY_ID = gql`
  query getOneEvaluationType($id: Float!) {
    getOneEvaluationType(id: $id) {
      id
      name
      createdAt
      evaluationTypeQuestions {
        ...EvaluationTypeQuestion
      }
    }
  }
  ${FRAGMENT_EVALUATION_TYPE_QUESTION}
`;

export const UPDATE_EVALUATION_TYPE = gql`
  mutation updateEvaluationType($data: EvaluationTypeInput!, $typeId: Float!) {
    updateEvaluationType(data: $data, typeId: $typeId) {
      id
      name
      createdAt
      evaluationTypeQuestions {
        ...EvaluationTypeQuestion
      }
    }
  }
  ${FRAGMENT_EVALUATION_TYPE_QUESTION}
`;

export const ADD_EVALUATION_TYPE = gql`
  mutation addEvaluationType($data: EvaluationTypeInput!) {
    addEvaluationType(data: $data) {
      id
      name
      createdAt
      evaluationTypeQuestions {
        ...EvaluationTypeQuestion
      }
    }
  }
  ${FRAGMENT_EVALUATION_TYPE_QUESTION}
`;

export const DELETE_EVALUATION_TYPE = gql`
  mutation deleteEvaluationType($ids: [Float!]!) {
    deleteEvaluationType(ids: $ids)
  }
`;

export const GET_EVALUATION_TYPES = gql`
  query GetAllDetailEvaluationTypes($keyword: String, $page: Float!, $sort: SortField, $pageSize: Float) {
    getAllDetailEvaluationTypes(keyword: $keyword, page: $page, sort: $sort, pageSize: $pageSize) {
      total
      page
      pageSize
      data {
        id
        name
        key
        createdAt
        updatedAt
      }
    }
  }
`;
