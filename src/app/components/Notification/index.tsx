import { Button } from '@chakra-ui/button';
import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverTrigger } from '@chakra-ui/popover';
import { Box } from '@chakra-ui/react';
import { useClearAllNotificationsMutation, useGetAllNotificationShortsQuery } from 'app/generated/graphql';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import useToastStatus from '../Toast/useToastHook';
import Spinner from '../ui/Spinner';
import NotificationItem from './NotificationItem';

var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const popoverContentStyle = {
  borderRadius: '5px',
  boxShadow: 'none',
  minWidth: '400px',
  top: '-6px',
  right: '8px',
  '&:hover': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
};

const popoverBodyStyle = {
  fontSize: '13px',
  overflowY: 'scroll',
  maxHeight: '450px',
  p: 0,
};

const Notification: React.FC = () => {
  const toast = useToastStatus();
  const [openPop, setOpenPop] = useState<boolean>(false);
  const { data, loading, refetch } = useGetAllNotificationShortsQuery();
  const [clearAllNotifications] = useClearAllNotificationsMutation({
    onCompleted: () => {
      refetch();
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const notificationData = data?.getAllNotificationShorts || [];

  const handleOpen = () => {
    setOpenPop(prev => !prev);
  };

  const onClearAllNotifications = () => {
    setOpenPop(false);
    clearAllNotifications();
  };

  return (
    <Popover onOpen={handleOpen} onClose={handleOpen} isOpen={openPop} placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <Button variant="link" p={5} height="100%">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="40"
              fill="white"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
          </Button>
          {notificationData.length > 0 && (
            <Box
              as="span"
              sx={{
                display: 'block',
                position: 'absolute',
                bg: 'red',
                w: '8px',
                h: '8px',
                borderRadius: '50%',
                top: '18px',
                right: '18px',
              }}
            ></Box>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent sx={popoverContentStyle}>
        <PopoverArrow ml="8px" />
        <PopoverBody sx={popoverBodyStyle}>
          {loading && (
            <Box display="flex" alignItems="center" justifyContent="center" width="full" height="200px">
              <Spinner />
            </Box>
          )}
          {notificationData.length > 0 &&
            notificationData.map(n => (
              <NotificationItem
                key={n.id}
                subject={n.subject}
                dateTime={dayjs(n.updatedAt).format('ll')}
                isRead={n.isRead || true}
              />
            ))}
          {notificationData.length === 0 && !loading && (
            <Box height="200px" color="#000" fontSize="16px" display="flex" alignItems="center" justifyContent="center">
              No notifications
            </Box>
          )}
        </PopoverBody>
        {notificationData.length > 0 && (
          <PopoverFooter p="0">
            <Button width="100%" onClick={onClearAllNotifications}>
              Clear All Notifications
            </Button>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
