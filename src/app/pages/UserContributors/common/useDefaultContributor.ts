import { useEffect } from 'react';

import { GetUserWithContributorQuery, useAddContributorOfUserMutation } from 'app/generated/graphql';
import { LOCStatus } from 'common/contributors';
import { GET_CONTRIBUTORS_OF_USER } from 'graphql/contributor';
import { GET_USER_WITH_CONTRIBUTOR } from 'graphql/user';
import useToastStatus from 'app/components/Toast/useToastHook';

interface Props {
  userState?: GetUserWithContributorQuery;
}

const useDefaultContributor = (props: Props) => {
  const { userState } = props;
  let user = userState?.getOneUser;
  const [addUser] = useAddContributorOfUserMutation({
    refetchQueries: [
      GET_CONTRIBUTORS_OF_USER,
      'GetContributorsOfUser',
      GET_USER_WITH_CONTRIBUTOR,
      'GetUserWithContributor',
    ],
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  const toast = useToastStatus();

  useEffect(() => {
    /**
     * Add Evaluator for default contributor
     */
    if (!userState) return;
    if (
      user?.listOfContributors &&
      user.listOfContributors.cycleContributorsUser.length === 0 &&
      user.listOfContributors.status === LOCStatus.NOT_STARTED &&
      user.listOfContributors.evaluatorId
    ) {
      addUser({
        variables: {
          userId: user.id,
          data: [
            {
              projectDetails: 'N/A',
              contributorId: user.listOfContributors.evaluatorId,
            },
          ],
        },
      });
    }
  }, [JSON.stringify(user)]);
};

export default useDefaultContributor;
