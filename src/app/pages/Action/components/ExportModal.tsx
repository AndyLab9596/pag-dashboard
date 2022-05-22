import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { ApolloError } from '@apollo/client';

import { Title, BodyContainer, PartItem, PartRadioField } from './ActionModal';
import { Form } from 'app/components/ui/Form';
import { ActionModalOption } from '../types';
import Button from 'app/components/ui/Button/Button';
import { useUserPermissions } from 'common/useUserPermissions';
import { useAuthState } from 'app/components/Auth/useAuthState';
import { useActionModal } from '../contexts/ActionModalContext';
import { ReportTypes } from '../types/Report.enum';
import useReport from '../hooks/useReport';
import StaticModal from 'app/components/Modal/StaticModal';
import config from 'config';

const validationSchema = yup.object().shape({});

const OptionsRoleAdmin = ['performanceSummary', 'ops', 'ratingSummary', 'selfAssessment', 'rankingSummary'];
const limitedUser = ['performanceSummary', 'ops', 'ratingSummary', 'selfAssessment', 'rankingSummary'];

interface FormValues {
  export: ReportTypes;
  [key: string]: string;
}

interface ReportData {
  [key: string]: {
    url: string;
  };
}

const ExportModal = () => {
  const { isAdminEditForm, isSuperAdmin } = useUserPermissions();
  const { identity } = useAuthState();
  const { onCloseModal, filter } = useActionModal();
  const { report, loading } = useReport();

  const [isLimitedUser, setIsLimitedUser] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const { isOpen: isOpenStaticModal, onClose: onCloseStaticModal, onOpen: onOpenStaticModal } = useDisclosure();

  const userIsSelf = filter.userIds.length > 1 ? false : filter.userIds[0] === identity?.id;

  useEffect(() => {
    // only check isLimited if select single users
    // if select multi users, BE will check the logic and exclude limited users
    if (
      filter.userIds.length === 1 &&
      !filter.isSelectAll &&
      identity &&
      identity.permissionsLimitedUsers &&
      identity.permissionsLimitedUsers.length > 0
    ) {
      const limitedUser = identity.permissionsLimitedUsers.filter(item => item.limited.id === filter.userIds[0]);
      setIsLimitedUser(limitedUser.length > 0);
    }
  }, []);

  const dataExportOptions = cloneDeep(exportOptions);
  if (!isAdminEditForm || (!isSuperAdmin && userIsSelf))
    dataExportOptions[0].options = dataExportOptions[0]?.options?.filter(e => !OptionsRoleAdmin.includes(e.name));
  if (isLimitedUser) {
    dataExportOptions[0].options = dataExportOptions[0]?.options?.filter(e => !limitedUser.includes(e.name));
  }

  const onSubmit = async (values: FormValues) => {
    const { export: type, ...variables } = values;
    try {
      const data: ReportData = await report({
        type: type,
        variables: variables,
      });

      let url = Object.values(data)[0].url;
      window.open(`${config.REST_APP_API_URL}/exports?url=${url}`, '_blank');
      onOpenStaticModal();
    } catch (error) {
      setError((error as ApolloError).message);
      onOpenStaticModal();
    }
  };

  return (
    <Box>
      <Form validationSchema={validationSchema} onSubmit={onSubmit}>
        <Title>Export Selections</Title>
        <BodyContainer>
          <Options name="export" optionList={dataExportOptions} />
        </BodyContainer>
        <HStack my="1rem" justifyContent="flex-end" spacing="1rem">
          <Button variant="outline" w="140px" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="solid" w="140px" isLoading={loading}>
            Submit
          </Button>
        </HStack>
      </Form>
      <StaticModal
        isOpen={isOpenStaticModal}
        onClose={() => {
          onCloseStaticModal();
          onCloseModal();
        }}
        variant="successExport"
        {...(error && {
          config: {
            body: error,
            closeButtonText: 'Close',
          },
        })}
      />
    </Box>
  );
};

