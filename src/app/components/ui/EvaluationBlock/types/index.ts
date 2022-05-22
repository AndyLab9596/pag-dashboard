export type EvaluationType = 'perfSummary' | 'selfAssessment' | 'evaluation' | 'overallPS';

export interface User {
  name: string;
  image: string;
  title?: string;
  department?: string;
  evaluationType?: string;
  startDate?: string;
}

export interface EvaluationItemConfig {
  title: string;
  desc?: string;
}

export type EvaluationConfig = {
  [key in EvaluationType]: EvaluationItemConfig;
};
