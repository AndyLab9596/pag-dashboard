import type { ButtonProps } from '@chakra-ui/react';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import { useGetMyLoCsQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import { LOCStatus, LOCStatusText } from 'common/contributors';
import { useSortServerSide } from 'common/useSortServerSide';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const listColumns = [
  { id: ListUsersColumnID.title, header: 'EVALUATE', clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

interface Props {}

const ContributorsToApproveTable: React.FC<Props> = () => {
  const toast = useToastStatus();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { sort, onSort } = useSortServerSide(undefined);

  const { data, loading: queryLoading } = useGetMyLoCsQuery({
    variables: {
      page: currentPage,
      sort: {
        field: sort.columnId,
        order: sort.sortDirection,
      },
    },
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  let totalData = data?.getLOCsMyTeamForm.total;

  const users = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.getLOCsMyTeamForm.data?.map(u => {
      let { listOfContributors, id } = u;

      return {
        rowId: id,
        status: listOfContributors?.status,
        ...listOfContributors?.user,
      };
    });
  }, [data]);

  let navigate = useNavigate();

  const newColumns = [
    {
      sortDirection: sort.columnId === 'projectDetails' ? sort.sortDirection : 'none',
      id: 'projectDetails',
      Header: 'PROJECT DETAILS',
      accessor: original => <span>{original.projectDetails || 'N/A'}</span>,
      className: 'common-table',
    },
    {
      id: 'status',
      accessor: original => {
        let styles: BtnProps = defaultStatusBtn;
        let onClick = () => {};

        if (original.status === LOCStatus.APPROVED) {
          styles = boldStatusBtn;
          onClick = () => navigate(RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER.replace(':userId', original.id.toString()));
        } else if (original.status === LOCStatus.SUBMITTED) {
          styles = openStatusBtn;
          onClick = () => navigate(RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER.replace(':userId', original.id.toString()));
        }

        return (
          <Button type="button" {...styles} onClick={onClick}>
            {original.status === LOCStatus.SUBMITTED ? 'Approve' : LOCStatusText[original.status]}
          </Button>
        );
      },
      className: 'common-table',
      disableSortBy: true,
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns: newColumns });

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
      loading={queryLoading}
      showPagination={totalData !== 0}
      hiddenColumns={['selection']}
      controlledPageIndex={data?.getLOCsMyTeamForm.page ? data.getLOCsMyTeamForm.page - 1 : undefined}
    />
  );
};

type BtnProps = {
  variant: 'link' | 'outline' | 'solid' | 'outlineSecondary' | undefined;
} & Omit<ButtonProps, 'type' | 'onClick'>;

const defaultStatusBtn: BtnProps = {
  variant: 'link',
  fontSize: '13px',
  cursor: 'not-allowed',
  minWidth: '100px',
};

const boldStatusBtn: BtnProps = {
  ...defaultStatusBtn,
  color: '#000',
  cursor: 'pointer',
};

const openStatusBtn: BtnProps = {
  ...defaultStatusBtn,
  variant: 'solid',
  color: '#fff',
  cursor: 'pointer',
};

export default ContributorsToApproveTable;
