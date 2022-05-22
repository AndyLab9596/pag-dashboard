import {
  QuestionSummary,
  EvaluationTypeQuestion,
  AnswerContributorFragment,
  AnswerSummaryFragment,
} from 'app/generated/graphql';

export type AverageQuestionSummary = Omit<QuestionSummary, 'question'> & {
  question: Pick<EvaluationTypeQuestion, 'id' | 'isOpenQuestion' | 'text' | 'subtitle' | 'title' | 'isOpenQuestion'>;
};

export type AnswerOfContributor = {
  contributor?: AnswerContributorFragment | null;
  answer?: AnswerSummaryFragment;
};

export type OptOutEvaluation = {
  contributor?: AnswerContributorFragment | null;
  optOut: boolean;
  optOutReason?: string | null;
};

export interface FormValues {
  psId: number | null;
  score: string;
  feedback: string;
  isSubmit?: boolean;
  isAutoSave?: boolean;
}
