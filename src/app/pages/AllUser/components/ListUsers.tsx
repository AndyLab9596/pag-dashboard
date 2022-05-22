import { Box, Button, HStack, Radio, useDisclosure } from '@chakra-ui/react';
import Loader from 'app/components/Loader/Loader';
import Modal from 'app/components/Modal';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import StaticModal from 'app/components/Modal/StaticModal';
import { tableActions } from 'app/components/Table/store/actions';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import ActionButton from 'app/components/ui/Button/ActionButton';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import type { FilterFormData } from 'app/components/ui/User/types';
import { ColumnOptions } from 'app/components/ui/User/types';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import {
  useDeleteUsersMutation,
  useExportDetailUsersExcelLazyQuery,
  useGetAllUsersWithDetailQuery,
  useInactiveUserMutation,
  User,
} from 'app/generated/graphql';
import { BodyContainer, PartItem, Title } from 'app/pages/Action/components/ActionModal';
import { RoutesPath } from 'app/routes/routesPath';
import { useSortServerSide } from 'common/useSortServerSide';
import { useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useFilters from '../hooks/useFilters';
import PromoteModal from './PromoteModal';

const listColumns: ColumnOptions[] = [
  { id: ListUsersColumnID.title, clickAble: true },
  { id: ListUsersColumnID.lastLogin },
  { id: ListUsersColumnID.email },
  { id: ListUsersColumnID.location },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.evaluator },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.evaluationType },
];

interface ListUsersProps {
  filter: FilterFormData;
}

enum ExportFileTypes {
  Excel = 'xlsx',
}

interface StateConditions {
  isException: boolean;
  isSelectAll: boolean;
  isSelectMulti: boolean;
}

