import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import ModalConfirm from 'app/components/Modal/ModalConfirm';
import Table from 'app/components/Table/Table';
import useToastStatus from 'app/components/Toast/useToastHook';
import Button from 'app/components/ui/Button/Button';
import Export from 'app/components/ui/ExportImport/ExportBtn';
import Import from 'app/components/ui/ExportImport/ImportBtn';
import SendReminderRouter from 'app/components/ui/Reminder/components/SendReminderRouter';
import FilterUser from 'app/components/ui/User/components/FiltersUser';
import type { FilterFormData } from 'app/components/ui/User/types';
import { ListSelectFilter } from 'app/components/ui/User/types/ListSelectFilter.enum';
import ProfileModalRouter from 'app/components/ui/UserModal/ProfileModalRouter';
import { useExportAllUsersLazyQuery } from 'app/generated/graphql';
import usersService from 'app/services/UsersService';
import { useDebounce } from 'common/useDebounce';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ListUsers } from './components/ListUsers';
import config from 'config';
import { useAuthState } from 'app/components/Auth/useAuthState';
import { UserRole } from 'app/components/Auth/useRole';
import { RoutesPath } from 'app/routes/routesPath';

enum ListMissingFieldsColumnID {
  id = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  startDate = 'startDate',
  strategy = 'strategy',
  department = 'department',
  title = 'name',
  evaluator = 'evaluator',
  location = 'location',
  email = 'email',
  formType = 'formType',
  inactive = 'inactive',
  promoted = 'promoted',
  error = 'error',
}

const filterOptions = [
  ListSelectFilter.title,
  ListSelectFilter.location,
  ListSelectFilter.department,
  ListSelectFilter.evaluator,
  ListSelectFilter.strategy,
  ListSelectFilter.form,
  ListSelectFilter.status,
];

export function AllUserPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { identity } = useAuthState();
  const isSuperAdminRole = identity && identity.roles.filter(r => r.id === UserRole.SUPER_ADMIN).length > 0;
  const [filter, setFilter] = useState<FilterFormData>({});
  const debouncedFilter = useDebounce(filter, 250);
  const toast = useToastStatus();
  const [error, setError] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [getExportAll] = useExportAllUsersLazyQuery({
    onCompleted: ({ exportAllUsers }) => {
      window.open(exportAllUsers.url);
    },
    onError: error => {
      toast({ status: 'error', title: error.message });
    },
  });
  const columns = [
    {
      id: ListMissingFieldsColumnID.id,
      Header: 'ID',
      accessor: 'id',
      width: 35,
    },
    {
      id: ListMissingFieldsColumnID.firstName,
      Header: 'FIRST NAME',
      accessor: original => {
        return (
          <div>
            {original.error.includes('First Name') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.firstName} </span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.lastName,
      Header: 'LAST NAME',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Last Name') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.lastName} </span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.startDate,
      Header: 'START DATE',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Start Date') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.startDate && dayjs(original.startDate).format(config.DATE_FORMAT)}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.strategy,
      Header: 'STRATEGY',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Strategy') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.strategy}</span>
          </div>
        );
      },
    },
    {
      id: ListMissingFieldsColumnID.department,
      Header: 'DEPARTMENT',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Department') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.department}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.title,
      Header: 'TITLE',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Title') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.title}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.evaluator,
      Header: 'EVALUATOR',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Evaluator') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.evaluator}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.location,
      Header: 'LOCATION',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Location') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.location}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.email,
      Header: 'EMAIL',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Email') ? <CloseIcon color="red.500" /> : <CheckIcon color="green.500" />}
            <span className="pl-5">{original.email}</span>
          </div>
        );
      },
      width: 200,
    },
    {
      id: ListMissingFieldsColumnID.formType,
      Header: 'FROM TYPE',
      accessor: original => {
        return (
          <div>
            {original.error.includes('Evaluation Type') ? (
              <CloseIcon color="red.500" />
            ) : (
              <CheckIcon color="green.500" />
            )}
            <span className="pl-5">{original.fromType}</span>
          </div>
        );
      },
      width: 100,
    },
    {
      id: ListMissingFieldsColumnID.inactive,
      Header: 'INACTIVE',
      accessor: 'isInactive',
      width: 75,
    },
    {
      id: ListMissingFieldsColumnID.promoted,
      Header: 'PROMOTED',
      accessor: 'promoted',
      width: 75,
    },
    {
      id: ListMissingFieldsColumnID.error,
      Header: 'ERROR',
      accessor: original => {
        const error = original.error;
        return <div>{error && typeof error === 'string' && <span>{error}</span>}</div>;
      },
      width: 75,
    },
  ];

  return (
    <LayoutRightSide>
      <Button
        onClick={() => {
          navigate(RoutesPath.ADD_USER, { state: { background: location } });
        }}
      >
        Add User
      </Button>
      <FilterUser
        value={filter}
        onChange={setFilter}
        filterOptions={filterOptions}
        localStorageName={`allUser/filter/${identity?.id}`}
      />
      {isSuperAdminRole && (
        <div className="flex gap-10 justify-end">
          <Export
            title="Exported Users"
            onDownload={onClose => {
              // Can i do this loading ? cause i cant do as same as old page
              toast({ status: 'info', title: 'Please wait a moment ...' });
              getExportAll();
              onClose();
            }}
          />
          <Import
            onImport={async (file, setLoading, setSuccess) => {
              try {
                setLoading(true);
                const res = await usersService.import(file);
                setLoading(false);
                const results = res.data.result;
                if (
                  results.some(
                    result => !!result.error && (result.error.length !== 0 || typeof result.error === 'string'),
                  )
                ) {
                  const data = results
                    .filter(result => result.status === false)
                    .map(result => {
                      let user = result.user;
                      user.error = result.error;
                      return user;
                    });
                  setSuccess(false);
                  setDataList(data);
                  setError(true);
                } else {
                  setSuccess(true);
                }
              } catch (error: any) {
                toast({ status: 'error', title: error.message });
              }
            }}
          />
        </div>
      )}

      <ModalConfirm
        onConfirm={() => {
          setError(false);
        }}
        isOpen={error}
        onClose={() => {
          setError(false);
        }}
        modalTitle="Missing Fields"
        size="6xl"
        confirmText="Close"
        hideCancelButton={true}
        modalBody={
          <div className="grid gap-15 items-center">
            <div className="overflow-auto">
              <Table
                showCheckboxRows={false}
                showPagination={false}
                columns={columns}
                data={dataList ?? []}
                onPageChange={(_pageSize: number, _page: number) => {}}
                pageSize={dataList.length}
                hideButtonEdit={true}
              />
            </div>
            <div className="text-13 text-center">
              There is a number of missing fields, please complete the Excel file and import it again or complete the
              users in the system directly.
            </div>
          </div>
        }
      />

      <ListUsers filter={debouncedFilter} />
      <SendReminderRouter />
      <ProfileModalRouter />
    </LayoutRightSide>
  );
}
