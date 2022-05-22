import { gql } from '@apollo/client';

export const GET_ALL_SETTINGS = gql`
  query getAllSettings {
    getAllSettings {
      id
      key
      value
    }
  }
`;

export const UPDATE_ONE_SETTING = gql`
  mutation updateOneSetting($id: Float!, $data: SettingInput!) {
    updateOneSetting(id: $id, data: $data) {
      id
      key
      value
    }
  }
`;
