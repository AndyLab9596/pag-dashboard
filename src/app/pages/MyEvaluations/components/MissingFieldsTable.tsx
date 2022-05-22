import React, { useMemo } from 'react';
import { MdDone, MdClose, MdRemove } from 'react-icons/md';

import Table from 'app/components/Table/Table';
import { SubmitEvaluationMutation } from 'app/generated/graphql';

const groupBy = ['fullName'];

type ErrorData = SubmitEvaluationMutation['submitEvaluation']['data'];
interface Props {
  data?: ErrorData;
  convertedData?: ConvertedData[];
}

export type ConvertedData = {
  answerId: number;
  evaluationId: number;
  fullName: string | undefined;
  text?: string;
  isOpenQuestion?: boolean | null | undefined;
  isRequired?: boolean | null | undefined;
  isNADisabled?: boolean;
  title: string;
  feedback?: string | null | undefined;
  score?: number | null | undefined;
  isNoFeedback?: boolean | null | undefined;
  isNoScore?: boolean | null | undefined;
  isScore5s?: boolean | undefined;
  isScoreNA?: boolean | undefined;
};

const MissingFieldsTable: React.FC<Props> = ({ data, convertedData }) => {
  const columns = useMemo(() => {
    return [
      {
        id: 'fullName',
        accessor: 'fullName',
        Header: () => <span className="table-header">EVALUATEE NAME</span>,
        Cell: ({ value }) => value || '',
        minWidth: '20rem',
      },
      {
        id: 'title',
        accessor: 'title',
        Header: () => <span className="table-header">TITLE</span>,
        Cell: ({ value }) => value || '',
        Aggregated: () => '',
      },
      {
        id: 'score',
        accessor: 'score',
        Header: () => <span className="table-header">RATING</span>,
        Cell: ({ row }) => {
          return row?.original.score == null && !row?.original.isNoScore ? (
            <MdRemove color={'black'} fontSize="1.5rem" />
          ) : row?.original.isNoScore ? (
            <MdClose color={'red'} fontSize="1.5rem" />
          ) : (
            <MdDone color={'green'} fontSize="1.5rem" />
          );
        },
        Aggregated: () => '',
        minWidth: '200px',
      },
      {
        id: 'feedback',
        accessor: 'feedback',
        Header: () => <span className="table-header">FEEDBACK</span>,
        Cell: ({ row }) => {
          return (row?.original.feedback == null || row?.original.feedback === '') && !row?.original.isNoFeedback ? (
            <MdRemove color={'black'} fontSize="1.5rem" />
          ) : row?.original.isNoFeedback ? (
            <MdClose color={'red'} fontSize="1.5rem" />
          ) : (
            <MdDone color={'green'} fontSize="1.5rem" />
          );
        },
        Aggregated: () => '',
        minWidth: '200px',
      },
    ];
  }, []);

  const convertData = (originalData?: ErrorData) => {
    return originalData?.reduce((finalData, currentItem) => {
      let evaluation = {
        evaluationId: currentItem.evaluation.id,
        fullName: currentItem.evaluation.evaluatee?.name,
      };

      let converted = currentItem.answerAndQuestions
        .sort((a, b) => a.question.id - b.question.id)
        .map(({ answer, question }) => {
          const { id, ...restQuestion } = question;
          const { id: answerId, ...restAnswer } = answer;

          return {
            answerId,
            ...evaluation,
            ...restQuestion,
            ...restAnswer,
          };
        });

      return [...finalData, ...converted];
    }, [] as unknown[]);
  };

  const tableData = () => {
    if ((!!convertedData && convertedData.length === 0) || !convertedData) {
      return convertData(data);
    } else return convertedData;
  };

  return (
    <Table
      columns={columns}
      data={tableData()}
      pageSize={999999}
      showPagination={false}
      onPageChange={() => {}}
      hiddenColumns={['selection']}
      hideButtonEdit={true}
      disableGroupBy={false}
      groupBy={groupBy}
      manualSortBy={false}
    />
  );
};

export default MissingFieldsTable;
