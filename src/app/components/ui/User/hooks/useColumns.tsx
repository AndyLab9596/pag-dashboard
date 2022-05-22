import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import type { Column } from 'react-table';
import { VStack } from '@chakra-ui/react';

import type { SortState } from '../types';
import { ListUsersColumnID } from '../types/ListUsersColumnID.enum';
import { RoutesPath } from 'app/routes/routesPath';
import Avatar from '../../Avatar';
import EvaluationLink from '../components/EvaluationLink';
import SelfAssessmentLink from '../components/SelfAssessmentLink';
import PerfSummaryLink from '../components/PerfSummaryLink';
import OverallPerfSummaryLink from '../components/OverallPerfSummaryLink';
import { ColumnOptions } from '../types';
import { LOCStatus, LOCStatusText } from 'common/contributors';
import config from 'config';

interface Props {
  sort: SortState;
  listColumns: ColumnOptions[];
  newColumns?: Column[];
}

export default function useColumns(props: Props) {
  let { sort, newColumns = [], listColumns } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const handleSavePreviousRoute = () => {
    const previousRoute = location.pathname + location.search;
    localStorage.setItem('previousRoute', previousRoute);
  };

  const params = new URLSearchParams(location.search);

  const originalColumns = useMemo(
    () => ({
      [ListUsersColumnID.title]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'NAME/TITLE'}</span>,
        accessor: original => {
          return (
            <div className="flex items-center">
              <Avatar src={original.image} mr="16px" />
              <div className="flex flex-col">
                <span
                  className={`text-lightBlack ${
                    options.clickAble ? 'font-medium cursor-pointer underline' : 'font-normal'
                  }`}
                  onClick={() =>
                    options.clickAble &&
                    navigate(`profile/${original.id}${params && '?' + params.toString()}`, {
                      state: {
                        userName: original.name,
                      },
                    })
                  }
                >
                  {`${original.firstName} ${original.lastName}`}
                </span>
                <span className="text-13">{original.title && original.title.name}</span>
              </div>
            </div>
          );
        },
        minWidth: options.minWidth ?? '150px',
        width: options.width ?? '195px',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.lastLogin]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'LAST LOGIN'}</span>,
        accessor: r => (
          <div className="all-users">
            <div className="all-user-last-login">
              <span className="text-13">{r.lastLogin && dayjs(r.lastLogin).format(config.DATE_TIME_FORMAT)}</span>
            </div>
          </div>
        ),
        minWidth: options.minWidth ?? '150px',
        width: options.width ?? '150px',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.email]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'EMAIL'}</span>,
        accessor: original => <span className="text-13">{original.email}</span>,
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.startDate]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'START DATE'}</span>,
        accessor: original => (
          <span className="text-13">{original.startDate && dayjs(original.startDate).format(config.DATE_FORMAT)}</span>
        ),
        minWidth: options.minWidth ?? '6rem',
        width: options.width ?? '6rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.department]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'DEPARTMENT'}</span>,
        accessor: original => <span className="text-13">{original.department && original.department.name}</span>,
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.location]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === options.id ? sort.sortDirection : 'none',
        id: options.id,
        Header: <span className="table-header">{options.header ?? 'LOCATION'}</span>,
        accessor: original => <span className="text-13">{original.location && original.location.name}</span>,
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.evaluator]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === ListUsersColumnID.evaluator ? sort.sortDirection : 'none',
        id: ListUsersColumnID.evaluator,
        Header: <span className="table-header">{options.header ?? 'EVALUATOR'}</span>,
        accessor: original => (
          <span
            className={`text-13 font-normal ${options.clickAble ? 'cursor-pointer underline' : ''}`}
            onClick={() =>
              options.clickAble &&
              navigate(`profile/${original.evaluator?.id}${params && '?' + params.toString()}`, {
                state: {
                  userName: `${original?.evaluator?.firstName} ${original?.evaluator?.lastName}`,
                },
              })
            }
          >
            {original?.evaluator?.firstName} {original?.evaluator?.lastName}
          </span>
        ),
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.strategy]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === ListUsersColumnID.strategy ? sort.sortDirection : 'none',
        id: ListUsersColumnID.strategy,
        Header: <span className="table-header">{options.header ?? 'STRATEGY'}</span>,
        accessor: original => <span className="text-13">{original.strategy && original.strategy.name}</span>,
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.evaluationType]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === ListUsersColumnID.evaluationType ? sort.sortDirection : 'none',
        id: ListUsersColumnID.evaluationType,
        Header: <span className="table-header">{options.header ?? 'FORM'}</span>,
        accessor: original => <span className="text-13">{original?.evaluationType?.name}</span>,
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? 'common-table',
      }),
      [ListUsersColumnID.listOfContributors]: (options: ColumnOptions) => ({
        Header: <span className="table-header">{options.header ?? 'LIST OF CONTRIBUTORS'}</span>,
        id: ListUsersColumnID.listOfContributors,
        sortDirection: sort.columnId === ListUsersColumnID.listOfContributors ? sort.sortDirection : 'none',
        accessor: original => {
          let status =
            original?.listOfContributors?.length > 0 ? original?.listOfContributors[0]?.status : LOCStatus.NOT_STARTED;

          return (
            <span
              className="text-13 font-normal cursor-pointer underline"
              onClick={() =>
                navigate(RoutesPath.USER_CONTRIBUTORS_OF_USER.replace(':userId', original.id), {
                  state: {
                    from: location.pathname,
                    search: location.search,
                    isEvaluator: false,
                  },
                })
              }
            >
              {LOCStatusText[status]}
            </span>
          );
        },
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.selfAssessment]: (options: ColumnOptions) => ({
        Header: <span className="table-header">{options.header ?? 'SELF ASSESSMENT'}</span>,
        id: ListUsersColumnID.selfAssessment,
        sortDirection: sort.columnId === ListUsersColumnID.selfAssessment ? sort.sortDirection : 'none',
        accessor: original => {
          let isCompleted = original?.selfAssessment?.isComplete ?? false;
          return (
            <SelfAssessmentLink
              isCompleted={isCompleted}
              evaluateeId={original?.id ? parseInt(original.id) : null}
              cycleId={original?.cycleId}
              evaluationId={original?.selfAssessment?.id}
              onSavePreviousPage={handleSavePreviousRoute}
            />
          );
        },
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.evaluationsFor]: (options: ColumnOptions) => ({
        Header: <span className="table-header">{options.header ?? 'EVALUATIONS (%) FOR'}</span>,
        id: ListUsersColumnID.evaluationsFor,
        sortDirection: sort.columnId === ListUsersColumnID.evaluationsFor ? sort.sortDirection : 'none',
        accessor: original => {
          let evaluations = [...(original.evaluationsFor?.evaluations ?? [])];
          if (!evaluations || evaluations.length === 0) return <div className="text-center">0%</div>;

          return (
            <VStack spacing="4px">
              <span>{Math.round(original.evaluationsFor?.percentComplete * 10000) / 100} %</span>
              {evaluations
                .filter(item => !!item.contributor)
                ?.sort((a, b) => (a.contributor?.name > b.contributor?.name ? 1 : -1))
                ?.map(item => (
                  <EvaluationLink
                    userId={item.contributor?.id}
                    key={item.id}
                    original={original}
                    evaluationId={item.id}
                    status={item.status}
                    optOut={item.optOut}
                    isOpenEvaluation={item.isOpenEvaluation}
                    onSavePreviousPage={handleSavePreviousRoute}
                  >
                    {item.contributor?.name}
                  </EvaluationLink>
                ))}
            </VStack>
          );
        },
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.evaluationsBy]: (options: ColumnOptions) => ({
        Header: <span className="table-header">{options.header ?? 'EVALUATIONS (%) BY'}</span>,
        id: ListUsersColumnID.evaluationsBy,
        sortDirection: sort.columnId === ListUsersColumnID.evaluationsBy ? sort.sortDirection : 'none',
        accessor: original => {
          let evaluations = [...(original.evaluationsBy?.evaluations ?? [])];
          if (!evaluations || evaluations.length === 0) return <div className="text-center">0%</div>;

          return (
            <VStack spacing="4px">
              <span>{Math.round(original.evaluationsBy?.percentComplete * 10000) / 100} %</span>
              {evaluations
                .filter(item => !!item.evaluatee)
                ?.sort((a, b) => (a.evaluatee?.name > b.evaluatee?.name ? 1 : -1))
                ?.map(item => (
                  <EvaluationLink
                    userId={item.evaluatee.id}
                    key={item.id}
                    original={original}
                    evaluationId={item.id}
                    status={item.status}
                    optOut={item.optOut}
                    isOpenEvaluation={item.isOpenEvaluation}
                    onSavePreviousPage={handleSavePreviousRoute}
                  >
                    {item.evaluatee?.name}
                  </EvaluationLink>
                ))}
            </VStack>
          );
        },
        minWidth: options.minWidth ?? '8rem',
        width: options.width ?? '8rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.perfSummary]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === ListUsersColumnID.perfSummary ? sort.sortDirection : 'none',
        id: ListUsersColumnID.perfSummary,
        Header: <span className="table-header">{options.header ?? 'PERFORMANCE SUMMARY'}</span>,
        accessor: original => {
          let userId = original?.id;
          let perfSummary =
            Array.isArray(original?.performanceSummary) && original?.performanceSummary.length > 0
              ? original?.performanceSummary[0]
              : null;
          let isCompleted = perfSummary?.isComplete ?? false;
          let cycleId = original?.cycleId ?? null;

          return (
            <PerfSummaryLink
              userId={userId}
              isCompleted={isCompleted}
              cycleId={cycleId}
              onSavePreviousPage={handleSavePreviousRoute}
            />
          );
        },
        minWidth: options.minWidth ?? '9rem',
        width: options.width ?? '9rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      [ListUsersColumnID.overAllPerf]: (options: ColumnOptions) => ({
        sortDirection: sort.columnId === ListUsersColumnID.overAllPerf ? sort.sortDirection : 'none',
        id: ListUsersColumnID.overAllPerf,
        Header: <span className="table-header">{options.header ?? 'OVERALL PERF. SUMMARY'}</span>,
        accessor: original => {
          let userId = original?.id;
          let overallPerformanceSummary =
            Array.isArray(original?.overallPerformanceSummary) && original?.overallPerformanceSummary.length > 0
              ? original?.overallPerformanceSummary[0]
              : null;
          let cycleId = original?.cycleId ?? null;

          return (
            <OverallPerfSummaryLink userId={userId} cycleId={cycleId} overAllPerfSummary={overallPerformanceSummary} />
          );
        },
        minWidth: options.minWidth ?? '9rem',
        width: options.width ?? '9rem',
        disableSortBy: options.disableSortBy ?? false,
        className: options.className ?? '',
      }),
      // columnId use to sort
    }),
    [sort],
  );

  const columns = useMemo(() => {
    let matched = listColumns.map(column => originalColumns[column.id](column));

    return [...matched, ...newColumns];
  }, [sort]);

  return columns;
}
