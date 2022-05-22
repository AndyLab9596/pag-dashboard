import { Box } from '@chakra-ui/react';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import useToastStatus from 'app/components/Toast/useToastHook';
import Select from 'app/components/ui/Form/Select';
import Spinner from 'app/components/ui/Spinner';
import { useGetUserForOpenEvaluationQuery } from 'app/generated/graphql';
import { useState } from 'react';
import CreateEvaluate from './CreateEvaluate';
interface SelectUser {
  value: number;
  label: string;
}

export function OpenEvaluationPage() {
  const toast = useToastStatus();
  const { data, loading: queryLoading } = useGetUserForOpenEvaluationQuery({
    fetchPolicy: 'no-cache',
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const userNameOptions = data?.getUserForOpenEvaluation.map(user => {
    const { id, name } = user;
    return { value: id, label: name };
  });

  const [selectUser, setSelectUser] = useState<SelectUser | null>(null);

  const handleSelect = selectValue => {
    setSelectUser(selectValue);
  };

  const selectUserId = selectUser?.value as number;
  const selectUserFromData = data?.getUserForOpenEvaluation.find(user => user.id === selectUser?.value);
  const lastPromotionCycleId = selectUserFromData?.lastPromotionCycleId;
  if (queryLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <LayoutRightSide>
      <Box display="flex" flexDirection="column" gridRowGap="10px" mt={'30px'} ml={'20px'} maxWidth={'500px'}>
        {/* <TitlePage>Select an individual to evaluate</TitlePage> */}
        <Box as="span" fontSize={'1.5rem'} fontWeight={'bold'} marginBottom={'20px'}>
          Select an individual to evaluate
        </Box>
        <Box>
          <Select name="select" isMulti={false} className="w-full" options={userNameOptions} onChange={handleSelect} />
        </Box>
        {selectUser && <CreateEvaluate evaluateeId={selectUserId} lastPromotionCycleId={lastPromotionCycleId} />}
      </Box>
    </LayoutRightSide>
  );
}
