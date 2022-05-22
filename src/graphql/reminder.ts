import { gql } from '@apollo/client';

export const REMINDER_FRAGMENT = gql`
  fragment Reminder on NotificationLog {
    id
    createdAt
    updatedAt
    fromEmail
    fromName
    toEmail
    toName
    content
    subject
    key
  }
`;

export const GET_ALL_REMINDERS = gql`
  query GetAllNotificationLogs($userId: Float) {
    getAllNotificationLogs(userId: $userId) {
      ...Reminder
    }
  }
  ${REMINDER_FRAGMENT}
`;

export const GET_USERS_TO_SEND_REMINDERS = gql`
  query GetUsersInReminder($filter: UserActionFilter!, $recipient: String!) {
    getUsersInReminder(filter: $filter, recipient: $recipient) {
      id
      name
    }
  }
`;
