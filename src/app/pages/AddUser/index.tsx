import { useState } from 'react';
import { ModalHeader } from '@chakra-ui/modal';
import { Text, Flex, useDisclosure, Grid, Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Location } from 'history';

import ModalLayout from 'app/components/Modal';
import { Form } from 'app/components/ui/Form';
import {
  UserDetailTop,
  UserDetailBottom,
  defaultPropCheckbox as defaultCheckboxStyles,
} from 'app/components/ui/UserModal/ProfileTab';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import {
  useGetAllLocationsQuery,
  useGetAllRolesQuery,
  useGetAllUsersQuery,
  useAddNewUserMutation,
} from 'app/generated/graphql';
import { uploadNewAvatar } from 'app/services/avatarUploadApi';
import useToastStatus from 'app/components/Toast/useToastHook';
import { FormValues } from './types';
import { getSelectedValue, mappingValueFromArray } from 'app/components/ui/UserModal/utils';

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().min(2, 'Too Short!').required('First name is required !'),
  lastName: yup.string().trim().min(2, 'Too Short!').required('Last name is required !'),
  email: yup.string().email().trim().required('Email is required !'),
  evaluator: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  department: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  startDate: yup.string(),

  location: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  title: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  strategy: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  pastTitle: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(),
  formType: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .typeError('Required'),
  departmentHead: yup.boolean(),
  cityAdmin: yup.boolean(),
  countryAdmin: yup.boolean(),
  specialAdmin: yup.boolean(),
  superAdmin: yup.boolean(),
  lockSystem: yup.boolean(),
  active: yup.boolean(),

  limitedViewUser: yup.mixed(),
  extraViewUser: yup.mixed(),

  showPreviousComment: yup.mixed(),
  countryAdminCode: yup.array(),
  city: yup.array(),
});

const comment = [
  { value: '0', label: 'Inherit' },
  { value: '1', label: 'Hide' },
  { value: '2', label: 'Show' },
];

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  //previous comment
  showPreviousComment: comment[0],
  //option select
  evaluator: null,
  department: null,
  startDate: new Date(),
  location: null,
  title: null,
  strategy: null,
  pastTitle: null,
  formType: null,
  //others admin
  specialAdmin: false,
  superAdmin: false,
  departmentHead: false,
  //country admin
  countryAdmin: false,
  countryAdminCode: undefined,
  //city admin
  cityAdmin: false,
  city: undefined,
  //active&lock
  lockSystem: true,
  active: true,
  //user related
  limitedViewUser: [],
  extraViewUser: [],
};

interface AddUserPageProps {
  isOpenProp?: boolean;
}

