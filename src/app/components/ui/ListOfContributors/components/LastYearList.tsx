import { Box, Divider, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import ModalLayout from 'app/components/Modal';
import Table from 'app/components/Table/Table';
import Button from 'app/components/ui/Button/Button';
import { Form } from 'app/components/ui/Form';
import { InputField } from 'app/components/ui/Form/InputField';
import { Label } from 'app/components/ui/Form/Label';
import useColumns from 'app/components/ui/User/hooks/useColumns';
import { ListUsersColumnID } from 'app/components/ui/User/types/ListUsersColumnID.enum';
import { CreateContributorInput, useGetLastYearContributorsQuery } from 'app/generated/graphql';
import useSelectRows from 'common/useSelectRows';
import { useSortServerSide } from 'common/useSortServerSide';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { LastYearSelectedUser } from '../types';

const listColumns = [
  { id: ListUsersColumnID.title, header: 'CONTRIBUTOR', clickAble: false },
  { id: ListUsersColumnID.strategy },
  { id: ListUsersColumnID.department },
  { id: ListUsersColumnID.location },
];

const validationSchema = yup.object().when((values, schema) => {
  let shape = {};

  Object.keys(values).forEach(key => {
    shape = Object.assign(shape, {
      [key]: yup
        .mixed()
        .required()
        .test(
          '3 words',
          '3 words required for submission',
          values => values && (values as string).split(' ').length >= 3,
        ),
    });
  });

  return schema.shape(shape);
});

interface Props {
  userId?: number | null;
  toggleLastYearList?: () => void;
  onAddContributorLastYear?: (values: CreateContributorInput[]) => void;
  addLoading?: boolean;
}

const LastYearList: React.FC<Props> = ({ userId, toggleLastYearList, onAddContributorLastYear, addLoading }) => {
  const {
    data,
    loading: queryLoading,
    refetch,
  } = useGetLastYearContributorsQuery({
    variables: {
      page: 1,
      userId: userId ?? 0,
    },
    skip: userId === null,
  });

  const users = useMemo(
    () =>
      data?.getLastYearContributors.data?.map(u => {
        let { user, ...rest } = u;

        return {
          ...rest,
          ...user,
        };
      }),
    [data],
  );

  const totalData = data?.getLastYearContributors.total ?? 1;
  const { sort, onSort } = useSortServerSide(refetch);
  const [selectedUsers, setSelectedUsers] = useState<LastYearSelectedUser[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedRows, onSelectedRowsChange, isSelectAll } = useSelectRows<any>();

  const newColumns = [
    {
      sortDirection: sort.columnId === 'projectDetails' ? sort.sortDirection : 'none',
      id: 'projectDetails',
      Header: 'PROJECT DETAILS',
      accessor: original => <span>{original.projectDetails || 'N/A'}</span>,
      className: 'common-table',
    },
  ];

  const columns = useColumns({ sort, listColumns, newColumns: newColumns });

  const handlePageChange = useCallback((pageSize: number, page: number) => {
    refetch({
      page,
    });
  }, []);

  useEffect(() => {
    if (!isSelectAll) {
      let rowUsers: LastYearSelectedUser[] = selectedRows.map(row => ({
        id: row.id,
        name: `${row.firstName} ${row.lastName}`,
      }));
      setSelectedUsers(rowUsers);
    } else {
      if (!!users) {
        let rowUsers: LastYearSelectedUser[] = users.map(row => ({
          id: row.id,
          name: `${row.firstName} ${row.lastName}`,
        }));
        setSelectedUsers(rowUsers);
      }
    }
  }, [selectedRows, isSelectAll]);

  const onSubmit = values => {
    if (userId === null) return;

    let data = Object.keys(values).map(key => ({
      projectDetails: values[key],
      contributorId: +key,
    })) as CreateContributorInput[];
    onAddContributorLastYear && onAddContributorLastYear(data);

    onClose();
    toggleLastYearList && toggleLastYearList();
  };

  return (
    <>
      <Table
        onSort={onSort}
        onPageChange={handlePageChange}
        onSelectedRowsChange={onSelectedRowsChange}
        hideButtonEdit
        columns={columns}
        data={users}
        pageSize={25}
        totalData={totalData}
        loading={queryLoading}
        showPagination={false}
      />
      <HStack justifyContent="flex-end" px="30px" pb="30px" spacing="24px">
        <Button
          variant="outline"
          color="#000"
          border="1px solid #d8dce6"
          boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
          fontSize="13px"
          fontWeight="500"
          w="120px"
          onClick={toggleLastYearList}
        >
          Back
        </Button>
        <Button fontSize="13px" fontWeight="500" onClick={onOpen} disabled={selectedUsers.length === 0}>
          Add to This Year's List
        </Button>
      </HStack>

      <ModalLayout isOpen={isOpen} onClose={onClose} width="50%" maxW="none">
        <Form validationSchema={validationSchema} onSubmit={onSubmit} className="w-full">
          <VStack py="1.5rem" px="1.5rem">
            <Box as="p" color="secondary" fontSize="23px">
              Add to This Year's List
            </Box>
            <Divider
              sx={{
                my: '1.5rem !important',
              }}
              color="#d8e5ee"
            />
            <Box as="p" color="secondary" fontSize="15px" fontWeight="500">
              Are you sure you want to add the user(s) to this year’s list?
            </Box>
            <Divider
              sx={{
                my: '1.5rem !important',
              }}
              color="#d8e5ee"
            />
            {selectedUsers.map(user => (
              <HStack key={user.id + user.name} my="24px" w="full" alignItems="center">
                <Label label={`${user.name}: `} w="30%" textAlign="right" mr="32px" />
                <Box w="full" maxW="50%">
                  <InputField name={`${user.id}`} flex={1} height="100%" />
                </Box>
              </HStack>
            ))}
            <Divider
              sx={{
                my: '1.5rem !important',
              }}
              color="#d8e5ee"
            />
            <HStack>
              <Button
                variant="outline"
                color="#000"
                border="1px solid #d8dce6"
                boxShadow="0 1px 2px 0 rgba(0,0,0,0.08)"
                fontSize="13px"
                px="2rem"
                fontWeight="500"
                w="120px"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" fontSize="13px" fontWeight="500" px="2rem" w="120px" isLoading={addLoading}>
                Yes
              </Button>
            </HStack>
          </VStack>
        </Form>
      </ModalLayout>
    </>
  );
};

export default LastYearList;
