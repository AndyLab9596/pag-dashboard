import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ColumnOptions } from 'app/components/ui/User/types';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import { useAdminViewReportsQuery } from 'app/generated/graphql';
import { useSortServerSide } from 'common/useSortServerSide';
import React, { useMemo } from 'react';
import useFilters from '../hooks/useFilters';
import { ModeComponentProps } from '../types';

const listColumns: ColumnOptions[] = [
  { id: ListUsersColumnID.title, clickAble: true },
  { id: ListUsersColumnID.startDate },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
  { id: ListUsersColumnID.evaluator, clickAble: true },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.evaluationType },
  { id: ListUsersColumnID.perfSummary },
  { id: ListUsersColumnID.overAllPerf, disableSortBy: true },
];
interface Props extends ModeComponentProps {}

const Reports: React.FC<Props> = ({ filter, cycleId, rowAction, ...rest }) => {
  const { filterVariables, setCurrentPage } = useFilters({ filter });
  const { sort, onSort } = useSortServerSide(undefined, 'actionSort');
  const toast = useToastStatus();

  const { data, loading: queryLoading } = useAdminViewReportsQuery({
    variables: {
      ...filterVariables,
      cycleId: cycleId,
      actionSort: {
        field: sort.columnId,
        order: sort.sortDirection,
      },
    },
    skip: !cycleId,
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  let totalData = data?.adminViewReports.total;

  const users = useMemo(() => {
    if (!data) return [];

    return data?.adminViewReports.data.map(item => ({
      ...item.user,
      ...item,
    }));
  }, [data]);

  const columns = useColumns({ sort, listColumns, newColumns: [rowAction] });

  const handlePageChange = (pageSize: number, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Table
      onSort={onSort}
      onPageChange={handlePageChange}
      hideButtonEdit
      columns={columns}
      data={users}
      pageSize={25}
      totalData={totalData}
      loading={queryLoading || !cycleId}
      showPagination={totalData !== 0}
      controlledPageIndex={data?.adminViewReports.page ? data?.adminViewReports.page - 1 : undefined}
    />
  );
};

export default Reports;