const Options: React.FC<{ optionList: ActionModalOption[]; name: string }> = ({ optionList, name }) => {
  const { watch, reset } = useFormContext();
  const selectedOption = watch(name);

  useEffect(() => {
    let defaultOptionValues =
      optionList.find(item => item.name === name)?.options?.find(option => option.value === selectedOption)
        ?.defaultOptions ?? {};
    reset({
      [name]: selectedOption,
      ...defaultOptionValues,
    });
  }, [selectedOption]);

  const renderOptions = (options: ActionModalOption[]) => {
    return options.map(option => (
      <PartItem key={option.name} title={option.label}>
        {option.options && <PartRadioField options={option.options} name={option.name} />}
      </PartItem>
    ));
  };

  const renderExtraOptions = () => {
    if (!extraOptions.hasOwnProperty(selectedOption)) return null;
    return extraOptions[selectedOption].map(option => {
      return (
        <PartItem
          key={option.name}
          title={option.label}
          titleProps={
            option.value === undefined
              ? {
                  marginLeft: '1rem',
                }
              : {}
          }
        >
          {option.options && <PartRadioField options={option.options} name={option.name} />}
        </PartItem>
      );
    });
  };

  return (
    <>
      {renderOptions(optionList)} {renderExtraOptions()}
    </>
  );
};

//#region options
const exportOptions: ActionModalOption[] = [
  {
    name: 'export',
    label: 'Export',
    value: 'export',
    type: 'RadioButton',
    options: [
      {
        name: ReportTypes.missingEvaluations,
        label: 'Missing Evaluations',
        value: ReportTypes.missingEvaluations,
        defaultOptions: {
          isMissingByMe: 'true',
          // format: 'xlsx',
        },
        type: 'RadioButton',
      },
      {
        name: ReportTypes.LOC,
        label: 'List Of Contributors',
        type: 'RadioButton',
        value: ReportTypes.LOC,
      },
      {
        name: ReportTypes.contributorsPerPerson,
        label: 'Contributors Per Person',
        type: 'RadioButton',
        value: ReportTypes.contributorsPerPerson,
      },
      {
        name: ReportTypes.SA,
        label: 'Self Assessment',
        value: ReportTypes.SA,
        type: 'RadioButton',
      },
      {
        name: ReportTypes.PS,
        label: 'Performance Summary',
        defaultOptions: {
          withNames: 'true',
          withNormalization: 'true',
          withRatingPercentage: 'false',
          withRatingCount: 'false',
          withHighestAndLowestRatings: 'false',
          with3YearComparison: 'false',
        },
        value: ReportTypes.PS,
        type: 'RadioButton',
      },
      {
        name: ReportTypes.OPS,
        label: 'Overall Performance Summary',
        defaultOptions: {
          isFormatFull: 'true',
        },
        value: ReportTypes.OPS,
        type: 'RadioButton',
      },
      {
        name: ReportTypes.ratingSummary,
        label: 'Ratings Summary',
        defaultOptions: {
          withAverage: 'false',
          withNormalization: 'false',
          ratingAs: 'by_me',
          type: 'excel',
        },
        value: ReportTypes.ratingSummary,
        type: 'RadioButton',
      },
      {
        name: ReportTypes.rankingSummary,
        label: 'Ranking Summary',
        defaultOptions: {
          withNormalization: 'false',
          type: 'xlsx',
        },
        value: ReportTypes.rankingSummary,
        type: 'RadioButton',
      },
    ],
  },
];

