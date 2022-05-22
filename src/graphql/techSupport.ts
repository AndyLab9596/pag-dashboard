import { gql } from '@apollo/client';

export const SEND_TECH_SUPPORT = gql`
  mutation sendMailForTechSupport($content: String!) {
    sendMailForTechSupport(content: $content)
  }
`;
