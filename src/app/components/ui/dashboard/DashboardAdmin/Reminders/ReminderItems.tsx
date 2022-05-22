import React from 'react';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import Spinner from 'app/components/ui/Spinner';
import { useGetAllNotificationLogsQuery } from 'app/generated/graphql';
import { HtmlToString } from 'common/helpper';
import dayjs from 'dayjs';
import Wrapper from './WrapperReminder';
import config from 'config';
import { useAuthState } from 'app/components/Auth/useAuthState';
import { UserRole } from 'app/components/Auth/useRole';

interface ReminderItemsProps {
  userId?: number;
}

export const ReminderItems: React.FC<ReminderItemsProps> = ({ userId }) => {
  const [selectedId, setSelectedId] = React.useState<number | undefined>();
  const [isShow] = React.useState(false);
  const { identity, loading: authLoading } = useAuthState();
  const isAdmin = identity?.roles.some(r => r.id === UserRole.SUPER_ADMIN || r.id === UserRole.SPECIAL_ADMIN);

  const { data, loading } = useGetAllNotificationLogsQuery({
    variables: { userId: isAdmin ? userId : identity?.id },
    skip: authLoading,
  });

  const toggle = (reminderId: number): void => {
    if (reminderId !== selectedId) {
      setSelectedId(reminderId);
    } else {
      setSelectedId(undefined);
    }
  };

  if (loading) return <Spinner />;
  const reminders = data?.getAllNotificationLogs ?? [];

  return (
    <Wrapper>
      {reminders.map(reminder => (
        <Flex key={reminder.id} borderBottom="1px solid #c5dbea">
          <div className="reminders__content" onClick={() => toggle(reminder.id)}>
            <Flex className="reminders__content-title">
              <Box className="reminders__content-left">{reminder.toName}</Box>
              <Spacer />
              <Box className="reminders__content-right" fontSize="13px">
                {dayjs(reminder.createdAt).format(config.DATE_FORMAT)}
              </Box>
            </Flex>
            <div>
              <div className="reminderContent">
                {isShow && selectedId === reminder.id && HtmlToString(reminder.content)}
                {selectedId !== reminder.id && (
                  <div>
                    <p className="remindersSubject">{reminder.subject}</p>
                    <p className="sub-subject">{HtmlToString(reminder.content)}</p>
                    <span
                      className="btn-open-notify"
                      onClick={() => {
                        toggle(reminder.id);
                      }}
                    >
                      ...(read more)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {!isShow && selectedId === reminder.id && (
              <div className="desc">
                <span
                  onClick={() => {
                    toggle(reminder.id);
                  }}
                  className="buttonClose"
                >
                  X
                </span>
                <span className="desc-title reminderContent">{reminder.subject}</span>
                <div className="reminderContent" dangerouslySetInnerHTML={{ __html: reminder.content }}></div>
              </div>
            )}
          </div>
        </Flex>
      ))}
    </Wrapper>
  );
};
