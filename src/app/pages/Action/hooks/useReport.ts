import { useEffect, useRef, useState } from 'react';
import { client } from 'app/GraphqlProvider';

import { ReportTypes } from '../types/Report.enum';
import {
  GET_REPORT_LOC,
  GET_REPORT_OPS,
  SHARE_OPS,
  GET_REPORT_MISSING_EVALUATIONS,
  GET_REPORT_CONTRIBUTORS_PER_PERSON,
  GET_REPORT_PERFORMANCE_SUMMARY,
  GET_REPORT_RATING_SUMMARY,
  GET_REPORT_RANKING_SUMMARY,
  GET_REPORT_SELF_ASSESSMENT,
} from 'graphql/reports';
import { useActionModal } from '../contexts/ActionModalContext';
import { UserActionFilter } from 'app/generated/graphql';

const reportTypeQueryMapping = {
  [ReportTypes.LOC]: GET_REPORT_LOC,
  [ReportTypes.OPS]: GET_REPORT_OPS,
  [ReportTypes.shareOPS]: SHARE_OPS,
  [ReportTypes.missingEvaluations]: GET_REPORT_MISSING_EVALUATIONS,
  [ReportTypes.contributorsPerPerson]: GET_REPORT_CONTRIBUTORS_PER_PERSON,
  [ReportTypes.PS]: GET_REPORT_PERFORMANCE_SUMMARY,
  [ReportTypes.ratingSummary]: GET_REPORT_RATING_SUMMARY,
  [ReportTypes.rankingSummary]: GET_REPORT_RANKING_SUMMARY,
  [ReportTypes.SA]: GET_REPORT_SELF_ASSESSMENT,
};

interface Args {
  type: ReportTypes;
  userIds?: number[];
  cycleId?: number;
  isSelectAll?: boolean;
  variables?: {
    [key: string]: any;
  };
  specialFilter?: UserActionFilter;
}

const useReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { filter } = useActionModal();
  const filterRef = useRef(filter);
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  const report = async (args: Args) => {
    try {
      setLoading(true);
      const { type, variables = undefined, specialFilter = {} } = args;
      const { data } = await client.query({
        query: reportTypeQueryMapping[type],
        variables: {
          payload: convertVariableTypes(variables),
          filter: { ...filterRef.current, ...specialFilter },
        },
        fetchPolicy: 'no-cache',
      });

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  };

  return {
    report,
    loading,
  };
};

const convertVariableTypes = (variables?: { [key: string]: any }) => {
  const convertedVariables = {};
  if (!variables) return convertedVariables;

  Object.keys(variables).forEach(key => {
    let value = variables[key];
    let convertedValue = value;
    if (typeof value === 'string' && value === 'true') {
      convertedValue = true;
    }
    if (typeof value === 'string' && value === 'false') {
      convertedValue = false;
    }
    if (typeof value === 'string' && value === 'mdAndAbove') {
      convertedValue = false;
      convertedVariables['mdAndAbove'] = true;
    }
    convertedVariables[key] = convertedValue;
  });

  return convertedVariables;
};

export default useReport;
