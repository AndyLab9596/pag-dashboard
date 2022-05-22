import { gql } from '@apollo/client';

export const GET_ALL_REMINDER_TEMPLATE = gql`
  query getAllReminderTemplates {
    getAllReminderTemplates {
      id
      name
      subject
      content
      key
      shortContent
      reminderMe
    }
  }
`;

export const UPDATE_REMINDER_TEMPLATE = gql`
  mutation updateOneReminderTemplate($id: Float!, $data: ReminderTemplateInput!) {
    updateOneReminderTemplate(id: $id, data: $data) {
      id
      name
      subject
      content
      key
      shortContent
      reminderMe
    }
  }
`;

export const ADD_REMINDER_TEMPLATE = gql`
  mutation addOneReminderTemplate($data: ReminderTemplateInput!) {
    addOneReminderTemplate(data: $data) {
      id
      name
      subject
      content
      key
      shortContent
      reminderMe
    }
  }
`;

export const GET_ONE_REMINDER_TEMPLATE = gql`
  query getOneReminderTemplate($id: Float!) {
    getOneReminderTemplate(id: $id) {
      id
      name
      subject
      content
      key
      shortContent
      reminderMe
    }
  }
`;

export const DELETE_ALL_REMINDER_TEMPLATE = gql`
  mutation deleteReminderTemplate($ids: [Float!]!) {
    deleteReminderTemplate(ids: $ids)
  }
`;

export const GET_ALL_REMINDER_TEMPLATE_DETAILS = gql`
  query GetAllReminderTemplateDetail($page: Float!, $sort: SortFieldTemplate, $pageSize: Float) {
    getAllReminderTemplateDetail(page: $page, sort: $sort, pageSize: $pageSize) {
      total
      page
      pageSize
      data {
        id
        name
        subject
        content
        key
        shortContent
        reminderMe
      }
    }
  }
`;
