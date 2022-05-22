import { Box, Center } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
import Select from 'app/components/ui/Form/Select';
import { useGetAllUsersLazyQuery } from 'app/generated/graphql';
import React from 'react';
import { CardContentLeft } from '../../Card/CardWrapper';
import { ReminderItems } from './ReminderItems';
import Wrapper from './WrapperReminder';

const defaultOption = {
  value: undefined,
  label: 'All',
};
export interface OptionProps {
  id: number;
  name: string;
}

interface SelectOption {
  value: number | undefined;
  label: string;
}

const Reminder: React.FC = () => {
  const toast = useToastStatus();
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [findUser, { loading }] = useGetAllUsersLazyQuery({
    onCompleted: data => {
      setOptions([
        defaultOption,
        ...data.getAllUsers.map(users => ({
          value: users.id,
          label: users.name,
        })),
      ]);
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [userSelected, setUserSelected] = React.useState<number | undefined>();

  return (
    <Wrapper className="content-dashboard-right__card reminders h-full">
      <CardContentLeft>
        <Box width="100%" px={0} py={0} variants="with-shadow">
          <Center
            fontSize="17px"
            fontWeight="semibold"
            padding="20px 10px"
            borderBottom="1px solid #c5dbea"
            color="#3f536e"
          >
            Reminders
          </Center>
        </Box>
        <Box borderBottom="1px solid #c5dbea" px={6} py={2}>
          <Center>
            <Select
              placeholder="Select name"
              className="w-full my-2"
              isMulti={false}
              defaultValue={''}
              options={options}
              onChange={e => setUserSelected(e?.value)}
              isLoading={loading}
              onMenuOpen={() => findUser({ variables: {} })}
            />
          </Center>
        </Box>
        <div className="reminders__form">
          <ReminderItems userId={userSelected} />
        </div>
      </CardContentLeft>
    </Wrapper>
  );
};

export default Reminder;
