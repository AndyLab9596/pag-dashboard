import { gql } from '@apollo/client';

export const GET_ALL_NOTIFICATION_SHORTS = gql`
  query getAllNotificationShorts {
    getAllNotificationShorts {
      id
      createdAt
      updatedAt
      key
      subject
      content
      fullContent
      isRead
    }
  }
`;

export const INVOKE_NOTIFICATION = gql`
  mutation InvokeNotification($data: NotificationRequest!, $filter: UserActionFilter!) {
    invokeNotification(data: $data, filter: $filter)
  }
`;

export const CLEAR_ALL_NOTIFICATIONS = gql`
  mutation ClearAllNotifications {
    clearAllNotifications {
      id
      createdAt
      updatedAt
      key
      subject
      content
      fullContent
      isRead
    }
  }
`;
