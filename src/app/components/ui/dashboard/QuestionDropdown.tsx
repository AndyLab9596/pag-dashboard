import React from 'react';
import { useGetQuestionsWithSpecificTypeLazyQuery } from 'app/generated/graphql';
import Select from '../Form/Select';

interface QuestionDropdownProps {
  evaluationTypeId?: number;
  onChange: (questionId: number) => void;
}

const defaultOpt = [{ label: 'All', value: '' }];

const QuestionDropdown: React.FC<QuestionDropdownProps> = ({ evaluationTypeId, onChange }) => {
  const [options, setOptions] = React.useState<{ label: string; value: string | number }[]>(defaultOpt);
  const [getEvaluationTypes, { loading }] = useGetQuestionsWithSpecificTypeLazyQuery({
    onCompleted: data => {
      const opts = data.getQuestionsWithSpecificType.map(item => ({
        label: item.title,
        value: item.id,
      }));
      setOptions([...defaultOpt, ...opts]);
    },
    fetchPolicy: 'no-cache',
  });

  React.useEffect(() => {
    (async () => {
      if (!evaluationTypeId) return;
      await getEvaluationTypes({
        variables: {
          evaluationType: evaluationTypeId,
        },
      });
    })();
  }, [evaluationTypeId, getEvaluationTypes]);

  return (
    <Select
      isMulti={false}
      className={'w-full'}
      placeholder="Select Question"
      options={options}
      onChange={o => onChange(o?.value || undefined)}
      onMenuOpen={() => {
        if (!evaluationTypeId) {
          setOptions(defaultOpt);
          return;
        }

        getEvaluationTypes({
          variables: {
            evaluationType: evaluationTypeId,
          },
        });
      }}
      isLoading={loading}
    />
  );
};

export default QuestionDropdown;