export const ListUsers: React.FC<ListUsersProps> = props => {
  const toast = useToastStatus();
  const { filter } = props;
  const { filterVariables, setCurrentPage } = useFilters({ filter });
  const navigate = useNavigate();
  const { sort, onSort } = useSortServerSide(undefined, 'sort');
  const { data, loading, refetch } = useGetAllUsersWithDetailQuery({
    variables: {
      sort: {
        field: sort.columnId,
        order: sort.sortDirection,
      },
      ...filterVariables,
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

  const users = data?.getAllUsersWithDetail.data ?? [];
  const totalData = data?.getAllUsersWithDetail.total;
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const [deleteUsers, { loading: loadingDelete }] = useDeleteUsersMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const [userData, setUserData] = useState<User>();

  const [inactiveUser, { loading: loadingInactive }] = useInactiveUserMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const { isOpen: isOpenInactive, onOpen: onOpenInactive, onClose: onCloseInactive } = useDisclosure();

  const onClosePromote = () => {
    navigate(-1);
  };

  const { isOpen: isOpenExport, onOpen: onOpenExport, onClose: onCloseExport } = useDisclosure();
  const { isOpen: isOpenSuccess, onClose: onCloseSuccess, onOpen: onOpenSuccess } = useDisclosure();

  const [conditions, setConditions] = useState<StateConditions>({
    isException: false,
    isSelectAll: false,
    isSelectMulti: false,
  });
  const [typeExport, setTypeExport] = useState('');
  const isCheckSingle = userData && !conditions.isException && !conditions.isSelectAll && !conditions.isSelectMulti;

  const getFilterView = () => {
    return {
      departmentIds: filter.departments?.flatMap(item => item.value.split(',').map(Number)),
      evaluationTypeIds: filter.forms?.map(item => +item.value),
      evaluatorIds: filter.evaluators?.map(item => +item.value),
      locationIds: filter.locations?.map(item => +item.value),
      strategyIds: filter.strategies?.map(item => +item.value),
      name: filter.name,
      isActive: filter.status,
      titleIds: filter.titles?.map(item => +item.value),
    };
  };

  const getFiltersActions = () => {
    if (isCheckSingle) {
      return {
        userIds: [userData!.id],
        isSelectAll: false,
        ...getFilterView(),
      };
    }

    return {
      userIds: selectedRows.map(row => row.id),
      isSelectAll: conditions.isException || conditions.isSelectAll,
      ...getFilterView(),
    };
  };

  const [exportUsersExcel, { loading: loadingExportLink }] = useExportDetailUsersExcelLazyQuery({
    onCompleted: ({ exportDetailUsersExcel }) => {
      window.open(exportDetailUsersExcel.url);
      onOpenSuccess();
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const handleAction = ({ state, user, onOpen }: { state?: StateConditions; user?: User; onOpen?: () => void }) => {
    if (!state?.isException && !state?.isSelectAll && !state?.isSelectMulti) setUserData(user as User);
    setConditions(state as StateConditions);
    onOpen && onOpen();
  };

  const handleCheckBoxExport = event => {
    setTypeExport(event.target.value);
  };
  const handleSubmitExport = () => {
    if (typeExport === ExportFileTypes.Excel) {
      exportUsersExcel({
        variables: {
          filter: getFiltersActions(),
        },
      });
    }
  };

  const handleSubmitDelete = async () => {
    await deleteUsers({
      variables: {
        filter: getFiltersActions(),
      },
    });
    await refetch();
    onCloseDelete();
  };

  const handleSubmitInactive = async () => {
    await inactiveUser({
      variables: {
        filter: getFiltersActions(),
      },
    });
    await refetch();
    onCloseInactive();
  };

  const newColumns = [
    {
      id: ListUsersColumnID.action,
      Header: original => {
        return (
          <ActionButton
            disabled={!original?.state?.isSelectMulti}
            menu={[
              {
                label: 'Inactive',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    onOpen: onOpenInactive,
                  });
                  original.dispatch(tableActions.selectAll(false));
                },
              },
              {
                label: 'Delete',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    onOpen: onOpenDelete,
                  });
                  original.dispatch(tableActions.selectAll(false));
                },
              },
              {
                label: 'Export',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    onOpen: onOpenExport,
                  });
                },
              },
            ]}
          />
        );
      },
      sortable: false,
      Cell: original => {
        return (
          <ActionButton
            disabled={original?.state.isSelectMulti}
            menu={[
              {
                label: 'Inactive',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    user: original.row.original,
                    onOpen: onOpenInactive,
                  });
                  original.dispatch(tableActions.unSelectRow({ original: original.row.original }));
                },
              },
              {
                label: 'Promote',
                callback: () => {
                  navigate(RoutesPath.ALL_USERS_PROMOTE.replace(':userId', original?.row.original.id.toString()));
                },
              },
              {
                label: 'Delete',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    user: original.row.original,
                    onOpen: onOpenDelete,
                  });
                  original.dispatch(tableActions.unSelectRow({ original: original.row.original }));
                },
              },
              {
                label: 'Export',
                callback: () => {
                  handleAction({
                    state: {
                      isException: original.state.isException,
                      isSelectAll: original.state.isSelectAll,
                      isSelectMulti: original.state.isSelectMulti,
                    },
                    user: original.row.original,
                    onOpen: onOpenExport,
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns });

  const onSelectRows = useCallback(rows => {
    setSelectedRows(rows);
  }, []);

  const handlePageChange = (pageSize: number, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table
        onSort={onSort}
        onPageChange={handlePageChange}
        hideButtonEdit
        onSelectRows={onSelectRows}
        columns={columns}
        data={users}
        pageSize={25}
        totalData={totalData}
        loading={loading}
        controlledPageIndex={data?.getAllUsersWithDetail.page ? data?.getAllUsersWithDetail.page - 1 : undefined}
        showPagination={totalData !== 0}
      />
      <ModalConfirm
        isLoading={loadingDelete || loading}
        modalTitle="Delete User"
        confirmText="Confirm"
        modalBody={
          <p style={{ textAlign: 'center' }}> Are you sure you want to delete {isCheckSingle ? 'user' : 'users'}? </p>
        }
        onConfirm={() => handleSubmitDelete()}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
      <ModalConfirm
        isLoading={loadingInactive || loading}
        modalTitle="Inactive"
        confirmText="Inactive"
        modalBody={
          <p style={{ textAlign: 'center' }}>
            {' '}
            Are you sure you want to make {isCheckSingle ? 'user' : 'users'} inactive?{' '}
          </p>
        }
        onConfirm={() => handleSubmitInactive()}
        isOpen={isOpenInactive}
        onClose={onCloseInactive}
      />
      <Routes>
        <Route
          path={RoutesPath.ALL_USERS_PROMOTE}
          element={<PromoteModal refetch={refetch} onClose={onClosePromote} />}
        />
      </Routes>
      {/* Export Modal */}
      <Modal isOpen={isOpenExport} onClose={onCloseExport} padding="20px 40px" size="4xl">
        <Box>
          <Title>Export Selected Users</Title>
          <BodyContainer>
            <PartItem title="Format">
              <Radio colorScheme="blue" value="xlsx" onChange={handleCheckBoxExport}>
                xlsx
              </Radio>
            </PartItem>
            <Loader isLoading={loadingExportLink} />
          </BodyContainer>
          <HStack my="1rem" justifyContent="flex-end" spacing="1rem">
            <Button variant="outline" w="140px" onClick={onCloseExport}>
              Cancel
            </Button>
            <Button
              variant="solid"
              w="140px"
              isDisabled={typeExport === '' || loadingExportLink}
              onClick={handleSubmitExport}
            >
              Submit
            </Button>
          </HStack>
        </Box>
      </Modal>
      {/* When exporting success then open a success modal */}
      <StaticModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        config={{
          body: 'Completed',
          buttonTitle: 'Close',
        }}
        onSubmit={() => {
          onCloseSuccess();
          onCloseExport();
        }}
      />
    </>
  );
};
