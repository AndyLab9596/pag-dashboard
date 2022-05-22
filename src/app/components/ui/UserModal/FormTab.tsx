import { Grid, HStack, ModalBody, Text, VStack } from '@chakra-ui/react';
import useToastStatus from 'app/components/Toast/useToastHook';
import {
  Evaluation,
  EvaluationWithDuration,
  useGetEvaluationInfoLazyQuery,
  useGetOneUsersByIdWithManyFieldsQuery,
  User,
} from 'app/generated/graphql';
import { useUserPermissions } from 'common/useUserPermissions';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useMemo } from 'react';
import Avatar from '../Avatar';
import Spinner from '../Spinner';
import EvaluationLink from './EvaluationLink';

dayjs.extend(duration);

const renderDuration = (seconds: number) => {
  return dayjs.duration(seconds, 'seconds').format('HH:mm');
};

interface Props {
  userId: string;
}

const FormTab: React.FC<Props> = ({ userId }) => {
  const toast = useToastStatus();
  const { canViewLOC, canViewEvaluationOrReportOf } = useUserPermissions();

  const [getEvaluations, { data: evaluationsData }] = useGetEvaluationInfoLazyQuery({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const { data, loading } = useGetOneUsersByIdWithManyFieldsQuery({
    variables: { id: Number(userId) },
    onCompleted: ({ getOneUser }) => {
      getEvaluations({
        variables: {
          evaluateeId: Number(userId),
          isSelfAssessment: false,
        },
      });
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const compareName = (
    f1: string | undefined,
    l1: string | undefined,
    f2: string | undefined,
    l2: string | undefined,
  ): number => {
    const name1: string = f1 ?? '' + l1 ?? '';
    const name2: string = f2 ?? '' + l2 ?? '';
    return name1 > name2 ? 1 : -1;
  };

  // get all evaluation of Loc
  const locsEvaluations = useMemo(() => {
    const result: cycleContributorUser[] = [];
    if (evaluationsData && data?.getOneUser.listOfContributors) {
      const { cycleContributorsUser: loc } = data?.getOneUser.listOfContributors;
      const { getEvaluationInfo } = evaluationsData;
      const getEvaluation = (
        contributorId: number,
      ): { isComplete: boolean | undefined; optOut: boolean | undefined; id: number | undefined } => {
        const evaluation = getEvaluationInfo?.find(evaluation => evaluation.contributor?.id === contributorId);
        if (evaluation) {
          return {
            isComplete: evaluation.isComplete ?? undefined,
            optOut: evaluation.optOut,
            id: evaluation.id,
          };
        }
        return {
          isComplete: undefined,
          optOut: undefined,
          id: undefined,
        };
      };
      loc.forEach(c => {
        result.push({
          ...getEvaluation(c.user.id),
          user: c.user,
        });
      });
    }
    if (result && result.length > 0) {
      result.sort((a, b) => (a.user.name > b.user.name ? 1 : -1));
    }
    return result;
  }, [evaluationsData, data]);

  const evalu = useMemo(() => {
    if (data?.getOneUser.evaluations) {
      return [...data?.getOneUser.evaluations].sort((a, b) =>
        compareName(
          a.evaluation?.evaluatee?.firstName,
          a.evaluation?.evaluatee?.lastName,
          b.evaluation?.evaluatee?.firstName,
          b.evaluation?.evaluatee?.lastName,
        ),
      );
    }
    return [] as EvaluationWithDuration[];
  }, [data]);

  const isEvaluFor = useMemo(() => {
    if (data?.getOneUser.isEvaluatorFor) {
      return [...data?.getOneUser.isEvaluatorFor].sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    return [] as User[];
  }, [data]);

  const openEvalu = useMemo(() => {
    if (data?.getOneUser.openEvaluations) {
      return [...data?.getOneUser.openEvaluations].sort((a, b) =>
        compareName(a.evaluatee?.firstName, a.evaluatee?.lastName, b.evaluatee?.firstName, b.evaluatee?.lastName),
      );
    }
    return [] as Evaluation[];
  }, [data]);

  if (loading) {
    return (
      <div className="w-full mt-6 text-center pb-30">
        <Spinner />
      </div>
    );
  }

  const { name, image: userAvatar, selfAssessment: self, id: evaluateeId } = (data?.getOneUser as User) ?? {};

  return (
    <ModalBody color="black">
      <Grid templateColumns="repeat(3, 1fr)" columnGap={16} h={'500px'} overflowY="scroll">
        {/* first column */}
        {/* self assessments */}
        <VStack spacing={4} align="stretch">
          <ListOfUser title="self assessments" isEmpty={Boolean(self?.evaluation)}>
            {self?.evaluation && (
              <HStack {...defaultItemHstack}>
                <HStack>
                  <Avatar src={userAvatar ?? undefined} name={name} {...defaultAvatar} />
                  <EvaluationLink
                    id={self.evaluation.id}
                    isComplete={!!self.evaluation.isComplete}
                    optOut={self.evaluation.optOut}
                    isClickAble={canViewEvaluationOrReportOf(data?.getOneUser.id, true)}
                    evaluateeId={evaluateeId}
                  >
                    {name}
                  </EvaluationLink>
                </HStack>
                <Text {...defaultDuration}>{renderDuration(self?.duration)}</Text>
              </HStack>
            )}
          </ListOfUser>
          {/* evaluations */}
          <ListOfUser title="evaluations" isEmpty={Boolean(evalu.length)}>
            {evalu.map(({ duration, evaluation }) => {
              if (evaluation === null || evaluation === undefined) return <></>;

              return (
                <HStack {...defaultItemHstack} key={evaluation?.id}>
                  <HStack>
                    <Avatar
                      src={(evaluation?.evaluatee?.image ?? '') as string}
                      name={evaluation?.name}
                      {...defaultAvatar}
                    />
                    <EvaluationLink
                      id={evaluation.id}
                      isComplete={!!evaluation.isComplete}
                      optOut={evaluation.optOut}
                      isClickAble={canViewEvaluationOrReportOf(evaluation.evaluatee?.id)}
                      evaluateeId={evaluation.evaluatee?.id}
                    >
                      {evaluation?.evaluatee?.firstName} {evaluation?.evaluatee?.lastName}
                    </EvaluationLink>
                  </HStack>
                  <Text {...defaultDuration}>{renderDuration(duration)}</Text>
                </HStack>
              );
            })}
          </ListOfUser>
        </VStack>
        {/* second column */}
        {/* Is Evaluator for */}
        <VStack spacing={4} align="stretch">
          <ListOfUser title="is evaluator for" isEmpty={Boolean(isEvaluFor.length)}>
            {isEvaluFor.map(({ id, name, image }) => (
              <HStack {...defaultItemHstack} key={`isEval_${id}`}>
                <HStack>
                  <Avatar src={image ?? undefined} name={name} {...defaultAvatar} />
                  <Text textTransform="capitalize" {...defaultLink} cursor="text">
                    {name}
                  </Text>
                </HStack>
              </HStack>
            ))}
          </ListOfUser>
        </VStack>
        {/* third column */}
        {/* List Of Contributors */}
        <VStack spacing={4} align="stretch">
          <ListOfUser title="list of contributors" isEmpty={Boolean(locsEvaluations && locsEvaluations.length)}>
            {locsEvaluations &&
              locsEvaluations.map(c => (
                <HStack {...defaultItemHstack} key={`open_${c.id}`}>
                  <HStack>
                    <Avatar src={c.user.image ?? undefined} name={c.user.name} {...defaultAvatar} />
                    <EvaluationLink
                      id={c.id}
                      isComplete={c.isComplete}
                      optOut={c.optOut}
                      isClickAble={canViewLOC(data?.getOneUser.id, c.user.id)}
                      evaluateeId={data?.getOneUser.id}
                    >
                      {c.user.name}
                    </EvaluationLink>
                  </HStack>
                </HStack>
              ))}
          </ListOfUser>

          {/* Open evaluations  */}
          <ListOfUser title="open evaluations" isEmpty={Boolean(openEvalu.length)}>
            {openEvalu.map(({ id, name, isComplete, optOut, evaluatee, contributor }) => (
              <HStack {...defaultItemHstack} key={`open_${id}`}>
                <HStack>
                  <Avatar src={(contributor?.image ?? '') as string} name={name} {...defaultAvatar} />
                  <EvaluationLink
                    id={id}
                    isComplete={!!isComplete}
                    optOut={optOut}
                    isClickAble={canViewEvaluationOrReportOf(evaluatee?.id)}
                    evaluateeId={evaluatee?.id}
                  >
                    {contributor?.name}
                  </EvaluationLink>
                </HStack>
              </HStack>
            ))}
          </ListOfUser>
        </VStack>
      </Grid>
    </ModalBody>
  );
};

interface ListUserProps {
  title: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
}

interface cycleContributorUser {
  id: number | undefined;
  user: {
    id: number;
    name: string;
    image?: string | null | undefined;
  };
  isComplete: boolean | undefined;
  optOut: boolean | undefined;
}

const ListOfUser: React.FC<ListUserProps> = ({ title, children, isEmpty }) => {
  return (
    <VStack {...defaultListStyle}>
      <Text textTransform="capitalize" {...defaultTitle}>
        {title}
      </Text>
      {children}
      {!isEmpty && <Text {...defaultNoOne}>No One</Text>}
    </VStack>
  );
};

//static
const defaultTitle = {
  fontWeight: 'semibold',
  fontSize: 'md',
};
const defaultNoOne = {
  borderBottom: '1px',
  borderBottomColor: 'black',
  fontSize: 'sm',
  alignSelf: 'flex-start',
};
const defaultListStyle = {
  spaceing: 3,
  align: 'stretch',
  justify: 'space-between',
  color: '#3f536e',
};
const defaultAvatar = {
  size: 'sm',
  boxSize: '30px',
  borderRadius: 'md',
  mr: 2,
};
const defaultDuration = {
  fontSize: 'sm',
  alignSelf: 'center',
};
const defaultLink = {
  target: '_blank',
  fontSize: 'sm',
  _focus: { outline: 0 },
  cursor: 'default',
};
const defaultItemHstack = {
  justify: 'space-between',
  align: 'stretch',
};
export default FormTab;
