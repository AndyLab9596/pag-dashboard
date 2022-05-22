import { Box, Button, Flex, Grid, GridItem, ModalBody, ModalFooter, Text, VStack } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useAuthState } from 'app/components/Auth/useAuthState';
import { UserRole } from 'app/components/Auth/useRole';
import useToastStatus from 'app/components/Toast/useToastHook';
import {
  useGetAllDepartmentsLazyQuery,
  useGetAllEvaluationTypesLazyQuery,
  useGetAllLocationsQuery,
  useGetAllRolesQuery,
  useGetAllStrategiesLazyQuery,
  useGetAllTitlesLazyQuery,
  useGetAllUsersLazyQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from 'app/generated/graphql';
import { uploadAvatarClient } from 'app/services/avatarUploadApi';
import { useUserPermissions } from 'common/useUserPermissions';
import { uniqBy } from 'lodash';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import getImageUrl from 'utils/getImageUrl';
import * as yup from 'yup';
import { Form, SelectField } from '../Form';
import { CheckBoxField } from '../Form/CheckBoxField';
import { DatePickerField } from '../Form/DatePickerField';
import FormInput from '../Form/Input';
import Spinner from '../Spinner';
import EditAvatarBox from './EditAvatarBox';
import { SelectInputField } from './SelectOption';
import { getSelectedValue, mappingValueFromArray, mapSelectOption, mapSelectOptionList } from './utils';

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().min(2, 'Too Short!').required('First name is required !'),
  lastName: yup.string().trim().min(2, 'Too Short!').required('Last name is required !'),
  email: yup.string().email().trim().required('Email is required !'),
  evaluator: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Required'),
  department: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Required'),
  startDate: yup.string(),

  location: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Required'),
  title: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Required'),
  strategy: yup
    .object({
      label: yup.string(),
      value: yup.string(),
    })
    .required('Required'),
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
    .required('Required'),
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

interface ProfileTabProps {
  userId: string;
  onUpdateSuccess?: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userId, onUpdateSuccess }) => {
  const { isSpecialAdmin, isSuperAdmin } = useUserPermissions();
  const { identity, updateAuthState } = useAuthState();
  //apollo query
  const toast = useToastStatus();
  const { data: locationArray } = useGetAllLocationsQuery();
  const [getAllUsers, { data: allUser }] = useGetAllUsersLazyQuery();
  const { refetch: getAllRoles } = useGetAllRolesQuery({
    skip: true,
  });
  const [updateUser, { loading: updateLoading }] = useUpdateUserProfileMutation({
    onCompleted: async data => {
      toast({ title: 'Update success!', status: 'success', description: 'Update user success!' });
      onUpdateSuccess?.();
      if (identity?.id === data.updateUserProfile.id) {
        await updateAuthState();
      }
    },
    onError: error => {
      toast({ title: 'Fail to update!', status: 'error', description: 'Cannot update, please try again!' });
    },
  });
  const [image, setImage] = React.useState<undefined | any>(undefined);
  const [defaultValues, setDefaultValues] = React.useState<any>();
  const { loading } = useGetUserProfileQuery({
    variables: {
      userId: Number(userId),
    },
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
    onCompleted: ({ getUserProfile: d }) => {
      getAllUsers();
      const roles = d.roles?.map(item => item.id) ?? [];

      const countryAdminCode = d?.userAdminCountry?.map(code => {
        const countryCodeObj = {
          label: '',
          value: '',
        };
        countryCodeObj.label = code.countryCode;
        countryCodeObj.value = code.countryCode;

        return countryCodeObj;
      });

      setDefaultValues({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        //previous comment
        showPreviousComment: comment[d.showPreviousComment as number] || [],
        //option select
        evaluator: mapSelectOption(d.evaluator),
        department: mapSelectOption(d.department),
        startDate: new Date(d.startDate),
        // location: mapSelectOption(d.location),
        location: mapSelectOption(d.location),
        title: mapSelectOption(d.title),
        strategy: mapSelectOption(d.strategy),
        pastTitle: mapSelectOption(d.previousTitle),
        formType: mapSelectOption(d.evaluationType),
        //others admin
        specialAdmin: roles.includes(UserRole.SPECIAL_ADMIN),
        superAdmin: roles.includes(UserRole.SUPER_ADMIN),
        departmentHead: roles.includes(UserRole.DEPT_HEAD),
        //country admin
        countryAdmin: roles.includes(UserRole.COUNTRY_ADMIN),
        countryAdminCode: countryAdminCode,
        //city admin
        cityAdmin: roles.includes(UserRole.CITY_ADMIN),
        city: d.userAdminLocation.map(({ location }) => ({ label: location.name, value: location.id })),
        //active&lock
        lockSystem: d.isLockedSystem,
        active: !d.isInactive,
        //user related
        limitedViewUser: d.permissionsLimitedUsers?.map(({ limited }) => ({ value: limited.id, label: limited.name })),
        extraViewUser: d.permissionsExtraUsers?.map(({ extra }) => ({ value: extra.id, label: extra.name })),
      });
      //set user avatar
      setImage(d.image);
    },
  });
  ///func to handle events
  const onUpdateUserProfile = async val => {
    const copyFromVal = val;
    let listOfRolesId: number[] = [];

    //local function to handle data
    const allRoles = await getAllRoles({});
    const allUserRoles = allRoles.data.getAllRoles || [];
    const userRolesId = (target: string) => {
      allUserRoles.forEach(item => {
        if (item.name === target) {
          listOfRolesId.push(item.id);
        }
      });
    };
    const clearUserRolesFieldByTarget = (target: 'city' | 'country' | 'both') => {
      const removeCity = () => {
        copyFromVal['cityAdmin'] = false;
        copyFromVal['city'] = [];
      };
      const removeCountry = () => {
        copyFromVal['countryAdmin'] = false;
        copyFromVal['countryAdminCode'] = [];
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
    if (copyFromVal.specialAdmin) {
      userRolesId('Special Admin');
      clearUserRolesFieldByTarget('both');
    }
    if (copyFromVal.superAdmin) {
      userRolesId('Super Admin');
      clearUserRolesFieldByTarget('both');
    }
    if (copyFromVal.cityAdmin) {
      userRolesId('City Admin');
      clearUserRolesFieldByTarget('country');
    }
    if (copyFromVal.countryAdmin) {
      userRolesId('Country Admin');
      clearUserRolesFieldByTarget('city');
    }
    if (copyFromVal.departmentHead) {
      userRolesId('Department Head');
    } else {
      if (!copyFromVal.countryAdmin && !copyFromVal.specialAdmin) {
        copyFromVal['extraViewUser'] = [];
        copyFromVal['limitedViewUser'] = [];
      }
    }
    const finalData = {
      firstName: copyFromVal.firstName,
      lastName: copyFromVal.lastName,
      email: copyFromVal.email,
      image: image,
      isInactive: !copyFromVal.active,
      isLockedSystem: copyFromVal.lockSystem,

      permissionsExtraUsersId: mappingValueFromArray(copyFromVal.extraViewUser),
      permissionsLimitedUsersId: mappingValueFromArray(copyFromVal.limitedViewUser),

      // roleCountryCode: '1',
      // roleLocationId: 1,
      userAdminCountriesCode: copyFromVal.countryAdminCode.map(item => item.value),
      userAdminLocationsId: copyFromVal.city.map(item => Number(item.value)),

      showPreviousComment: copyFromVal.showPreviousComment.value ? Number(copyFromVal.showPreviousComment.value) : 0,
      startDate: new Date(copyFromVal.startDate),

      strategyId: Number(getSelectedValue(copyFromVal.strategy)),
      evaluationTypeId: Number(getSelectedValue(copyFromVal.formType)),
      evaluatorId: Number(getSelectedValue(copyFromVal.evaluator)),
      departmentId: Number(getSelectedValue(copyFromVal.department)),
      locationId: Number(getSelectedValue(copyFromVal.location)),
      titleId: Number(getSelectedValue(copyFromVal.title)),
      previousTitleId: Number(copyFromVal.pastTitle ? getSelectedValue(copyFromVal.pastTitle) : 1),
      updatedUserRoles: listOfRolesId,
    };
    try {
      await updateUser({
        variables: {
          id: Number(userId),
          data: finalData,
        },
      });
    } catch (error) {}
  };

  const onUpload = async (formData: FormData) => {
    try {
      const response = await uploadAvatarClient(formData, Number(userId));
      if (response.status === 200 || response.status === 201) {
        setImage(response.data.url);
        toast({ status: 'success', title: 'Success!', description: 'Upload image success.' });
      }
    } catch (error) {
      toast({ status: 'error', title: 'Upload Image Fail!', description: 'Please try again later.' });
    }
  };

  if (loading) {
    return (
      <div className="w-full mt-6 text-center pb-30">
        <Spinner />
      </div>
    );
  }

  const locations = locationArray?.getAllLocations || [];
  const userList = allUser?.getAllUsers || [];
  const evaluatorList = userList ? userList.filter(user => user.id !== Number(userId)) : [];
  return (
    <>
      <Form onSubmit={onUpdateUserProfile} validationSchema={validationSchema} defaultValues={defaultValues}>
        <ModalBody color="black">
          <UserDetailTop locationList={locations} evaluatorList={evaluatorList} />
          <UserDetailBottom locationList={locations} image={image} userList={userList} onUpload={onUpload} />

          <Flex
            className="absolute top-0 right-0"
            mt={'2.25rem'}
            mr={'2.75rem'}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            {(isSuperAdmin || isSpecialAdmin) && (
              <CheckBoxField {...defaultPropCheckbox} name="lockSystem">
                Lock System
              </CheckBoxField>
            )}

            <CheckBoxField {...defaultPropCheckbox} ml={2} name="active">
              Active
            </CheckBoxField>
          </Flex>
        </ModalBody>
        <ModalFooter mt={5}>
          <Button type="submit" textTransform="capitalize" isLoading={updateLoading}>
            save change
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
};

export const UserDetailTop = ({ locationList, evaluatorList }) => {
  const { watch } = useFormContext();
  const [getAllEvaluationTypes, { data: evalType, loading: isLoadingGetEvaluationTypes }] =
    useGetAllEvaluationTypesLazyQuery();
  const [getAllStrategies, { data: strategy, loading: isLoadingGetStrategies }] = useGetAllStrategiesLazyQuery();
  const [getAllDepartments, { data: department, loading: isLoadingGetDepartments }] = useGetAllDepartmentsLazyQuery();
  const [getAllTitles, { data: title, loading: isLoadingGetTitles }] = useGetAllTitlesLazyQuery();
  const evaluationTypes = evalType?.getAllEvaluationTypes || [];
  const strategies = strategy?.getAllStrategies || [];
  const departments = department?.getAllDepartments || [];
  const titles = title?.getAllTitles || [];

  const userOptions = mapSelectOptionList(evaluatorList);

  return (
    <Grid templateColumns={'repeat(2, 1fr)'} columnGap={7} rowGap={2}>
      {/* first name */}
      <InputTextField name="firstName" label="first name" />
      {/* evaluator */}
      <SelectInputField name="evaluator" label="evaluator" options={userOptions} />
      {/* last name */}
      <InputTextField name="lastName" label="last name" />
      {/* department */}
      <SelectInputField
        isLoading={isLoadingGetDepartments}
        onMenuOpen={() =>
          getAllDepartments({
            variables: {
              strategyId: watch('strategy')?.value ?? undefined,
            },
          })
        }
        name="department"
        label="department"
        options={mapSelectOptionList(departments)}
      />
      {/* email */}
      <InputTextField name="email" label="email" />
      {/* location */}
      <SelectInputField name="location" label="location" options={mapSelectOptionList(locationList)} />
      {/* start date */}
      <Flex {...defaultPropFlex} direction="row">
        <Text {...defaultPropText} textTransform="capitalize">
          start date
        </Text>
        <Box {...defaultPropBox}>
          <DatePickerField
            name="startDate"
            maxDate={new Date()}
            selected={watch('startDate')}
            placeholderText="start date"
          />
        </Box>
      </Flex>
      {/* title */}
      <SelectInputField
        isLoading={isLoadingGetTitles}
        onMenuOpen={() => getAllTitles({ variables: {} })}
        name="title"
        label="title"
        options={mapSelectOptionList(titles)}
      />
      {/* strategy */}
      <SelectInputField
        isLoading={isLoadingGetStrategies}
        onMenuOpen={() => getAllStrategies({ variables: {} })}
        name="strategy"
        label="strategy"
        options={mapSelectOptionList(strategies)}
      />
      {/* past title */}
      <SelectInputField
        isLoading={isLoadingGetTitles}
        onMenuOpen={() => getAllTitles({ variables: {} })}
        name="pastTitle"
        label="past title"
        options={mapSelectOptionList(titles)}
      />
      {/* form type */}
      <SelectInputField
        isLoading={isLoadingGetEvaluationTypes}
        onMenuOpen={() => getAllEvaluationTypes({ variables: {} })}
        name="formType"
        label="form type"
        options={mapSelectOptionList(evaluationTypes)}
      />
    </Grid>
  );
};

interface UserDetailBottomType {
  image: any;
  locationList: Array<{ name: string; id: number; countryCode?: string | null }>;
  userList: any;
  editMode?: boolean;
  onUpload: (formData: FormData) => Promise<void>;
}

export const UserDetailBottom: React.FC<UserDetailBottomType> = ({
  image,
  locationList,
  userList,
  editMode = true,
  onUpload,
}) => {
  const { watch, getValues, setValue } = useFormContext();
  const [loadingImg, setLoadingImg] = React.useState(false);
  const { isSuperAdmin, isSpecialAdmin } = useUserPermissions();

  // Clean up watch
  useEffect(() => {
    const subscription = watch(() => {
      // do nothing
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  ///func to handle events
  const onUploadImg = async image => {
    setLoadingImg(true);
    const formData = new FormData();
    formData.append('file', image);
    await onUpload(formData);
    setLoadingImg(false);
  };
  const mappingData = (target: 'countrycode' | 'city' | 'users') => {
    let result;
    switch (target) {
      case 'countrycode':
        result = uniqBy(locationList, 'countryCode').map(item => ({
          value: item.countryCode,
          label: item?.countryCode,
        }));
        return result;
      case 'city':
        result = locationList.map(item => ({ value: item.id, label: item?.name }));
        return result;
      case 'users':
        result = userList.map(item => ({ value: item.id, label: item.name }));
        return result;
    }
  };

  const onChangeAdminRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = event.target.name;
    if (getValues(current) === false) {
      return;
    }

    const roles = ['cityAdmin', 'countryAdmin', 'specialAdmin', 'superAdmin'];
    roles.forEach(item => {
      if (item === current) setValue(item, true);
      if (item !== current) if (getValues(item)) setValue(item, false);
    });
  };

  return (
    <Grid templateColumns={'repeat(4, 1fr)'} columnGap={2} mt={7} alignItems="flex-start">
      {/* image upload */}
      <EditAvatarBox value={getImageUrl(image)} onUploadImg={onUploadImg} loadingImg={loadingImg} />

      {(isSuperAdmin || isSpecialAdmin) && (
        <GridItem colSpan={3}>
          <Grid templateColumns={'repeat(3, 1fr)'} columnGap={7} alignItems="flex-start">
            {/* department head */}

            <Flex direction="column">
              {isSuperAdmin && (
                <>
                  <CheckBoxField {...defaultPropCheckbox} name="departmentHead">
                    Department Head
                  </CheckBoxField>
                </>
              )}
              <Grid flexDirection="column" gap={2}>
                {isSuperAdmin && (
                  <>
                    <SelectField
                      {...defaultPropSelectMulti}
                      name="limitedViewUser"
                      isDisabled={!watch('departmentHead') && !watch('countryAdmin') && !watch('specialAdmin')}
                      options={mappingData('users')}
                      placeholder="Limited View Users"
                    />
                    <SelectField
                      {...defaultPropSelectMulti}
                      isDisabled={!watch('departmentHead') && !watch('countryAdmin') && !watch('specialAdmin')}
                      name="extraViewUser"
                      options={mappingData('users')}
                      placeholder="Extra View Users"
                    />
                  </>
                )}
                {editMode && (
                  <>
                    {isSpecialAdmin && (
                      <label className="font-medium text-lightBlack text-15">Show previous comments</label>
                    )}
                    <SelectField
                      {...defaultPropSelectMulti}
                      isMulti={false}
                      placeholder="Show previous comment"
                      name="showPreviousComment"
                      options={comment}
                    />
                  </>
                )}
              </Grid>
            </Flex>

            {isSuperAdmin && (
              <GridItem colSpan={2}>
                <Grid templateColumns={'repeat(2, 1fr)'} columnGap={7} alignItems="flex-start">
                  {/* city admin */}
                  <Flex direction="column">
                    <CheckBoxField {...defaultPropCheckbox} name="cityAdmin" onChange={onChangeAdminRole}>
                      City Admin
                    </CheckBoxField>
                    <SelectField
                      {...defaultPropSelectMulti}
                      name="city"
                      isDisabled={!watch('cityAdmin')}
                      options={mappingData('city')}
                    />
                  </Flex>
                  {/* country admin */}
                  <Flex direction="column">
                    <CheckBoxField {...defaultPropCheckbox} name="countryAdmin" onChange={onChangeAdminRole}>
                      Country Admin
                    </CheckBoxField>
                    <Flex direction="column">
                      <SelectField
                        {...defaultPropSelectMulti}
                        className={`${!watch('countryAdmin') ? 'hidden' : ''}`}
                        isDisabled={!watch('countryAdmin')}
                        name="countryAdminCode"
                        options={mappingData('countrycode')}
                      />
                      <CheckBoxField {...defaultPropCheckbox} name="specialAdmin" onChange={onChangeAdminRole}>
                        Special Admin
                      </CheckBoxField>
                      <CheckBoxField {...defaultPropCheckbox} name="superAdmin" onChange={onChangeAdminRole}>
                        Super Admin
                      </CheckBoxField>
                    </Flex>
                  </Flex>
                </Grid>
              </GridItem>
            )}
          </Grid>
        </GridItem>
      )}
    </Grid>
  );
};

interface InputTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

const InputTextField: React.FC<InputTextFieldProps> = ({ name, label, placeholder }) => {
  const { register } = useFormContext();

  return (
    <VStack alignItems="flex-start" w="full" my="1">
      <Flex {...defaultPropFlex} direction="row" w="full" my="0">
        <Text {...defaultPropText} textTransform="capitalize">
          {label}
        </Text>
        <Box {...defaultPropBox}>
          <FormInput register={register(name)} {...defaultPropInput} textAlign="center" placeholder={placeholder} />
        </Box>
      </Flex>
      <ErrorMessage
        name={name}
        render={({ message }) => <p className="text-error text-left mt-5 p-0 m-0 text-13 pl-10">{message}</p>}
      />
    </VStack>
  );
};

///static
const TEXTCOLOR = '#2c405a';
const flexCenter = {
  justifyContent: 'center',
  alignItems: 'center',
};
const defaultPropText = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  pl: '10px',
  flex: 0.3,
  color: TEXTCOLOR,
  fontSize: 'sm',
  fontWeight: 'normal',
};
const defaultPropBox = {
  flex: 0.7,
  display: 'flex',
  size: 'sm',
  variant: 'unstyled',
  fontSize: 'sm',
  padding: 0,
  ...flexCenter,
};
const defaultPropInput = {
  variant: 'unstyled',
  padding: 0,
  fontSize: 'sm',
  height: '100%',
  minHeight: '38px',
};
const defaultPropFlex = {
  borderBottomWidth: '1px',
  borderBottomColor: '#c5d9e8',
  my: 1,
  ...flexCenter,
};
export const defaultPropCheckbox = {
  color: TEXTCOLOR,
  size: 'sm',
  borderColor: TEXTCOLOR,
  fontWeight: 'normal',
  isFocusable: true,
};
const defaultPropSelectMulti = {
  isMulti: true,
  className: 'w-full mt-3',
  hideSelectedOptions: false,
};
const comment = [
  { value: '0', label: 'Inherit' },
  { value: '1', label: 'Hide' },
  { value: '2', label: 'Show' },
];

export default ProfileTab;