const extraOptions: {
  [key: string]: ActionModalOption[];
} = {
  [ReportTypes.missingEvaluations]: [
    {
      name: 'isMissingByMe',
      label: 'View',
      type: 'RadioButton',
      value: ' ',
      options: [
        {
          name: 'missingByUser',
          label: 'Missing by User',
          type: 'RadioButton',
          value: 'true',
        },
        {
          name: 'missingForUser',
          label: 'Missing for User',
          type: 'RadioButton',
          value: 'false',
        },
      ],
    },
    // {
    //   name: 'format',
    //   label: 'Format',
    //   type: 'RadioButton',
    //   value: '',
    //   options: [
    //     {
    //       name: 'xlsx',
    //       label: 'xlsx',
    //       type: 'RadioButton',
    //       value: 'xlsx',
    //     },
    //   ],
    // },
  ],
  [ReportTypes.PS]: [
    {
      name: 'withNames',
      label: 'Option',
      value: ' ',
      options: [
        {
          name: 'withNames',
          label: 'With Names',
          type: 'RadioButton',
          value: 'true',
        },
        {
          name: 'withoutNames',
          label: 'Without Names',
          type: 'RadioButton',
          value: 'false',
        },
        {
          name: 'mdAndAbove',
          label: 'Without Names (MD & Above)',
          value: 'mdAndAbove',
          type: 'RadioButton',
        },
      ],
    },
    {
      name: 'withNormalization',
      label: '_ _ _ _ _',
      options: [
        {
          name: 'withNormalization',
          value: 'true',
          label: 'With Normalization',
        },
        {
          name: 'withoutNormalization',
          value: 'false',
          label: 'Without Normalization',
        },
      ],
    },
    {
      name: 'withRatingPercentage',
      label: '_ _ _ _ _',
      options: [
        {
          name: 'withRatingPercentage',
          value: 'true',
          label: 'With Rating Percentage',
        },
        {
          name: 'withoutRatingPercentage',
          value: 'false',
          label: 'Without Rating Percentage',
        },
      ],
    },
    {
      name: 'withRatingCount',
      label: '_ _ _ _ _',
      options: [
        {
          name: 'withRatingCount',
          value: 'true',
          label: 'With Rating Count',
        },
        {
          name: 'withoutRatingCount',
          value: 'false',
          label: 'Without Rating Count',
        },
      ],
    },
    {
      name: 'withHighestAndLowestRatings',
      label: '_ _ _ _ _',
      options: [
        {
          name: 'withHighestAndLowestRatings',
          value: 'true',
          label: 'With Highest & Lowest Ratings',
        },
        {
          name: 'withoutHighestAndLowestRatings',
          value: 'false',
          label: 'Without Highest & Lowest Ratings',
        },
      ],
    },
    {
      name: 'with3YearComparison',
      label: '_ _ _ _ _',
      options: [
        {
          name: 'with3YearComparison',
          value: 'true',
          label: 'With 3 Year Comparison',
        },
        {
          name: 'without3YearComparison',
          value: 'false',
          label: 'Without 3 Year Comparison',
        },
      ],
    },
  ],
  [ReportTypes.OPS]: [
    {
      name: 'isFormatFull',
      label: 'Type',
      type: 'RadioButton',
      value: ' ',
      options: [
        {
          name: 'fullOPS',
          value: 'true',
          label: 'Full OPS',
        },
        {
          name: 'briefOPS',
          value: 'false',
          label: 'Brief OPS',
        },
      ],
    },
  ],
  [ReportTypes.ratingSummary]: [
    {
      name: 'withAverage',
      label: 'View',
      value: ' ',
      type: 'RadioButton',
      options: [
        {
          name: 'withAverage',
          value: 'true',
          label: 'With average',
        },
        {
          name: 'withoutAverage',
          value: 'false',
          label: 'Without average',
        },
      ],
    },
    {
      name: 'withNormalization',
      label: '_ _ _ _ _ _',
      options: [
        {
          name: 'withNormalization',
          label: 'With normalization',
          value: 'true',
        },
        {
          name: 'withoutNormalization',
          label: 'Without Normalization',
          value: 'false',
        },
      ],
    },
    {
      name: 'ratingAs',
      label: 'Target',
      value: ' ',
      type: 'RadioButton',
      options: [
        {
          name: 'asContributor',
          label: 'As contributor',
          value: 'by_me',
        },
        {
          name: 'asEvaluatee',
          label: 'As evaluatee',
          value: 'on_users',
        },
      ],
    },
    {
      name: 'type',
      label: 'Type',
      value: ' ',
      type: 'RadioButton',
      options: [
        {
          name: 'pdf',
          label: 'Pdf',
          value: 'pdf',
        },
        {
          name: 'xlsx',
          label: 'Xlsx',
          value: 'excel',
        },
      ],
    },
  ],
  [ReportTypes.rankingSummary]: [
    {
      name: 'withNormalization',
      label: 'Option',
      value: ' ',
      type: 'RadioButton',
      options: [
        {
          name: 'withNormalization',
          value: 'true',
          label: 'With normalization',
        },
        {
          name: 'withoutNormalization',
          value: 'false',
          label: 'Without Normalization',
        },
      ],
    },
  ],
};
//#endregion options

export default ExportModal;