export const AddUserPage = props => {
  const { isOpenProp = true } = props as AddUserPageProps;
  //#region Query
  const { data: locations } = useGetAllLocationsQuery();
  const { data: users } = useGetAllUsersQuery();
  const { data: allRoles } = useGetAllRolesQuery();
  const [addNewUser, { client }] = useAddNewUserMutation({
    onCompleted: async data => {
      await client.clearStore();
      toast({ title: 'Add new user successfully !', status: 'success' });
      onCloseModalAndReload();
    },
    onError: error => {
      toast({ title: 'Error', status: 'error', description: error.message });
    },
  });
  //#endregion Query

  const { isOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
  });

  //#region State
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  //#endregion State

  const toast = useToastStatus();
  let navigate = useNavigate();
  let { state } = useLocation();
  // let location = useLocation<{
  //   background?: Location;
  // }>();

  const onCloseModal = () => {
    onClose();
    navigate(-1);
  };

  const onCloseModalAndReload = () => {
    onClose();
    const background = (state as { background?: Location } | undefined)?.background;
    let prevPath = background?.pathname ?? null;
    let prevSearch = background?.search ?? '';

    if (!prevPath) {
      navigate(-1);
      return;
    }
    window.location.href = window.location.origin + prevPath + prevSearch.toString();
  };

  const onUploadAvatar = async (formData: FormData) => {
    try {
      const response = await uploadNewAvatar(formData);
      setImage(response.data.url as string);
    } catch (error) {
      toast({ status: 'error', title: 'Upload Image Fail!', description: 'Please try again later.' });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    if (
      !values.strategy ||
      !values.formType ||
      !values.evaluator ||
      !values.department ||
      !values.location ||
      !values.title
    )
      return;
    let listOfRolesId: number[] = [];

    const userRolesId = (target: string) => {
      allRoles?.getAllRoles.forEach(item => {
        if (item.name === target) {
          listOfRolesId.push(item.id);
        }
      });
    };
    const clearUserRolesFieldByTarget = (target: 'city' | 'country' | 'both') => {
      const removeCity = () => {
        values['cityAdmin'] = false;
        values['city'] = [];
      };
      const removeCountry = () => {
        values['countryAdmin'] = false;
        values['countryAdminCode'] = [];
      };
      const removeBothCityCountry = () => {
        removeCity();
        removeCountry();
      };
      switch (target) {
        case 'city':
          removeCity();
          break;
        case 'country':
          removeCountry();
          break;
        case 'both':
          removeBothCityCountry();
          break;
      }
    };

    //handle data logic
    // if cityAdmin == true, delete countryAdmin & countryAdminCode and vice versa.
    // This is to fulfill the roles requirements (only 1 role is allowed to update and finally delete the rest, except for department head)
    if (values.specialAdmin) {
      userRolesId('Special Admin');
      clearUserRolesFieldByTarget('both');
    }
    if (values.superAdmin) {
      userRolesId('Super Admin');
      clearUserRolesFieldByTarget('both');
    }
    if (values.cityAdmin) {
      userRolesId('City Admin');
      clearUserRolesFieldByTarget('country');
    }
    if (values.countryAdmin) {
      userRolesId('Country Admin');
      clearUserRolesFieldByTarget('city');
    }
    if (!values.departmentHead) {
      values['extraViewUser'] = [];
      values['limitedViewUser'] = [];
    } else {
      userRolesId('Department Head');
    }

    const finalData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      image: image ?? '',
      isInactive: !values.active,
      isLockedSystem: values.lockSystem,

      permissionsExtraUsersId: mappingValueFromArray(values.extraViewUser),
      permissionsLimitedUsersId: mappingValueFromArray(values.limitedViewUser),

      roleCountryCode: '1',
      roleLocationId: 1,

      userAdminCountriesCode: values.countryAdminCode?.map(item => `${item.value}`) ?? [],
      userAdminLocationsId: mappingValueFromArray(values.city),

      showPreviousComment: values.showPreviousComment
        ? Number(getSelectedValue(values.showPreviousComment))
        : undefined,
      startDate: new Date(values.startDate),

      strategyId: Number(getSelectedValue(values.strategy)),
      evaluationTypeId: Number(getSelectedValue(values.formType)),
      evaluatorId: Number(getSelectedValue(values.evaluator)),
      departmentId: Number(getSelectedValue(values.department)),
      locationId: Number(getSelectedValue(values.location)),
      titleId: Number(getSelectedValue(values.title)),
      previousTitleId: values.pastTitle ? Number(getSelectedValue(values.pastTitle)) : undefined,
      updatedUserRoles: listOfRolesId,
    };
    await addNewUser({ variables: { data: finalData } });
    setIsSubmitting(false);
  };

  const locationList = locations?.getAllLocations || [];
  const userList = users?.getAllUsers || [];

  return (
    <ModalLayout isOpen={isOpen} onClose={onCloseModal} size={'4xl'} isCentered={false}>
      <>
        <ModalHeader color="black">
          <Flex direction="row" alignItems="center">
            <Text textTransform="capitalize" fontSize="lg" fontWeight="500">
              User Management
            </Text>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={3} my={5}>
            <Button fontSize={'md'} width="full" textTransform="capitalize" backgroundColor={'#0067ac'}>
              Profile
            </Button>
          </Grid>
        </ModalHeader>
        <Form onSubmit={onSubmit} validationSchema={validationSchema} defaultValues={defaultValues}>
          <ModalBody color="black">
            <UserDetailTop locationList={locationList} evaluatorList={userList} />
            <UserDetailBottom
              locationList={locationList}
              image={image}
              userList={userList}
              editMode={false}
              onUpload={onUploadAvatar}
            />

            <Flex
              className="absolute top-0 right-0"
              mt={'1rem'}
              mr={'1.5rem'}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <CheckBoxField {...defaultCheckboxStyles} ml={2} name="active">
                Active
              </CheckBoxField>
            </Flex>
          </ModalBody>
          <ModalFooter mt={5}>
            <Button type="submit" textTransform="capitalize" isLoading={isSubmitting}>
              save change
            </Button>
          </ModalFooter>
        </Form>
      </>
    </ModalLayout>
  );
};

export default AddUserPage;
