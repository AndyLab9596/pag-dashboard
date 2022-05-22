import { Button, Flex, HStack, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
//query
import { useGetAllNotificationLogsQuery } from 'app/generated/graphql';
import config from 'config';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
//comps
import Spinner from '../Spinner';

interface Props {
  userId: string;
}

const ReminderTab: React.FC<Props> = ({ userId }) => {
  const toast = useToastStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { data, loading } = useGetAllNotificationLogsQuery({
    variables: { userId: Number(userId) },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const reminderList = data?.getAllNotificationLogs || [];

  const handleSendReminderClick = () => {
    let path = location.pathname.split('/profile')[0];

    navigate({
      pathname: `${path}/send-reminder/${userId}`,
      search: params.toString(),
    });
  };

  if (loading || !data) {
    return (
      <div className="w-full mt-6 text-center pb">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ModalBody color="black">
        <VStack spacing={5} align="stretch" h={'500px'} overflowY="scroll">
          {reminderList.map(({ id, updatedAt, toName, subject }) => {
            const dateTime = dayjs(updatedAt).format(config.DATE_FORMAT);
            return (
              <HStack {...defaultItemContainer} key={id} color="#3f536e">
                <Flex direction="column">
                  <Text textTransform="capitalize" fontWeight="semibold">
                    {toName}
                  </Text>
                  <Text fontSize="sm">{subject}</Text>
                </Flex>
                <Text fontSize="xs" fontWeight="semibold">
                  {dateTime}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </ModalBody>
      <ModalFooter mt={5}>
        <Button type="submit" textTransform="capitalize" onClick={handleSendReminderClick}>
          send reminder
        </Button>
      </ModalFooter>
    </>
  );
};

//static
const defaultItemContainer = {
  w: '50%',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

export default ReminderTab;
