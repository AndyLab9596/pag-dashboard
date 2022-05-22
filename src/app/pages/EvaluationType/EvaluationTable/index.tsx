import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Input, InputGroup, InputRightElement, useDisclosure } from '@chakra-ui/react';
import { BoxArrowIcon, PrintIcon } from 'app/components/Icons';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import Table from 'app/components/Table/Table';
import TitlePage from 'app/components/TitlePage/TitlePage';
import useToastStatus from 'app/components/Toast/useToastHook';
import { useDeleteEvaluationTypeMutation, useGetAllDetailEvaluationTypesQuery } from 'app/generated/graphql';
import { RoutesPath } from 'app/routes/routesPath';
import useSelectRows from 'common/useSelectRows';
import config from 'config';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVALUATIONS_TYPE_ALL, EVALUATIONS_TYPE_PAGE_SIZE } from './types';
export const EvaluationTypeTable = () => {
  const toast = useToastStatus();

  const { data, loading, refetch } = useGetAllDetailEvaluationTypesQuery({
    variables: {
      page: 1,
      pageSize: EVALUATIONS_TYPE_ALL,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const navigate = useNavigate();

  const { selectedRows, onSelectedRowsChange } = useSelectRows<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        id: 'name',
        Header: 'FORM TYPE',
        accessor: 'name',
      },
      {
        id: 'createdAt',
        Header: 'CREATE',
        accessor: createdAt => {
          return dayjs(createdAt.createdAt).format(config.DATE_FORMAT);
        },
      },
    ],
    [],
  );

  let totalData = data?.getAllDetailEvaluationTypes.total ?? 0;
  const formType = data?.getAllDetailEvaluationTypes.data ?? [];

  const [deleteEvaluationType, { loading: loadingDelete }] = useDeleteEvaluationTypeMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });

  const handleDeleteForm = (args: { rows: any; isSelectAll: boolean }) => {
    onOpen();
  };

  const onModalConfirm = () => {
    deleteEvaluationType({
      variables: {
        ids: selectedRows.map(r => r.id),
      },
    })
      .then(() => {
        refetch();
        toast({ status: 'success', title: 'Delete successfully!' });
        onClose();
      })
      .catch(() => {
        toast({ status: 'error', title: 'Failed to delete form!' });
        onClose();
      });
  };

  const handlePageChange = (pageSize: number, page: number) => {};

  const debouncedSearchForm = debounce((keyword: string) => {
    refetch({
      page: 1,
      pageSize: EVALUATIONS_TYPE_ALL,
      keyword,
    });
  }, 300);

  return (
    <LayoutRightSide>
      <TitlePage>Form Types</TitlePage>
      <div className="flex justify-between">
        <div>
          <Button onClick={() => navigate(RoutesPath.EVALUATION_TYPE_ADD)}> Create New </Button>
        </div>
        <div className="flex gap-10">
          <Button variant="outline">
            <PrintIcon />
          </Button>
          <Button variant="outline">
            <BoxArrowIcon />
          </Button>
        </div>
      </div>
      <Box
        border="1px solid #a8c6df"
        borderRadius="4px"
        p="20px"
        display="flex"
        flexDirection="column"
        gridRowGap="10px"
      >
        <InputGroup w="360px">
          <Input
            onChange={e => debouncedSearchForm(e.currentTarget.value)}
            placeholder="Search by keywords"
            fontSize="12px"
          />
          <InputRightElement children={<SearchIcon color="gray.300" />} />
        </InputGroup>
        <Table
          onPageChange={handlePageChange}
          onSelectedRowsChange={onSelectedRowsChange}
          columns={columns}
          data={formType}
          pageSize={EVALUATIONS_TYPE_PAGE_SIZE}
          editButtonCallback={row => navigate(RoutesPath.EVALUATION_TYPE_EDIT.replace(':id', row.original.id))} //history.push(`${pathname}/edit/${row.original.id}`)
          onDeleteMulti={handleDeleteForm}
          loading={loading}
          totalData={totalData}
          manualPagination={false}
          manualSortBy={false}
        />
      </Box>
      <ModalConfirm
        onConfirm={onModalConfirm}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        modalTitle="Are you sure you want to delete?"
        confirmText="Yes"
        isLoading={loadingDelete}
      />
    </LayoutRightSide>
  );
};
