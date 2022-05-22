import * as React from 'react';
import { Flex, Text } from '@chakra-ui/layout';

export interface NotificationItemProps {
  subject: string;
  dateTime: string;
  isRead: boolean;
}

const notificationItemStyle = {
  justifyContent: 'space-around',
  p: '1rem 1.5rem',
  height: '73px',
  cursor: 'pointer',
  '&:hover': {
    bg: '#ecf5fd',
  },
};

const NotificationItem: React.FC<NotificationItemProps> = ({ subject, dateTime, isRead }) => {
  const bg = isRead ? 'white' : '#ecf5fd';
  return (
    <Flex bg={bg} sx={notificationItemStyle}>
      <Text w="260px" textAlign="left">
        {subject}
      </Text>
      <Text w="80px" color="#8dabc4" fontWeight="600">
        {dateTime}
      </Text>
    </Flex>
  );
};

export default NotificationItem;
