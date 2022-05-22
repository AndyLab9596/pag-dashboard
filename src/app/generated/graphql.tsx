import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AnswerAndQuestions = {
  __typename?: 'AnswerAndQuestions';
  answer: AnswerDetails;
  question: EvaluationTypeQuestion;
};

export type AnswerDetails = {
  __typename?: 'AnswerDetails';
  createdAt: Scalars['DateTime'];
  evaluation: Evaluation;
  evaluationTypeQuestion?: Maybe<EvaluationTypeQuestion>;
  feedback?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isNoFeedback?: Maybe<Scalars['Boolean']>;
  isNoScore?: Maybe<Scalars['Boolean']>;
  isScore5s?: Maybe<Scalars['Boolean']>;
  isScoreNA?: Maybe<Scalars['Boolean']>;
  priority?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
};

export type CreateContributorInput = {
  contributorId: Scalars['Float'];
  projectDetails: Scalars['String'];
};

export type Cycle = {
  __typename?: 'Cycle';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CycleContributor = {
  __typename?: 'CycleContributor';
  createdAt: Scalars['DateTime'];
  cycleContributorsUser: Array<CycleContributorUser>;
  cycleId: Scalars['Float'];
  evaluatorId?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type CycleContributorFilter = {
  __typename?: 'CycleContributorFilter';
  listSubmitted: Array<CycleContributor>;
  listUnSubmitted: Array<CycleContributor>;
};

export type CycleContributorId = {
  cycleContributorIds: Array<Scalars['Float']>;
};

export type CycleContributorInput = {
  evaluatorId?: Maybe<Scalars['Float']>;
  status: Scalars['String'];
};

export type CycleContributorPagination = Pagination & {
  __typename?: 'CycleContributorPagination';
  data: Array<CycleContributor>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type CycleContributorUser = {
  __typename?: 'CycleContributorUser';
  createdAt: Scalars['DateTime'];
  cycleContributor: CycleContributor;
  id: Scalars['Float'];
  projectDetails: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CycleContributorUserInput = {
  cycleContributorId: Scalars['Float'];
  projectDetails: Scalars['String'];
  userId: Scalars['Float'];
};

export type CycleContributorUserPagination = Pagination & {
  __typename?: 'CycleContributorUserPagination';
  data: Array<CycleContributorUser>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type CycleInput = {
  name: Scalars['String'];
};

export type CyclePagination = Pagination & {
  __typename?: 'CyclePagination';
  data: Array<Cycle>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type DeadlineDepartment = {
  deadlineConfirmLOC?: Maybe<Scalars['DateTime']>;
  deadlineLOC?: Maybe<Scalars['DateTime']>;
  deadlinePerformanceEvaluation?: Maybe<Scalars['DateTime']>;
  deadlineSelfAssessment?: Maybe<Scalars['DateTime']>;
  lockDate?: Maybe<Scalars['DateTime']>;
};

export type DeleteCyclesInput = {
  ids: Array<Scalars['Float']>;
  isSelectAll?: Maybe<Scalars['Boolean']>;
};

export type Department = {
  __typename?: 'Department';
  createdAt: Scalars['DateTime'];
  deadlineConfirmLOC?: Maybe<Scalars['DateTime']>;
  deadlineLOC?: Maybe<Scalars['DateTime']>;
  deadlinePerformanceEvaluation?: Maybe<Scalars['DateTime']>;
  deadlineSelfAssessment?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  lockDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  showPreviousComment?: Maybe<Scalars['Boolean']>;
  strategy?: Maybe<Strategy>;
  updatedAt: Scalars['DateTime'];
};

export type DepartmentInput = {
  deadlineConfirmLOC?: Maybe<Scalars['DateTime']>;
  deadlineLOC?: Maybe<Scalars['DateTime']>;
  deadlinePerformanceEvaluation?: Maybe<Scalars['DateTime']>;
  deadlineSelfAssessment?: Maybe<Scalars['DateTime']>;
  lockDate?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  showPreviousComment?: Maybe<Scalars['Boolean']>;
  strategyId?: Maybe<Scalars['Float']>;
};

export type DepartmentPagination = Pagination & {
  __typename?: 'DepartmentPagination';
  data: Array<Department>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type DepartmentSortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type DistributionRatingDetails = {
  __typename?: 'DistributionRatingDetails';
  mean: Scalars['Float'];
  ratings: Array<Rating>;
  stdDev: Scalars['Float'];
  total: Scalars['Float'];
};

export type Evaluation = {
  __typename?: 'Evaluation';
  contributor?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  cycle: Cycle;
  evaluatee?: Maybe<User>;
  evaluationAnswers?: Maybe<Array<EvaluationAnswer>>;
  evaluationTimeLogs: Array<EvaluationTimeLog>;
  evaluationType: EvaluationType;
  evaluator?: Maybe<User>;
  id: Scalars['Float'];
  isComplete?: Maybe<Scalars['Boolean']>;
  isOpenEvaluation: Scalars['Boolean'];
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  optOut: Scalars['Boolean'];
  optOutReason?: Maybe<Scalars['String']>;
  projectDetails: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type EvaluationAnswer = {
  __typename?: 'EvaluationAnswer';
  createdAt: Scalars['DateTime'];
  evaluation: Evaluation;
  evaluationTypeQuestion?: Maybe<EvaluationTypeQuestion>;
  feedback?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  priority?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type EvaluationAnswerInput = {
  feedback?: Maybe<Scalars['String']>;
  questionId: Scalars['Float'];
  score?: Maybe<Scalars['Float']>;
};

export type EvaluationAnswerWithDetails = {
  __typename?: 'EvaluationAnswerWithDetails';
  answerAndQuestions: Array<AnswerAndQuestions>;
  evaluation: Evaluation;
};

export type EvaluationDetails = {
  __typename?: 'EvaluationDetails';
  complete: Scalars['Float'];
  evaluationStatus: Array<UserEvaluationStatus>;
  overall: Scalars['Float'];
  percentComplete: Scalars['Float'];
};

export type EvaluationSummary = {
  __typename?: 'EvaluationSummary';
  completePerformance: Scalars['Float'];
  completedPercentage: Scalars['Float'];
  isComplete: Scalars['Boolean'];
  totalPerformance: Scalars['Float'];
  user: User;
};

export type EvaluationTimeLog = {
  __typename?: 'EvaluationTimeLog';
  createdAt: Scalars['DateTime'];
  duration?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type EvaluationType = {
  __typename?: 'EvaluationType';
  createdAt: Scalars['DateTime'];
  evaluationTypeQuestions: Array<EvaluationTypeQuestion>;
  id: Scalars['Float'];
  key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EvaluationTypeInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  evaluationTypeQuestions?: Maybe<Array<EvaluationTypeQuestionInput>>;
  name?: Maybe<Scalars['String']>;
};

export type EvaluationTypeQuestion = {
  __typename?: 'EvaluationTypeQuestion';
  createdAt: Scalars['DateTime'];
  evaluationAnswers: Array<EvaluationAnswer>;
  evaluationType: EvaluationType;
  evaluationTypeId: Scalars['Float'];
  id: Scalars['Float'];
  isEvaluation?: Maybe<Scalars['Boolean']>;
  isNADisabled: Scalars['Boolean'];
  isNoExposureComment?: Maybe<Scalars['Boolean']>;
  isOpenQuestion?: Maybe<Scalars['Boolean']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
  priority?: Maybe<Scalars['Float']>;
  subtitle: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EvaluationTypeQuestionInput = {
  id?: Maybe<Scalars['Float']>;
  isEvaluation?: Maybe<Scalars['Boolean']>;
  isNADisabled: Scalars['Boolean'];
  isNoExposureComment?: Maybe<Scalars['Boolean']>;
  isOpenQuestion?: Maybe<Scalars['Boolean']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
  priority?: Maybe<Scalars['Float']>;
  subtitle: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type EvaluationUpdate = {
  evaluationAnswers?: Maybe<Array<EvaluationAnswerInput>>;
  optOutReason?: Maybe<Scalars['String']>;
};

export type EvaluationWithDuration = {
  __typename?: 'EvaluationWithDuration';
  duration: Scalars['Float'];
  evaluation?: Maybe<Evaluation>;
};

export type EvaluationsDetail = {
  __typename?: 'EvaluationsDetail';
  evaluations: Array<Evaluation>;
  percentComplete: Scalars['Float'];
};

export type EvaluationsPagination = Pagination & {
  __typename?: 'EvaluationsPagination';
  data: Array<Evaluation>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type ExportOutPut = {
  __typename?: 'ExportOutPut';
  url: Scalars['String'];
};

export type HighestRatingUsers = {
  __typename?: 'HighestRatingUsers';
  averageScore: Scalars['Float'];
  percentageFourOrGreater: Scalars['Float'];
  user: User;
};

export type LoCsDetail = {
  __typename?: 'LOCsDetail';
  complete: Scalars['Float'];
  percentComplete: Scalars['Float'];
  total: Scalars['Float'];
  users: Array<User>;
};

export type Location = {
  __typename?: 'Location';
  countryCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationInput = {
  countryCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type LocationPagination = Pagination & {
  __typename?: 'LocationPagination';
  data: Array<Location>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type LocationSortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addContributors: Array<CycleContributorUser>;
  addEvaluationType: EvaluationType;
  addOneCycle: Cycle;
  addOneCycleContributorUser: CycleContributorUser;
  addOneDepartment: Department;
  addOneEvaluationTypeQuestion: EvaluationTypeQuestion;
  addOneLocation: Location;
  addOneNotificationScheduled: NotificationScheduled;
  addOneNotificationShort: NotificationShort;
  addOneNotificationTemplate: NotificationTemplate;
  addOneOverallPerformanceSummary: OverallPerformanceSummary;
  addOneReminderTemplate: ReminderTemplate;
  addOneRole: Role;
  addOneSetting: Setting;
  addOneStrategy: Strategy;
  addOneTitle: Title;
  addOneUser: User;
  addUserProfile: User;
  /** Approve or submit list of contributors */
  approveLOC: Array<CycleContributor>;
  clearAllNotifications?: Maybe<Array<NotificationShort>>;
  deleteCycleContributorUser: Scalars['String'];
  deleteCycles: Scalars['String'];
  deleteDepartment: Scalars['String'];
  /** Delete evaluation in Evaluation Mode -> My Forms -> My Evaluations */
  deleteEvaluation: Scalars['String'];
  deleteEvaluationType: Scalars['String'];
  deleteEvaluationTypeQuestion: Scalars['String'];
  deleteLocation: Scalars['String'];
  deleteOneCycle: Scalars['String'];
  deleteOneNotificationScheduled: Scalars['String'];
  deleteOneNotificationShort: Scalars['String'];
  deleteOneNotificationTemplate: Scalars['String'];
  deleteOneOverallPerformanceSummary: Scalars['String'];
  deleteOneRole: Scalars['String'];
  deleteOneSetting: Scalars['String'];
  deleteReminderTemplate: Scalars['String'];
  deleteStrategy: Scalars['String'];
  deleteTitle: Scalars['String'];
  deleteUsers: Scalars['String'];
  finalizePerformanceSummary: PerformanceSummary;
  inactiveUser: Array<User>;
  invokeNotification: Scalars['String'];
  login: AuthResponse;
  promoteUser: User;
  resetEvaluation: Array<Evaluation>;
  resetListOfContributors: Array<CycleContributor>;
  resetPerformanceSummary: Array<PerformanceSummary>;
  reverseOptOut: Evaluation;
  sendMailForTechSupport: Scalars['String'];
  setAllDeadlineForDepartment: Scalars['String'];
  /** Submit Evaluation in Evaluation Mode -> My Forms -> My Evaluations */
  submitEvaluation: SubmitAllStatus;
  /** Approve or submit list of contributors */
  submitLOC: CycleContributor;
  updateEvaluation: Evaluation;
  updateEvaluationType: EvaluationType;
  updateOneCycle: Cycle;
  updateOneCycleContributor: CycleContributor;
  updateOneCycleContributorUser: CycleContributor;
  updateOneDepartment: Department;
  updateOneLocation: Location;
  updateOneNotificationScheduled: NotificationScheduled;
  updateOneNotificationShort: NotificationShort;
  updateOneNotificationTemplate: NotificationTemplate;
  updateOneOverallPerformanceSummary: OverallPerformanceSummary;
  updateOneReminderTemplate: ReminderTemplate;
  updateOneRole: Role;
  updateOneSetting: Setting;
  updateOneStrategy: Strategy;
  updateOneTitle: Title;
  updateOneUser: User;
  updateUserProfile: User;
};


export type MutationAddContributorsArgs = {
  data: Array<CreateContributorInput>;
  userId: Scalars['Float'];
};


export type MutationAddEvaluationTypeArgs = {
  data: EvaluationTypeInput;
};


export type MutationAddOneCycleArgs = {
  data: CycleInput;
};


export type MutationAddOneCycleContributorUserArgs = {
  data: CycleContributorUserInput;
};


export type MutationAddOneDepartmentArgs = {
  data: DepartmentInput;
};


export type MutationAddOneEvaluationTypeQuestionArgs = {
  data: EvaluationTypeQuestionInput;
};


export type MutationAddOneLocationArgs = {
  data: LocationInput;
};


export type MutationAddOneNotificationScheduledArgs = {
  data: NotificationScheduledInput;
};


export type MutationAddOneNotificationShortArgs = {
  data: NotificationShortInput;
};


export type MutationAddOneNotificationTemplateArgs = {
  data: NotificationTemplateInput;
};


export type MutationAddOneOverallPerformanceSummaryArgs = {
  data: OverallPerformanceSummaryInput;
};


export type MutationAddOneReminderTemplateArgs = {
  data: ReminderTemplateInput;
};


export type MutationAddOneRoleArgs = {
  data: RoleInput;
};


export type MutationAddOneSettingArgs = {
  data: SettingInput;
};


export type MutationAddOneStrategyArgs = {
  data: StrategyInput;
};


export type MutationAddOneTitleArgs = {
  data: TitleInput;
};


export type MutationAddOneUserArgs = {
  data: UserAccountInput;
};


export type MutationAddUserProfileArgs = {
  data: UserProfileInput;
};


export type MutationApproveLocArgs = {
  ids: CycleContributorId;
  isSendReminder: Scalars['Boolean'];
};


export type MutationDeleteCycleContributorUserArgs = {
  cycleContributorUserIds: Array<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
  isSelectAll: Scalars['Boolean'];
  userId?: Maybe<Scalars['Float']>;
};


export type MutationDeleteCyclesArgs = {
  input: DeleteCyclesInput;
};


export type MutationDeleteDepartmentArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteEvaluationArgs = {
  evaluationId: Scalars['Float'];
};


export type MutationDeleteEvaluationTypeArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteEvaluationTypeQuestionArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteLocationArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteOneCycleArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneNotificationScheduledArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneNotificationShortArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneNotificationTemplateArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneOverallPerformanceSummaryArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneRoleArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteOneSettingArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteReminderTemplateArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteStrategyArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteTitleArgs = {
  ids: Array<Scalars['Float']>;
};


export type MutationDeleteUsersArgs = {
  filter: UserActionFilter;
};


export type MutationFinalizePerformanceSummaryArgs = {
  data: PerformanceSummaryFinalizeInput;
  psId: Scalars['Float'];
};


export type MutationInactiveUserArgs = {
  filter: UserActionFilter;
};


export type MutationInvokeNotificationArgs = {
  data: NotificationRequest;
  filter: UserActionFilter;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPromoteUserArgs = {
  data: PromoteData;
  id: Scalars['Float'];
};


export type MutationResetEvaluationArgs = {
  eIds: Array<Scalars['Float']>;
};


export type MutationResetListOfContributorsArgs = {
  locIds: Array<Scalars['Float']>;
};


export type MutationResetPerformanceSummaryArgs = {
  psIds: Array<Scalars['Float']>;
};


export type MutationReverseOptOutArgs = {
  evaluationId: Scalars['Float'];
};


export type MutationSendMailForTechSupportArgs = {
  content: Scalars['String'];
};


export type MutationSetAllDeadlineForDepartmentArgs = {
  data: DeadlineDepartment;
  strategyId: Scalars['Float'];
};


export type MutationSubmitLocArgs = {
  evaluateeId?: Maybe<Scalars['Float']>;
  isSendReminder: Scalars['Boolean'];
};


export type MutationUpdateEvaluationArgs = {
  data: EvaluationUpdate;
  evaluationId: Scalars['Float'];
  isAdminMode: Scalars['Boolean'];
  saveStatus: Scalars['String'];
};


export type MutationUpdateEvaluationTypeArgs = {
  data: EvaluationTypeInput;
  typeId: Scalars['Float'];
};


export type MutationUpdateOneCycleArgs = {
  data: CycleInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneCycleContributorArgs = {
  data: CycleContributorInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneCycleContributorUserArgs = {
  data: CycleContributorUserInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneDepartmentArgs = {
  data: DepartmentInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneLocationArgs = {
  data: LocationInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneNotificationScheduledArgs = {
  data: NotificationScheduledInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneNotificationShortArgs = {
  data: NotificationShortInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneNotificationTemplateArgs = {
  data: NotificationTemplateInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneOverallPerformanceSummaryArgs = {
  data: OverallPerformanceSummaryInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneReminderTemplateArgs = {
  data: ReminderTemplateInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneRoleArgs = {
  data: RoleInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneSettingArgs = {
  data: SettingInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneStrategyArgs = {
  data: StrategyInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneTitleArgs = {
  data: TitleInput;
  id: Scalars['Float'];
};


export type MutationUpdateOneUserArgs = {
  data: UserAccountInput;
  id: Scalars['Float'];
};


export type MutationUpdateUserProfileArgs = {
  data: UserProfileInput;
  id: Scalars['Float'];
};

export type NotificationLog = {
  __typename?: 'NotificationLog';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  fromEmail: Scalars['String'];
  fromName: Scalars['String'];
  id: Scalars['Float'];
  isTestEmail: Scalars['Boolean'];
  key: Scalars['String'];
  subject: Scalars['String'];
  toEmail: Scalars['String'];
  toName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationRequest = {
  content?: Maybe<Scalars['String']>;
  recipient: Recipients;
  sendAt?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  templateOptions: Scalars['String'];
};

export type NotificationScheduled = {
  __typename?: 'NotificationScheduled';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isSent: Scalars['Boolean'];
  payload?: Maybe<Scalars['String']>;
  sendAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationScheduledInput = {
  isSent: Scalars['Boolean'];
  payload?: Maybe<Scalars['String']>;
  sendAt: Scalars['DateTime'];
};

export type NotificationShort = {
  __typename?: 'NotificationShort';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  fromEmail?: Maybe<Scalars['String']>;
  fromName?: Maybe<Scalars['String']>;
  fullContent?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isRead?: Maybe<Scalars['Boolean']>;
  key: Scalars['String'];
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationShortInput = {
  content: Scalars['String'];
  isRead: Scalars['Boolean'];
  key: Scalars['String'];
  subject: Scalars['String'];
};

export type NotificationTemplate = {
  __typename?: 'NotificationTemplate';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  key: Scalars['String'];
  name: Scalars['String'];
  shortContent: Scalars['String'];
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationTemplateInput = {
  content: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  shortContent: Scalars['String'];
  subject: Scalars['String'];
};

export type OverallPerformanceSummary = {
  __typename?: 'OverallPerformanceSummary';
  createdAt: Scalars['DateTime'];
  cycle: Cycle;
  cycleId: Scalars['Float'];
  id: Scalars['Float'];
  isShare?: Maybe<Scalars['Boolean']>;
  overallPerformanceSummaryAnswers: Array<OverallPerformanceSummaryAnswer>;
  sharedDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type OverallPerformanceSummaryAnswer = {
  __typename?: 'OverallPerformanceSummaryAnswer';
  createdAt: Scalars['DateTime'];
  evaluationTypeQuestion?: Maybe<EvaluationTypeQuestion>;
  feedback?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  priority?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type OverallPerformanceSummaryAnswerInput = {
  feedback?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  priority?: Maybe<Scalars['Float']>;
};

export type OverallPerformanceSummaryInput = {
  cycleId?: Maybe<Scalars['Float']>;
  isShare?: Maybe<Scalars['Boolean']>;
  overallPerformanceSummaryAnswers?: Maybe<Array<OverallPerformanceSummaryAnswerInput>>;
  sharedDate?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Float']>;
};

export type OverviewEvaluation = {
  __typename?: 'OverviewEvaluation';
  complete: Scalars['Float'];
  overall: Scalars['Float'];
  percentComplete: Scalars['Float'];
};

export type Pagination = {
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type PayLoad = {
  isEvaluationMode?: Maybe<Scalars['Boolean']>;
  isFormatFull?: Maybe<Scalars['Boolean']>;
  isMissingByMe?: Maybe<Scalars['Boolean']>;
  isShare?: Maybe<Scalars['Boolean']>;
  ratingAs?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  withAverage?: Maybe<Scalars['Boolean']>;
  withNormalization?: Maybe<Scalars['Boolean']>;
};

export type PerformanceSummary = {
  __typename?: 'PerformanceSummary';
  createdAt: Scalars['DateTime'];
  cycle: Cycle;
  feedback?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isComplete?: Maybe<Scalars['Boolean']>;
  opsStatus?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PerformanceSummaryDetails = {
  __typename?: 'PerformanceSummaryDetails';
  createdAt: Scalars['DateTime'];
  cycle: Cycle;
  feedback?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  isComplete?: Maybe<Scalars['Boolean']>;
  opsStatus?: Maybe<Scalars['String']>;
  percentComplete: Scalars['Float'];
  score?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PerformanceSummaryFinalizeInput = {
  feedback: Scalars['String'];
  isSubmit: Scalars['Boolean'];
  score: Scalars['Float'];
};

export type PerformanceSummaryPayload = {
  isEvaluationMode?: Maybe<Scalars['Boolean']>;
  isEvaluator?: Maybe<Scalars['Boolean']>;
  isFormatFull?: Maybe<Scalars['Boolean']>;
  isMissingByMe?: Maybe<Scalars['Boolean']>;
  isShare?: Maybe<Scalars['Boolean']>;
  mdAndAbove?: Maybe<Scalars['Boolean']>;
  ratingAs?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  with3YearComparison?: Maybe<Scalars['Boolean']>;
  withAverage?: Maybe<Scalars['Boolean']>;
  withHighestAndLowestRatings?: Maybe<Scalars['Boolean']>;
  withNames?: Maybe<Scalars['Boolean']>;
  withNormalization?: Maybe<Scalars['Boolean']>;
  withRatingCount?: Maybe<Scalars['Boolean']>;
  withRatingPercentage?: Maybe<Scalars['Boolean']>;
};

export type PerformanceSummaryUserDetails = {
  __typename?: 'PerformanceSummaryUserDetails';
  evaluations: Array<Evaluation>;
  performanceSummary: PerformanceSummary;
  questionSummary: Array<QuestionSummary>;
};

export type PromoteData = {
  evaluationTypeId: Scalars['Float'];
  titleId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  exportAllUsers: ExportOutPut;
  exportContributorsPerPerson: ExportOutPut;
  exportDetailUsersExcel: ExportOutPut;
  exportMissingEvaluations: ExportOutPut;
  exportMyEvaluations: ExportOutPut;
  exportMySelfAssessment: ExportOutPut;
  exportOverallPerformanceSummary: ExportOutPut;
  exportPerformanceSummary: ExportOutPut;
  exportRankingSummary: ExportOutPut;
  exportRatingSummary: ExportOutPut;
  exportSAs: ExportOutPut;
  getAllCycle: Array<Cycle>;
  getAllCycleContributorUsersWithPagination: CycleContributorUserPagination;
  /** Get All CycleContributors */
  getAllCycleContributorsWithPagination: CycleContributorPagination;
  getAllCyclesWithPagination: CyclePagination;
  getAllDepartments: Array<Department>;
  getAllDepartmentsWithPagination: DepartmentPagination;
  getAllDetailEvaluationTypes: TypePagination;
  getAllEvaluationTypes: Array<EvaluationType>;
  getAllLocations: Array<Location>;
  getAllLocationsWithPagination: LocationPagination;
  /** Get all reminders on Admin Dashboard */
  getAllNotificationLogs: Array<NotificationLog>;
  getAllNotificationScheduleds: Array<NotificationScheduled>;
  getAllNotificationShorts: Array<NotificationShort>;
  getAllNotificationTemplates: Array<NotificationTemplate>;
  getAllOverallPerformanceSummaries: Array<OverallPerformanceSummary>;
  getAllPerformanceSummarys: Array<PerformanceSummary>;
  getAllQuestionsWithPagination: QuestionPagination;
  getAllReminderTemplateDetail: TemplatePagination;
  getAllReminderTemplates: Array<ReminderTemplate>;
  getAllRoles: Array<Role>;
  getAllSettings: Array<Setting>;
  getAllStrategies: Array<Strategy>;
  getAllStrategiesWithPagination: StrategyPagination;
  getAllTitles: Array<Title>;
  getAllTitlesWithPagination: TitlePagination;
  getAllUsers: Array<User>;
  getAllUsersExcept: Array<User>;
  getAllUsersWithDetail: UserPagination;
  /** Get contributors on Admin mode -> View -> Full or Evaluation mode -> My Form -> My list of contributor */
  getContributorsOfEvaluatee: CycleContributorUserPagination;
  /** Get distribution of your ratings and Distribution of your Saved & Submitted Ratings on evaluatees for this cycle on Evaluation */
  getDistributionRatings: DistributionRatingDetails;
  /** Get evaluation in View on Admin mode */
  getEvaluationInfo?: Maybe<Array<Evaluation>>;
  /** Get highest ratings on Admin Dashboard */
  getHighestRating: Array<HighestRatingUsers>;
  getLOCApproval: ExportOutPut;
  /** get contributor on Admin mode */
  getLOCsAdminMode: UserPagination;
  /** Get list of contributors awaiting approval on Evaluation */
  getLOCsAwaitingApproval: LoCsDetail;
  /** get contributor on My team s form */
  getLOCsMyTeamForm: UserPagination;
  getLastYearContributors: CycleContributorUserPagination;
  /** Get list of performance evaluations on Evaluation */
  getListOfPerformanceEvaluations: EvaluationDetails;
  /** Get list of performance summaries on Evaluation */
  getListOfPerformanceSummary: Array<PerformanceSummaryDetails>;
  /** Get list of performance evaluations on Admin Dashboard */
  getListPerformanceEvaluations: Array<EvaluationSummary>;
  /** get List of action on Admin mode */
  getListUserAction: UserActionPagination;
  /** Get my evaluations in Evaluation Mode -> My Forms -> My Evaluations */
  getMyEvaluations: EvaluationsPagination;
  getMySelfAssessment: Evaluation;
  getOneCycle: Cycle;
  getOneCycleContributor: CycleContributor;
  getOneCycleContributorUser: CycleContributorUser;
  getOneDepartment?: Maybe<Department>;
  getOneEvaluation: Evaluation;
  getOneEvaluationType: EvaluationType;
  getOneEvaluationTypeQuestion: EvaluationTypeQuestion;
  getOneLocation: Location;
  getOneNotificationScheduled: NotificationScheduled;
  getOneNotificationShort: NotificationShort;
  getOneNotificationTemplate: NotificationTemplate;
  getOneOverallPerformanceSummary: OverallPerformanceSummary;
  getOnePerformanceSummary: PerformanceSummary;
  getOneReminderTemplate: ReminderTemplate;
  getOneRole: Role;
  getOneSetting: Setting;
  getOneStrategy: Strategy;
  getOneTitle: Title;
  getOneUser: User;
  /** Show Open Evalution For User */
  getOpenEvaluation: Evaluation;
  /** Get all pending LOC approvals on Admin Dashboard */
  getPendingLOCApproval: Array<CycleContributor>;
  /** Evaluation mode -> Report -> Performance summary -> Performance summary detail */
  getPerformanceSummaryDetails?: Maybe<PerformanceSummaryUserDetails>;
  getPreCycle?: Maybe<Cycle>;
  getQuestionsWithSpecificType: Array<EvaluationTypeQuestion>;
  /** Evaluation mode -> Report -> Performance summary */
  getReportPerformanceSummary: Array<PerformanceSummaryDetails>;
  getResetForms: ResetForms;
  /** Get self assessment for evaluatees on Evaluation Dashboard */
  getSelfAssessmentForEvaluatees: EvaluationDetails;
  getSelfAssessmentList: UserEvaluationPagination;
  /** Get contributors of a given user */
  getUserContributors: Array<CycleContributorUser>;
  /** Get Evaluation details of the given User ID  */
  getUserEvaluation: Evaluation;
  /** Get All Users For Open Evaluation */
  getUserForOpenEvaluation: Array<User>;
  /** Get user profile on All Users page */
  getUserProfile: User;
  getUsersInReminder: Array<User>;
  /** Get List Of Contributors on Admin Dashboard */
  listContributors: OverviewEvaluation;
  /** Get contributors of a given user */
  listSubmit: CycleContributorFilter;
  me: User;
  /** Get my contributors on Evaluation */
  myContributorStatus?: Maybe<CycleContributor>;
  /** Get my self assessment on Evaluation Dashboard */
  mySelfAssessment: UserEvaluationStatus;
  /** Get Overall Progress on Admin Dashboard */
  overallProgress: OverviewEvaluation;
  /** Get of Performance Evaluation on Admin Dashboard */
  performanceEvaluation: OverviewEvaluation;
  /** Get Self-Assessments on Admin Dashboard */
  selfAssessments: OverviewEvaluation;
  shareOverallPerformanceSummary: ShareOpsOutPut;
};


export type QueryExportContributorsPerPersonArgs = {
  filter: UserActionFilter;
};


export type QueryExportDetailUsersExcelArgs = {
  filter: UserActionFilter;
};


export type QueryExportMissingEvaluationsArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};


export type QueryExportOverallPerformanceSummaryArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};


export type QueryExportPerformanceSummaryArgs = {
  filter: UserActionFilter;
  payload: PerformanceSummaryPayload;
};


export type QueryExportRankingSummaryArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};


export type QueryExportRatingSummaryArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};


export type QueryExportSAsArgs = {
  filter?: Maybe<UserActionFilter>;
  payload: PayLoad;
};


export type QueryGetAllCycleContributorUsersWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
};


export type QueryGetAllCycleContributorsWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
};


export type QueryGetAllCyclesWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<SortField>;
};


export type QueryGetAllDepartmentsArgs = {
  departmentId?: Maybe<Scalars['Float']>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QueryGetAllDepartmentsWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<DepartmentSortField>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QueryGetAllDetailEvaluationTypesArgs = {
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<SortField>;
};


export type QueryGetAllLocationsWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<LocationSortField>;
};


export type QueryGetAllNotificationLogsArgs = {
  userId?: Maybe<Scalars['Float']>;
};


export type QueryGetAllQuestionsWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
};


export type QueryGetAllReminderTemplateDetailArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<SortFieldTemplate>;
};


export type QueryGetAllStrategiesWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<StrategySortField>;
};


export type QueryGetAllTitlesWithPaginationArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<TitleSortField>;
};


export type QueryGetAllUsersExceptArgs = {
  ids: Array<Scalars['Float']>;
};


export type QueryGetAllUsersWithDetailArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
};


export type QueryGetContributorsOfEvaluateeArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isEvaluator: Scalars['Boolean'];
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
  userId: Scalars['Float'];
};


export type QueryGetDistributionRatingsArgs = {
  evaluationType?: Maybe<Scalars['Float']>;
  question?: Maybe<Scalars['Float']>;
};


export type QueryGetEvaluationInfoArgs = {
  contributorId?: Maybe<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
  evaluateeId: Scalars['Float'];
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
};


export type QueryGetLocApprovalArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};


export type QueryGetLoCsAdminModeArgs = {
  cycleId?: Maybe<Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  sort?: Maybe<UserSortField>;
  statusLOC?: Maybe<Array<Scalars['String']>>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
};


export type QueryGetLoCsMyTeamFormArgs = {
  cycleId?: Maybe<Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  sort?: Maybe<UserSortField>;
  statusLOC?: Maybe<Array<Scalars['String']>>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
};


export type QueryGetLastYearContributorsArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
  userId: Scalars['Float'];
};


export type QueryGetListUserActionArgs = {
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locStatus?: Maybe<Array<Scalars['String']>>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  missingEvaluationsIds?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  psStatus?: Maybe<Scalars['Boolean']>;
  saStatus?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
};


export type QueryGetMyEvaluationsArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<UserSortField>;
};


export type QueryGetOneCycleArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneCycleContributorArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneCycleContributorUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneDepartmentArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneEvaluationArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneEvaluationTypeArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneEvaluationTypeQuestionArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneLocationArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneNotificationScheduledArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneNotificationShortArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneNotificationTemplateArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneOverallPerformanceSummaryArgs = {
  id: Scalars['Float'];
};


export type QueryGetOnePerformanceSummaryArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneReminderTemplateArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneRoleArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneSettingArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneStrategyArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneTitleArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetOpenEvaluationArgs = {
  evaluateeId: Scalars['Float'];
};


export type QueryGetPerformanceSummaryDetailsArgs = {
  cycleId?: Maybe<Scalars['Float']>;
  userId: Scalars['Float'];
};


export type QueryGetQuestionsWithSpecificTypeArgs = {
  evaluationType: Scalars['Float'];
};


export type QueryGetReportPerformanceSummaryArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
};


export type QueryGetResetFormsArgs = {
  filter?: Maybe<UserActionFilter>;
};


export type QueryGetSelfAssessmentListArgs = {
  page: Scalars['Float'];
  pageSize?: Maybe<Scalars['Float']>;
  sort?: Maybe<SortUserEvaluation>;
};


export type QueryGetUserContributorsArgs = {
  userId?: Maybe<Scalars['Float']>;
};


export type QueryGetUserEvaluationArgs = {
  contributorId?: Maybe<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
  evaluateeId?: Maybe<Scalars['Float']>;
  evaluationId?: Maybe<Scalars['Float']>;
  isEvaluationMode?: Maybe<Scalars['Boolean']>;
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
};


export type QueryGetUserForOpenEvaluationArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryGetUserProfileArgs = {
  userId: Scalars['Float'];
};


export type QueryGetUsersInReminderArgs = {
  filter: UserActionFilter;
  recipient: Scalars['String'];
};


export type QueryListContributorsArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QueryListSubmitArgs = {
  filter: UserActionFilter;
};


export type QueryOverallProgressArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QueryPerformanceEvaluationArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QuerySelfAssessmentsArgs = {
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  strategyId?: Maybe<Scalars['Float']>;
};


export type QueryShareOverallPerformanceSummaryArgs = {
  filter: UserActionFilter;
  payload: PayLoad;
};

export type QuestionPagination = Pagination & {
  __typename?: 'QuestionPagination';
  data: Array<EvaluationTypeQuestion>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type QuestionSummary = {
  __typename?: 'QuestionSummary';
  question: EvaluationTypeQuestion;
  ratingAverage: Scalars['Float'];
  ratingAverageMdAndAbove: Scalars['Float'];
};

export type Rating = {
  __typename?: 'Rating';
  entries: Scalars['Float'];
  normalize?: Maybe<Scalars['Float']>;
  percentage: Scalars['Float'];
  score?: Maybe<Scalars['Float']>;
};

/** Recipients of reminder */
export enum Recipients {
  Contributors = 'contributors',
  Evaluators = 'evaluators',
  Users = 'users'
}

export type ReminderTemplate = {
  __typename?: 'ReminderTemplate';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  key: Scalars['String'];
  name: Scalars['String'];
  reminderMe: Scalars['Boolean'];
  shortContent: Scalars['String'];
  subject: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ReminderTemplateInput = {
  content: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  reminderMe: Scalars['Boolean'];
  shortContent: Scalars['String'];
  subject: Scalars['String'];
};

export type ResetForms = {
  __typename?: 'ResetForms';
  data: Array<User>;
  total: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RoleInput = {
  name: Scalars['String'];
  userId: Scalars['Float'];
};

export type Setting = {
  __typename?: 'Setting';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  key: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type SettingInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type ShareOpsOutPut = {
  __typename?: 'ShareOpsOutPut';
  error?: Maybe<Scalars['String']>;
  status: Scalars['Boolean'];
};

export type SortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type SortFieldTemplate = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type SortUserEvaluation = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type Strategy = {
  __typename?: 'Strategy';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StrategyInput = {
  name: Scalars['String'];
};

export type StrategyPagination = Pagination & {
  __typename?: 'StrategyPagination';
  data: Array<Strategy>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type StrategySortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type SubmitAllStatus = {
  __typename?: 'SubmitAllStatus';
  data: Array<EvaluationAnswerWithDetails>;
  error: Scalars['Boolean'];
};

export type TemplatePagination = Pagination & {
  __typename?: 'TemplatePagination';
  data: Array<ReminderTemplate>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type Title = {
  __typename?: 'Title';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isMDOrAbove?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TitleInput = {
  isMDOrAbove?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type TitlePagination = Pagination & {
  __typename?: 'TitlePagination';
  data: Array<Title>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type TitleSortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type TypePagination = Pagination & {
  __typename?: 'TypePagination';
  data: Array<EvaluationType>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  completedPSsByUser: Array<PerformanceSummary>;
  createdAt: Scalars['DateTime'];
  cycleContributors: Array<CycleContributor>;
  cycleId?: Maybe<Scalars['Float']>;
  department?: Maybe<Department>;
  email: Scalars['String'];
  evaluationType?: Maybe<EvaluationType>;
  /** Get evaluations of User */
  evaluations: Array<EvaluationWithDuration>;
  evaluationsByMe?: Maybe<Array<Evaluation>>;
  evaluationsOnMe?: Maybe<Array<Evaluation>>;
  evaluator?: Maybe<User>;
  firstName: Scalars['String'];
  id: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  isEvaluator: Scalars['Boolean'];
  /** Get list of evaluatee in User profile */
  isEvaluatorFor: Array<User>;
  isInactive?: Maybe<Scalars['Boolean']>;
  isLockedSystem?: Maybe<Scalars['Boolean']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  lastPromotionCycleId?: Maybe<Scalars['Float']>;
  /** Get list of contributors of User */
  listOfContributors?: Maybe<CycleContributor>;
  location?: Maybe<Location>;
  name: Scalars['String'];
  /** Get open evaluations of User */
  openEvaluations: Array<Evaluation>;
  overallPerformanceSummary?: Maybe<Array<OverallPerformanceSummary>>;
  performanceSummary?: Maybe<Array<PerformanceSummary>>;
  permissionsExtraUsers?: Maybe<Array<UsersExtra>>;
  permissionsLimitedUsers?: Maybe<Array<UsersLimited>>;
  previousTitle?: Maybe<Title>;
  /** Get reminders of User */
  reminders: Array<NotificationLog>;
  roleCityCode?: Maybe<Scalars['String']>;
  roleCountryCode?: Maybe<Scalars['String']>;
  roleLocationId?: Maybe<Scalars['Float']>;
  roles?: Maybe<Array<Role>>;
  /** Get self assessment of User */
  selfAssessment?: Maybe<EvaluationWithDuration>;
  showPreviousComment?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  strategy?: Maybe<Strategy>;
  title?: Maybe<Title>;
  updatedAt: Scalars['DateTime'];
  userAdminCountry: Array<UserAdminCountry>;
  userAdminLocation: Array<UserAdminLocation>;
};

export type UserAccountInput = {
  departmentId?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  evaluationTypeId: Scalars['Float'];
  evaluatorId?: Maybe<Scalars['Float']>;
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isInactive: Scalars['Boolean'];
  isLockedSystem?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  lastPromotionCycleId?: Maybe<Scalars['Float']>;
  locationId?: Maybe<Scalars['Float']>;
  password: Scalars['String'];
  previousTitleId?: Maybe<Scalars['Float']>;
  roleCityCode?: Maybe<Scalars['String']>;
  roleCountryCode?: Maybe<Scalars['String']>;
  roleLocationId?: Maybe<Scalars['Float']>;
  showPreviousComment?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['DateTime']>;
  strategyId?: Maybe<Scalars['Float']>;
  titleId?: Maybe<Scalars['Float']>;
};

export type UserActionData = {
  __typename?: 'UserActionData';
  evaluationsBy?: Maybe<EvaluationsDetail>;
  evaluationsFor?: Maybe<EvaluationsDetail>;
  listOfContributors?: Maybe<Array<CycleContributor>>;
  overallPerformanceSummary?: Maybe<Array<OverallPerformanceSummary>>;
  performanceSummary?: Maybe<Array<PerformanceSummary>>;
  selfAssessment?: Maybe<Evaluation>;
  user: User;
};

export type UserActionFilter = {
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  departmentIds?: Maybe<Array<Scalars['Float']>>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']>>;
  evaluatorIds?: Maybe<Array<Scalars['Float']>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isSelectAll: Scalars['Boolean'];
  locStatus?: Maybe<Array<Scalars['String']>>;
  locationIds?: Maybe<Array<Scalars['Float']>>;
  missingEvaluationsIds?: Maybe<Array<Scalars['Int']>>;
  name?: Maybe<Scalars['String']>;
  psStatus?: Maybe<Scalars['Boolean']>;
  saStatus?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<UserSortField>;
  strategyIds?: Maybe<Array<Scalars['Float']>>;
  titleIds?: Maybe<Array<Scalars['Float']>>;
  userIds: Array<Scalars['Int']>;
};

export type UserActionPagination = Pagination & {
  __typename?: 'UserActionPagination';
  data: Array<UserActionData>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type UserActionSortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type UserAdminCountry = {
  __typename?: 'UserAdminCountry';
  countryCode: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UserAdminLocation = {
  __typename?: 'UserAdminLocation';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  location: Location;
  updatedAt: Scalars['DateTime'];
};

export type UserEvaluationPagination = Pagination & {
  __typename?: 'UserEvaluationPagination';
  data: Array<Evaluation>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type UserEvaluationStatus = {
  __typename?: 'UserEvaluationStatus';
  evaluatee?: Maybe<User>;
  evaluationId?: Maybe<Scalars['Float']>;
  evaluationStatus?: Maybe<Scalars['String']>;
};

export type UserPagination = Pagination & {
  __typename?: 'UserPagination';
  data: Array<User>;
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
  total: Scalars['Float'];
};

export type UserProfileInput = {
  departmentId?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  evaluationTypeId: Scalars['Float'];
  evaluatorId?: Maybe<Scalars['Float']>;
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isInactive: Scalars['Boolean'];
  isLockedSystem?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  lastPromotionCycleId?: Maybe<Scalars['Float']>;
  locationId?: Maybe<Scalars['Float']>;
  permissionsExtraUsersId: Array<Scalars['Int']>;
  permissionsLimitedUsersId: Array<Scalars['Int']>;
  previousTitleId?: Maybe<Scalars['Float']>;
  roleCityCode?: Maybe<Scalars['String']>;
  roleCountryCode?: Maybe<Scalars['String']>;
  roleLocationId?: Maybe<Scalars['Float']>;
  showPreviousComment?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['DateTime']>;
  strategyId?: Maybe<Scalars['Float']>;
  titleId?: Maybe<Scalars['Float']>;
  updatedUserRoles: Array<Scalars['Int']>;
  userAdminCountriesCode: Array<Scalars['String']>;
  userAdminLocationsId: Array<Scalars['Int']>;
};

export type UserSortField = {
  field: Scalars['String'];
  order?: Maybe<Scalars['String']>;
};

export type UsersExtra = {
  __typename?: 'UsersExtra';
  createdAt: Scalars['DateTime'];
  extra: User;
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type UsersLimited = {
  __typename?: 'UsersLimited';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  limited: User;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type ActionUserFragmentFragment = { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, startDate: any, image?: string | null | undefined, cycleId?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined };

export type AdminViewEvaluationsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  locationIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  titleIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluatorIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  saStatus?: Maybe<Scalars['Boolean']>;
  missingEvaluationsIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  page: Scalars['Float'];
}>;


export type AdminViewEvaluationsQuery = { __typename?: 'Query', adminViewEvaluations: { __typename?: 'UserActionPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'UserActionData', user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, startDate: any, image?: string | null | undefined, cycleId?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, evaluationsFor?: { __typename?: 'EvaluationsDetail', percentComplete: number, evaluations: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, optOut: boolean, isOpenEvaluation: boolean, status?: string | null | undefined, contributor?: { __typename?: 'User', id: number, name: string } | null | undefined }> } | null | undefined, evaluationsBy?: { __typename?: 'EvaluationsDetail', percentComplete: number, evaluations: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, optOut: boolean, isOpenEvaluation: boolean, status?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined, contributor?: { __typename?: 'User', id: number, name: string } | null | undefined }> } | null | undefined, selfAssessment?: { __typename?: 'Evaluation', id: number, status?: string | null | undefined, isComplete?: boolean | null | undefined } | null | undefined }> } };

export type AdminViewReportsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  locationIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  titleIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluatorIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  psStatus?: Maybe<Scalars['Boolean']>;
  page: Scalars['Float'];
}>;


export type AdminViewReportsQuery = { __typename?: 'Query', adminViewReports: { __typename?: 'UserActionPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'UserActionData', user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, startDate: any, image?: string | null | undefined, cycleId?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, performanceSummary?: Array<{ __typename?: 'PerformanceSummary', id: number, isComplete?: boolean | null | undefined }> | null | undefined, overallPerformanceSummary?: Array<{ __typename?: 'OverallPerformanceSummary', id: number, isShare?: boolean | null | undefined, sharedDate?: any | null | undefined }> | null | undefined }> } };

export type AdminViewFullQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  locationIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  titleIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluatorIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  locStatus?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  saStatus?: Maybe<Scalars['Boolean']>;
  missingEvaluationsIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
  psStatus?: Maybe<Scalars['Boolean']>;
  page: Scalars['Float'];
}>;


export type AdminViewFullQuery = { __typename?: 'Query', adminViewFull: { __typename?: 'UserActionPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'UserActionData', user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, startDate: any, image?: string | null | undefined, cycleId?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, listOfContributors?: Array<{ __typename?: 'CycleContributor', id: number, status: string }> | null | undefined, evaluationsFor?: { __typename?: 'EvaluationsDetail', percentComplete: number, evaluations: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, optOut: boolean, isOpenEvaluation: boolean, status?: string | null | undefined, contributor?: { __typename?: 'User', id: number, name: string } | null | undefined }> } | null | undefined, evaluationsBy?: { __typename?: 'EvaluationsDetail', percentComplete: number, evaluations: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, optOut: boolean, isOpenEvaluation: boolean, status?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> } | null | undefined, selfAssessment?: { __typename?: 'Evaluation', id: number, status?: string | null | undefined, isComplete?: boolean | null | undefined } | null | undefined, performanceSummary?: Array<{ __typename?: 'PerformanceSummary', id: number, isComplete?: boolean | null | undefined }> | null | undefined, overallPerformanceSummary?: Array<{ __typename?: 'OverallPerformanceSummary', id: number, isShare?: boolean | null | undefined, sharedDate?: any | null | undefined }> | null | undefined }> } };

export type AdminViewLocQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  locationIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  titleIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluatorIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  actionSort?: Maybe<UserActionSortField>;
  cycleId?: Maybe<Scalars['Int']>;
  locStatus?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  page: Scalars['Float'];
}>;


export type AdminViewLocQuery = { __typename?: 'Query', adminViewLOC: { __typename?: 'UserActionPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'UserActionData', user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, startDate: any, image?: string | null | undefined, cycleId?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, listOfContributors?: Array<{ __typename?: 'CycleContributor', id: number, status: string }> | null | undefined }> } };

export type MainResetFormsFragmentFragment = { __typename?: 'User', cycleContributors: Array<{ __typename?: 'CycleContributor', id: number, status: string }>, evaluationsOnMe?: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> | null | undefined, evaluationsByMe?: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> | null | undefined, completedPSsByUser: Array<{ __typename?: 'PerformanceSummary', id: number, user: { __typename?: 'User', id: number, name: string } }> };

export type GetResetFormsQueryVariables = Exact<{
  filter?: Maybe<UserActionFilter>;
}>;


export type GetResetFormsQuery = { __typename?: 'Query', getResetForms: { __typename?: 'ResetForms', total: number, data: Array<{ __typename?: 'User', id: number, name: string, cycleContributors: Array<{ __typename?: 'CycleContributor', id: number, status: string }>, evaluationsOnMe?: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> | null | undefined, evaluationsByMe?: Array<{ __typename?: 'Evaluation', id: number, isComplete?: boolean | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> | null | undefined, completedPSsByUser: Array<{ __typename?: 'PerformanceSummary', id: number, user: { __typename?: 'User', id: number, name: string } }> }> } };

export type ResetListOfContributorsMutationVariables = Exact<{
  locIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type ResetListOfContributorsMutation = { __typename?: 'Mutation', resetListOfContributors: Array<{ __typename?: 'CycleContributor', id: number, status: string }> };

export type ResetEvaluationsMutationVariables = Exact<{
  eIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type ResetEvaluationsMutation = { __typename?: 'Mutation', resetEvaluation: Array<{ __typename?: 'Evaluation', id: number, name: string, isComplete?: boolean | null | undefined, isOpenEvaluation: boolean, status?: string | null | undefined, optOut: boolean, contributor?: { __typename?: 'User', id: number, name: string } | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }> };

export type ResetPerformanceSummaryMutationVariables = Exact<{
  psIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type ResetPerformanceSummaryMutation = { __typename?: 'Mutation', resetPerformanceSummary: Array<{ __typename?: 'PerformanceSummary', id: number, isComplete?: boolean | null | undefined, cycle: { __typename?: 'Cycle', id: number } }> };

export type ExportAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ExportAllUsersQuery = { __typename?: 'Query', exportAllUsers: { __typename?: 'ExportOutPut', url: string } };

export type ExportDetailUsersExcelQueryVariables = Exact<{
  filter: UserActionFilter;
}>;


export type ExportDetailUsersExcelQuery = { __typename?: 'Query', exportDetailUsersExcel: { __typename?: 'ExportOutPut', url: string } };

export type ListSubmitQueryVariables = Exact<{
  filter: UserActionFilter;
}>;


export type ListSubmitQuery = { __typename?: 'Query', listSubmit: { __typename?: 'CycleContributorFilter', listSubmitted: Array<{ __typename?: 'CycleContributor', id: number, status: string, user: { __typename?: 'User', id: number, name: string } }>, listUnSubmitted: Array<{ __typename?: 'CycleContributor', id: number, status: string, user: { __typename?: 'User', id: number, name: string } }> } };

export type PerformanceEvaluationQueryVariables = Exact<{
  strategyId?: Maybe<Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
}>;


export type PerformanceEvaluationQuery = { __typename?: 'Query', performanceEvaluation: { __typename?: 'OverviewEvaluation', percentComplete: number, complete: number, overall: number } };

export type SelfAssessmentsQueryVariables = Exact<{
  strategyId?: Maybe<Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
}>;


export type SelfAssessmentsQuery = { __typename?: 'Query', selfAssessments: { __typename?: 'OverviewEvaluation', percentComplete: number, complete: number, overall: number } };

export type ListContributorsQueryVariables = Exact<{
  strategyId?: Maybe<Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
}>;


export type ListContributorsQuery = { __typename?: 'Query', listContributors: { __typename?: 'OverviewEvaluation', percentComplete: number, complete: number, overall: number } };

export type OverallProgressQueryVariables = Exact<{
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyId?: Maybe<Scalars['Float']>;
}>;


export type OverallProgressQuery = { __typename?: 'Query', overallProgress: { __typename?: 'OverviewEvaluation', percentComplete: number, complete: number, overall: number } };

export type GetListOfPerformanceSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPerformanceSummaryQuery = { __typename?: 'Query', getListOfPerformanceSummary: Array<{ __typename?: 'PerformanceSummaryDetails', id: number, percentComplete: number, isComplete?: boolean | null | undefined, status?: string | null | undefined, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined, department?: { __typename?: 'Department', id: number, name: string, deadlinePerformanceEvaluation?: any | null | undefined } | null | undefined, evaluator?: { __typename?: 'User', id: number } | null | undefined } }> };

export type GetPendingLocApprovalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingLocApprovalQuery = { __typename?: 'Query', getPendingLOCApproval: Array<{ __typename?: 'CycleContributor', id: number, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } }> };

export type UserContributorFragmentFragment = { __typename?: 'CycleContributorUser', id: number, projectDetails: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } };

export type GetContributorsOfUserQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
  userId: Scalars['Float'];
  sort?: Maybe<UserSortField>;
  isEvaluator: Scalars['Boolean'];
}>;


export type GetContributorsOfUserQuery = { __typename?: 'Query', getContributorsOfUser: { __typename?: 'CycleContributorUserPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'CycleContributorUser', id: number, projectDetails: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } }> } };

export type AddContributorOfUserMutationVariables = Exact<{
  userId: Scalars['Float'];
  data: Array<CreateContributorInput> | CreateContributorInput;
}>;


export type AddContributorOfUserMutation = { __typename?: 'Mutation', addContributors: Array<{ __typename?: 'CycleContributorUser', id: number, projectDetails: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } }> };

export type GetLastYearContributorsQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
  userId: Scalars['Float'];
  sort?: Maybe<UserSortField>;
}>;


export type GetLastYearContributorsQuery = { __typename?: 'Query', getLastYearContributors: { __typename?: 'CycleContributorUserPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'CycleContributorUser', id: number, projectDetails: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } }> } };

export type GetMyLoCsQueryVariables = Exact<{
  page: Scalars['Float'];
  sort?: Maybe<UserSortField>;
}>;


export type GetMyLoCsQuery = { __typename?: 'Query', getLOCsMyTeamForm: { __typename?: 'UserPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'User', id: number, listOfContributors?: { __typename?: 'CycleContributor', id: number, status: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', name: string } | null | undefined, strategy?: { __typename?: 'Strategy', name: string } | null | undefined, department?: { __typename?: 'Department', name: string } | null | undefined, location?: { __typename?: 'Location', name: string } | null | undefined } } | null | undefined }> } };

export type SubmitLocMutationVariables = Exact<{
  isSendReminder: Scalars['Boolean'];
  evaluateeId?: Maybe<Scalars['Float']>;
}>;


export type SubmitLocMutation = { __typename?: 'Mutation', submitLOC: { __typename?: 'CycleContributor', id: number, status: string } };

export type ApproveLocMutationVariables = Exact<{
  isSendReminder: Scalars['Boolean'];
  ids: CycleContributorId;
}>;


export type ApproveLocMutation = { __typename?: 'Mutation', approveLOC: Array<{ __typename?: 'CycleContributor', id: number, status: string }> };

export type GetAllCyclesWithPaginationQueryVariables = Exact<{
  sort?: Maybe<SortField>;
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
}>;


export type GetAllCyclesWithPaginationQuery = { __typename?: 'Query', getAllCyclesWithPagination: { __typename?: 'CyclePagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Cycle', id: number, createdAt: any, updatedAt: any, isActive: boolean, name: string }> } };

export type GetOneCycleQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneCycleQuery = { __typename?: 'Query', getOneCycle: { __typename?: 'Cycle', id: number, name: string } };

export type AddOneCycleMutationVariables = Exact<{
  data: CycleInput;
}>;


export type AddOneCycleMutation = { __typename?: 'Mutation', addOneCycle: { __typename?: 'Cycle', id: number, name: string } };

export type UpdateOneCycleMutationVariables = Exact<{
  id: Scalars['Float'];
  data: CycleInput;
}>;


export type UpdateOneCycleMutation = { __typename?: 'Mutation', updateOneCycle: { __typename?: 'Cycle', id: number, name: string } };

export type DeleteOneCycleMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteOneCycleMutation = { __typename?: 'Mutation', deleteOneCycle: string };

export type GetAllCyclesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCyclesQuery = { __typename?: 'Query', getAllCycle: Array<{ __typename?: 'Cycle', id: number, createdAt: any, updatedAt: any, isActive: boolean, name: string }> };

export type GetPreCycleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPreCycleQuery = { __typename?: 'Query', getPreCycle?: { __typename?: 'Cycle', id: number } | null | undefined };

export type DeleteCyclesMutationVariables = Exact<{
  input: DeleteCyclesInput;
}>;


export type DeleteCyclesMutation = { __typename?: 'Mutation', deleteCycles: string };

export type DepartmentFragment = { __typename?: 'Department', id: number, name: string, deadlineLOC?: any | null | undefined, deadlineConfirmLOC?: any | null | undefined, deadlineSelfAssessment?: any | null | undefined, deadlinePerformanceEvaluation?: any | null | undefined, lockDate?: any | null | undefined, showPreviousComment?: boolean | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined };

export type GetAllDepartmentsQueryVariables = Exact<{
  strategyId?: Maybe<Scalars['Float']>;
  departmentId?: Maybe<Scalars['Float']>;
}>;


export type GetAllDepartmentsQuery = { __typename?: 'Query', getAllDepartments: Array<{ __typename?: 'Department', id: number, name: string, deadlineLOC?: any | null | undefined, deadlineConfirmLOC?: any | null | undefined, deadlineSelfAssessment?: any | null | undefined, deadlinePerformanceEvaluation?: any | null | undefined, lockDate?: any | null | undefined, showPreviousComment?: boolean | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined }> };

export type GetAllDepartmentsWithPaginationQueryVariables = Exact<{
  strategyId?: Maybe<Scalars['Float']>;
  sort?: Maybe<DepartmentSortField>;
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
}>;


export type GetAllDepartmentsWithPaginationQuery = { __typename?: 'Query', getAllDepartmentsWithPagination: { __typename?: 'DepartmentPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Department', id: number, name: string, deadlineLOC?: any | null | undefined, deadlineConfirmLOC?: any | null | undefined, deadlineSelfAssessment?: any | null | undefined, deadlinePerformanceEvaluation?: any | null | undefined, lockDate?: any | null | undefined, showPreviousComment?: boolean | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined }> } };

export type GetOneDepartmentQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneDepartmentQuery = { __typename?: 'Query', getOneDepartment?: { __typename?: 'Department', id: number, name: string, deadlineLOC?: any | null | undefined, deadlineConfirmLOC?: any | null | undefined, deadlineSelfAssessment?: any | null | undefined, deadlinePerformanceEvaluation?: any | null | undefined, lockDate?: any | null | undefined, showPreviousComment?: boolean | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined } | null | undefined };

export type DeleteDepartmentMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteDepartmentMutation = { __typename?: 'Mutation', deleteDepartment: string };

export type GetEvaluationInfoQueryVariables = Exact<{
  evaluateeId: Scalars['Float'];
  contributorId?: Maybe<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
}>;


export type GetEvaluationInfoQuery = { __typename?: 'Query', getEvaluationInfo?: Array<{ __typename?: 'Evaluation', id: number, name: string, isComplete?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, optOut: boolean, isOpenEvaluation: boolean, status?: string | null | undefined, contributor?: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } | null | undefined }> | null | undefined };

export type GetUserForOpenEvaluationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserForOpenEvaluationQuery = { __typename?: 'Query', getUserForOpenEvaluation: Array<{ __typename?: 'User', id: number, name: string, lastPromotionCycleId?: number | null | undefined }> };

export type GetOpenEvaluationQueryVariables = Exact<{
  evaluateeId: Scalars['Float'];
}>;


export type GetOpenEvaluationQuery = { __typename?: 'Query', getOpenEvaluation: { __typename?: 'Evaluation', id: number, name: string, isSelfAssessment?: boolean | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string, startDate: any, image?: string | null | undefined, department?: { __typename?: 'Department', name: string } | null | undefined, title?: { __typename?: 'Title', name: string } | null | undefined } | null | undefined, cycle: { __typename?: 'Cycle', id: number }, evaluationType: { __typename?: 'EvaluationType', id: number, name: string, key?: string | null | undefined }, evaluationAnswers?: Array<{ __typename?: 'EvaluationAnswer', id: number, feedback?: string | null | undefined, score?: number | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isNADisabled: boolean, isNoExposureComment?: boolean | null | undefined } | null | undefined }> | null | undefined } };

export type UpdateEvaluationMutationVariables = Exact<{
  saveStatus: Scalars['String'];
  data: EvaluationUpdate;
  evaluationId: Scalars['Float'];
  isAdminMode: Scalars['Boolean'];
}>;


export type UpdateEvaluationMutation = { __typename?: 'Mutation', updateEvaluation: { __typename?: 'Evaluation', id: number, name: string, status?: string | null | undefined } };

export type ReverseOptOutMutationVariables = Exact<{
  evaluationId: Scalars['Float'];
}>;


export type ReverseOptOutMutation = { __typename?: 'Mutation', reverseOptOut: { __typename?: 'Evaluation', id: number, name: string } };

export type GetLoCsAwaitingApprovalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoCsAwaitingApprovalQuery = { __typename?: 'Query', getLOCsAwaitingApproval: { __typename?: 'LOCsDetail', percentComplete: number, complete: number, users: Array<{ __typename?: 'User', id: number, name: string, image?: string | null | undefined, cycleContributors: Array<{ __typename?: 'CycleContributor', id: number, status: string }>, department?: { __typename?: 'Department', id: number, name: string, deadlineLOC?: any | null | undefined, deadlineConfirmLOC?: any | null | undefined } | null | undefined }> } };

export type GetListOfPerformanceEvaluationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPerformanceEvaluationsQuery = { __typename?: 'Query', getListOfPerformanceEvaluations: { __typename?: 'EvaluationDetails', percentComplete: number, evaluationStatus: Array<{ __typename?: 'UserEvaluationStatus', evaluationId?: number | null | undefined, evaluationStatus?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string, image?: string | null | undefined, updatedAt: any, department?: { __typename?: 'Department', id: number, name: string, deadlinePerformanceEvaluation?: any | null | undefined } | null | undefined } | null | undefined }> } };

export type GetListPerformanceEvaluationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListPerformanceEvaluationsQuery = { __typename?: 'Query', getListPerformanceEvaluations: Array<{ __typename?: 'EvaluationSummary', completedPercentage: number, completePerformance: number, totalPerformance: number, isComplete: boolean, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } }> };

export type GetSelfAssessmentForEvaluateesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSelfAssessmentForEvaluateesQuery = { __typename?: 'Query', getSelfAssessmentForEvaluatees: { __typename?: 'EvaluationDetails', percentComplete: number, evaluationStatus: Array<{ __typename?: 'UserEvaluationStatus', evaluationId?: number | null | undefined, evaluationStatus?: string | null | undefined, evaluatee?: { __typename?: 'User', updatedAt: any, image?: string | null | undefined, id: number, name: string, department?: { __typename?: 'Department', id: number, name: string, deadlineSelfAssessment?: any | null | undefined } | null | undefined } | null | undefined }> } };

export type MyContributorsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyContributorsQuery = { __typename?: 'Query', myContributors?: { __typename?: 'CycleContributor', status: string, id: number, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } } | null | undefined };

export type MySelfAssessmentQueryVariables = Exact<{ [key: string]: never; }>;


export type MySelfAssessmentQuery = { __typename?: 'Query', mySelfAssessment: { __typename?: 'UserEvaluationStatus', evaluationStatus?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } | null | undefined } };

export type GetQuestionsWithSpecificTypeQueryVariables = Exact<{
  evaluationType: Scalars['Float'];
}>;


export type GetQuestionsWithSpecificTypeQuery = { __typename?: 'Query', getQuestionsWithSpecificType: Array<{ __typename?: 'EvaluationTypeQuestion', id: number, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined }> };

export type GetDistributionRatingsQueryVariables = Exact<{
  evaluationType?: Maybe<Scalars['Float']>;
  question?: Maybe<Scalars['Float']>;
}>;


export type GetDistributionRatingsQuery = { __typename?: 'Query', getDistributionRatings: { __typename?: 'DistributionRatingDetails', mean: number, stdDev: number, total: number, ratings: Array<{ __typename?: 'Rating', score?: number | null | undefined, entries: number, normalize?: number | null | undefined, percentage: number }> } };

export type EvaluationTypeQuestionFragment = { __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined };

export type GetOneEvaluationTypeQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneEvaluationTypeQuery = { __typename?: 'Query', getOneEvaluationType: { __typename?: 'EvaluationType', id: number, name: string, createdAt: any, evaluationTypeQuestions: Array<{ __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined }> } };

export type UpdateEvaluationTypeMutationVariables = Exact<{
  data: EvaluationTypeInput;
  typeId: Scalars['Float'];
}>;


export type UpdateEvaluationTypeMutation = { __typename?: 'Mutation', updateEvaluationType: { __typename?: 'EvaluationType', id: number, name: string, createdAt: any, evaluationTypeQuestions: Array<{ __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined }> } };

export type AddEvaluationTypeMutationVariables = Exact<{
  data: EvaluationTypeInput;
}>;


export type AddEvaluationTypeMutation = { __typename?: 'Mutation', addEvaluationType: { __typename?: 'EvaluationType', id: number, name: string, createdAt: any, evaluationTypeQuestions: Array<{ __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined }> } };

export type DeleteEvaluationTypeMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteEvaluationTypeMutation = { __typename?: 'Mutation', deleteEvaluationType: string };

export type GetAllDetailEvaluationTypesQueryVariables = Exact<{
  keyword?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  sort?: Maybe<SortField>;
  pageSize?: Maybe<Scalars['Float']>;
}>;


export type GetAllDetailEvaluationTypesQuery = { __typename?: 'Query', getAllDetailEvaluationTypes: { __typename?: 'TypePagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'EvaluationType', id: number, name: string, key?: string | null | undefined, createdAt: any, updatedAt: any }> } };

export type EvaluateeFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, updatedAt: any, lastPromotionCycleId?: number | null | undefined, showPreviousComment?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined };

export type GetMyEvaluationsQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
  sort?: Maybe<UserSortField>;
}>;


export type GetMyEvaluationsQuery = { __typename?: 'Query', getMyEvaluations: { __typename?: 'EvaluationsPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Evaluation', id: number, status?: string | null | undefined, optOut: boolean, isOpenEvaluation: boolean, evaluatee?: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } | null | undefined }> } };

export type GetUserEvaluationQueryVariables = Exact<{
  evaluationId?: Maybe<Scalars['Float']>;
  contributorId?: Maybe<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
  isSelfAssessment?: Maybe<Scalars['Boolean']>;
  evaluateeId?: Maybe<Scalars['Float']>;
  isEvaluationMode?: Maybe<Scalars['Boolean']>;
}>;


export type GetUserEvaluationQuery = { __typename?: 'Query', getOneEvaluation: { __typename?: 'Evaluation', id: number, name: string, optOut: boolean, optOutReason?: string | null | undefined, createdAt: any, updatedAt: any, status?: string | null | undefined, isSelfAssessment?: boolean | null | undefined, contributor?: { __typename?: 'User', id: number } | null | undefined, evaluatee?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, updatedAt: any, lastPromotionCycleId?: number | null | undefined, showPreviousComment?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined } | null | undefined, evaluationType: { __typename?: 'EvaluationType', name: string }, evaluationAnswers?: Array<{ __typename?: 'EvaluationAnswer', id: number, score?: number | null | undefined, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined } | null | undefined }> | null | undefined, cycle: { __typename?: 'Cycle', id: number } } };

export type GetOneEvaluationQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneEvaluationQuery = { __typename?: 'Query', getOneEvaluation: { __typename?: 'Evaluation', id: number, name: string, optOut: boolean, optOutReason?: string | null | undefined, createdAt: any, updatedAt: any, status?: string | null | undefined, isSelfAssessment?: boolean | null | undefined, contributor?: { __typename?: 'User', id: number } | null | undefined, evaluatee?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, updatedAt: any, lastPromotionCycleId?: number | null | undefined, showPreviousComment?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined } | null | undefined, evaluationType: { __typename?: 'EvaluationType', name: string }, evaluationAnswers?: Array<{ __typename?: 'EvaluationAnswer', id: number, score?: number | null | undefined, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, updatedAt: any, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isSelfAssessment?: boolean | null | undefined, isNADisabled: boolean, isEvaluation?: boolean | null | undefined, priority?: number | null | undefined, isNoExposureComment?: boolean | null | undefined } | null | undefined }> | null | undefined, cycle: { __typename?: 'Cycle', id: number } } };

export type DeleteEvaluationMutationVariables = Exact<{
  evaluationId: Scalars['Float'];
}>;


export type DeleteEvaluationMutation = { __typename?: 'Mutation', deleteEvaluation: string };

export type ExportMyEvaluationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExportMyEvaluationsQuery = { __typename?: 'Query', exportMyEvaluations: { __typename?: 'ExportOutPut', url: string } };

export type ExportMySelfAssessmentQueryVariables = Exact<{ [key: string]: never; }>;


export type ExportMySelfAssessmentQuery = { __typename?: 'Query', exportMySelfAssessment: { __typename?: 'ExportOutPut', url: string } };

export type SubmitEvaluationMutationVariables = Exact<{ [key: string]: never; }>;


export type SubmitEvaluationMutation = { __typename?: 'Mutation', submitEvaluation: { __typename?: 'SubmitAllStatus', error: boolean, data: Array<{ __typename?: 'EvaluationAnswerWithDetails', evaluation: { __typename?: 'Evaluation', id: number, status?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, name: string } | null | undefined }, answerAndQuestions: Array<{ __typename?: 'AnswerAndQuestions', question: { __typename?: 'EvaluationTypeQuestion', id: number, text: string, isOpenQuestion?: boolean | null | undefined, isRequired?: boolean | null | undefined, isNADisabled: boolean, title: string }, answer: { __typename?: 'AnswerDetails', id: number, feedback?: string | null | undefined, score?: number | null | undefined, isNoFeedback?: boolean | null | undefined, isNoScore?: boolean | null | undefined, isScore5s?: boolean | null | undefined, isScoreNA?: boolean | null | undefined } }> }> } };

export type OpsQuestionAndAnswerFragment = { __typename?: 'OverallPerformanceSummaryAnswer', id: number, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string, text: string, isEvaluation?: boolean | null | undefined, isRequired?: boolean | null | undefined, isOpenQuestion?: boolean | null | undefined } | null | undefined };

export type GetOneOverallPerformanceSummaryQueryVariables = Exact<{
  getOneOverallPerformanceSummaryId: Scalars['Float'];
}>;


export type GetOneOverallPerformanceSummaryQuery = { __typename?: 'Query', getOneOverallPerformanceSummary: { __typename?: 'OverallPerformanceSummary', id: number, status?: string | null | undefined, isShare?: boolean | null | undefined, sharedDate?: any | null | undefined, cycle: { __typename?: 'Cycle', id: number, name: string }, user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, image?: string | null | undefined, updatedAt: any, evaluator?: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, image?: string | null | undefined, updatedAt: any, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, overallPerformanceSummaryAnswers: Array<{ __typename?: 'OverallPerformanceSummaryAnswer', id: number, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string, text: string, isEvaluation?: boolean | null | undefined, isRequired?: boolean | null | undefined, isOpenQuestion?: boolean | null | undefined } | null | undefined }> } };

export type UpdateOneOverallPerformanceSummaryMutationVariables = Exact<{
  updateOneOverallPerformanceSummaryId: Scalars['Float'];
  data: OverallPerformanceSummaryInput;
}>;


export type UpdateOneOverallPerformanceSummaryMutation = { __typename?: 'Mutation', updateOneOverallPerformanceSummary: { __typename?: 'OverallPerformanceSummary', id: number, status?: string | null | undefined, isShare?: boolean | null | undefined, sharedDate?: any | null | undefined, cycle: { __typename?: 'Cycle', id: number, name: string }, user: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, image?: string | null | undefined, updatedAt: any, evaluator?: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, image?: string | null | undefined, updatedAt: any, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }, overallPerformanceSummaryAnswers: Array<{ __typename?: 'OverallPerformanceSummaryAnswer', id: number, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string, text: string, isEvaluation?: boolean | null | undefined, isRequired?: boolean | null | undefined, isOpenQuestion?: boolean | null | undefined } | null | undefined }> } };

export type LocationFragment = { __typename?: 'Location', id: number, createdAt: any, updatedAt: any, name: string, countryCode?: string | null | undefined };

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { __typename?: 'Query', getAllLocations: Array<{ __typename?: 'Location', id: number, createdAt: any, updatedAt: any, name: string, countryCode?: string | null | undefined }> };

export type GetAllLocationsWithPaginationQueryVariables = Exact<{
  sort?: Maybe<LocationSortField>;
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
}>;


export type GetAllLocationsWithPaginationQuery = { __typename?: 'Query', getAllLocationsWithPagination: { __typename?: 'LocationPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Location', id: number, createdAt: any, updatedAt: any, name: string, countryCode?: string | null | undefined }> } };

export type GetOneLocationQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneLocationQuery = { __typename?: 'Query', getOneLocation: { __typename?: 'Location', id: number, createdAt: any, updatedAt: any, name: string, countryCode?: string | null | undefined } };

export type DeleteLocationMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string } };

export type GetAllNotificationShortsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotificationShortsQuery = { __typename?: 'Query', getAllNotificationShorts: Array<{ __typename?: 'NotificationShort', id: number, createdAt: any, updatedAt: any, key: string, subject: string, content: string, fullContent?: string | null | undefined, isRead?: boolean | null | undefined }> };

export type InvokeNotificationMutationVariables = Exact<{
  data: NotificationRequest;
  filter: UserActionFilter;
}>;


export type InvokeNotificationMutation = { __typename?: 'Mutation', invokeNotification: string };

export type ClearAllNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearAllNotificationsMutation = { __typename?: 'Mutation', clearAllNotifications?: Array<{ __typename?: 'NotificationShort', id: number, createdAt: any, updatedAt: any, key: string, subject: string, content: string, fullContent?: string | null | undefined, isRead?: boolean | null | undefined }> | null | undefined };

export type ReminderFragment = { __typename?: 'NotificationLog', id: number, createdAt: any, updatedAt: any, fromEmail: string, fromName: string, toEmail: string, toName: string, content: string, subject: string, key: string };

export type GetAllNotificationLogsQueryVariables = Exact<{
  userId?: Maybe<Scalars['Float']>;
}>;


export type GetAllNotificationLogsQuery = { __typename?: 'Query', getAllNotificationLogs: Array<{ __typename?: 'NotificationLog', id: number, createdAt: any, updatedAt: any, fromEmail: string, fromName: string, toEmail: string, toName: string, content: string, subject: string, key: string }> };

export type GetUsersInReminderQueryVariables = Exact<{
  filter: UserActionFilter;
  recipient: Scalars['String'];
}>;


export type GetUsersInReminderQuery = { __typename?: 'Query', getUsersInReminder: Array<{ __typename?: 'User', id: number, name: string }> };

export type GetAllReminderTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReminderTemplatesQuery = { __typename?: 'Query', getAllReminderTemplates: Array<{ __typename?: 'ReminderTemplate', id: number, name: string, subject: string, content: string, key: string, shortContent: string, reminderMe: boolean }> };

export type UpdateOneReminderTemplateMutationVariables = Exact<{
  id: Scalars['Float'];
  data: ReminderTemplateInput;
}>;


export type UpdateOneReminderTemplateMutation = { __typename?: 'Mutation', updateOneReminderTemplate: { __typename?: 'ReminderTemplate', id: number, name: string, subject: string, content: string, key: string, shortContent: string, reminderMe: boolean } };

export type AddOneReminderTemplateMutationVariables = Exact<{
  data: ReminderTemplateInput;
}>;


export type AddOneReminderTemplateMutation = { __typename?: 'Mutation', addOneReminderTemplate: { __typename?: 'ReminderTemplate', id: number, name: string, subject: string, content: string, key: string, shortContent: string, reminderMe: boolean } };

export type GetOneReminderTemplateQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneReminderTemplateQuery = { __typename?: 'Query', getOneReminderTemplate: { __typename?: 'ReminderTemplate', id: number, name: string, subject: string, content: string, key: string, shortContent: string, reminderMe: boolean } };

export type DeleteReminderTemplateMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteReminderTemplateMutation = { __typename?: 'Mutation', deleteReminderTemplate: string };

export type GetAllReminderTemplateDetailQueryVariables = Exact<{
  page: Scalars['Float'];
  sort?: Maybe<SortFieldTemplate>;
  pageSize?: Maybe<Scalars['Float']>;
}>;


export type GetAllReminderTemplateDetailQuery = { __typename?: 'Query', getAllReminderTemplateDetail: { __typename?: 'TemplatePagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'ReminderTemplate', id: number, name: string, subject: string, content: string, key: string, shortContent: string, reminderMe: boolean }> } };

export type GetPerformanceSummariesQueryVariables = Exact<{
  sort?: Maybe<UserSortField>;
}>;


export type GetPerformanceSummariesQuery = { __typename?: 'Query', getReportPerformanceSummary: Array<{ __typename?: 'PerformanceSummaryDetails', id: number, percentComplete: number, isComplete?: boolean | null | undefined, status?: string | null | undefined, user: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, name: string } | null | undefined } }> };

export type AnswerContributorFragment = { __typename?: 'User', id: number, name: string, title?: { __typename?: 'Title', id: number, name: string, isMDOrAbove?: boolean | null | undefined } | null | undefined };

export type AnswerSummaryFragment = { __typename?: 'EvaluationAnswer', score?: number | null | undefined, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string } | null | undefined };

export type PerformanceSummaryFragment = { __typename?: 'PerformanceSummary', id: number, score?: number | null | undefined, feedback?: string | null | undefined, isComplete?: boolean | null | undefined, cycle: { __typename?: 'Cycle', id: number, isActive: boolean } };

export type GetPerformanceSummaryDetailsQueryVariables = Exact<{
  userId: Scalars['Float'];
  cycleId?: Maybe<Scalars['Float']>;
}>;


export type GetPerformanceSummaryDetailsQuery = { __typename?: 'Query', getPerformanceSummaryDetails?: { __typename?: 'PerformanceSummaryUserDetails', questionSummary: Array<{ __typename?: 'QuestionSummary', ratingAverage: number, ratingAverageMdAndAbove: number, question: { __typename?: 'EvaluationTypeQuestion', id: number, title: string, subtitle: string, text: string, isOpenQuestion?: boolean | null | undefined } }>, evaluations: Array<{ __typename?: 'Evaluation', optOut: boolean, optOutReason?: string | null | undefined, contributor?: { __typename?: 'User', id: number, name: string, title?: { __typename?: 'Title', id: number, name: string, isMDOrAbove?: boolean | null | undefined } | null | undefined } | null | undefined, evaluationAnswers?: Array<{ __typename?: 'EvaluationAnswer', score?: number | null | undefined, feedback?: string | null | undefined, evaluationTypeQuestion?: { __typename?: 'EvaluationTypeQuestion', id: number, title: string } | null | undefined }> | null | undefined }>, performanceSummary: { __typename?: 'PerformanceSummary', id: number, score?: number | null | undefined, feedback?: string | null | undefined, isComplete?: boolean | null | undefined, cycle: { __typename?: 'Cycle', id: number, isActive: boolean } } } | null | undefined };

export type FinalizePerformanceSummaryMutationVariables = Exact<{
  data: PerformanceSummaryFinalizeInput;
  psId: Scalars['Float'];
}>;


export type FinalizePerformanceSummaryMutation = { __typename?: 'Mutation', finalizePerformanceSummary: { __typename?: 'PerformanceSummary', id: number, score?: number | null | undefined, feedback?: string | null | undefined, isComplete?: boolean | null | undefined, status?: string | null | undefined } };

export type GetLocApprovalQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type GetLocApprovalQuery = { __typename?: 'Query', getLOCApproval: { __typename?: 'ExportOutPut', url: string } };

export type ExportOverallPerformanceSummaryQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type ExportOverallPerformanceSummaryQuery = { __typename?: 'Query', exportOverallPerformanceSummary: { __typename?: 'ExportOutPut', url: string } };

export type ShareOverallPerformanceSummaryQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type ShareOverallPerformanceSummaryQuery = { __typename?: 'Query', shareOps: { __typename?: 'ShareOpsOutPut', status: boolean, error?: string | null | undefined } };

export type AddOneOverallPerformanceSummaryMutationVariables = Exact<{
  data: OverallPerformanceSummaryInput;
}>;


export type AddOneOverallPerformanceSummaryMutation = { __typename?: 'Mutation', addOneOverallPerformanceSummary: { __typename?: 'OverallPerformanceSummary', id: number, isShare?: boolean | null | undefined, sharedDate?: any | null | undefined } };

export type ExportMissingEvaluationsQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type ExportMissingEvaluationsQuery = { __typename?: 'Query', exportMissingEvaluations: { __typename?: 'ExportOutPut', url: string } };

export type ExportContributorsPerPersonQueryVariables = Exact<{
  filter: UserActionFilter;
}>;


export type ExportContributorsPerPersonQuery = { __typename?: 'Query', exportContributorsPerPerson: { __typename?: 'ExportOutPut', url: string } };

export type ExportPerformanceSummaryQueryVariables = Exact<{
  payload: PerformanceSummaryPayload;
  filter: UserActionFilter;
}>;


export type ExportPerformanceSummaryQuery = { __typename?: 'Query', exportPerformanceSummary: { __typename?: 'ExportOutPut', url: string } };

export type ExportRatingSummaryQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type ExportRatingSummaryQuery = { __typename?: 'Query', exportRatingSummary: { __typename?: 'ExportOutPut', url: string } };

export type ExportRankingSummaryQueryVariables = Exact<{
  payload: PayLoad;
  filter: UserActionFilter;
}>;


export type ExportRankingSummaryQuery = { __typename?: 'Query', exportRankingSummary: { __typename?: 'ExportOutPut', url: string } };

export type ExportSAsQueryVariables = Exact<{
  payload: PayLoad;
  filter?: Maybe<UserActionFilter>;
}>;


export type ExportSAsQuery = { __typename?: 'Query', exportSAs: { __typename?: 'ExportOutPut', url: string } };

export type GetListOfSelfAssessmentQueryVariables = Exact<{
  page: Scalars['Float'];
  sort?: Maybe<SortUserEvaluation>;
}>;


export type GetListOfSelfAssessmentQuery = { __typename?: 'Query', getSelfAssessmentList: { __typename?: 'UserEvaluationPagination', page: number, total: number, pageSize: number, data: Array<{ __typename?: 'Evaluation', id: number, status?: string | null | undefined, evaluatee?: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', name: string } | null | undefined, strategy?: { __typename?: 'Strategy', name: string } | null | undefined, department?: { __typename?: 'Department', name: string } | null | undefined, location?: { __typename?: 'Location', name: string } | null | undefined } | null | undefined }> } };

export type GetAllSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSettingsQuery = { __typename?: 'Query', getAllSettings: Array<{ __typename?: 'Setting', id: number, key: string, value: string }> };

export type UpdateOneSettingMutationVariables = Exact<{
  id: Scalars['Float'];
  data: SettingInput;
}>;


export type UpdateOneSettingMutation = { __typename?: 'Mutation', updateOneSetting: { __typename?: 'Setting', id: number, key: string, value: string } };

export type StrategyFragment = { __typename?: 'Strategy', id: number, name: string, createdAt: any, updatedAt: any };

export type GetAllStrategiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStrategiesQuery = { __typename?: 'Query', getAllStrategies: Array<{ __typename?: 'Strategy', id: number, name: string, createdAt: any, updatedAt: any }> };

export type GetAllStrategiesWithPaginationQueryVariables = Exact<{
  sort?: Maybe<StrategySortField>;
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
}>;


export type GetAllStrategiesWithPaginationQuery = { __typename?: 'Query', getAllStrategiesWithPagination: { __typename?: 'StrategyPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Strategy', id: number, name: string, createdAt: any, updatedAt: any }> } };

export type GetOneStrategyQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneStrategyQuery = { __typename?: 'Query', getOneStrategy: { __typename?: 'Strategy', id: number, name: string, createdAt: any, updatedAt: any } };

export type DeleteStrategyMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteStrategyMutation = { __typename?: 'Mutation', deleteStrategy: string };

export type SendMailForTechSupportMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type SendMailForTechSupportMutation = { __typename?: 'Mutation', sendMailForTechSupport: string };

export type TitleFragment = { __typename?: 'Title', id: number, name: string, createdAt: any, updatedAt: any, isMDOrAbove?: boolean | null | undefined };

export type GetAllTitlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTitlesQuery = { __typename?: 'Query', getAllTitles: Array<{ __typename?: 'Title', id: number, name: string, createdAt: any, updatedAt: any, isMDOrAbove?: boolean | null | undefined }> };

export type GetAllTitlesWithPaginationQueryVariables = Exact<{
  sort?: Maybe<TitleSortField>;
  pageSize?: Maybe<Scalars['Float']>;
  page: Scalars['Float'];
}>;


export type GetAllTitlesWithPaginationQuery = { __typename?: 'Query', getAllTitlesWithPagination: { __typename?: 'TitlePagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'Title', id: number, name: string, createdAt: any, updatedAt: any, isMDOrAbove?: boolean | null | undefined }> } };

export type GetOneTitleQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneTitleQuery = { __typename?: 'Query', getOneTitle: { __typename?: 'Title', id: number, name: string, createdAt: any, updatedAt: any, isMDOrAbove?: boolean | null | undefined } };

export type DeleteTitleMutationVariables = Exact<{
  ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type DeleteTitleMutation = { __typename?: 'Mutation', deleteTitle: string };

export type UserFragment = { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, name: string, isEvaluator: boolean, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined };

export type UserDetailFragment = { __typename?: 'User', id: number, image?: string | null | undefined, email: string, firstName: string, lastName: string, name: string, lastLogin?: any | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined };

export type UserProfileFragment = { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, email: string, image?: string | null | undefined, startDate: any, isEvaluator: boolean, isLockedSystem?: boolean | null | undefined, isInactive?: boolean | null | undefined, showPreviousComment?: number | null | undefined, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, name: string } | null | undefined, previousTitle?: { __typename?: 'Title', id: number, name: string } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, userAdminCountry: Array<{ __typename?: 'UserAdminCountry', id: number, countryCode: string }>, userAdminLocation: Array<{ __typename?: 'UserAdminLocation', id: number, location: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } }>, listOfContributors?: { __typename?: 'CycleContributor', id: number, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, name: string } }> } | null | undefined, permissionsLimitedUsers?: Array<{ __typename?: 'UsersLimited', id: number, limited: { __typename?: 'User', id: number, name: string } }> | null | undefined, permissionsExtraUsers?: Array<{ __typename?: 'UsersExtra', id: number, extra: { __typename?: 'User', id: number, name: string } }> | null | undefined };

export type GetAllUsersWithDetailQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  locationIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  strategyIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  departmentIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  titleIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluatorIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  evaluationTypeIds?: Maybe<Array<Scalars['Float']> | Scalars['Float']>;
  isActive?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<UserSortField>;
  page: Scalars['Float'];
}>;


export type GetAllUsersWithDetailQuery = { __typename?: 'Query', getAllUsersWithDetail: { __typename?: 'UserPagination', total: number, page: number, pageSize: number, data: Array<{ __typename?: 'User', id: number, image?: string | null | undefined, email: string, firstName: string, lastName: string, name: string, lastLogin?: any | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }> } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number, email: string, firstName: string, lastName: string, name: string, isEvaluator: boolean, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined }> };

export type GetOneUsersQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneUsersQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, name: string, isEvaluator: boolean, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined } };

export type GetAllHighestRatingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllHighestRatingsQuery = { __typename?: 'Query', getHighestRating: Array<{ __typename?: 'HighestRatingUsers', averageScore: number, percentageFourOrGreater: number, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } }> };

export type GetAllEvaluationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEvaluationTypesQuery = { __typename?: 'Query', getAllEvaluationTypes: Array<{ __typename?: 'EvaluationType', id: number, name: string, key?: string | null | undefined, createdAt: any, updatedAt: any }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', roleCountryCode?: string | null | undefined, roleLocationId?: number | null | undefined, image?: string | null | undefined, roleCityCode?: string | null | undefined, showPreviousComment?: number | null | undefined, id: number, email: string, firstName: string, lastName: string, name: string, isEvaluator: boolean, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null | undefined, permissionsLimitedUsers?: Array<{ __typename?: 'UsersLimited', id: number, limited: { __typename?: 'User', id: number, name: string } }> | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined } };

export type GetAllRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRolesQuery = { __typename?: 'Query', getAllRoles: Array<{ __typename?: 'Role', id: number, name: string }> };

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, email: string, image?: string | null | undefined, startDate: any, isEvaluator: boolean, isLockedSystem?: boolean | null | undefined, isInactive?: boolean | null | undefined, showPreviousComment?: number | null | undefined, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, name: string } | null | undefined, previousTitle?: { __typename?: 'Title', id: number, name: string } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, userAdminCountry: Array<{ __typename?: 'UserAdminCountry', id: number, countryCode: string }>, userAdminLocation: Array<{ __typename?: 'UserAdminLocation', id: number, location: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } }>, listOfContributors?: { __typename?: 'CycleContributor', id: number, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, name: string } }> } | null | undefined, permissionsLimitedUsers?: Array<{ __typename?: 'UsersLimited', id: number, limited: { __typename?: 'User', id: number, name: string } }> | null | undefined, permissionsExtraUsers?: Array<{ __typename?: 'UsersExtra', id: number, extra: { __typename?: 'User', id: number, name: string } }> | null | undefined } };

export type UpdateUserProfileMutationVariables = Exact<{
  id: Scalars['Float'];
  data: UserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, email: string, image?: string | null | undefined, startDate: any, isEvaluator: boolean, isLockedSystem?: boolean | null | undefined, isInactive?: boolean | null | undefined, showPreviousComment?: number | null | undefined, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, name: string } | null | undefined, previousTitle?: { __typename?: 'Title', id: number, name: string } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, userAdminCountry: Array<{ __typename?: 'UserAdminCountry', id: number, countryCode: string }>, userAdminLocation: Array<{ __typename?: 'UserAdminLocation', id: number, location: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } }>, listOfContributors?: { __typename?: 'CycleContributor', id: number, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, name: string } }> } | null | undefined, permissionsLimitedUsers?: Array<{ __typename?: 'UsersLimited', id: number, limited: { __typename?: 'User', id: number, name: string } }> | null | undefined, permissionsExtraUsers?: Array<{ __typename?: 'UsersExtra', id: number, extra: { __typename?: 'User', id: number, name: string } }> | null | undefined } };

export type GetOneUsersByIdWithManyFieldsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneUsersByIdWithManyFieldsQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', id: number, name: string, image?: string | null | undefined, isEvaluatorFor: Array<{ __typename?: 'User', id: number, name: string, image?: string | null | undefined }>, openEvaluations: Array<{ __typename?: 'Evaluation', id: number, name: string, status?: string | null | undefined, isComplete?: boolean | null | undefined, optOut: boolean, evaluatee?: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined } | null | undefined, contributor?: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } | null | undefined }>, selfAssessment?: { __typename?: 'EvaluationWithDuration', duration: number, evaluation?: { __typename?: 'Evaluation', id: number, name: string, status?: string | null | undefined, isComplete?: boolean | null | undefined, optOut: boolean } | null | undefined } | null | undefined, listOfContributors?: { __typename?: 'CycleContributor', evaluatorId?: number | null | undefined, status: string, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined }, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, name: string, image?: string | null | undefined } }> } | null | undefined, evaluations: Array<{ __typename?: 'EvaluationWithDuration', duration: number, evaluation?: { __typename?: 'Evaluation', id: number, name: string, status?: string | null | undefined, isComplete?: boolean | null | undefined, optOut: boolean, evaluatee?: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined } | null | undefined } | null | undefined }> } };

export type UpdateOneCycleContributorMutationVariables = Exact<{
  id: Scalars['Float'];
  data: CycleContributorInput;
}>;


export type UpdateOneCycleContributorMutation = { __typename?: 'Mutation', updateOneCycleContributor: { __typename?: 'CycleContributor', id: number, status: string } };

export type GetUserWithContributorQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUserWithContributorQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', id: number, firstName: string, lastName: string, listOfContributors?: { __typename?: 'CycleContributor', id: number, status: string, evaluatorId?: number | null | undefined, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } }> } | null | undefined, evaluator?: { __typename?: 'User', id: number } | null | undefined } };

export type AddContributorUserMutationVariables = Exact<{
  data: CycleContributorUserInput;
}>;


export type AddContributorUserMutation = { __typename?: 'Mutation', addOneCycleContributorUser: { __typename?: 'CycleContributorUser', id: number, projectDetails: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined } } };

export type DeleteCycleContributorUserMutationVariables = Exact<{
  isSelectAll: Scalars['Boolean'];
  cycleContributorUserIds: Array<Scalars['Float']> | Scalars['Float'];
  userId?: Maybe<Scalars['Float']>;
  cycleId?: Maybe<Scalars['Float']>;
}>;


export type DeleteCycleContributorUserMutation = { __typename?: 'Mutation', deleteCycleContributorUser: string };

export type GetUserLockedSystemQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUserLockedSystemQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', isLockedSystem?: boolean | null | undefined, department?: { __typename?: 'Department', id: number, lockDate?: any | null | undefined } | null | undefined } };

export type GetUserEvaluateeQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUserEvaluateeQuery = { __typename?: 'Query', getOneUser: { __typename?: 'User', lastPromotionCycleId?: number | null | undefined, id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, updatedAt: any, showPreviousComment?: number | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string, showPreviousComment?: boolean | null | undefined } | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, firstName: string, lastName: string, name: string, image?: string | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined } | null | undefined } };

export type DeleteUsersMutationVariables = Exact<{
  filter: UserActionFilter;
}>;


export type DeleteUsersMutation = { __typename?: 'Mutation', deleteUsers: string };

export type InactiveUserMutationVariables = Exact<{
  filter: UserActionFilter;
}>;


export type InactiveUserMutation = { __typename?: 'Mutation', inactiveUser: Array<{ __typename?: 'User', id: number }> };

export type AddNewUserMutationVariables = Exact<{
  data: UserProfileInput;
}>;


export type AddNewUserMutation = { __typename?: 'Mutation', addUserProfile: { __typename?: 'User', id: number, name: string, firstName: string, lastName: string, email: string, image?: string | null | undefined, startDate: any, isEvaluator: boolean, isLockedSystem?: boolean | null | undefined, isInactive?: boolean | null | undefined, showPreviousComment?: number | null | undefined, roles?: Array<{ __typename?: 'Role', id: number, name: string }> | null | undefined, evaluationType?: { __typename?: 'EvaluationType', id: number, name: string } | null | undefined, evaluator?: { __typename?: 'User', id: number, name: string } | null | undefined, previousTitle?: { __typename?: 'Title', id: number, name: string } | null | undefined, title?: { __typename?: 'Title', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined, location?: { __typename?: 'Location', id: number, name: string } | null | undefined, strategy?: { __typename?: 'Strategy', id: number, name: string } | null | undefined, userAdminCountry: Array<{ __typename?: 'UserAdminCountry', id: number, countryCode: string }>, userAdminLocation: Array<{ __typename?: 'UserAdminLocation', id: number, location: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } }>, listOfContributors?: { __typename?: 'CycleContributor', id: number, cycleContributorsUser: Array<{ __typename?: 'CycleContributorUser', id: number, user: { __typename?: 'User', id: number, name: string } }> } | null | undefined, permissionsLimitedUsers?: Array<{ __typename?: 'UsersLimited', id: number, limited: { __typename?: 'User', id: number, name: string } }> | null | undefined, permissionsExtraUsers?: Array<{ __typename?: 'UsersExtra', id: number, extra: { __typename?: 'User', id: number, name: string } }> | null | undefined } };

export type PromoteUserMutationVariables = Exact<{
  id: Scalars['Float'];
  data: PromoteData;
}>;


export type PromoteUserMutation = { __typename?: 'Mutation', promoteUser: { __typename?: 'User', id: number } };

export type AddOneTitleMutationVariables = Exact<{
  data: TitleInput;
}>;


export type AddOneTitleMutation = { __typename?: 'Mutation', addOneTitle: { __typename?: 'Title', id: number, name: string, isMDOrAbove?: boolean | null | undefined } };

export type UpdateOneTitleMutationVariables = Exact<{
  id: Scalars['Float'];
  data: TitleInput;
}>;


export type UpdateOneTitleMutation = { __typename?: 'Mutation', updateOneTitle: { __typename?: 'Title', id: number, name: string, isMDOrAbove?: boolean | null | undefined } };

export type AddOneLocationMutationVariables = Exact<{
  data: LocationInput;
}>;


export type AddOneLocationMutation = { __typename?: 'Mutation', addOneLocation: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } };

export type UpdateOneLocationMutationVariables = Exact<{
  id: Scalars['Float'];
  data: LocationInput;
}>;


export type UpdateOneLocationMutation = { __typename?: 'Mutation', updateOneLocation: { __typename?: 'Location', id: number, name: string, countryCode?: string | null | undefined } };

export type AddOneStrategyMutationVariables = Exact<{
  data: StrategyInput;
}>;


export type AddOneStrategyMutation = { __typename?: 'Mutation', addOneStrategy: { __typename?: 'Strategy', id: number, name: string } };

export type UpdateOneStrategyMutationVariables = Exact<{
  id: Scalars['Float'];
  data: StrategyInput;
}>;


export type UpdateOneStrategyMutation = { __typename?: 'Mutation', updateOneStrategy: { __typename?: 'Strategy', id: number, name: string } };

export type AddOneDepartmentMutationVariables = Exact<{
  data: DepartmentInput;
}>;


export type AddOneDepartmentMutation = { __typename?: 'Mutation', addOneDepartment: { __typename?: 'Department', id: number, name: string } };

export type UpdateOneDepartmentMutationVariables = Exact<{
  id: Scalars['Float'];
  data: DepartmentInput;
}>;


export type UpdateOneDepartmentMutation = { __typename?: 'Mutation', updateOneDepartment: { __typename?: 'Department', id: number, name: string } };

export type SetAllDeadlineForDepartmentMutationVariables = Exact<{
  strategyId: Scalars['Float'];
  data: DeadlineDepartment;
}>;


export type SetAllDeadlineForDepartmentMutation = { __typename?: 'Mutation', setAllDeadlineForDepartment: string };

export const ActionUserFragmentFragmentDoc = gql`
    fragment ActionUserFragment on User {
  id
  name
  firstName
  lastName
  startDate
  image
  title {
    id
    name
  }
  department {
    id
    name
  }
  location {
    id
    name
  }
  evaluator {
    id
    firstName
    lastName
  }
  strategy {
    id
    name
  }
  evaluationType {
    id
    name
  }
  cycleId
}
    `;
export const MainResetFormsFragmentFragmentDoc = gql`
    fragment MainResetFormsFragment on User {
  cycleContributors {
    id
    status
  }
  evaluationsOnMe {
    id
    evaluatee {
      id
      name
    }
    isComplete
  }
  evaluationsByMe {
    id
    evaluatee {
      id
      name
    }
    isComplete
  }
  completedPSsByUser {
    id
    user {
      id
      name
    }
  }
}
    `;
export const UserContributorFragmentFragmentDoc = gql`
    fragment UserContributorFragment on CycleContributorUser {
  id
  projectDetails
  user {
    id
    firstName
    lastName
    image
    title {
      id
      name
    }
    department {
      id
      name
    }
    strategy {
      id
      name
    }
    location {
      id
      name
    }
  }
}
    `;
export const DepartmentFragmentDoc = gql`
    fragment Department on Department {
  id
  name
  deadlineLOC
  deadlineConfirmLOC
  deadlineSelfAssessment
  deadlinePerformanceEvaluation
  strategy {
    id
    name
  }
  lockDate
  showPreviousComment
}
    `;
export const EvaluationTypeQuestionFragmentDoc = gql`
    fragment EvaluationTypeQuestion on EvaluationTypeQuestion {
  id
  updatedAt
  title
  subtitle
  text
  isOpenQuestion
  isRequired
  isSelfAssessment
  isNADisabled
  isEvaluation
  priority
  isNoExposureComment
}
    `;
export const EvaluateeFragmentDoc = gql`
    fragment Evaluatee on User {
  id
  firstName
  lastName
  name
  image
  title {
    id
    name
  }
  department {
    id
    name
    showPreviousComment
  }
  evaluationType {
    id
    name
  }
  evaluator {
    id
    firstName
    lastName
    name
    title {
      id
      name
    }
    image
  }
  updatedAt
  lastPromotionCycleId
  showPreviousComment
}
    `;
export const OpsQuestionAndAnswerFragmentDoc = gql`
    fragment OpsQuestionAndAnswer on OverallPerformanceSummaryAnswer {
  id
  feedback
  evaluationTypeQuestion {
    id
    title
    text
    isEvaluation
    isRequired
    isOpenQuestion
  }
}
    `;
export const LocationFragmentDoc = gql`
    fragment Location on Location {
  id
  createdAt
  updatedAt
  name
  countryCode
}
    `;
export const ReminderFragmentDoc = gql`
    fragment Reminder on NotificationLog {
  id
  createdAt
  updatedAt
  fromEmail
  fromName
  toEmail
  toName
  content
  subject
  key
}
    `;
export const AnswerContributorFragmentDoc = gql`
    fragment AnswerContributor on User {
  id
  name
  title {
    id
    name
    isMDOrAbove
  }
}
    `;
export const AnswerSummaryFragmentDoc = gql`
    fragment AnswerSummary on EvaluationAnswer {
  score
  evaluationTypeQuestion {
    id
    title
  }
  feedback
}
    `;
export const PerformanceSummaryFragmentDoc = gql`
    fragment PerformanceSummary on PerformanceSummary {
  id
  score
  feedback
  isComplete
  cycle {
    id
    isActive
  }
}
    `;
export const StrategyFragmentDoc = gql`
    fragment Strategy on Strategy {
  id
  name
  createdAt
  updatedAt
}
    `;
export const TitleFragmentDoc = gql`
    fragment Title on Title {
  id
  name
  createdAt
  updatedAt
  isMDOrAbove
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  name
  isEvaluator
  title {
    id
    name
  }
  department {
    id
    name
    showPreviousComment
  }
  location {
    id
    name
  }
  evaluationType {
    id
    name
  }
}
    `;
export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  id
  image
  email
  firstName
  lastName
  title {
    id
    name
  }
  name
  lastLogin
  location {
    id
    name
  }
  department {
    id
    name
  }
  strategy {
    id
    name
  }
  evaluator {
    id
    firstName
    lastName
  }
  evaluationType {
    id
    name
  }
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
  id
  name
  firstName
  lastName
  email
  image
  startDate
  isEvaluator
  isLockedSystem
  isInactive
  showPreviousComment
  roles {
    id
    name
  }
  evaluationType {
    id
    name
  }
  evaluator {
    id
    name
  }
  previousTitle {
    id
    name
  }
  title {
    id
    name
  }
  department {
    id
    name
  }
  location {
    id
    name
  }
  strategy {
    id
    name
  }
  userAdminCountry {
    id
    countryCode
  }
  userAdminLocation {
    id
    location {
      id
      name
      countryCode
    }
  }
  listOfContributors {
    id
    cycleContributorsUser {
      id
      user {
        id
        name
      }
    }
  }
  permissionsLimitedUsers {
    id
    limited {
      id
      name
    }
  }
  permissionsExtraUsers {
    id
    extra {
      id
      name
    }
  }
}
    `;
export const AdminViewEvaluationsDocument = gql`
    query adminViewEvaluations($name: String, $locationIds: [Float!], $strategyIds: [Float!], $departmentIds: [Float!], $titleIds: [Float!], $evaluatorIds: [Float!], $evaluationTypeIds: [Float!], $isActive: Boolean, $actionSort: UserActionSortField, $cycleId: Int, $saStatus: Boolean, $missingEvaluationsIds: [Int!], $page: Float!) {
  adminViewEvaluations: getListUserAction(
    name: $name
    locationIds: $locationIds
    strategyIds: $strategyIds
    departmentIds: $departmentIds
    titleIds: $titleIds
    evaluatorIds: $evaluatorIds
    evaluationTypeIds: $evaluationTypeIds
    isActive: $isActive
    actionSort: $actionSort
    cycleId: $cycleId
    saStatus: $saStatus
    missingEvaluationsIds: $missingEvaluationsIds
    page: $page
  ) {
    total
    page
    pageSize
    data {
      user {
        ...ActionUserFragment
      }
      evaluationsFor {
        evaluations {
          id
          contributor {
            id
            name
          }
          isComplete
          optOut
          isOpenEvaluation
          status
        }
        percentComplete
      }
      evaluationsBy {
        evaluations {
          id
          evaluatee {
            id
            name
          }
          contributor {
            id
            name
          }
          isComplete
          optOut
          isOpenEvaluation
          status
        }
        percentComplete
      }
      selfAssessment {
        id
        status
        isComplete
      }
    }
  }
}
    ${ActionUserFragmentFragmentDoc}`;

/**
 * __useAdminViewEvaluationsQuery__
 *
 * To run a query within a React component, call `useAdminViewEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminViewEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminViewEvaluationsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      locationIds: // value for 'locationIds'
 *      strategyIds: // value for 'strategyIds'
 *      departmentIds: // value for 'departmentIds'
 *      titleIds: // value for 'titleIds'
 *      evaluatorIds: // value for 'evaluatorIds'
 *      evaluationTypeIds: // value for 'evaluationTypeIds'
 *      isActive: // value for 'isActive'
 *      actionSort: // value for 'actionSort'
 *      cycleId: // value for 'cycleId'
 *      saStatus: // value for 'saStatus'
 *      missingEvaluationsIds: // value for 'missingEvaluationsIds'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAdminViewEvaluationsQuery(baseOptions: Apollo.QueryHookOptions<AdminViewEvaluationsQuery, AdminViewEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminViewEvaluationsQuery, AdminViewEvaluationsQueryVariables>(AdminViewEvaluationsDocument, options);
      }
export function useAdminViewEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminViewEvaluationsQuery, AdminViewEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminViewEvaluationsQuery, AdminViewEvaluationsQueryVariables>(AdminViewEvaluationsDocument, options);
        }
export type AdminViewEvaluationsQueryHookResult = ReturnType<typeof useAdminViewEvaluationsQuery>;
export type AdminViewEvaluationsLazyQueryHookResult = ReturnType<typeof useAdminViewEvaluationsLazyQuery>;
export type AdminViewEvaluationsQueryResult = Apollo.QueryResult<AdminViewEvaluationsQuery, AdminViewEvaluationsQueryVariables>;
export const AdminViewReportsDocument = gql`
    query adminViewReports($name: String, $locationIds: [Float!], $strategyIds: [Float!], $departmentIds: [Float!], $titleIds: [Float!], $evaluatorIds: [Float!], $evaluationTypeIds: [Float!], $isActive: Boolean, $actionSort: UserActionSortField, $cycleId: Int, $psStatus: Boolean, $page: Float!) {
  adminViewReports: getListUserAction(
    name: $name
    locationIds: $locationIds
    strategyIds: $strategyIds
    departmentIds: $departmentIds
    titleIds: $titleIds
    evaluatorIds: $evaluatorIds
    evaluationTypeIds: $evaluationTypeIds
    isActive: $isActive
    actionSort: $actionSort
    cycleId: $cycleId
    psStatus: $psStatus
    page: $page
  ) {
    total
    page
    pageSize
    data {
      user {
        ...ActionUserFragment
      }
      performanceSummary {
        id
        isComplete
      }
      overallPerformanceSummary {
        id
        isShare
        sharedDate
      }
    }
  }
}
    ${ActionUserFragmentFragmentDoc}`;

/**
 * __useAdminViewReportsQuery__
 *
 * To run a query within a React component, call `useAdminViewReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminViewReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminViewReportsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      locationIds: // value for 'locationIds'
 *      strategyIds: // value for 'strategyIds'
 *      departmentIds: // value for 'departmentIds'
 *      titleIds: // value for 'titleIds'
 *      evaluatorIds: // value for 'evaluatorIds'
 *      evaluationTypeIds: // value for 'evaluationTypeIds'
 *      isActive: // value for 'isActive'
 *      actionSort: // value for 'actionSort'
 *      cycleId: // value for 'cycleId'
 *      psStatus: // value for 'psStatus'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAdminViewReportsQuery(baseOptions: Apollo.QueryHookOptions<AdminViewReportsQuery, AdminViewReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminViewReportsQuery, AdminViewReportsQueryVariables>(AdminViewReportsDocument, options);
      }
export function useAdminViewReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminViewReportsQuery, AdminViewReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminViewReportsQuery, AdminViewReportsQueryVariables>(AdminViewReportsDocument, options);
        }
export type AdminViewReportsQueryHookResult = ReturnType<typeof useAdminViewReportsQuery>;
export type AdminViewReportsLazyQueryHookResult = ReturnType<typeof useAdminViewReportsLazyQuery>;
export type AdminViewReportsQueryResult = Apollo.QueryResult<AdminViewReportsQuery, AdminViewReportsQueryVariables>;
export const AdminViewFullDocument = gql`
    query adminViewFull($name: String, $locationIds: [Float!], $strategyIds: [Float!], $departmentIds: [Float!], $titleIds: [Float!], $evaluatorIds: [Float!], $evaluationTypeIds: [Float!], $isActive: Boolean, $actionSort: UserActionSortField, $cycleId: Int, $locStatus: [String!], $saStatus: Boolean, $missingEvaluationsIds: [Int!], $psStatus: Boolean, $page: Float!) {
  adminViewFull: getListUserAction(
    name: $name
    locationIds: $locationIds
    strategyIds: $strategyIds
    departmentIds: $departmentIds
    titleIds: $titleIds
    evaluatorIds: $evaluatorIds
    evaluationTypeIds: $evaluationTypeIds
    isActive: $isActive
    actionSort: $actionSort
    cycleId: $cycleId
    locStatus: $locStatus
    saStatus: $saStatus
    missingEvaluationsIds: $missingEvaluationsIds
    psStatus: $psStatus
    page: $page
  ) {
    total
    page
    pageSize
    data {
      user {
        ...ActionUserFragment
      }
      listOfContributors {
        id
        status
      }
      evaluationsFor {
        evaluations {
          id
          contributor {
            id
            name
          }
          isComplete
          optOut
          isOpenEvaluation
          status
        }
        percentComplete
      }
      evaluationsBy {
        evaluations {
          id
          evaluatee {
            id
            name
          }
          isComplete
          optOut
          isOpenEvaluation
          status
        }
        percentComplete
      }
      selfAssessment {
        id
        status
        isComplete
      }
      performanceSummary {
        id
        isComplete
      }
      overallPerformanceSummary {
        id
        isShare
        sharedDate
      }
    }
  }
}
    ${ActionUserFragmentFragmentDoc}`;

/**
 * __useAdminViewFullQuery__
 *
 * To run a query within a React component, call `useAdminViewFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminViewFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminViewFullQuery({
 *   variables: {
 *      name: // value for 'name'
 *      locationIds: // value for 'locationIds'
 *      strategyIds: // value for 'strategyIds'
 *      departmentIds: // value for 'departmentIds'
 *      titleIds: // value for 'titleIds'
 *      evaluatorIds: // value for 'evaluatorIds'
 *      evaluationTypeIds: // value for 'evaluationTypeIds'
 *      isActive: // value for 'isActive'
 *      actionSort: // value for 'actionSort'
 *      cycleId: // value for 'cycleId'
 *      locStatus: // value for 'locStatus'
 *      saStatus: // value for 'saStatus'
 *      missingEvaluationsIds: // value for 'missingEvaluationsIds'
 *      psStatus: // value for 'psStatus'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAdminViewFullQuery(baseOptions: Apollo.QueryHookOptions<AdminViewFullQuery, AdminViewFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminViewFullQuery, AdminViewFullQueryVariables>(AdminViewFullDocument, options);
      }
export function useAdminViewFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminViewFullQuery, AdminViewFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminViewFullQuery, AdminViewFullQueryVariables>(AdminViewFullDocument, options);
        }
export type AdminViewFullQueryHookResult = ReturnType<typeof useAdminViewFullQuery>;
export type AdminViewFullLazyQueryHookResult = ReturnType<typeof useAdminViewFullLazyQuery>;
export type AdminViewFullQueryResult = Apollo.QueryResult<AdminViewFullQuery, AdminViewFullQueryVariables>;
export const AdminViewLocDocument = gql`
    query adminViewLOC($name: String, $locationIds: [Float!], $strategyIds: [Float!], $departmentIds: [Float!], $titleIds: [Float!], $evaluatorIds: [Float!], $evaluationTypeIds: [Float!], $isActive: Boolean, $actionSort: UserActionSortField, $cycleId: Int, $locStatus: [String!], $page: Float!) {
  adminViewLOC: getListUserAction(
    name: $name
    locationIds: $locationIds
    strategyIds: $strategyIds
    departmentIds: $departmentIds
    titleIds: $titleIds
    evaluatorIds: $evaluatorIds
    evaluationTypeIds: $evaluationTypeIds
    isActive: $isActive
    actionSort: $actionSort
    cycleId: $cycleId
    locStatus: $locStatus
    page: $page
  ) {
    total
    page
    pageSize
    data {
      user {
        ...ActionUserFragment
      }
      listOfContributors {
        id
        status
      }
    }
  }
}
    ${ActionUserFragmentFragmentDoc}`;

/**
 * __useAdminViewLocQuery__
 *
 * To run a query within a React component, call `useAdminViewLocQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminViewLocQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminViewLocQuery({
 *   variables: {
 *      name: // value for 'name'
 *      locationIds: // value for 'locationIds'
 *      strategyIds: // value for 'strategyIds'
 *      departmentIds: // value for 'departmentIds'
 *      titleIds: // value for 'titleIds'
 *      evaluatorIds: // value for 'evaluatorIds'
 *      evaluationTypeIds: // value for 'evaluationTypeIds'
 *      isActive: // value for 'isActive'
 *      actionSort: // value for 'actionSort'
 *      cycleId: // value for 'cycleId'
 *      locStatus: // value for 'locStatus'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAdminViewLocQuery(baseOptions: Apollo.QueryHookOptions<AdminViewLocQuery, AdminViewLocQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminViewLocQuery, AdminViewLocQueryVariables>(AdminViewLocDocument, options);
      }
export function useAdminViewLocLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminViewLocQuery, AdminViewLocQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminViewLocQuery, AdminViewLocQueryVariables>(AdminViewLocDocument, options);
        }
export type AdminViewLocQueryHookResult = ReturnType<typeof useAdminViewLocQuery>;
export type AdminViewLocLazyQueryHookResult = ReturnType<typeof useAdminViewLocLazyQuery>;
export type AdminViewLocQueryResult = Apollo.QueryResult<AdminViewLocQuery, AdminViewLocQueryVariables>;
export const GetResetFormsDocument = gql`
    query GetResetForms($filter: UserActionFilter) {
  getResetForms(filter: $filter) {
    total
    data {
      id
      name
      ...MainResetFormsFragment
    }
  }
}
    ${MainResetFormsFragmentFragmentDoc}`;

/**
 * __useGetResetFormsQuery__
 *
 * To run a query within a React component, call `useGetResetFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResetFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResetFormsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetResetFormsQuery(baseOptions?: Apollo.QueryHookOptions<GetResetFormsQuery, GetResetFormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResetFormsQuery, GetResetFormsQueryVariables>(GetResetFormsDocument, options);
      }
export function useGetResetFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResetFormsQuery, GetResetFormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResetFormsQuery, GetResetFormsQueryVariables>(GetResetFormsDocument, options);
        }
export type GetResetFormsQueryHookResult = ReturnType<typeof useGetResetFormsQuery>;
export type GetResetFormsLazyQueryHookResult = ReturnType<typeof useGetResetFormsLazyQuery>;
export type GetResetFormsQueryResult = Apollo.QueryResult<GetResetFormsQuery, GetResetFormsQueryVariables>;
export const ResetListOfContributorsDocument = gql`
    mutation ResetListOfContributors($locIds: [Float!]!) {
  resetListOfContributors(locIds: $locIds) {
    id
    status
  }
}
    `;
export type ResetListOfContributorsMutationFn = Apollo.MutationFunction<ResetListOfContributorsMutation, ResetListOfContributorsMutationVariables>;

/**
 * __useResetListOfContributorsMutation__
 *
 * To run a mutation, you first call `useResetListOfContributorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetListOfContributorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetListOfContributorsMutation, { data, loading, error }] = useResetListOfContributorsMutation({
 *   variables: {
 *      locIds: // value for 'locIds'
 *   },
 * });
 */
export function useResetListOfContributorsMutation(baseOptions?: Apollo.MutationHookOptions<ResetListOfContributorsMutation, ResetListOfContributorsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetListOfContributorsMutation, ResetListOfContributorsMutationVariables>(ResetListOfContributorsDocument, options);
      }
export type ResetListOfContributorsMutationHookResult = ReturnType<typeof useResetListOfContributorsMutation>;
export type ResetListOfContributorsMutationResult = Apollo.MutationResult<ResetListOfContributorsMutation>;
export type ResetListOfContributorsMutationOptions = Apollo.BaseMutationOptions<ResetListOfContributorsMutation, ResetListOfContributorsMutationVariables>;
export const ResetEvaluationsDocument = gql`
    mutation ResetEvaluations($eIds: [Float!]!) {
  resetEvaluation(eIds: $eIds) {
    id
    name
    isComplete
    isOpenEvaluation
    status
    optOut
    contributor {
      id
      name
    }
    evaluatee {
      id
      name
    }
  }
}
    `;
export type ResetEvaluationsMutationFn = Apollo.MutationFunction<ResetEvaluationsMutation, ResetEvaluationsMutationVariables>;

/**
 * __useResetEvaluationsMutation__
 *
 * To run a mutation, you first call `useResetEvaluationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetEvaluationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetEvaluationsMutation, { data, loading, error }] = useResetEvaluationsMutation({
 *   variables: {
 *      eIds: // value for 'eIds'
 *   },
 * });
 */
export function useResetEvaluationsMutation(baseOptions?: Apollo.MutationHookOptions<ResetEvaluationsMutation, ResetEvaluationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetEvaluationsMutation, ResetEvaluationsMutationVariables>(ResetEvaluationsDocument, options);
      }
export type ResetEvaluationsMutationHookResult = ReturnType<typeof useResetEvaluationsMutation>;
export type ResetEvaluationsMutationResult = Apollo.MutationResult<ResetEvaluationsMutation>;
export type ResetEvaluationsMutationOptions = Apollo.BaseMutationOptions<ResetEvaluationsMutation, ResetEvaluationsMutationVariables>;
export const ResetPerformanceSummaryDocument = gql`
    mutation ResetPerformanceSummary($psIds: [Float!]!) {
  resetPerformanceSummary(psIds: $psIds) {
    id
    isComplete
    cycle {
      id
    }
  }
}
    `;
export type ResetPerformanceSummaryMutationFn = Apollo.MutationFunction<ResetPerformanceSummaryMutation, ResetPerformanceSummaryMutationVariables>;

/**
 * __useResetPerformanceSummaryMutation__
 *
 * To run a mutation, you first call `useResetPerformanceSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPerformanceSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPerformanceSummaryMutation, { data, loading, error }] = useResetPerformanceSummaryMutation({
 *   variables: {
 *      psIds: // value for 'psIds'
 *   },
 * });
 */
export function useResetPerformanceSummaryMutation(baseOptions?: Apollo.MutationHookOptions<ResetPerformanceSummaryMutation, ResetPerformanceSummaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPerformanceSummaryMutation, ResetPerformanceSummaryMutationVariables>(ResetPerformanceSummaryDocument, options);
      }
export type ResetPerformanceSummaryMutationHookResult = ReturnType<typeof useResetPerformanceSummaryMutation>;
export type ResetPerformanceSummaryMutationResult = Apollo.MutationResult<ResetPerformanceSummaryMutation>;
export type ResetPerformanceSummaryMutationOptions = Apollo.BaseMutationOptions<ResetPerformanceSummaryMutation, ResetPerformanceSummaryMutationVariables>;
export const ExportAllUsersDocument = gql`
    query ExportAllUsers {
  exportAllUsers {
    url
  }
}
    `;

/**
 * __useExportAllUsersQuery__
 *
 * To run a query within a React component, call `useExportAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<ExportAllUsersQuery, ExportAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportAllUsersQuery, ExportAllUsersQueryVariables>(ExportAllUsersDocument, options);
      }
export function useExportAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportAllUsersQuery, ExportAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportAllUsersQuery, ExportAllUsersQueryVariables>(ExportAllUsersDocument, options);
        }
export type ExportAllUsersQueryHookResult = ReturnType<typeof useExportAllUsersQuery>;
export type ExportAllUsersLazyQueryHookResult = ReturnType<typeof useExportAllUsersLazyQuery>;
export type ExportAllUsersQueryResult = Apollo.QueryResult<ExportAllUsersQuery, ExportAllUsersQueryVariables>;
export const ExportDetailUsersExcelDocument = gql`
    query ExportDetailUsersExcel($filter: UserActionFilter!) {
  exportDetailUsersExcel(filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportDetailUsersExcelQuery__
 *
 * To run a query within a React component, call `useExportDetailUsersExcelQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportDetailUsersExcelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportDetailUsersExcelQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportDetailUsersExcelQuery(baseOptions: Apollo.QueryHookOptions<ExportDetailUsersExcelQuery, ExportDetailUsersExcelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportDetailUsersExcelQuery, ExportDetailUsersExcelQueryVariables>(ExportDetailUsersExcelDocument, options);
      }
export function useExportDetailUsersExcelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportDetailUsersExcelQuery, ExportDetailUsersExcelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportDetailUsersExcelQuery, ExportDetailUsersExcelQueryVariables>(ExportDetailUsersExcelDocument, options);
        }
export type ExportDetailUsersExcelQueryHookResult = ReturnType<typeof useExportDetailUsersExcelQuery>;
export type ExportDetailUsersExcelLazyQueryHookResult = ReturnType<typeof useExportDetailUsersExcelLazyQuery>;
export type ExportDetailUsersExcelQueryResult = Apollo.QueryResult<ExportDetailUsersExcelQuery, ExportDetailUsersExcelQueryVariables>;
export const ListSubmitDocument = gql`
    query ListSubmit($filter: UserActionFilter!) {
  listSubmit(filter: $filter) {
    listSubmitted {
      id
      status
      user {
        id
        name
      }
    }
    listUnSubmitted {
      id
      status
      user {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useListSubmitQuery__
 *
 * To run a query within a React component, call `useListSubmitQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSubmitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSubmitQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListSubmitQuery(baseOptions: Apollo.QueryHookOptions<ListSubmitQuery, ListSubmitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSubmitQuery, ListSubmitQueryVariables>(ListSubmitDocument, options);
      }
export function useListSubmitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSubmitQuery, ListSubmitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSubmitQuery, ListSubmitQueryVariables>(ListSubmitDocument, options);
        }
export type ListSubmitQueryHookResult = ReturnType<typeof useListSubmitQuery>;
export type ListSubmitLazyQueryHookResult = ReturnType<typeof useListSubmitLazyQuery>;
export type ListSubmitQueryResult = Apollo.QueryResult<ListSubmitQuery, ListSubmitQueryVariables>;
export const PerformanceEvaluationDocument = gql`
    query performanceEvaluation($strategyId: Float, $departmentIds: [Float!]) {
  performanceEvaluation(strategyId: $strategyId, departmentIds: $departmentIds) {
    percentComplete
    complete
    overall
  }
}
    `;

/**
 * __usePerformanceEvaluationQuery__
 *
 * To run a query within a React component, call `usePerformanceEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceEvaluationQuery({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      departmentIds: // value for 'departmentIds'
 *   },
 * });
 */
export function usePerformanceEvaluationQuery(baseOptions?: Apollo.QueryHookOptions<PerformanceEvaluationQuery, PerformanceEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PerformanceEvaluationQuery, PerformanceEvaluationQueryVariables>(PerformanceEvaluationDocument, options);
      }
export function usePerformanceEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PerformanceEvaluationQuery, PerformanceEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PerformanceEvaluationQuery, PerformanceEvaluationQueryVariables>(PerformanceEvaluationDocument, options);
        }
export type PerformanceEvaluationQueryHookResult = ReturnType<typeof usePerformanceEvaluationQuery>;
export type PerformanceEvaluationLazyQueryHookResult = ReturnType<typeof usePerformanceEvaluationLazyQuery>;
export type PerformanceEvaluationQueryResult = Apollo.QueryResult<PerformanceEvaluationQuery, PerformanceEvaluationQueryVariables>;
export const SelfAssessmentsDocument = gql`
    query selfAssessments($strategyId: Float, $departmentIds: [Float!]) {
  selfAssessments(strategyId: $strategyId, departmentIds: $departmentIds) {
    percentComplete
    complete
    overall
  }
}
    `;

/**
 * __useSelfAssessmentsQuery__
 *
 * To run a query within a React component, call `useSelfAssessmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfAssessmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfAssessmentsQuery({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      departmentIds: // value for 'departmentIds'
 *   },
 * });
 */
export function useSelfAssessmentsQuery(baseOptions?: Apollo.QueryHookOptions<SelfAssessmentsQuery, SelfAssessmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelfAssessmentsQuery, SelfAssessmentsQueryVariables>(SelfAssessmentsDocument, options);
      }
export function useSelfAssessmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelfAssessmentsQuery, SelfAssessmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelfAssessmentsQuery, SelfAssessmentsQueryVariables>(SelfAssessmentsDocument, options);
        }
export type SelfAssessmentsQueryHookResult = ReturnType<typeof useSelfAssessmentsQuery>;
export type SelfAssessmentsLazyQueryHookResult = ReturnType<typeof useSelfAssessmentsLazyQuery>;
export type SelfAssessmentsQueryResult = Apollo.QueryResult<SelfAssessmentsQuery, SelfAssessmentsQueryVariables>;
export const ListContributorsDocument = gql`
    query listContributors($strategyId: Float, $departmentIds: [Float!]) {
  listContributors(strategyId: $strategyId, departmentIds: $departmentIds) {
    percentComplete
    complete
    overall
  }
}
    `;

/**
 * __useListContributorsQuery__
 *
 * To run a query within a React component, call `useListContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListContributorsQuery({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      departmentIds: // value for 'departmentIds'
 *   },
 * });
 */
export function useListContributorsQuery(baseOptions?: Apollo.QueryHookOptions<ListContributorsQuery, ListContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListContributorsQuery, ListContributorsQueryVariables>(ListContributorsDocument, options);
      }
export function useListContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListContributorsQuery, ListContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListContributorsQuery, ListContributorsQueryVariables>(ListContributorsDocument, options);
        }
export type ListContributorsQueryHookResult = ReturnType<typeof useListContributorsQuery>;
export type ListContributorsLazyQueryHookResult = ReturnType<typeof useListContributorsLazyQuery>;
export type ListContributorsQueryResult = Apollo.QueryResult<ListContributorsQuery, ListContributorsQueryVariables>;
export const OverallProgressDocument = gql`
    query OverallProgress($departmentIds: [Float!], $strategyId: Float) {
  overallProgress(departmentIds: $departmentIds, strategyId: $strategyId) {
    percentComplete
    complete
    overall
  }
}
    `;

/**
 * __useOverallProgressQuery__
 *
 * To run a query within a React component, call `useOverallProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverallProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverallProgressQuery({
 *   variables: {
 *      departmentIds: // value for 'departmentIds'
 *      strategyId: // value for 'strategyId'
 *   },
 * });
 */
export function useOverallProgressQuery(baseOptions?: Apollo.QueryHookOptions<OverallProgressQuery, OverallProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OverallProgressQuery, OverallProgressQueryVariables>(OverallProgressDocument, options);
      }
export function useOverallProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OverallProgressQuery, OverallProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OverallProgressQuery, OverallProgressQueryVariables>(OverallProgressDocument, options);
        }
export type OverallProgressQueryHookResult = ReturnType<typeof useOverallProgressQuery>;
export type OverallProgressLazyQueryHookResult = ReturnType<typeof useOverallProgressLazyQuery>;
export type OverallProgressQueryResult = Apollo.QueryResult<OverallProgressQuery, OverallProgressQueryVariables>;
export const GetListOfPerformanceSummaryDocument = gql`
    query getListOfPerformanceSummary {
  getListOfPerformanceSummary {
    id
    percentComplete
    isComplete
    status
    user {
      id
      name
      image
      department {
        id
        name
        deadlinePerformanceEvaluation
      }
      evaluator {
        id
      }
    }
  }
}
    `;

/**
 * __useGetListOfPerformanceSummaryQuery__
 *
 * To run a query within a React component, call `useGetListOfPerformanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListOfPerformanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOfPerformanceSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListOfPerformanceSummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetListOfPerformanceSummaryQuery, GetListOfPerformanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListOfPerformanceSummaryQuery, GetListOfPerformanceSummaryQueryVariables>(GetListOfPerformanceSummaryDocument, options);
      }
export function useGetListOfPerformanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListOfPerformanceSummaryQuery, GetListOfPerformanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListOfPerformanceSummaryQuery, GetListOfPerformanceSummaryQueryVariables>(GetListOfPerformanceSummaryDocument, options);
        }
export type GetListOfPerformanceSummaryQueryHookResult = ReturnType<typeof useGetListOfPerformanceSummaryQuery>;
export type GetListOfPerformanceSummaryLazyQueryHookResult = ReturnType<typeof useGetListOfPerformanceSummaryLazyQuery>;
export type GetListOfPerformanceSummaryQueryResult = Apollo.QueryResult<GetListOfPerformanceSummaryQuery, GetListOfPerformanceSummaryQueryVariables>;
export const GetPendingLocApprovalDocument = gql`
    query getPendingLOCApproval {
  getPendingLOCApproval {
    id
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useGetPendingLocApprovalQuery__
 *
 * To run a query within a React component, call `useGetPendingLocApprovalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingLocApprovalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingLocApprovalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingLocApprovalQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingLocApprovalQuery, GetPendingLocApprovalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingLocApprovalQuery, GetPendingLocApprovalQueryVariables>(GetPendingLocApprovalDocument, options);
      }
export function useGetPendingLocApprovalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingLocApprovalQuery, GetPendingLocApprovalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingLocApprovalQuery, GetPendingLocApprovalQueryVariables>(GetPendingLocApprovalDocument, options);
        }
export type GetPendingLocApprovalQueryHookResult = ReturnType<typeof useGetPendingLocApprovalQuery>;
export type GetPendingLocApprovalLazyQueryHookResult = ReturnType<typeof useGetPendingLocApprovalLazyQuery>;
export type GetPendingLocApprovalQueryResult = Apollo.QueryResult<GetPendingLocApprovalQuery, GetPendingLocApprovalQueryVariables>;
export const GetContributorsOfUserDocument = gql`
    query GetContributorsOfUser($pageSize: Float, $page: Float!, $userId: Float!, $sort: UserSortField, $isEvaluator: Boolean!) {
  getContributorsOfUser: getContributorsOfEvaluatee(
    pageSize: $pageSize
    page: $page
    userId: $userId
    sort: $sort
    isEvaluator: $isEvaluator
  ) {
    total
    page
    pageSize
    data {
      ...UserContributorFragment
    }
  }
}
    ${UserContributorFragmentFragmentDoc}`;

/**
 * __useGetContributorsOfUserQuery__
 *
 * To run a query within a React component, call `useGetContributorsOfUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContributorsOfUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContributorsOfUserQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *      isEvaluator: // value for 'isEvaluator'
 *   },
 * });
 */
export function useGetContributorsOfUserQuery(baseOptions: Apollo.QueryHookOptions<GetContributorsOfUserQuery, GetContributorsOfUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContributorsOfUserQuery, GetContributorsOfUserQueryVariables>(GetContributorsOfUserDocument, options);
      }
export function useGetContributorsOfUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContributorsOfUserQuery, GetContributorsOfUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContributorsOfUserQuery, GetContributorsOfUserQueryVariables>(GetContributorsOfUserDocument, options);
        }
export type GetContributorsOfUserQueryHookResult = ReturnType<typeof useGetContributorsOfUserQuery>;
export type GetContributorsOfUserLazyQueryHookResult = ReturnType<typeof useGetContributorsOfUserLazyQuery>;
export type GetContributorsOfUserQueryResult = Apollo.QueryResult<GetContributorsOfUserQuery, GetContributorsOfUserQueryVariables>;
export const AddContributorOfUserDocument = gql`
    mutation AddContributorOfUser($userId: Float!, $data: [CreateContributorInput!]!) {
  addContributors(userId: $userId, data: $data) {
    ...UserContributorFragment
  }
}
    ${UserContributorFragmentFragmentDoc}`;
export type AddContributorOfUserMutationFn = Apollo.MutationFunction<AddContributorOfUserMutation, AddContributorOfUserMutationVariables>;

/**
 * __useAddContributorOfUserMutation__
 *
 * To run a mutation, you first call `useAddContributorOfUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContributorOfUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContributorOfUserMutation, { data, loading, error }] = useAddContributorOfUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddContributorOfUserMutation(baseOptions?: Apollo.MutationHookOptions<AddContributorOfUserMutation, AddContributorOfUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContributorOfUserMutation, AddContributorOfUserMutationVariables>(AddContributorOfUserDocument, options);
      }
export type AddContributorOfUserMutationHookResult = ReturnType<typeof useAddContributorOfUserMutation>;
export type AddContributorOfUserMutationResult = Apollo.MutationResult<AddContributorOfUserMutation>;
export type AddContributorOfUserMutationOptions = Apollo.BaseMutationOptions<AddContributorOfUserMutation, AddContributorOfUserMutationVariables>;
export const GetLastYearContributorsDocument = gql`
    query GetLastYearContributors($pageSize: Float, $page: Float!, $userId: Float!, $sort: UserSortField) {
  getLastYearContributors: getLastYearContributors(
    pageSize: $pageSize
    page: $page
    userId: $userId
    sort: $sort
  ) {
    total
    page
    pageSize
    data {
      ...UserContributorFragment
    }
  }
}
    ${UserContributorFragmentFragmentDoc}`;

/**
 * __useGetLastYearContributorsQuery__
 *
 * To run a query within a React component, call `useGetLastYearContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastYearContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastYearContributorsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetLastYearContributorsQuery(baseOptions: Apollo.QueryHookOptions<GetLastYearContributorsQuery, GetLastYearContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastYearContributorsQuery, GetLastYearContributorsQueryVariables>(GetLastYearContributorsDocument, options);
      }
export function useGetLastYearContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastYearContributorsQuery, GetLastYearContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastYearContributorsQuery, GetLastYearContributorsQueryVariables>(GetLastYearContributorsDocument, options);
        }
export type GetLastYearContributorsQueryHookResult = ReturnType<typeof useGetLastYearContributorsQuery>;
export type GetLastYearContributorsLazyQueryHookResult = ReturnType<typeof useGetLastYearContributorsLazyQuery>;
export type GetLastYearContributorsQueryResult = Apollo.QueryResult<GetLastYearContributorsQuery, GetLastYearContributorsQueryVariables>;
export const GetMyLoCsDocument = gql`
    query GetMyLOCs($page: Float!, $sort: UserSortField) {
  getLOCsMyTeamForm(page: $page, sort: $sort) {
    total
    page
    pageSize
    data {
      id
      listOfContributors {
        id
        status
        user {
          id
          firstName
          lastName
          image
          title {
            name
          }
          strategy {
            name
          }
          department {
            name
          }
          location {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyLoCsQuery__
 *
 * To run a query within a React component, call `useGetMyLoCsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyLoCsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyLoCsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMyLoCsQuery(baseOptions: Apollo.QueryHookOptions<GetMyLoCsQuery, GetMyLoCsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyLoCsQuery, GetMyLoCsQueryVariables>(GetMyLoCsDocument, options);
      }
export function useGetMyLoCsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyLoCsQuery, GetMyLoCsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyLoCsQuery, GetMyLoCsQueryVariables>(GetMyLoCsDocument, options);
        }
export type GetMyLoCsQueryHookResult = ReturnType<typeof useGetMyLoCsQuery>;
export type GetMyLoCsLazyQueryHookResult = ReturnType<typeof useGetMyLoCsLazyQuery>;
export type GetMyLoCsQueryResult = Apollo.QueryResult<GetMyLoCsQuery, GetMyLoCsQueryVariables>;
export const SubmitLocDocument = gql`
    mutation SubmitLOC($isSendReminder: Boolean!, $evaluateeId: Float) {
  submitLOC(isSendReminder: $isSendReminder, evaluateeId: $evaluateeId) {
    id
    status
  }
}
    `;
export type SubmitLocMutationFn = Apollo.MutationFunction<SubmitLocMutation, SubmitLocMutationVariables>;

/**
 * __useSubmitLocMutation__
 *
 * To run a mutation, you first call `useSubmitLocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitLocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitLocMutation, { data, loading, error }] = useSubmitLocMutation({
 *   variables: {
 *      isSendReminder: // value for 'isSendReminder'
 *      evaluateeId: // value for 'evaluateeId'
 *   },
 * });
 */
export function useSubmitLocMutation(baseOptions?: Apollo.MutationHookOptions<SubmitLocMutation, SubmitLocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitLocMutation, SubmitLocMutationVariables>(SubmitLocDocument, options);
      }
export type SubmitLocMutationHookResult = ReturnType<typeof useSubmitLocMutation>;
export type SubmitLocMutationResult = Apollo.MutationResult<SubmitLocMutation>;
export type SubmitLocMutationOptions = Apollo.BaseMutationOptions<SubmitLocMutation, SubmitLocMutationVariables>;
export const ApproveLocDocument = gql`
    mutation ApproveLOC($isSendReminder: Boolean!, $ids: CycleContributorID!) {
  approveLOC(isSendReminder: $isSendReminder, ids: $ids) {
    id
    status
  }
}
    `;
export type ApproveLocMutationFn = Apollo.MutationFunction<ApproveLocMutation, ApproveLocMutationVariables>;

/**
 * __useApproveLocMutation__
 *
 * To run a mutation, you first call `useApproveLocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveLocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveLocMutation, { data, loading, error }] = useApproveLocMutation({
 *   variables: {
 *      isSendReminder: // value for 'isSendReminder'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useApproveLocMutation(baseOptions?: Apollo.MutationHookOptions<ApproveLocMutation, ApproveLocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveLocMutation, ApproveLocMutationVariables>(ApproveLocDocument, options);
      }
export type ApproveLocMutationHookResult = ReturnType<typeof useApproveLocMutation>;
export type ApproveLocMutationResult = Apollo.MutationResult<ApproveLocMutation>;
export type ApproveLocMutationOptions = Apollo.BaseMutationOptions<ApproveLocMutation, ApproveLocMutationVariables>;
export const GetAllCyclesWithPaginationDocument = gql`
    query GetAllCyclesWithPagination($sort: SortField, $pageSize: Float, $page: Float!) {
  getAllCyclesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
    total
    page
    pageSize
    data {
      id
      createdAt
      updatedAt
      isActive
      name
    }
  }
}
    `;

/**
 * __useGetAllCyclesWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllCyclesWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCyclesWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCyclesWithPaginationQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllCyclesWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetAllCyclesWithPaginationQuery, GetAllCyclesWithPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCyclesWithPaginationQuery, GetAllCyclesWithPaginationQueryVariables>(GetAllCyclesWithPaginationDocument, options);
      }
export function useGetAllCyclesWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCyclesWithPaginationQuery, GetAllCyclesWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCyclesWithPaginationQuery, GetAllCyclesWithPaginationQueryVariables>(GetAllCyclesWithPaginationDocument, options);
        }
export type GetAllCyclesWithPaginationQueryHookResult = ReturnType<typeof useGetAllCyclesWithPaginationQuery>;
export type GetAllCyclesWithPaginationLazyQueryHookResult = ReturnType<typeof useGetAllCyclesWithPaginationLazyQuery>;
export type GetAllCyclesWithPaginationQueryResult = Apollo.QueryResult<GetAllCyclesWithPaginationQuery, GetAllCyclesWithPaginationQueryVariables>;
export const GetOneCycleDocument = gql`
    query getOneCycle($id: Float!) {
  getOneCycle(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetOneCycleQuery__
 *
 * To run a query within a React component, call `useGetOneCycleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneCycleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneCycleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneCycleQuery(baseOptions: Apollo.QueryHookOptions<GetOneCycleQuery, GetOneCycleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneCycleQuery, GetOneCycleQueryVariables>(GetOneCycleDocument, options);
      }
export function useGetOneCycleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneCycleQuery, GetOneCycleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneCycleQuery, GetOneCycleQueryVariables>(GetOneCycleDocument, options);
        }
export type GetOneCycleQueryHookResult = ReturnType<typeof useGetOneCycleQuery>;
export type GetOneCycleLazyQueryHookResult = ReturnType<typeof useGetOneCycleLazyQuery>;
export type GetOneCycleQueryResult = Apollo.QueryResult<GetOneCycleQuery, GetOneCycleQueryVariables>;
export const AddOneCycleDocument = gql`
    mutation addOneCycle($data: CycleInput!) {
  addOneCycle(data: $data) {
    id
    name
  }
}
    `;
export type AddOneCycleMutationFn = Apollo.MutationFunction<AddOneCycleMutation, AddOneCycleMutationVariables>;

/**
 * __useAddOneCycleMutation__
 *
 * To run a mutation, you first call `useAddOneCycleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneCycleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneCycleMutation, { data, loading, error }] = useAddOneCycleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneCycleMutation(baseOptions?: Apollo.MutationHookOptions<AddOneCycleMutation, AddOneCycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneCycleMutation, AddOneCycleMutationVariables>(AddOneCycleDocument, options);
      }
export type AddOneCycleMutationHookResult = ReturnType<typeof useAddOneCycleMutation>;
export type AddOneCycleMutationResult = Apollo.MutationResult<AddOneCycleMutation>;
export type AddOneCycleMutationOptions = Apollo.BaseMutationOptions<AddOneCycleMutation, AddOneCycleMutationVariables>;
export const UpdateOneCycleDocument = gql`
    mutation updateOneCycle($id: Float!, $data: CycleInput!) {
  updateOneCycle(id: $id, data: $data) {
    id
    name
  }
}
    `;
export type UpdateOneCycleMutationFn = Apollo.MutationFunction<UpdateOneCycleMutation, UpdateOneCycleMutationVariables>;

/**
 * __useUpdateOneCycleMutation__
 *
 * To run a mutation, you first call `useUpdateOneCycleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCycleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCycleMutation, { data, loading, error }] = useUpdateOneCycleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneCycleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneCycleMutation, UpdateOneCycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneCycleMutation, UpdateOneCycleMutationVariables>(UpdateOneCycleDocument, options);
      }
export type UpdateOneCycleMutationHookResult = ReturnType<typeof useUpdateOneCycleMutation>;
export type UpdateOneCycleMutationResult = Apollo.MutationResult<UpdateOneCycleMutation>;
export type UpdateOneCycleMutationOptions = Apollo.BaseMutationOptions<UpdateOneCycleMutation, UpdateOneCycleMutationVariables>;
export const DeleteOneCycleDocument = gql`
    mutation deleteOneCycle($id: Float!) {
  deleteOneCycle(id: $id)
}
    `;
export type DeleteOneCycleMutationFn = Apollo.MutationFunction<DeleteOneCycleMutation, DeleteOneCycleMutationVariables>;

/**
 * __useDeleteOneCycleMutation__
 *
 * To run a mutation, you first call `useDeleteOneCycleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCycleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCycleMutation, { data, loading, error }] = useDeleteOneCycleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOneCycleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneCycleMutation, DeleteOneCycleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneCycleMutation, DeleteOneCycleMutationVariables>(DeleteOneCycleDocument, options);
      }
export type DeleteOneCycleMutationHookResult = ReturnType<typeof useDeleteOneCycleMutation>;
export type DeleteOneCycleMutationResult = Apollo.MutationResult<DeleteOneCycleMutation>;
export type DeleteOneCycleMutationOptions = Apollo.BaseMutationOptions<DeleteOneCycleMutation, DeleteOneCycleMutationVariables>;
export const GetAllCyclesDocument = gql`
    query GetAllCycles {
  getAllCycle {
    id
    createdAt
    updatedAt
    isActive
    name
  }
}
    `;

/**
 * __useGetAllCyclesQuery__
 *
 * To run a query within a React component, call `useGetAllCyclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCyclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCyclesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCyclesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCyclesQuery, GetAllCyclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCyclesQuery, GetAllCyclesQueryVariables>(GetAllCyclesDocument, options);
      }
export function useGetAllCyclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCyclesQuery, GetAllCyclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCyclesQuery, GetAllCyclesQueryVariables>(GetAllCyclesDocument, options);
        }
export type GetAllCyclesQueryHookResult = ReturnType<typeof useGetAllCyclesQuery>;
export type GetAllCyclesLazyQueryHookResult = ReturnType<typeof useGetAllCyclesLazyQuery>;
export type GetAllCyclesQueryResult = Apollo.QueryResult<GetAllCyclesQuery, GetAllCyclesQueryVariables>;
export const GetPreCycleDocument = gql`
    query GetPreCycle {
  getPreCycle {
    id
  }
}
    `;

/**
 * __useGetPreCycleQuery__
 *
 * To run a query within a React component, call `useGetPreCycleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreCycleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreCycleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPreCycleQuery(baseOptions?: Apollo.QueryHookOptions<GetPreCycleQuery, GetPreCycleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreCycleQuery, GetPreCycleQueryVariables>(GetPreCycleDocument, options);
      }
export function useGetPreCycleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreCycleQuery, GetPreCycleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreCycleQuery, GetPreCycleQueryVariables>(GetPreCycleDocument, options);
        }
export type GetPreCycleQueryHookResult = ReturnType<typeof useGetPreCycleQuery>;
export type GetPreCycleLazyQueryHookResult = ReturnType<typeof useGetPreCycleLazyQuery>;
export type GetPreCycleQueryResult = Apollo.QueryResult<GetPreCycleQuery, GetPreCycleQueryVariables>;
export const DeleteCyclesDocument = gql`
    mutation DeleteCycles($input: DeleteCyclesInput!) {
  deleteCycles(input: $input)
}
    `;
export type DeleteCyclesMutationFn = Apollo.MutationFunction<DeleteCyclesMutation, DeleteCyclesMutationVariables>;

/**
 * __useDeleteCyclesMutation__
 *
 * To run a mutation, you first call `useDeleteCyclesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCyclesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCyclesMutation, { data, loading, error }] = useDeleteCyclesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCyclesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCyclesMutation, DeleteCyclesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCyclesMutation, DeleteCyclesMutationVariables>(DeleteCyclesDocument, options);
      }
export type DeleteCyclesMutationHookResult = ReturnType<typeof useDeleteCyclesMutation>;
export type DeleteCyclesMutationResult = Apollo.MutationResult<DeleteCyclesMutation>;
export type DeleteCyclesMutationOptions = Apollo.BaseMutationOptions<DeleteCyclesMutation, DeleteCyclesMutationVariables>;
export const GetAllDepartmentsDocument = gql`
    query GetAllDepartments($strategyId: Float, $departmentId: Float) {
  getAllDepartments(strategyId: $strategyId, departmentId: $departmentId) {
    ...Department
  }
}
    ${DepartmentFragmentDoc}`;

/**
 * __useGetAllDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetAllDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDepartmentsQuery({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      departmentId: // value for 'departmentId'
 *   },
 * });
 */
export function useGetAllDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDepartmentsQuery, GetAllDepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDepartmentsQuery, GetAllDepartmentsQueryVariables>(GetAllDepartmentsDocument, options);
      }
export function useGetAllDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDepartmentsQuery, GetAllDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDepartmentsQuery, GetAllDepartmentsQueryVariables>(GetAllDepartmentsDocument, options);
        }
export type GetAllDepartmentsQueryHookResult = ReturnType<typeof useGetAllDepartmentsQuery>;
export type GetAllDepartmentsLazyQueryHookResult = ReturnType<typeof useGetAllDepartmentsLazyQuery>;
export type GetAllDepartmentsQueryResult = Apollo.QueryResult<GetAllDepartmentsQuery, GetAllDepartmentsQueryVariables>;
export const GetAllDepartmentsWithPaginationDocument = gql`
    query getAllDepartmentsWithPagination($strategyId: Float, $sort: DepartmentSortField, $pageSize: Float, $page: Float!) {
  getAllDepartmentsWithPagination(
    strategyId: $strategyId
    sort: $sort
    pageSize: $pageSize
    page: $page
  ) {
    total
    page
    pageSize
    data {
      ...Department
    }
  }
}
    ${DepartmentFragmentDoc}`;

/**
 * __useGetAllDepartmentsWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllDepartmentsWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDepartmentsWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDepartmentsWithPaginationQuery({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllDepartmentsWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetAllDepartmentsWithPaginationQuery, GetAllDepartmentsWithPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDepartmentsWithPaginationQuery, GetAllDepartmentsWithPaginationQueryVariables>(GetAllDepartmentsWithPaginationDocument, options);
      }
export function useGetAllDepartmentsWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDepartmentsWithPaginationQuery, GetAllDepartmentsWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDepartmentsWithPaginationQuery, GetAllDepartmentsWithPaginationQueryVariables>(GetAllDepartmentsWithPaginationDocument, options);
        }
export type GetAllDepartmentsWithPaginationQueryHookResult = ReturnType<typeof useGetAllDepartmentsWithPaginationQuery>;
export type GetAllDepartmentsWithPaginationLazyQueryHookResult = ReturnType<typeof useGetAllDepartmentsWithPaginationLazyQuery>;
export type GetAllDepartmentsWithPaginationQueryResult = Apollo.QueryResult<GetAllDepartmentsWithPaginationQuery, GetAllDepartmentsWithPaginationQueryVariables>;
export const GetOneDepartmentDocument = gql`
    query getOneDepartment($id: Float!) {
  getOneDepartment(id: $id) {
    ...Department
  }
}
    ${DepartmentFragmentDoc}`;

/**
 * __useGetOneDepartmentQuery__
 *
 * To run a query within a React component, call `useGetOneDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneDepartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneDepartmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneDepartmentQuery(baseOptions: Apollo.QueryHookOptions<GetOneDepartmentQuery, GetOneDepartmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneDepartmentQuery, GetOneDepartmentQueryVariables>(GetOneDepartmentDocument, options);
      }
export function useGetOneDepartmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneDepartmentQuery, GetOneDepartmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneDepartmentQuery, GetOneDepartmentQueryVariables>(GetOneDepartmentDocument, options);
        }
export type GetOneDepartmentQueryHookResult = ReturnType<typeof useGetOneDepartmentQuery>;
export type GetOneDepartmentLazyQueryHookResult = ReturnType<typeof useGetOneDepartmentLazyQuery>;
export type GetOneDepartmentQueryResult = Apollo.QueryResult<GetOneDepartmentQuery, GetOneDepartmentQueryVariables>;
export const DeleteDepartmentDocument = gql`
    mutation deleteDepartment($ids: [Float!]!) {
  deleteDepartment(ids: $ids)
}
    `;
export type DeleteDepartmentMutationFn = Apollo.MutationFunction<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;

/**
 * __useDeleteDepartmentMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDepartmentMutation, { data, loading, error }] = useDeleteDepartmentMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument, options);
      }
export type DeleteDepartmentMutationHookResult = ReturnType<typeof useDeleteDepartmentMutation>;
export type DeleteDepartmentMutationResult = Apollo.MutationResult<DeleteDepartmentMutation>;
export type DeleteDepartmentMutationOptions = Apollo.BaseMutationOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;
export const GetEvaluationInfoDocument = gql`
    query GetEvaluationInfo($evaluateeId: Float!, $contributorId: Float, $cycleId: Float, $isSelfAssessment: Boolean) {
  getEvaluationInfo(
    evaluateeId: $evaluateeId
    contributorId: $contributorId
    cycleId: $cycleId
    isSelfAssessment: $isSelfAssessment
  ) {
    id
    name
    isComplete
    isSelfAssessment
    optOut
    isOpenEvaluation
    status
    contributor {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useGetEvaluationInfoQuery__
 *
 * To run a query within a React component, call `useGetEvaluationInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEvaluationInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEvaluationInfoQuery({
 *   variables: {
 *      evaluateeId: // value for 'evaluateeId'
 *      contributorId: // value for 'contributorId'
 *      cycleId: // value for 'cycleId'
 *      isSelfAssessment: // value for 'isSelfAssessment'
 *   },
 * });
 */
export function useGetEvaluationInfoQuery(baseOptions: Apollo.QueryHookOptions<GetEvaluationInfoQuery, GetEvaluationInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEvaluationInfoQuery, GetEvaluationInfoQueryVariables>(GetEvaluationInfoDocument, options);
      }
export function useGetEvaluationInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEvaluationInfoQuery, GetEvaluationInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEvaluationInfoQuery, GetEvaluationInfoQueryVariables>(GetEvaluationInfoDocument, options);
        }
export type GetEvaluationInfoQueryHookResult = ReturnType<typeof useGetEvaluationInfoQuery>;
export type GetEvaluationInfoLazyQueryHookResult = ReturnType<typeof useGetEvaluationInfoLazyQuery>;
export type GetEvaluationInfoQueryResult = Apollo.QueryResult<GetEvaluationInfoQuery, GetEvaluationInfoQueryVariables>;
export const GetUserForOpenEvaluationDocument = gql`
    query GetUserForOpenEvaluation {
  getUserForOpenEvaluation {
    id
    name
    lastPromotionCycleId
  }
}
    `;

/**
 * __useGetUserForOpenEvaluationQuery__
 *
 * To run a query within a React component, call `useGetUserForOpenEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserForOpenEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserForOpenEvaluationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserForOpenEvaluationQuery(baseOptions?: Apollo.QueryHookOptions<GetUserForOpenEvaluationQuery, GetUserForOpenEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserForOpenEvaluationQuery, GetUserForOpenEvaluationQueryVariables>(GetUserForOpenEvaluationDocument, options);
      }
export function useGetUserForOpenEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserForOpenEvaluationQuery, GetUserForOpenEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserForOpenEvaluationQuery, GetUserForOpenEvaluationQueryVariables>(GetUserForOpenEvaluationDocument, options);
        }
export type GetUserForOpenEvaluationQueryHookResult = ReturnType<typeof useGetUserForOpenEvaluationQuery>;
export type GetUserForOpenEvaluationLazyQueryHookResult = ReturnType<typeof useGetUserForOpenEvaluationLazyQuery>;
export type GetUserForOpenEvaluationQueryResult = Apollo.QueryResult<GetUserForOpenEvaluationQuery, GetUserForOpenEvaluationQueryVariables>;
export const GetOpenEvaluationDocument = gql`
    query GetOpenEvaluation($evaluateeId: Float!) {
  getOpenEvaluation(evaluateeId: $evaluateeId) {
    id
    name
    isSelfAssessment
    evaluatee {
      id
      name
      startDate
      image
      department {
        name
      }
      title {
        name
      }
    }
    cycle {
      id
    }
    evaluationType {
      id
      name
      key
    }
    evaluationAnswers {
      id
      feedback
      score
      evaluationTypeQuestion {
        id
        title
        subtitle
        text
        isOpenQuestion
        isRequired
        isNADisabled
        isNoExposureComment
      }
    }
  }
}
    `;

/**
 * __useGetOpenEvaluationQuery__
 *
 * To run a query within a React component, call `useGetOpenEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpenEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpenEvaluationQuery({
 *   variables: {
 *      evaluateeId: // value for 'evaluateeId'
 *   },
 * });
 */
export function useGetOpenEvaluationQuery(baseOptions: Apollo.QueryHookOptions<GetOpenEvaluationQuery, GetOpenEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpenEvaluationQuery, GetOpenEvaluationQueryVariables>(GetOpenEvaluationDocument, options);
      }
export function useGetOpenEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpenEvaluationQuery, GetOpenEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpenEvaluationQuery, GetOpenEvaluationQueryVariables>(GetOpenEvaluationDocument, options);
        }
export type GetOpenEvaluationQueryHookResult = ReturnType<typeof useGetOpenEvaluationQuery>;
export type GetOpenEvaluationLazyQueryHookResult = ReturnType<typeof useGetOpenEvaluationLazyQuery>;
export type GetOpenEvaluationQueryResult = Apollo.QueryResult<GetOpenEvaluationQuery, GetOpenEvaluationQueryVariables>;
export const UpdateEvaluationDocument = gql`
    mutation updateEvaluation($saveStatus: String!, $data: EvaluationUpdate!, $evaluationId: Float!, $isAdminMode: Boolean!) {
  updateEvaluation(
    saveStatus: $saveStatus
    data: $data
    evaluationId: $evaluationId
    isAdminMode: $isAdminMode
  ) {
    id
    name
    status
  }
}
    `;
export type UpdateEvaluationMutationFn = Apollo.MutationFunction<UpdateEvaluationMutation, UpdateEvaluationMutationVariables>;

/**
 * __useUpdateEvaluationMutation__
 *
 * To run a mutation, you first call `useUpdateEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEvaluationMutation, { data, loading, error }] = useUpdateEvaluationMutation({
 *   variables: {
 *      saveStatus: // value for 'saveStatus'
 *      data: // value for 'data'
 *      evaluationId: // value for 'evaluationId'
 *      isAdminMode: // value for 'isAdminMode'
 *   },
 * });
 */
export function useUpdateEvaluationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEvaluationMutation, UpdateEvaluationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEvaluationMutation, UpdateEvaluationMutationVariables>(UpdateEvaluationDocument, options);
      }
export type UpdateEvaluationMutationHookResult = ReturnType<typeof useUpdateEvaluationMutation>;
export type UpdateEvaluationMutationResult = Apollo.MutationResult<UpdateEvaluationMutation>;
export type UpdateEvaluationMutationOptions = Apollo.BaseMutationOptions<UpdateEvaluationMutation, UpdateEvaluationMutationVariables>;
export const ReverseOptOutDocument = gql`
    mutation reverseOptOut($evaluationId: Float!) {
  reverseOptOut(evaluationId: $evaluationId) {
    id
    name
  }
}
    `;
export type ReverseOptOutMutationFn = Apollo.MutationFunction<ReverseOptOutMutation, ReverseOptOutMutationVariables>;

/**
 * __useReverseOptOutMutation__
 *
 * To run a mutation, you first call `useReverseOptOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReverseOptOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reverseOptOutMutation, { data, loading, error }] = useReverseOptOutMutation({
 *   variables: {
 *      evaluationId: // value for 'evaluationId'
 *   },
 * });
 */
export function useReverseOptOutMutation(baseOptions?: Apollo.MutationHookOptions<ReverseOptOutMutation, ReverseOptOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReverseOptOutMutation, ReverseOptOutMutationVariables>(ReverseOptOutDocument, options);
      }
export type ReverseOptOutMutationHookResult = ReturnType<typeof useReverseOptOutMutation>;
export type ReverseOptOutMutationResult = Apollo.MutationResult<ReverseOptOutMutation>;
export type ReverseOptOutMutationOptions = Apollo.BaseMutationOptions<ReverseOptOutMutation, ReverseOptOutMutationVariables>;
export const GetLoCsAwaitingApprovalDocument = gql`
    query getLOCsAwaitingApproval {
  getLOCsAwaitingApproval {
    percentComplete
    users {
      id
      name
      image
      cycleContributors {
        id
        status
      }
      department {
        id
        name
        deadlineLOC
        deadlineConfirmLOC
      }
    }
    percentComplete
    complete
  }
}
    `;

/**
 * __useGetLoCsAwaitingApprovalQuery__
 *
 * To run a query within a React component, call `useGetLoCsAwaitingApprovalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoCsAwaitingApprovalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoCsAwaitingApprovalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoCsAwaitingApprovalQuery(baseOptions?: Apollo.QueryHookOptions<GetLoCsAwaitingApprovalQuery, GetLoCsAwaitingApprovalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoCsAwaitingApprovalQuery, GetLoCsAwaitingApprovalQueryVariables>(GetLoCsAwaitingApprovalDocument, options);
      }
export function useGetLoCsAwaitingApprovalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoCsAwaitingApprovalQuery, GetLoCsAwaitingApprovalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoCsAwaitingApprovalQuery, GetLoCsAwaitingApprovalQueryVariables>(GetLoCsAwaitingApprovalDocument, options);
        }
export type GetLoCsAwaitingApprovalQueryHookResult = ReturnType<typeof useGetLoCsAwaitingApprovalQuery>;
export type GetLoCsAwaitingApprovalLazyQueryHookResult = ReturnType<typeof useGetLoCsAwaitingApprovalLazyQuery>;
export type GetLoCsAwaitingApprovalQueryResult = Apollo.QueryResult<GetLoCsAwaitingApprovalQuery, GetLoCsAwaitingApprovalQueryVariables>;
export const GetListOfPerformanceEvaluationsDocument = gql`
    query getListOfPerformanceEvaluations {
  getListOfPerformanceEvaluations {
    percentComplete
    evaluationStatus {
      evaluationId
      evaluationStatus
      evaluatee {
        id
        name
        image
        updatedAt
        department {
          id
          name
          deadlinePerformanceEvaluation
        }
      }
    }
  }
}
    `;

/**
 * __useGetListOfPerformanceEvaluationsQuery__
 *
 * To run a query within a React component, call `useGetListOfPerformanceEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListOfPerformanceEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOfPerformanceEvaluationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListOfPerformanceEvaluationsQuery(baseOptions?: Apollo.QueryHookOptions<GetListOfPerformanceEvaluationsQuery, GetListOfPerformanceEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListOfPerformanceEvaluationsQuery, GetListOfPerformanceEvaluationsQueryVariables>(GetListOfPerformanceEvaluationsDocument, options);
      }
export function useGetListOfPerformanceEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListOfPerformanceEvaluationsQuery, GetListOfPerformanceEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListOfPerformanceEvaluationsQuery, GetListOfPerformanceEvaluationsQueryVariables>(GetListOfPerformanceEvaluationsDocument, options);
        }
export type GetListOfPerformanceEvaluationsQueryHookResult = ReturnType<typeof useGetListOfPerformanceEvaluationsQuery>;
export type GetListOfPerformanceEvaluationsLazyQueryHookResult = ReturnType<typeof useGetListOfPerformanceEvaluationsLazyQuery>;
export type GetListOfPerformanceEvaluationsQueryResult = Apollo.QueryResult<GetListOfPerformanceEvaluationsQuery, GetListOfPerformanceEvaluationsQueryVariables>;
export const GetListPerformanceEvaluationsDocument = gql`
    query getListPerformanceEvaluations {
  getListPerformanceEvaluations {
    completedPercentage
    completePerformance
    totalPerformance
    isComplete
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useGetListPerformanceEvaluationsQuery__
 *
 * To run a query within a React component, call `useGetListPerformanceEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListPerformanceEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListPerformanceEvaluationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListPerformanceEvaluationsQuery(baseOptions?: Apollo.QueryHookOptions<GetListPerformanceEvaluationsQuery, GetListPerformanceEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListPerformanceEvaluationsQuery, GetListPerformanceEvaluationsQueryVariables>(GetListPerformanceEvaluationsDocument, options);
      }
export function useGetListPerformanceEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListPerformanceEvaluationsQuery, GetListPerformanceEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListPerformanceEvaluationsQuery, GetListPerformanceEvaluationsQueryVariables>(GetListPerformanceEvaluationsDocument, options);
        }
export type GetListPerformanceEvaluationsQueryHookResult = ReturnType<typeof useGetListPerformanceEvaluationsQuery>;
export type GetListPerformanceEvaluationsLazyQueryHookResult = ReturnType<typeof useGetListPerformanceEvaluationsLazyQuery>;
export type GetListPerformanceEvaluationsQueryResult = Apollo.QueryResult<GetListPerformanceEvaluationsQuery, GetListPerformanceEvaluationsQueryVariables>;
export const GetSelfAssessmentForEvaluateesDocument = gql`
    query getSelfAssessmentForEvaluatees {
  getSelfAssessmentForEvaluatees {
    percentComplete
    evaluationStatus {
      evaluationId
      evaluationStatus
      evaluatee {
        updatedAt
        image
        id
        name
        department {
          id
          name
          deadlineSelfAssessment
        }
      }
    }
  }
}
    `;

/**
 * __useGetSelfAssessmentForEvaluateesQuery__
 *
 * To run a query within a React component, call `useGetSelfAssessmentForEvaluateesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSelfAssessmentForEvaluateesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSelfAssessmentForEvaluateesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSelfAssessmentForEvaluateesQuery(baseOptions?: Apollo.QueryHookOptions<GetSelfAssessmentForEvaluateesQuery, GetSelfAssessmentForEvaluateesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSelfAssessmentForEvaluateesQuery, GetSelfAssessmentForEvaluateesQueryVariables>(GetSelfAssessmentForEvaluateesDocument, options);
      }
export function useGetSelfAssessmentForEvaluateesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSelfAssessmentForEvaluateesQuery, GetSelfAssessmentForEvaluateesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSelfAssessmentForEvaluateesQuery, GetSelfAssessmentForEvaluateesQueryVariables>(GetSelfAssessmentForEvaluateesDocument, options);
        }
export type GetSelfAssessmentForEvaluateesQueryHookResult = ReturnType<typeof useGetSelfAssessmentForEvaluateesQuery>;
export type GetSelfAssessmentForEvaluateesLazyQueryHookResult = ReturnType<typeof useGetSelfAssessmentForEvaluateesLazyQuery>;
export type GetSelfAssessmentForEvaluateesQueryResult = Apollo.QueryResult<GetSelfAssessmentForEvaluateesQuery, GetSelfAssessmentForEvaluateesQueryVariables>;
export const MyContributorsDocument = gql`
    query myContributors {
  myContributors: myContributorStatus {
    user {
      id
      name
      image
    }
    status
    id
  }
}
    `;

/**
 * __useMyContributorsQuery__
 *
 * To run a query within a React component, call `useMyContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyContributorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyContributorsQuery(baseOptions?: Apollo.QueryHookOptions<MyContributorsQuery, MyContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyContributorsQuery, MyContributorsQueryVariables>(MyContributorsDocument, options);
      }
export function useMyContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyContributorsQuery, MyContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyContributorsQuery, MyContributorsQueryVariables>(MyContributorsDocument, options);
        }
export type MyContributorsQueryHookResult = ReturnType<typeof useMyContributorsQuery>;
export type MyContributorsLazyQueryHookResult = ReturnType<typeof useMyContributorsLazyQuery>;
export type MyContributorsQueryResult = Apollo.QueryResult<MyContributorsQuery, MyContributorsQueryVariables>;
export const MySelfAssessmentDocument = gql`
    query mySelfAssessment {
  mySelfAssessment {
    evaluationStatus
    evaluatee {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useMySelfAssessmentQuery__
 *
 * To run a query within a React component, call `useMySelfAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySelfAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySelfAssessmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySelfAssessmentQuery(baseOptions?: Apollo.QueryHookOptions<MySelfAssessmentQuery, MySelfAssessmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySelfAssessmentQuery, MySelfAssessmentQueryVariables>(MySelfAssessmentDocument, options);
      }
export function useMySelfAssessmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySelfAssessmentQuery, MySelfAssessmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySelfAssessmentQuery, MySelfAssessmentQueryVariables>(MySelfAssessmentDocument, options);
        }
export type MySelfAssessmentQueryHookResult = ReturnType<typeof useMySelfAssessmentQuery>;
export type MySelfAssessmentLazyQueryHookResult = ReturnType<typeof useMySelfAssessmentLazyQuery>;
export type MySelfAssessmentQueryResult = Apollo.QueryResult<MySelfAssessmentQuery, MySelfAssessmentQueryVariables>;
export const GetQuestionsWithSpecificTypeDocument = gql`
    query getQuestionsWithSpecificType($evaluationType: Float!) {
  getQuestionsWithSpecificType(evaluationType: $evaluationType) {
    id
    title
    subtitle
    text
    isOpenQuestion
    isRequired
    isSelfAssessment
    isNADisabled
    isEvaluation
    priority
    isNoExposureComment
  }
}
    `;

/**
 * __useGetQuestionsWithSpecificTypeQuery__
 *
 * To run a query within a React component, call `useGetQuestionsWithSpecificTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsWithSpecificTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsWithSpecificTypeQuery({
 *   variables: {
 *      evaluationType: // value for 'evaluationType'
 *   },
 * });
 */
export function useGetQuestionsWithSpecificTypeQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionsWithSpecificTypeQuery, GetQuestionsWithSpecificTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsWithSpecificTypeQuery, GetQuestionsWithSpecificTypeQueryVariables>(GetQuestionsWithSpecificTypeDocument, options);
      }
export function useGetQuestionsWithSpecificTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsWithSpecificTypeQuery, GetQuestionsWithSpecificTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsWithSpecificTypeQuery, GetQuestionsWithSpecificTypeQueryVariables>(GetQuestionsWithSpecificTypeDocument, options);
        }
export type GetQuestionsWithSpecificTypeQueryHookResult = ReturnType<typeof useGetQuestionsWithSpecificTypeQuery>;
export type GetQuestionsWithSpecificTypeLazyQueryHookResult = ReturnType<typeof useGetQuestionsWithSpecificTypeLazyQuery>;
export type GetQuestionsWithSpecificTypeQueryResult = Apollo.QueryResult<GetQuestionsWithSpecificTypeQuery, GetQuestionsWithSpecificTypeQueryVariables>;
export const GetDistributionRatingsDocument = gql`
    query getDistributionRatings($evaluationType: Float, $question: Float) {
  getDistributionRatings(evaluationType: $evaluationType, question: $question) {
    ratings {
      score
      entries
      normalize
      percentage
    }
    mean
    stdDev
    total
  }
}
    `;

/**
 * __useGetDistributionRatingsQuery__
 *
 * To run a query within a React component, call `useGetDistributionRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDistributionRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDistributionRatingsQuery({
 *   variables: {
 *      evaluationType: // value for 'evaluationType'
 *      question: // value for 'question'
 *   },
 * });
 */
export function useGetDistributionRatingsQuery(baseOptions?: Apollo.QueryHookOptions<GetDistributionRatingsQuery, GetDistributionRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDistributionRatingsQuery, GetDistributionRatingsQueryVariables>(GetDistributionRatingsDocument, options);
      }
export function useGetDistributionRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDistributionRatingsQuery, GetDistributionRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDistributionRatingsQuery, GetDistributionRatingsQueryVariables>(GetDistributionRatingsDocument, options);
        }
export type GetDistributionRatingsQueryHookResult = ReturnType<typeof useGetDistributionRatingsQuery>;
export type GetDistributionRatingsLazyQueryHookResult = ReturnType<typeof useGetDistributionRatingsLazyQuery>;
export type GetDistributionRatingsQueryResult = Apollo.QueryResult<GetDistributionRatingsQuery, GetDistributionRatingsQueryVariables>;
export const GetOneEvaluationTypeDocument = gql`
    query getOneEvaluationType($id: Float!) {
  getOneEvaluationType(id: $id) {
    id
    name
    createdAt
    evaluationTypeQuestions {
      ...EvaluationTypeQuestion
    }
  }
}
    ${EvaluationTypeQuestionFragmentDoc}`;

/**
 * __useGetOneEvaluationTypeQuery__
 *
 * To run a query within a React component, call `useGetOneEvaluationTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneEvaluationTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneEvaluationTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneEvaluationTypeQuery(baseOptions: Apollo.QueryHookOptions<GetOneEvaluationTypeQuery, GetOneEvaluationTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneEvaluationTypeQuery, GetOneEvaluationTypeQueryVariables>(GetOneEvaluationTypeDocument, options);
      }
export function useGetOneEvaluationTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneEvaluationTypeQuery, GetOneEvaluationTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneEvaluationTypeQuery, GetOneEvaluationTypeQueryVariables>(GetOneEvaluationTypeDocument, options);
        }
export type GetOneEvaluationTypeQueryHookResult = ReturnType<typeof useGetOneEvaluationTypeQuery>;
export type GetOneEvaluationTypeLazyQueryHookResult = ReturnType<typeof useGetOneEvaluationTypeLazyQuery>;
export type GetOneEvaluationTypeQueryResult = Apollo.QueryResult<GetOneEvaluationTypeQuery, GetOneEvaluationTypeQueryVariables>;
export const UpdateEvaluationTypeDocument = gql`
    mutation updateEvaluationType($data: EvaluationTypeInput!, $typeId: Float!) {
  updateEvaluationType(data: $data, typeId: $typeId) {
    id
    name
    createdAt
    evaluationTypeQuestions {
      ...EvaluationTypeQuestion
    }
  }
}
    ${EvaluationTypeQuestionFragmentDoc}`;
export type UpdateEvaluationTypeMutationFn = Apollo.MutationFunction<UpdateEvaluationTypeMutation, UpdateEvaluationTypeMutationVariables>;

/**
 * __useUpdateEvaluationTypeMutation__
 *
 * To run a mutation, you first call `useUpdateEvaluationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEvaluationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEvaluationTypeMutation, { data, loading, error }] = useUpdateEvaluationTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *      typeId: // value for 'typeId'
 *   },
 * });
 */
export function useUpdateEvaluationTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEvaluationTypeMutation, UpdateEvaluationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEvaluationTypeMutation, UpdateEvaluationTypeMutationVariables>(UpdateEvaluationTypeDocument, options);
      }
export type UpdateEvaluationTypeMutationHookResult = ReturnType<typeof useUpdateEvaluationTypeMutation>;
export type UpdateEvaluationTypeMutationResult = Apollo.MutationResult<UpdateEvaluationTypeMutation>;
export type UpdateEvaluationTypeMutationOptions = Apollo.BaseMutationOptions<UpdateEvaluationTypeMutation, UpdateEvaluationTypeMutationVariables>;
export const AddEvaluationTypeDocument = gql`
    mutation addEvaluationType($data: EvaluationTypeInput!) {
  addEvaluationType(data: $data) {
    id
    name
    createdAt
    evaluationTypeQuestions {
      ...EvaluationTypeQuestion
    }
  }
}
    ${EvaluationTypeQuestionFragmentDoc}`;
export type AddEvaluationTypeMutationFn = Apollo.MutationFunction<AddEvaluationTypeMutation, AddEvaluationTypeMutationVariables>;

/**
 * __useAddEvaluationTypeMutation__
 *
 * To run a mutation, you first call `useAddEvaluationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEvaluationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEvaluationTypeMutation, { data, loading, error }] = useAddEvaluationTypeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddEvaluationTypeMutation(baseOptions?: Apollo.MutationHookOptions<AddEvaluationTypeMutation, AddEvaluationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEvaluationTypeMutation, AddEvaluationTypeMutationVariables>(AddEvaluationTypeDocument, options);
      }
export type AddEvaluationTypeMutationHookResult = ReturnType<typeof useAddEvaluationTypeMutation>;
export type AddEvaluationTypeMutationResult = Apollo.MutationResult<AddEvaluationTypeMutation>;
export type AddEvaluationTypeMutationOptions = Apollo.BaseMutationOptions<AddEvaluationTypeMutation, AddEvaluationTypeMutationVariables>;
export const DeleteEvaluationTypeDocument = gql`
    mutation deleteEvaluationType($ids: [Float!]!) {
  deleteEvaluationType(ids: $ids)
}
    `;
export type DeleteEvaluationTypeMutationFn = Apollo.MutationFunction<DeleteEvaluationTypeMutation, DeleteEvaluationTypeMutationVariables>;

/**
 * __useDeleteEvaluationTypeMutation__
 *
 * To run a mutation, you first call `useDeleteEvaluationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEvaluationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEvaluationTypeMutation, { data, loading, error }] = useDeleteEvaluationTypeMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteEvaluationTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEvaluationTypeMutation, DeleteEvaluationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEvaluationTypeMutation, DeleteEvaluationTypeMutationVariables>(DeleteEvaluationTypeDocument, options);
      }
export type DeleteEvaluationTypeMutationHookResult = ReturnType<typeof useDeleteEvaluationTypeMutation>;
export type DeleteEvaluationTypeMutationResult = Apollo.MutationResult<DeleteEvaluationTypeMutation>;
export type DeleteEvaluationTypeMutationOptions = Apollo.BaseMutationOptions<DeleteEvaluationTypeMutation, DeleteEvaluationTypeMutationVariables>;
export const GetAllDetailEvaluationTypesDocument = gql`
    query GetAllDetailEvaluationTypes($keyword: String, $page: Float!, $sort: SortField, $pageSize: Float) {
  getAllDetailEvaluationTypes(
    keyword: $keyword
    page: $page
    sort: $sort
    pageSize: $pageSize
  ) {
    total
    page
    pageSize
    data {
      id
      name
      key
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllDetailEvaluationTypesQuery__
 *
 * To run a query within a React component, call `useGetAllDetailEvaluationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDetailEvaluationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDetailEvaluationTypesQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetAllDetailEvaluationTypesQuery(baseOptions: Apollo.QueryHookOptions<GetAllDetailEvaluationTypesQuery, GetAllDetailEvaluationTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDetailEvaluationTypesQuery, GetAllDetailEvaluationTypesQueryVariables>(GetAllDetailEvaluationTypesDocument, options);
      }
export function useGetAllDetailEvaluationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDetailEvaluationTypesQuery, GetAllDetailEvaluationTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDetailEvaluationTypesQuery, GetAllDetailEvaluationTypesQueryVariables>(GetAllDetailEvaluationTypesDocument, options);
        }
export type GetAllDetailEvaluationTypesQueryHookResult = ReturnType<typeof useGetAllDetailEvaluationTypesQuery>;
export type GetAllDetailEvaluationTypesLazyQueryHookResult = ReturnType<typeof useGetAllDetailEvaluationTypesLazyQuery>;
export type GetAllDetailEvaluationTypesQueryResult = Apollo.QueryResult<GetAllDetailEvaluationTypesQuery, GetAllDetailEvaluationTypesQueryVariables>;
export const GetMyEvaluationsDocument = gql`
    query getMyEvaluations($pageSize: Float, $page: Float!, $sort: UserSortField) {
  getMyEvaluations(pageSize: $pageSize, page: $page, sort: $sort) {
    total
    page
    pageSize
    data {
      id
      evaluatee {
        id
        name
        firstName
        lastName
        title {
          id
          name
        }
        strategy {
          id
          name
        }
        department {
          id
          name
        }
        location {
          id
          name
        }
        image
      }
      status
      optOut
      isOpenEvaluation
    }
  }
}
    `;

/**
 * __useGetMyEvaluationsQuery__
 *
 * To run a query within a React component, call `useGetMyEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEvaluationsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMyEvaluationsQuery(baseOptions: Apollo.QueryHookOptions<GetMyEvaluationsQuery, GetMyEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEvaluationsQuery, GetMyEvaluationsQueryVariables>(GetMyEvaluationsDocument, options);
      }
export function useGetMyEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEvaluationsQuery, GetMyEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEvaluationsQuery, GetMyEvaluationsQueryVariables>(GetMyEvaluationsDocument, options);
        }
export type GetMyEvaluationsQueryHookResult = ReturnType<typeof useGetMyEvaluationsQuery>;
export type GetMyEvaluationsLazyQueryHookResult = ReturnType<typeof useGetMyEvaluationsLazyQuery>;
export type GetMyEvaluationsQueryResult = Apollo.QueryResult<GetMyEvaluationsQuery, GetMyEvaluationsQueryVariables>;
export const GetUserEvaluationDocument = gql`
    query GetUserEvaluation($evaluationId: Float, $contributorId: Float, $cycleId: Float, $isSelfAssessment: Boolean, $evaluateeId: Float, $isEvaluationMode: Boolean) {
  getOneEvaluation: getUserEvaluation(
    isSelfAssessment: $isSelfAssessment
    evaluateeId: $evaluateeId
    contributorId: $contributorId
    cycleId: $cycleId
    evaluationId: $evaluationId
    isEvaluationMode: $isEvaluationMode
  ) {
    id
    name
    optOut
    optOutReason
    createdAt
    updatedAt
    contributor {
      id
    }
    evaluatee {
      ...Evaluatee
    }
    evaluationType {
      name
    }
    evaluationAnswers {
      id
      score
      feedback
      evaluationTypeQuestion {
        ...EvaluationTypeQuestion
      }
    }
    status
    cycle {
      id
    }
    isSelfAssessment
  }
}
    ${EvaluateeFragmentDoc}
${EvaluationTypeQuestionFragmentDoc}`;

/**
 * __useGetUserEvaluationQuery__
 *
 * To run a query within a React component, call `useGetUserEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEvaluationQuery({
 *   variables: {
 *      evaluationId: // value for 'evaluationId'
 *      contributorId: // value for 'contributorId'
 *      cycleId: // value for 'cycleId'
 *      isSelfAssessment: // value for 'isSelfAssessment'
 *      evaluateeId: // value for 'evaluateeId'
 *      isEvaluationMode: // value for 'isEvaluationMode'
 *   },
 * });
 */
export function useGetUserEvaluationQuery(baseOptions?: Apollo.QueryHookOptions<GetUserEvaluationQuery, GetUserEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEvaluationQuery, GetUserEvaluationQueryVariables>(GetUserEvaluationDocument, options);
      }
export function useGetUserEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEvaluationQuery, GetUserEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEvaluationQuery, GetUserEvaluationQueryVariables>(GetUserEvaluationDocument, options);
        }
export type GetUserEvaluationQueryHookResult = ReturnType<typeof useGetUserEvaluationQuery>;
export type GetUserEvaluationLazyQueryHookResult = ReturnType<typeof useGetUserEvaluationLazyQuery>;
export type GetUserEvaluationQueryResult = Apollo.QueryResult<GetUserEvaluationQuery, GetUserEvaluationQueryVariables>;
export const GetOneEvaluationDocument = gql`
    query getOneEvaluation($id: Float!) {
  getOneEvaluation(id: $id) {
    id
    name
    optOut
    optOutReason
    createdAt
    updatedAt
    contributor {
      id
    }
    evaluatee {
      ...Evaluatee
    }
    evaluationType {
      name
    }
    evaluationAnswers {
      id
      score
      feedback
      evaluationTypeQuestion {
        ...EvaluationTypeQuestion
      }
    }
    status
    cycle {
      id
    }
    isSelfAssessment
  }
}
    ${EvaluateeFragmentDoc}
${EvaluationTypeQuestionFragmentDoc}`;

/**
 * __useGetOneEvaluationQuery__
 *
 * To run a query within a React component, call `useGetOneEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneEvaluationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneEvaluationQuery(baseOptions: Apollo.QueryHookOptions<GetOneEvaluationQuery, GetOneEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneEvaluationQuery, GetOneEvaluationQueryVariables>(GetOneEvaluationDocument, options);
      }
export function useGetOneEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneEvaluationQuery, GetOneEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneEvaluationQuery, GetOneEvaluationQueryVariables>(GetOneEvaluationDocument, options);
        }
export type GetOneEvaluationQueryHookResult = ReturnType<typeof useGetOneEvaluationQuery>;
export type GetOneEvaluationLazyQueryHookResult = ReturnType<typeof useGetOneEvaluationLazyQuery>;
export type GetOneEvaluationQueryResult = Apollo.QueryResult<GetOneEvaluationQuery, GetOneEvaluationQueryVariables>;
export const DeleteEvaluationDocument = gql`
    mutation DeleteEvaluation($evaluationId: Float!) {
  deleteEvaluation(evaluationId: $evaluationId)
}
    `;
export type DeleteEvaluationMutationFn = Apollo.MutationFunction<DeleteEvaluationMutation, DeleteEvaluationMutationVariables>;

/**
 * __useDeleteEvaluationMutation__
 *
 * To run a mutation, you first call `useDeleteEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEvaluationMutation, { data, loading, error }] = useDeleteEvaluationMutation({
 *   variables: {
 *      evaluationId: // value for 'evaluationId'
 *   },
 * });
 */
export function useDeleteEvaluationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEvaluationMutation, DeleteEvaluationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEvaluationMutation, DeleteEvaluationMutationVariables>(DeleteEvaluationDocument, options);
      }
export type DeleteEvaluationMutationHookResult = ReturnType<typeof useDeleteEvaluationMutation>;
export type DeleteEvaluationMutationResult = Apollo.MutationResult<DeleteEvaluationMutation>;
export type DeleteEvaluationMutationOptions = Apollo.BaseMutationOptions<DeleteEvaluationMutation, DeleteEvaluationMutationVariables>;
export const ExportMyEvaluationsDocument = gql`
    query ExportMyEvaluations {
  exportMyEvaluations {
    url
  }
}
    `;

/**
 * __useExportMyEvaluationsQuery__
 *
 * To run a query within a React component, call `useExportMyEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportMyEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportMyEvaluationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportMyEvaluationsQuery(baseOptions?: Apollo.QueryHookOptions<ExportMyEvaluationsQuery, ExportMyEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportMyEvaluationsQuery, ExportMyEvaluationsQueryVariables>(ExportMyEvaluationsDocument, options);
      }
export function useExportMyEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportMyEvaluationsQuery, ExportMyEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportMyEvaluationsQuery, ExportMyEvaluationsQueryVariables>(ExportMyEvaluationsDocument, options);
        }
export type ExportMyEvaluationsQueryHookResult = ReturnType<typeof useExportMyEvaluationsQuery>;
export type ExportMyEvaluationsLazyQueryHookResult = ReturnType<typeof useExportMyEvaluationsLazyQuery>;
export type ExportMyEvaluationsQueryResult = Apollo.QueryResult<ExportMyEvaluationsQuery, ExportMyEvaluationsQueryVariables>;
export const ExportMySelfAssessmentDocument = gql`
    query ExportMySelfAssessment {
  exportMySelfAssessment {
    url
  }
}
    `;

/**
 * __useExportMySelfAssessmentQuery__
 *
 * To run a query within a React component, call `useExportMySelfAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportMySelfAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportMySelfAssessmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useExportMySelfAssessmentQuery(baseOptions?: Apollo.QueryHookOptions<ExportMySelfAssessmentQuery, ExportMySelfAssessmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportMySelfAssessmentQuery, ExportMySelfAssessmentQueryVariables>(ExportMySelfAssessmentDocument, options);
      }
export function useExportMySelfAssessmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportMySelfAssessmentQuery, ExportMySelfAssessmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportMySelfAssessmentQuery, ExportMySelfAssessmentQueryVariables>(ExportMySelfAssessmentDocument, options);
        }
export type ExportMySelfAssessmentQueryHookResult = ReturnType<typeof useExportMySelfAssessmentQuery>;
export type ExportMySelfAssessmentLazyQueryHookResult = ReturnType<typeof useExportMySelfAssessmentLazyQuery>;
export type ExportMySelfAssessmentQueryResult = Apollo.QueryResult<ExportMySelfAssessmentQuery, ExportMySelfAssessmentQueryVariables>;
export const SubmitEvaluationDocument = gql`
    mutation SubmitEvaluation {
  submitEvaluation {
    error
    data {
      evaluation {
        id
        status
        evaluatee {
          id
          name
        }
      }
      answerAndQuestions {
        question {
          id
          text
          isOpenQuestion
          isRequired
          isNADisabled
          title
        }
        answer {
          id
          feedback
          score
          isNoFeedback
          isNoScore
          isScore5s
          isScoreNA
        }
      }
    }
  }
}
    `;
export type SubmitEvaluationMutationFn = Apollo.MutationFunction<SubmitEvaluationMutation, SubmitEvaluationMutationVariables>;

/**
 * __useSubmitEvaluationMutation__
 *
 * To run a mutation, you first call `useSubmitEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitEvaluationMutation, { data, loading, error }] = useSubmitEvaluationMutation({
 *   variables: {
 *   },
 * });
 */
export function useSubmitEvaluationMutation(baseOptions?: Apollo.MutationHookOptions<SubmitEvaluationMutation, SubmitEvaluationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitEvaluationMutation, SubmitEvaluationMutationVariables>(SubmitEvaluationDocument, options);
      }
export type SubmitEvaluationMutationHookResult = ReturnType<typeof useSubmitEvaluationMutation>;
export type SubmitEvaluationMutationResult = Apollo.MutationResult<SubmitEvaluationMutation>;
export type SubmitEvaluationMutationOptions = Apollo.BaseMutationOptions<SubmitEvaluationMutation, SubmitEvaluationMutationVariables>;
export const GetOneOverallPerformanceSummaryDocument = gql`
    query GetOneOverallPerformanceSummary($getOneOverallPerformanceSummaryId: Float!) {
  getOneOverallPerformanceSummary(id: $getOneOverallPerformanceSummaryId) {
    id
    status
    isShare
    sharedDate
    cycle {
      id
      name
    }
    user {
      id
      name
      firstName
      lastName
      image
      updatedAt
      evaluator {
        id
        name
        firstName
        lastName
        image
        updatedAt
        title {
          id
          name
        }
      }
      title {
        id
        name
      }
      department {
        id
        name
      }
      evaluationType {
        id
        name
      }
    }
    overallPerformanceSummaryAnswers {
      ...OpsQuestionAndAnswer
    }
  }
}
    ${OpsQuestionAndAnswerFragmentDoc}`;

/**
 * __useGetOneOverallPerformanceSummaryQuery__
 *
 * To run a query within a React component, call `useGetOneOverallPerformanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneOverallPerformanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneOverallPerformanceSummaryQuery({
 *   variables: {
 *      getOneOverallPerformanceSummaryId: // value for 'getOneOverallPerformanceSummaryId'
 *   },
 * });
 */
export function useGetOneOverallPerformanceSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetOneOverallPerformanceSummaryQuery, GetOneOverallPerformanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneOverallPerformanceSummaryQuery, GetOneOverallPerformanceSummaryQueryVariables>(GetOneOverallPerformanceSummaryDocument, options);
      }
export function useGetOneOverallPerformanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneOverallPerformanceSummaryQuery, GetOneOverallPerformanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneOverallPerformanceSummaryQuery, GetOneOverallPerformanceSummaryQueryVariables>(GetOneOverallPerformanceSummaryDocument, options);
        }
export type GetOneOverallPerformanceSummaryQueryHookResult = ReturnType<typeof useGetOneOverallPerformanceSummaryQuery>;
export type GetOneOverallPerformanceSummaryLazyQueryHookResult = ReturnType<typeof useGetOneOverallPerformanceSummaryLazyQuery>;
export type GetOneOverallPerformanceSummaryQueryResult = Apollo.QueryResult<GetOneOverallPerformanceSummaryQuery, GetOneOverallPerformanceSummaryQueryVariables>;
export const UpdateOneOverallPerformanceSummaryDocument = gql`
    mutation UpdateOneOverallPerformanceSummary($updateOneOverallPerformanceSummaryId: Float!, $data: OverallPerformanceSummaryInput!) {
  updateOneOverallPerformanceSummary(
    id: $updateOneOverallPerformanceSummaryId
    data: $data
  ) {
    id
    status
    isShare
    sharedDate
    cycle {
      id
      name
    }
    user {
      id
      name
      firstName
      lastName
      image
      updatedAt
      evaluator {
        id
        name
        firstName
        lastName
        image
        updatedAt
        title {
          id
          name
        }
      }
      title {
        id
        name
      }
      department {
        id
        name
      }
      evaluationType {
        id
        name
      }
    }
    overallPerformanceSummaryAnswers {
      ...OpsQuestionAndAnswer
    }
  }
}
    ${OpsQuestionAndAnswerFragmentDoc}`;
export type UpdateOneOverallPerformanceSummaryMutationFn = Apollo.MutationFunction<UpdateOneOverallPerformanceSummaryMutation, UpdateOneOverallPerformanceSummaryMutationVariables>;

/**
 * __useUpdateOneOverallPerformanceSummaryMutation__
 *
 * To run a mutation, you first call `useUpdateOneOverallPerformanceSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneOverallPerformanceSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneOverallPerformanceSummaryMutation, { data, loading, error }] = useUpdateOneOverallPerformanceSummaryMutation({
 *   variables: {
 *      updateOneOverallPerformanceSummaryId: // value for 'updateOneOverallPerformanceSummaryId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneOverallPerformanceSummaryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneOverallPerformanceSummaryMutation, UpdateOneOverallPerformanceSummaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneOverallPerformanceSummaryMutation, UpdateOneOverallPerformanceSummaryMutationVariables>(UpdateOneOverallPerformanceSummaryDocument, options);
      }
export type UpdateOneOverallPerformanceSummaryMutationHookResult = ReturnType<typeof useUpdateOneOverallPerformanceSummaryMutation>;
export type UpdateOneOverallPerformanceSummaryMutationResult = Apollo.MutationResult<UpdateOneOverallPerformanceSummaryMutation>;
export type UpdateOneOverallPerformanceSummaryMutationOptions = Apollo.BaseMutationOptions<UpdateOneOverallPerformanceSummaryMutation, UpdateOneOverallPerformanceSummaryMutationVariables>;
export const GetAllLocationsDocument = gql`
    query getAllLocations {
  getAllLocations {
    ...Location
  }
}
    ${LocationFragmentDoc}`;

/**
 * __useGetAllLocationsQuery__
 *
 * To run a query within a React component, call `useGetAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
      }
export function useGetAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export type GetAllLocationsQueryHookResult = ReturnType<typeof useGetAllLocationsQuery>;
export type GetAllLocationsLazyQueryHookResult = ReturnType<typeof useGetAllLocationsLazyQuery>;
export type GetAllLocationsQueryResult = Apollo.QueryResult<GetAllLocationsQuery, GetAllLocationsQueryVariables>;
export const GetAllLocationsWithPaginationDocument = gql`
    query getAllLocationsWithPagination($sort: LocationSortField, $pageSize: Float, $page: Float!) {
  getAllLocationsWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
    total
    page
    pageSize
    data {
      ...Location
    }
  }
}
    ${LocationFragmentDoc}`;

/**
 * __useGetAllLocationsWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllLocationsWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocationsWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocationsWithPaginationQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllLocationsWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetAllLocationsWithPaginationQuery, GetAllLocationsWithPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocationsWithPaginationQuery, GetAllLocationsWithPaginationQueryVariables>(GetAllLocationsWithPaginationDocument, options);
      }
export function useGetAllLocationsWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocationsWithPaginationQuery, GetAllLocationsWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocationsWithPaginationQuery, GetAllLocationsWithPaginationQueryVariables>(GetAllLocationsWithPaginationDocument, options);
        }
export type GetAllLocationsWithPaginationQueryHookResult = ReturnType<typeof useGetAllLocationsWithPaginationQuery>;
export type GetAllLocationsWithPaginationLazyQueryHookResult = ReturnType<typeof useGetAllLocationsWithPaginationLazyQuery>;
export type GetAllLocationsWithPaginationQueryResult = Apollo.QueryResult<GetAllLocationsWithPaginationQuery, GetAllLocationsWithPaginationQueryVariables>;
export const GetOneLocationDocument = gql`
    query getOneLocation($id: Float!) {
  getOneLocation(id: $id) {
    ...Location
  }
}
    ${LocationFragmentDoc}`;

/**
 * __useGetOneLocationQuery__
 *
 * To run a query within a React component, call `useGetOneLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneLocationQuery(baseOptions: Apollo.QueryHookOptions<GetOneLocationQuery, GetOneLocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneLocationQuery, GetOneLocationQueryVariables>(GetOneLocationDocument, options);
      }
export function useGetOneLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneLocationQuery, GetOneLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneLocationQuery, GetOneLocationQueryVariables>(GetOneLocationDocument, options);
        }
export type GetOneLocationQueryHookResult = ReturnType<typeof useGetOneLocationQuery>;
export type GetOneLocationLazyQueryHookResult = ReturnType<typeof useGetOneLocationLazyQuery>;
export type GetOneLocationQueryResult = Apollo.QueryResult<GetOneLocationQuery, GetOneLocationQueryVariables>;
export const DeleteLocationDocument = gql`
    mutation deleteLocation($ids: [Float!]!) {
  deleteLocation(ids: $ids)
}
    `;
export type DeleteLocationMutationFn = Apollo.MutationFunction<DeleteLocationMutation, DeleteLocationMutationVariables>;

/**
 * __useDeleteLocationMutation__
 *
 * To run a mutation, you first call `useDeleteLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLocationMutation, { data, loading, error }] = useDeleteLocationMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteLocationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLocationMutation, DeleteLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument, options);
      }
export type DeleteLocationMutationHookResult = ReturnType<typeof useDeleteLocationMutation>;
export type DeleteLocationMutationResult = Apollo.MutationResult<DeleteLocationMutation>;
export type DeleteLocationMutationOptions = Apollo.BaseMutationOptions<DeleteLocationMutation, DeleteLocationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllNotificationShortsDocument = gql`
    query getAllNotificationShorts {
  getAllNotificationShorts {
    id
    createdAt
    updatedAt
    key
    subject
    content
    fullContent
    isRead
  }
}
    `;

/**
 * __useGetAllNotificationShortsQuery__
 *
 * To run a query within a React component, call `useGetAllNotificationShortsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllNotificationShortsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllNotificationShortsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllNotificationShortsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllNotificationShortsQuery, GetAllNotificationShortsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllNotificationShortsQuery, GetAllNotificationShortsQueryVariables>(GetAllNotificationShortsDocument, options);
      }
export function useGetAllNotificationShortsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllNotificationShortsQuery, GetAllNotificationShortsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllNotificationShortsQuery, GetAllNotificationShortsQueryVariables>(GetAllNotificationShortsDocument, options);
        }
export type GetAllNotificationShortsQueryHookResult = ReturnType<typeof useGetAllNotificationShortsQuery>;
export type GetAllNotificationShortsLazyQueryHookResult = ReturnType<typeof useGetAllNotificationShortsLazyQuery>;
export type GetAllNotificationShortsQueryResult = Apollo.QueryResult<GetAllNotificationShortsQuery, GetAllNotificationShortsQueryVariables>;
export const InvokeNotificationDocument = gql`
    mutation InvokeNotification($data: NotificationRequest!, $filter: UserActionFilter!) {
  invokeNotification(data: $data, filter: $filter)
}
    `;
export type InvokeNotificationMutationFn = Apollo.MutationFunction<InvokeNotificationMutation, InvokeNotificationMutationVariables>;

/**
 * __useInvokeNotificationMutation__
 *
 * To run a mutation, you first call `useInvokeNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvokeNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [invokeNotificationMutation, { data, loading, error }] = useInvokeNotificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useInvokeNotificationMutation(baseOptions?: Apollo.MutationHookOptions<InvokeNotificationMutation, InvokeNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InvokeNotificationMutation, InvokeNotificationMutationVariables>(InvokeNotificationDocument, options);
      }
export type InvokeNotificationMutationHookResult = ReturnType<typeof useInvokeNotificationMutation>;
export type InvokeNotificationMutationResult = Apollo.MutationResult<InvokeNotificationMutation>;
export type InvokeNotificationMutationOptions = Apollo.BaseMutationOptions<InvokeNotificationMutation, InvokeNotificationMutationVariables>;
export const ClearAllNotificationsDocument = gql`
    mutation ClearAllNotifications {
  clearAllNotifications {
    id
    createdAt
    updatedAt
    key
    subject
    content
    fullContent
    isRead
  }
}
    `;
export type ClearAllNotificationsMutationFn = Apollo.MutationFunction<ClearAllNotificationsMutation, ClearAllNotificationsMutationVariables>;

/**
 * __useClearAllNotificationsMutation__
 *
 * To run a mutation, you first call `useClearAllNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearAllNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearAllNotificationsMutation, { data, loading, error }] = useClearAllNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearAllNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<ClearAllNotificationsMutation, ClearAllNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearAllNotificationsMutation, ClearAllNotificationsMutationVariables>(ClearAllNotificationsDocument, options);
      }
export type ClearAllNotificationsMutationHookResult = ReturnType<typeof useClearAllNotificationsMutation>;
export type ClearAllNotificationsMutationResult = Apollo.MutationResult<ClearAllNotificationsMutation>;
export type ClearAllNotificationsMutationOptions = Apollo.BaseMutationOptions<ClearAllNotificationsMutation, ClearAllNotificationsMutationVariables>;
export const GetAllNotificationLogsDocument = gql`
    query GetAllNotificationLogs($userId: Float) {
  getAllNotificationLogs(userId: $userId) {
    ...Reminder
  }
}
    ${ReminderFragmentDoc}`;

/**
 * __useGetAllNotificationLogsQuery__
 *
 * To run a query within a React component, call `useGetAllNotificationLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllNotificationLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllNotificationLogsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllNotificationLogsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllNotificationLogsQuery, GetAllNotificationLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllNotificationLogsQuery, GetAllNotificationLogsQueryVariables>(GetAllNotificationLogsDocument, options);
      }
export function useGetAllNotificationLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllNotificationLogsQuery, GetAllNotificationLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllNotificationLogsQuery, GetAllNotificationLogsQueryVariables>(GetAllNotificationLogsDocument, options);
        }
export type GetAllNotificationLogsQueryHookResult = ReturnType<typeof useGetAllNotificationLogsQuery>;
export type GetAllNotificationLogsLazyQueryHookResult = ReturnType<typeof useGetAllNotificationLogsLazyQuery>;
export type GetAllNotificationLogsQueryResult = Apollo.QueryResult<GetAllNotificationLogsQuery, GetAllNotificationLogsQueryVariables>;
export const GetUsersInReminderDocument = gql`
    query GetUsersInReminder($filter: UserActionFilter!, $recipient: String!) {
  getUsersInReminder(filter: $filter, recipient: $recipient) {
    id
    name
  }
}
    `;

/**
 * __useGetUsersInReminderQuery__
 *
 * To run a query within a React component, call `useGetUsersInReminderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInReminderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInReminderQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useGetUsersInReminderQuery(baseOptions: Apollo.QueryHookOptions<GetUsersInReminderQuery, GetUsersInReminderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInReminderQuery, GetUsersInReminderQueryVariables>(GetUsersInReminderDocument, options);
      }
export function useGetUsersInReminderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInReminderQuery, GetUsersInReminderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInReminderQuery, GetUsersInReminderQueryVariables>(GetUsersInReminderDocument, options);
        }
export type GetUsersInReminderQueryHookResult = ReturnType<typeof useGetUsersInReminderQuery>;
export type GetUsersInReminderLazyQueryHookResult = ReturnType<typeof useGetUsersInReminderLazyQuery>;
export type GetUsersInReminderQueryResult = Apollo.QueryResult<GetUsersInReminderQuery, GetUsersInReminderQueryVariables>;
export const GetAllReminderTemplatesDocument = gql`
    query getAllReminderTemplates {
  getAllReminderTemplates {
    id
    name
    subject
    content
    key
    shortContent
    reminderMe
  }
}
    `;

/**
 * __useGetAllReminderTemplatesQuery__
 *
 * To run a query within a React component, call `useGetAllReminderTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReminderTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReminderTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReminderTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReminderTemplatesQuery, GetAllReminderTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReminderTemplatesQuery, GetAllReminderTemplatesQueryVariables>(GetAllReminderTemplatesDocument, options);
      }
export function useGetAllReminderTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReminderTemplatesQuery, GetAllReminderTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReminderTemplatesQuery, GetAllReminderTemplatesQueryVariables>(GetAllReminderTemplatesDocument, options);
        }
export type GetAllReminderTemplatesQueryHookResult = ReturnType<typeof useGetAllReminderTemplatesQuery>;
export type GetAllReminderTemplatesLazyQueryHookResult = ReturnType<typeof useGetAllReminderTemplatesLazyQuery>;
export type GetAllReminderTemplatesQueryResult = Apollo.QueryResult<GetAllReminderTemplatesQuery, GetAllReminderTemplatesQueryVariables>;
export const UpdateOneReminderTemplateDocument = gql`
    mutation updateOneReminderTemplate($id: Float!, $data: ReminderTemplateInput!) {
  updateOneReminderTemplate(id: $id, data: $data) {
    id
    name
    subject
    content
    key
    shortContent
    reminderMe
  }
}
    `;
export type UpdateOneReminderTemplateMutationFn = Apollo.MutationFunction<UpdateOneReminderTemplateMutation, UpdateOneReminderTemplateMutationVariables>;

/**
 * __useUpdateOneReminderTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateOneReminderTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneReminderTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneReminderTemplateMutation, { data, loading, error }] = useUpdateOneReminderTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneReminderTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneReminderTemplateMutation, UpdateOneReminderTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneReminderTemplateMutation, UpdateOneReminderTemplateMutationVariables>(UpdateOneReminderTemplateDocument, options);
      }
export type UpdateOneReminderTemplateMutationHookResult = ReturnType<typeof useUpdateOneReminderTemplateMutation>;
export type UpdateOneReminderTemplateMutationResult = Apollo.MutationResult<UpdateOneReminderTemplateMutation>;
export type UpdateOneReminderTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateOneReminderTemplateMutation, UpdateOneReminderTemplateMutationVariables>;
export const AddOneReminderTemplateDocument = gql`
    mutation addOneReminderTemplate($data: ReminderTemplateInput!) {
  addOneReminderTemplate(data: $data) {
    id
    name
    subject
    content
    key
    shortContent
    reminderMe
  }
}
    `;
export type AddOneReminderTemplateMutationFn = Apollo.MutationFunction<AddOneReminderTemplateMutation, AddOneReminderTemplateMutationVariables>;

/**
 * __useAddOneReminderTemplateMutation__
 *
 * To run a mutation, you first call `useAddOneReminderTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneReminderTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneReminderTemplateMutation, { data, loading, error }] = useAddOneReminderTemplateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneReminderTemplateMutation(baseOptions?: Apollo.MutationHookOptions<AddOneReminderTemplateMutation, AddOneReminderTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneReminderTemplateMutation, AddOneReminderTemplateMutationVariables>(AddOneReminderTemplateDocument, options);
      }
export type AddOneReminderTemplateMutationHookResult = ReturnType<typeof useAddOneReminderTemplateMutation>;
export type AddOneReminderTemplateMutationResult = Apollo.MutationResult<AddOneReminderTemplateMutation>;
export type AddOneReminderTemplateMutationOptions = Apollo.BaseMutationOptions<AddOneReminderTemplateMutation, AddOneReminderTemplateMutationVariables>;
export const GetOneReminderTemplateDocument = gql`
    query getOneReminderTemplate($id: Float!) {
  getOneReminderTemplate(id: $id) {
    id
    name
    subject
    content
    key
    shortContent
    reminderMe
  }
}
    `;

/**
 * __useGetOneReminderTemplateQuery__
 *
 * To run a query within a React component, call `useGetOneReminderTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneReminderTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneReminderTemplateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneReminderTemplateQuery(baseOptions: Apollo.QueryHookOptions<GetOneReminderTemplateQuery, GetOneReminderTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneReminderTemplateQuery, GetOneReminderTemplateQueryVariables>(GetOneReminderTemplateDocument, options);
      }
export function useGetOneReminderTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneReminderTemplateQuery, GetOneReminderTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneReminderTemplateQuery, GetOneReminderTemplateQueryVariables>(GetOneReminderTemplateDocument, options);
        }
export type GetOneReminderTemplateQueryHookResult = ReturnType<typeof useGetOneReminderTemplateQuery>;
export type GetOneReminderTemplateLazyQueryHookResult = ReturnType<typeof useGetOneReminderTemplateLazyQuery>;
export type GetOneReminderTemplateQueryResult = Apollo.QueryResult<GetOneReminderTemplateQuery, GetOneReminderTemplateQueryVariables>;
export const DeleteReminderTemplateDocument = gql`
    mutation deleteReminderTemplate($ids: [Float!]!) {
  deleteReminderTemplate(ids: $ids)
}
    `;
export type DeleteReminderTemplateMutationFn = Apollo.MutationFunction<DeleteReminderTemplateMutation, DeleteReminderTemplateMutationVariables>;

/**
 * __useDeleteReminderTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteReminderTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReminderTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReminderTemplateMutation, { data, loading, error }] = useDeleteReminderTemplateMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteReminderTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReminderTemplateMutation, DeleteReminderTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReminderTemplateMutation, DeleteReminderTemplateMutationVariables>(DeleteReminderTemplateDocument, options);
      }
export type DeleteReminderTemplateMutationHookResult = ReturnType<typeof useDeleteReminderTemplateMutation>;
export type DeleteReminderTemplateMutationResult = Apollo.MutationResult<DeleteReminderTemplateMutation>;
export type DeleteReminderTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteReminderTemplateMutation, DeleteReminderTemplateMutationVariables>;
export const GetAllReminderTemplateDetailDocument = gql`
    query GetAllReminderTemplateDetail($page: Float!, $sort: SortFieldTemplate, $pageSize: Float) {
  getAllReminderTemplateDetail(page: $page, sort: $sort, pageSize: $pageSize) {
    total
    page
    pageSize
    data {
      id
      name
      subject
      content
      key
      shortContent
      reminderMe
    }
  }
}
    `;

/**
 * __useGetAllReminderTemplateDetailQuery__
 *
 * To run a query within a React component, call `useGetAllReminderTemplateDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReminderTemplateDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReminderTemplateDetailQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetAllReminderTemplateDetailQuery(baseOptions: Apollo.QueryHookOptions<GetAllReminderTemplateDetailQuery, GetAllReminderTemplateDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReminderTemplateDetailQuery, GetAllReminderTemplateDetailQueryVariables>(GetAllReminderTemplateDetailDocument, options);
      }
export function useGetAllReminderTemplateDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReminderTemplateDetailQuery, GetAllReminderTemplateDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReminderTemplateDetailQuery, GetAllReminderTemplateDetailQueryVariables>(GetAllReminderTemplateDetailDocument, options);
        }
export type GetAllReminderTemplateDetailQueryHookResult = ReturnType<typeof useGetAllReminderTemplateDetailQuery>;
export type GetAllReminderTemplateDetailLazyQueryHookResult = ReturnType<typeof useGetAllReminderTemplateDetailLazyQuery>;
export type GetAllReminderTemplateDetailQueryResult = Apollo.QueryResult<GetAllReminderTemplateDetailQuery, GetAllReminderTemplateDetailQueryVariables>;
export const GetPerformanceSummariesDocument = gql`
    query GetPerformanceSummaries($sort: UserSortField) {
  getReportPerformanceSummary(sort: $sort) {
    id
    percentComplete
    isComplete
    status
    user {
      id
      firstName
      lastName
      name
      title {
        id
        name
      }
      strategy {
        id
        name
      }
      department {
        id
        name
      }
      location {
        id
        name
      }
      evaluator {
        id
        name
      }
      image
    }
  }
}
    `;

/**
 * __useGetPerformanceSummariesQuery__
 *
 * To run a query within a React component, call `useGetPerformanceSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPerformanceSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPerformanceSummariesQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetPerformanceSummariesQuery(baseOptions?: Apollo.QueryHookOptions<GetPerformanceSummariesQuery, GetPerformanceSummariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPerformanceSummariesQuery, GetPerformanceSummariesQueryVariables>(GetPerformanceSummariesDocument, options);
      }
export function useGetPerformanceSummariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPerformanceSummariesQuery, GetPerformanceSummariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPerformanceSummariesQuery, GetPerformanceSummariesQueryVariables>(GetPerformanceSummariesDocument, options);
        }
export type GetPerformanceSummariesQueryHookResult = ReturnType<typeof useGetPerformanceSummariesQuery>;
export type GetPerformanceSummariesLazyQueryHookResult = ReturnType<typeof useGetPerformanceSummariesLazyQuery>;
export type GetPerformanceSummariesQueryResult = Apollo.QueryResult<GetPerformanceSummariesQuery, GetPerformanceSummariesQueryVariables>;
export const GetPerformanceSummaryDetailsDocument = gql`
    query GetPerformanceSummaryDetails($userId: Float!, $cycleId: Float) {
  getPerformanceSummaryDetails: getPerformanceSummaryDetails(
    userId: $userId
    cycleId: $cycleId
  ) {
    questionSummary {
      question {
        id
        title
        subtitle
        text
        isOpenQuestion
      }
      ratingAverage
      ratingAverageMdAndAbove
    }
    evaluations {
      optOut
      optOutReason
      contributor {
        ...AnswerContributor
      }
      evaluationAnswers {
        ...AnswerSummary
      }
    }
    performanceSummary {
      ...PerformanceSummary
    }
  }
}
    ${AnswerContributorFragmentDoc}
${AnswerSummaryFragmentDoc}
${PerformanceSummaryFragmentDoc}`;

/**
 * __useGetPerformanceSummaryDetailsQuery__
 *
 * To run a query within a React component, call `useGetPerformanceSummaryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPerformanceSummaryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPerformanceSummaryDetailsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cycleId: // value for 'cycleId'
 *   },
 * });
 */
export function useGetPerformanceSummaryDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetPerformanceSummaryDetailsQuery, GetPerformanceSummaryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPerformanceSummaryDetailsQuery, GetPerformanceSummaryDetailsQueryVariables>(GetPerformanceSummaryDetailsDocument, options);
      }
export function useGetPerformanceSummaryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPerformanceSummaryDetailsQuery, GetPerformanceSummaryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPerformanceSummaryDetailsQuery, GetPerformanceSummaryDetailsQueryVariables>(GetPerformanceSummaryDetailsDocument, options);
        }
export type GetPerformanceSummaryDetailsQueryHookResult = ReturnType<typeof useGetPerformanceSummaryDetailsQuery>;
export type GetPerformanceSummaryDetailsLazyQueryHookResult = ReturnType<typeof useGetPerformanceSummaryDetailsLazyQuery>;
export type GetPerformanceSummaryDetailsQueryResult = Apollo.QueryResult<GetPerformanceSummaryDetailsQuery, GetPerformanceSummaryDetailsQueryVariables>;
export const FinalizePerformanceSummaryDocument = gql`
    mutation FinalizePerformanceSummary($data: PerformanceSummaryFinalizeInput!, $psId: Float!) {
  finalizePerformanceSummary(data: $data, psId: $psId) {
    id
    score
    feedback
    isComplete
    status
  }
}
    `;
export type FinalizePerformanceSummaryMutationFn = Apollo.MutationFunction<FinalizePerformanceSummaryMutation, FinalizePerformanceSummaryMutationVariables>;

/**
 * __useFinalizePerformanceSummaryMutation__
 *
 * To run a mutation, you first call `useFinalizePerformanceSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizePerformanceSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizePerformanceSummaryMutation, { data, loading, error }] = useFinalizePerformanceSummaryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      psId: // value for 'psId'
 *   },
 * });
 */
export function useFinalizePerformanceSummaryMutation(baseOptions?: Apollo.MutationHookOptions<FinalizePerformanceSummaryMutation, FinalizePerformanceSummaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinalizePerformanceSummaryMutation, FinalizePerformanceSummaryMutationVariables>(FinalizePerformanceSummaryDocument, options);
      }
export type FinalizePerformanceSummaryMutationHookResult = ReturnType<typeof useFinalizePerformanceSummaryMutation>;
export type FinalizePerformanceSummaryMutationResult = Apollo.MutationResult<FinalizePerformanceSummaryMutation>;
export type FinalizePerformanceSummaryMutationOptions = Apollo.BaseMutationOptions<FinalizePerformanceSummaryMutation, FinalizePerformanceSummaryMutationVariables>;
export const GetLocApprovalDocument = gql`
    query GetLOCApproval($payload: PayLoad!, $filter: UserActionFilter!) {
  getLOCApproval(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useGetLocApprovalQuery__
 *
 * To run a query within a React component, call `useGetLocApprovalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocApprovalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocApprovalQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetLocApprovalQuery(baseOptions: Apollo.QueryHookOptions<GetLocApprovalQuery, GetLocApprovalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLocApprovalQuery, GetLocApprovalQueryVariables>(GetLocApprovalDocument, options);
      }
export function useGetLocApprovalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocApprovalQuery, GetLocApprovalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLocApprovalQuery, GetLocApprovalQueryVariables>(GetLocApprovalDocument, options);
        }
export type GetLocApprovalQueryHookResult = ReturnType<typeof useGetLocApprovalQuery>;
export type GetLocApprovalLazyQueryHookResult = ReturnType<typeof useGetLocApprovalLazyQuery>;
export type GetLocApprovalQueryResult = Apollo.QueryResult<GetLocApprovalQuery, GetLocApprovalQueryVariables>;
export const ExportOverallPerformanceSummaryDocument = gql`
    query ExportOverallPerformanceSummary($payload: PayLoad!, $filter: UserActionFilter!) {
  exportOverallPerformanceSummary(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportOverallPerformanceSummaryQuery__
 *
 * To run a query within a React component, call `useExportOverallPerformanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportOverallPerformanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportOverallPerformanceSummaryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportOverallPerformanceSummaryQuery(baseOptions: Apollo.QueryHookOptions<ExportOverallPerformanceSummaryQuery, ExportOverallPerformanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportOverallPerformanceSummaryQuery, ExportOverallPerformanceSummaryQueryVariables>(ExportOverallPerformanceSummaryDocument, options);
      }
export function useExportOverallPerformanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportOverallPerformanceSummaryQuery, ExportOverallPerformanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportOverallPerformanceSummaryQuery, ExportOverallPerformanceSummaryQueryVariables>(ExportOverallPerformanceSummaryDocument, options);
        }
export type ExportOverallPerformanceSummaryQueryHookResult = ReturnType<typeof useExportOverallPerformanceSummaryQuery>;
export type ExportOverallPerformanceSummaryLazyQueryHookResult = ReturnType<typeof useExportOverallPerformanceSummaryLazyQuery>;
export type ExportOverallPerformanceSummaryQueryResult = Apollo.QueryResult<ExportOverallPerformanceSummaryQuery, ExportOverallPerformanceSummaryQueryVariables>;
export const ShareOverallPerformanceSummaryDocument = gql`
    query ShareOverallPerformanceSummary($payload: PayLoad!, $filter: UserActionFilter!) {
  shareOps: shareOverallPerformanceSummary(payload: $payload, filter: $filter) {
    status
    error
  }
}
    `;

/**
 * __useShareOverallPerformanceSummaryQuery__
 *
 * To run a query within a React component, call `useShareOverallPerformanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useShareOverallPerformanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShareOverallPerformanceSummaryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useShareOverallPerformanceSummaryQuery(baseOptions: Apollo.QueryHookOptions<ShareOverallPerformanceSummaryQuery, ShareOverallPerformanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShareOverallPerformanceSummaryQuery, ShareOverallPerformanceSummaryQueryVariables>(ShareOverallPerformanceSummaryDocument, options);
      }
export function useShareOverallPerformanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShareOverallPerformanceSummaryQuery, ShareOverallPerformanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShareOverallPerformanceSummaryQuery, ShareOverallPerformanceSummaryQueryVariables>(ShareOverallPerformanceSummaryDocument, options);
        }
export type ShareOverallPerformanceSummaryQueryHookResult = ReturnType<typeof useShareOverallPerformanceSummaryQuery>;
export type ShareOverallPerformanceSummaryLazyQueryHookResult = ReturnType<typeof useShareOverallPerformanceSummaryLazyQuery>;
export type ShareOverallPerformanceSummaryQueryResult = Apollo.QueryResult<ShareOverallPerformanceSummaryQuery, ShareOverallPerformanceSummaryQueryVariables>;
export const AddOneOverallPerformanceSummaryDocument = gql`
    mutation AddOneOverallPerformanceSummary($data: OverallPerformanceSummaryInput!) {
  addOneOverallPerformanceSummary(data: $data) {
    id
    isShare
    sharedDate
  }
}
    `;
export type AddOneOverallPerformanceSummaryMutationFn = Apollo.MutationFunction<AddOneOverallPerformanceSummaryMutation, AddOneOverallPerformanceSummaryMutationVariables>;

/**
 * __useAddOneOverallPerformanceSummaryMutation__
 *
 * To run a mutation, you first call `useAddOneOverallPerformanceSummaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneOverallPerformanceSummaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneOverallPerformanceSummaryMutation, { data, loading, error }] = useAddOneOverallPerformanceSummaryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneOverallPerformanceSummaryMutation(baseOptions?: Apollo.MutationHookOptions<AddOneOverallPerformanceSummaryMutation, AddOneOverallPerformanceSummaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneOverallPerformanceSummaryMutation, AddOneOverallPerformanceSummaryMutationVariables>(AddOneOverallPerformanceSummaryDocument, options);
      }
export type AddOneOverallPerformanceSummaryMutationHookResult = ReturnType<typeof useAddOneOverallPerformanceSummaryMutation>;
export type AddOneOverallPerformanceSummaryMutationResult = Apollo.MutationResult<AddOneOverallPerformanceSummaryMutation>;
export type AddOneOverallPerformanceSummaryMutationOptions = Apollo.BaseMutationOptions<AddOneOverallPerformanceSummaryMutation, AddOneOverallPerformanceSummaryMutationVariables>;
export const ExportMissingEvaluationsDocument = gql`
    query ExportMissingEvaluations($payload: PayLoad!, $filter: UserActionFilter!) {
  exportMissingEvaluations(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportMissingEvaluationsQuery__
 *
 * To run a query within a React component, call `useExportMissingEvaluationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportMissingEvaluationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportMissingEvaluationsQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportMissingEvaluationsQuery(baseOptions: Apollo.QueryHookOptions<ExportMissingEvaluationsQuery, ExportMissingEvaluationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportMissingEvaluationsQuery, ExportMissingEvaluationsQueryVariables>(ExportMissingEvaluationsDocument, options);
      }
export function useExportMissingEvaluationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportMissingEvaluationsQuery, ExportMissingEvaluationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportMissingEvaluationsQuery, ExportMissingEvaluationsQueryVariables>(ExportMissingEvaluationsDocument, options);
        }
export type ExportMissingEvaluationsQueryHookResult = ReturnType<typeof useExportMissingEvaluationsQuery>;
export type ExportMissingEvaluationsLazyQueryHookResult = ReturnType<typeof useExportMissingEvaluationsLazyQuery>;
export type ExportMissingEvaluationsQueryResult = Apollo.QueryResult<ExportMissingEvaluationsQuery, ExportMissingEvaluationsQueryVariables>;
export const ExportContributorsPerPersonDocument = gql`
    query ExportContributorsPerPerson($filter: UserActionFilter!) {
  exportContributorsPerPerson(filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportContributorsPerPersonQuery__
 *
 * To run a query within a React component, call `useExportContributorsPerPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportContributorsPerPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportContributorsPerPersonQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportContributorsPerPersonQuery(baseOptions: Apollo.QueryHookOptions<ExportContributorsPerPersonQuery, ExportContributorsPerPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportContributorsPerPersonQuery, ExportContributorsPerPersonQueryVariables>(ExportContributorsPerPersonDocument, options);
      }
export function useExportContributorsPerPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportContributorsPerPersonQuery, ExportContributorsPerPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportContributorsPerPersonQuery, ExportContributorsPerPersonQueryVariables>(ExportContributorsPerPersonDocument, options);
        }
export type ExportContributorsPerPersonQueryHookResult = ReturnType<typeof useExportContributorsPerPersonQuery>;
export type ExportContributorsPerPersonLazyQueryHookResult = ReturnType<typeof useExportContributorsPerPersonLazyQuery>;
export type ExportContributorsPerPersonQueryResult = Apollo.QueryResult<ExportContributorsPerPersonQuery, ExportContributorsPerPersonQueryVariables>;
export const ExportPerformanceSummaryDocument = gql`
    query ExportPerformanceSummary($payload: PerformanceSummaryPayload!, $filter: UserActionFilter!) {
  exportPerformanceSummary(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportPerformanceSummaryQuery__
 *
 * To run a query within a React component, call `useExportPerformanceSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportPerformanceSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportPerformanceSummaryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportPerformanceSummaryQuery(baseOptions: Apollo.QueryHookOptions<ExportPerformanceSummaryQuery, ExportPerformanceSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportPerformanceSummaryQuery, ExportPerformanceSummaryQueryVariables>(ExportPerformanceSummaryDocument, options);
      }
export function useExportPerformanceSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportPerformanceSummaryQuery, ExportPerformanceSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportPerformanceSummaryQuery, ExportPerformanceSummaryQueryVariables>(ExportPerformanceSummaryDocument, options);
        }
export type ExportPerformanceSummaryQueryHookResult = ReturnType<typeof useExportPerformanceSummaryQuery>;
export type ExportPerformanceSummaryLazyQueryHookResult = ReturnType<typeof useExportPerformanceSummaryLazyQuery>;
export type ExportPerformanceSummaryQueryResult = Apollo.QueryResult<ExportPerformanceSummaryQuery, ExportPerformanceSummaryQueryVariables>;
export const ExportRatingSummaryDocument = gql`
    query ExportRatingSummary($payload: PayLoad!, $filter: UserActionFilter!) {
  exportRatingSummary(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportRatingSummaryQuery__
 *
 * To run a query within a React component, call `useExportRatingSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportRatingSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportRatingSummaryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportRatingSummaryQuery(baseOptions: Apollo.QueryHookOptions<ExportRatingSummaryQuery, ExportRatingSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportRatingSummaryQuery, ExportRatingSummaryQueryVariables>(ExportRatingSummaryDocument, options);
      }
export function useExportRatingSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportRatingSummaryQuery, ExportRatingSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportRatingSummaryQuery, ExportRatingSummaryQueryVariables>(ExportRatingSummaryDocument, options);
        }
export type ExportRatingSummaryQueryHookResult = ReturnType<typeof useExportRatingSummaryQuery>;
export type ExportRatingSummaryLazyQueryHookResult = ReturnType<typeof useExportRatingSummaryLazyQuery>;
export type ExportRatingSummaryQueryResult = Apollo.QueryResult<ExportRatingSummaryQuery, ExportRatingSummaryQueryVariables>;
export const ExportRankingSummaryDocument = gql`
    query exportRankingSummary($payload: PayLoad!, $filter: UserActionFilter!) {
  exportRankingSummary(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportRankingSummaryQuery__
 *
 * To run a query within a React component, call `useExportRankingSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportRankingSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportRankingSummaryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportRankingSummaryQuery(baseOptions: Apollo.QueryHookOptions<ExportRankingSummaryQuery, ExportRankingSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportRankingSummaryQuery, ExportRankingSummaryQueryVariables>(ExportRankingSummaryDocument, options);
      }
export function useExportRankingSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportRankingSummaryQuery, ExportRankingSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportRankingSummaryQuery, ExportRankingSummaryQueryVariables>(ExportRankingSummaryDocument, options);
        }
export type ExportRankingSummaryQueryHookResult = ReturnType<typeof useExportRankingSummaryQuery>;
export type ExportRankingSummaryLazyQueryHookResult = ReturnType<typeof useExportRankingSummaryLazyQuery>;
export type ExportRankingSummaryQueryResult = Apollo.QueryResult<ExportRankingSummaryQuery, ExportRankingSummaryQueryVariables>;
export const ExportSAsDocument = gql`
    query ExportSAs($payload: PayLoad!, $filter: UserActionFilter) {
  exportSAs(payload: $payload, filter: $filter) {
    url
  }
}
    `;

/**
 * __useExportSAsQuery__
 *
 * To run a query within a React component, call `useExportSAsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportSAsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportSAsQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExportSAsQuery(baseOptions: Apollo.QueryHookOptions<ExportSAsQuery, ExportSAsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportSAsQuery, ExportSAsQueryVariables>(ExportSAsDocument, options);
      }
export function useExportSAsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportSAsQuery, ExportSAsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportSAsQuery, ExportSAsQueryVariables>(ExportSAsDocument, options);
        }
export type ExportSAsQueryHookResult = ReturnType<typeof useExportSAsQuery>;
export type ExportSAsLazyQueryHookResult = ReturnType<typeof useExportSAsLazyQuery>;
export type ExportSAsQueryResult = Apollo.QueryResult<ExportSAsQuery, ExportSAsQueryVariables>;
export const GetListOfSelfAssessmentDocument = gql`
    query GetListOfSelfAssessment($page: Float!, $sort: SortUserEvaluation) {
  getSelfAssessmentList(page: $page, sort: $sort) {
    page
    total
    pageSize
    data {
      id
      status
      evaluatee {
        id
        firstName
        lastName
        image
        title {
          name
        }
        strategy {
          name
        }
        department {
          name
        }
        location {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetListOfSelfAssessmentQuery__
 *
 * To run a query within a React component, call `useGetListOfSelfAssessmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListOfSelfAssessmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOfSelfAssessmentQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetListOfSelfAssessmentQuery(baseOptions: Apollo.QueryHookOptions<GetListOfSelfAssessmentQuery, GetListOfSelfAssessmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListOfSelfAssessmentQuery, GetListOfSelfAssessmentQueryVariables>(GetListOfSelfAssessmentDocument, options);
      }
export function useGetListOfSelfAssessmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListOfSelfAssessmentQuery, GetListOfSelfAssessmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListOfSelfAssessmentQuery, GetListOfSelfAssessmentQueryVariables>(GetListOfSelfAssessmentDocument, options);
        }
export type GetListOfSelfAssessmentQueryHookResult = ReturnType<typeof useGetListOfSelfAssessmentQuery>;
export type GetListOfSelfAssessmentLazyQueryHookResult = ReturnType<typeof useGetListOfSelfAssessmentLazyQuery>;
export type GetListOfSelfAssessmentQueryResult = Apollo.QueryResult<GetListOfSelfAssessmentQuery, GetListOfSelfAssessmentQueryVariables>;
export const GetAllSettingsDocument = gql`
    query getAllSettings {
  getAllSettings {
    id
    key
    value
  }
}
    `;

/**
 * __useGetAllSettingsQuery__
 *
 * To run a query within a React component, call `useGetAllSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSettingsQuery, GetAllSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSettingsQuery, GetAllSettingsQueryVariables>(GetAllSettingsDocument, options);
      }
export function useGetAllSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSettingsQuery, GetAllSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSettingsQuery, GetAllSettingsQueryVariables>(GetAllSettingsDocument, options);
        }
export type GetAllSettingsQueryHookResult = ReturnType<typeof useGetAllSettingsQuery>;
export type GetAllSettingsLazyQueryHookResult = ReturnType<typeof useGetAllSettingsLazyQuery>;
export type GetAllSettingsQueryResult = Apollo.QueryResult<GetAllSettingsQuery, GetAllSettingsQueryVariables>;
export const UpdateOneSettingDocument = gql`
    mutation updateOneSetting($id: Float!, $data: SettingInput!) {
  updateOneSetting(id: $id, data: $data) {
    id
    key
    value
  }
}
    `;
export type UpdateOneSettingMutationFn = Apollo.MutationFunction<UpdateOneSettingMutation, UpdateOneSettingMutationVariables>;

/**
 * __useUpdateOneSettingMutation__
 *
 * To run a mutation, you first call `useUpdateOneSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneSettingMutation, { data, loading, error }] = useUpdateOneSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneSettingMutation, UpdateOneSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneSettingMutation, UpdateOneSettingMutationVariables>(UpdateOneSettingDocument, options);
      }
export type UpdateOneSettingMutationHookResult = ReturnType<typeof useUpdateOneSettingMutation>;
export type UpdateOneSettingMutationResult = Apollo.MutationResult<UpdateOneSettingMutation>;
export type UpdateOneSettingMutationOptions = Apollo.BaseMutationOptions<UpdateOneSettingMutation, UpdateOneSettingMutationVariables>;
export const GetAllStrategiesDocument = gql`
    query getAllStrategies {
  getAllStrategies {
    ...Strategy
  }
}
    ${StrategyFragmentDoc}`;

/**
 * __useGetAllStrategiesQuery__
 *
 * To run a query within a React component, call `useGetAllStrategiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStrategiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStrategiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStrategiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStrategiesQuery, GetAllStrategiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStrategiesQuery, GetAllStrategiesQueryVariables>(GetAllStrategiesDocument, options);
      }
export function useGetAllStrategiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStrategiesQuery, GetAllStrategiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStrategiesQuery, GetAllStrategiesQueryVariables>(GetAllStrategiesDocument, options);
        }
export type GetAllStrategiesQueryHookResult = ReturnType<typeof useGetAllStrategiesQuery>;
export type GetAllStrategiesLazyQueryHookResult = ReturnType<typeof useGetAllStrategiesLazyQuery>;
export type GetAllStrategiesQueryResult = Apollo.QueryResult<GetAllStrategiesQuery, GetAllStrategiesQueryVariables>;
export const GetAllStrategiesWithPaginationDocument = gql`
    query getAllStrategiesWithPagination($sort: StrategySortField, $pageSize: Float, $page: Float!) {
  getAllStrategiesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
    total
    page
    pageSize
    data {
      ...Strategy
    }
  }
}
    ${StrategyFragmentDoc}`;

/**
 * __useGetAllStrategiesWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllStrategiesWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStrategiesWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStrategiesWithPaginationQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllStrategiesWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetAllStrategiesWithPaginationQuery, GetAllStrategiesWithPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStrategiesWithPaginationQuery, GetAllStrategiesWithPaginationQueryVariables>(GetAllStrategiesWithPaginationDocument, options);
      }
export function useGetAllStrategiesWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStrategiesWithPaginationQuery, GetAllStrategiesWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStrategiesWithPaginationQuery, GetAllStrategiesWithPaginationQueryVariables>(GetAllStrategiesWithPaginationDocument, options);
        }
export type GetAllStrategiesWithPaginationQueryHookResult = ReturnType<typeof useGetAllStrategiesWithPaginationQuery>;
export type GetAllStrategiesWithPaginationLazyQueryHookResult = ReturnType<typeof useGetAllStrategiesWithPaginationLazyQuery>;
export type GetAllStrategiesWithPaginationQueryResult = Apollo.QueryResult<GetAllStrategiesWithPaginationQuery, GetAllStrategiesWithPaginationQueryVariables>;
export const GetOneStrategyDocument = gql`
    query getOneStrategy($id: Float!) {
  getOneStrategy(id: $id) {
    ...Strategy
  }
}
    ${StrategyFragmentDoc}`;

/**
 * __useGetOneStrategyQuery__
 *
 * To run a query within a React component, call `useGetOneStrategyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneStrategyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneStrategyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneStrategyQuery(baseOptions: Apollo.QueryHookOptions<GetOneStrategyQuery, GetOneStrategyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneStrategyQuery, GetOneStrategyQueryVariables>(GetOneStrategyDocument, options);
      }
export function useGetOneStrategyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneStrategyQuery, GetOneStrategyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneStrategyQuery, GetOneStrategyQueryVariables>(GetOneStrategyDocument, options);
        }
export type GetOneStrategyQueryHookResult = ReturnType<typeof useGetOneStrategyQuery>;
export type GetOneStrategyLazyQueryHookResult = ReturnType<typeof useGetOneStrategyLazyQuery>;
export type GetOneStrategyQueryResult = Apollo.QueryResult<GetOneStrategyQuery, GetOneStrategyQueryVariables>;
export const DeleteStrategyDocument = gql`
    mutation deleteStrategy($ids: [Float!]!) {
  deleteStrategy(ids: $ids)
}
    `;
export type DeleteStrategyMutationFn = Apollo.MutationFunction<DeleteStrategyMutation, DeleteStrategyMutationVariables>;

/**
 * __useDeleteStrategyMutation__
 *
 * To run a mutation, you first call `useDeleteStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStrategyMutation, { data, loading, error }] = useDeleteStrategyMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteStrategyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStrategyMutation, DeleteStrategyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStrategyMutation, DeleteStrategyMutationVariables>(DeleteStrategyDocument, options);
      }
export type DeleteStrategyMutationHookResult = ReturnType<typeof useDeleteStrategyMutation>;
export type DeleteStrategyMutationResult = Apollo.MutationResult<DeleteStrategyMutation>;
export type DeleteStrategyMutationOptions = Apollo.BaseMutationOptions<DeleteStrategyMutation, DeleteStrategyMutationVariables>;
export const SendMailForTechSupportDocument = gql`
    mutation sendMailForTechSupport($content: String!) {
  sendMailForTechSupport(content: $content)
}
    `;
export type SendMailForTechSupportMutationFn = Apollo.MutationFunction<SendMailForTechSupportMutation, SendMailForTechSupportMutationVariables>;

/**
 * __useSendMailForTechSupportMutation__
 *
 * To run a mutation, you first call `useSendMailForTechSupportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMailForTechSupportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMailForTechSupportMutation, { data, loading, error }] = useSendMailForTechSupportMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMailForTechSupportMutation(baseOptions?: Apollo.MutationHookOptions<SendMailForTechSupportMutation, SendMailForTechSupportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMailForTechSupportMutation, SendMailForTechSupportMutationVariables>(SendMailForTechSupportDocument, options);
      }
export type SendMailForTechSupportMutationHookResult = ReturnType<typeof useSendMailForTechSupportMutation>;
export type SendMailForTechSupportMutationResult = Apollo.MutationResult<SendMailForTechSupportMutation>;
export type SendMailForTechSupportMutationOptions = Apollo.BaseMutationOptions<SendMailForTechSupportMutation, SendMailForTechSupportMutationVariables>;
export const GetAllTitlesDocument = gql`
    query getAllTitles {
  getAllTitles {
    ...Title
  }
}
    ${TitleFragmentDoc}`;

/**
 * __useGetAllTitlesQuery__
 *
 * To run a query within a React component, call `useGetAllTitlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTitlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTitlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTitlesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTitlesQuery, GetAllTitlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTitlesQuery, GetAllTitlesQueryVariables>(GetAllTitlesDocument, options);
      }
export function useGetAllTitlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTitlesQuery, GetAllTitlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTitlesQuery, GetAllTitlesQueryVariables>(GetAllTitlesDocument, options);
        }
export type GetAllTitlesQueryHookResult = ReturnType<typeof useGetAllTitlesQuery>;
export type GetAllTitlesLazyQueryHookResult = ReturnType<typeof useGetAllTitlesLazyQuery>;
export type GetAllTitlesQueryResult = Apollo.QueryResult<GetAllTitlesQuery, GetAllTitlesQueryVariables>;
export const GetAllTitlesWithPaginationDocument = gql`
    query getAllTitlesWithPagination($sort: TitleSortField, $pageSize: Float, $page: Float!) {
  getAllTitlesWithPagination(sort: $sort, pageSize: $pageSize, page: $page) {
    total
    page
    pageSize
    data {
      ...Title
    }
  }
}
    ${TitleFragmentDoc}`;

/**
 * __useGetAllTitlesWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllTitlesWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTitlesWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTitlesWithPaginationQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      pageSize: // value for 'pageSize'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllTitlesWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetAllTitlesWithPaginationQuery, GetAllTitlesWithPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTitlesWithPaginationQuery, GetAllTitlesWithPaginationQueryVariables>(GetAllTitlesWithPaginationDocument, options);
      }
export function useGetAllTitlesWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTitlesWithPaginationQuery, GetAllTitlesWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTitlesWithPaginationQuery, GetAllTitlesWithPaginationQueryVariables>(GetAllTitlesWithPaginationDocument, options);
        }
export type GetAllTitlesWithPaginationQueryHookResult = ReturnType<typeof useGetAllTitlesWithPaginationQuery>;
export type GetAllTitlesWithPaginationLazyQueryHookResult = ReturnType<typeof useGetAllTitlesWithPaginationLazyQuery>;
export type GetAllTitlesWithPaginationQueryResult = Apollo.QueryResult<GetAllTitlesWithPaginationQuery, GetAllTitlesWithPaginationQueryVariables>;
export const GetOneTitleDocument = gql`
    query getOneTitle($id: Float!) {
  getOneTitle(id: $id) {
    ...Title
  }
}
    ${TitleFragmentDoc}`;

/**
 * __useGetOneTitleQuery__
 *
 * To run a query within a React component, call `useGetOneTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneTitleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneTitleQuery(baseOptions: Apollo.QueryHookOptions<GetOneTitleQuery, GetOneTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneTitleQuery, GetOneTitleQueryVariables>(GetOneTitleDocument, options);
      }
export function useGetOneTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneTitleQuery, GetOneTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneTitleQuery, GetOneTitleQueryVariables>(GetOneTitleDocument, options);
        }
export type GetOneTitleQueryHookResult = ReturnType<typeof useGetOneTitleQuery>;
export type GetOneTitleLazyQueryHookResult = ReturnType<typeof useGetOneTitleLazyQuery>;
export type GetOneTitleQueryResult = Apollo.QueryResult<GetOneTitleQuery, GetOneTitleQueryVariables>;
export const DeleteTitleDocument = gql`
    mutation deleteTitle($ids: [Float!]!) {
  deleteTitle(ids: $ids)
}
    `;
export type DeleteTitleMutationFn = Apollo.MutationFunction<DeleteTitleMutation, DeleteTitleMutationVariables>;

/**
 * __useDeleteTitleMutation__
 *
 * To run a mutation, you first call `useDeleteTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTitleMutation, { data, loading, error }] = useDeleteTitleMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteTitleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTitleMutation, DeleteTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTitleMutation, DeleteTitleMutationVariables>(DeleteTitleDocument, options);
      }
export type DeleteTitleMutationHookResult = ReturnType<typeof useDeleteTitleMutation>;
export type DeleteTitleMutationResult = Apollo.MutationResult<DeleteTitleMutation>;
export type DeleteTitleMutationOptions = Apollo.BaseMutationOptions<DeleteTitleMutation, DeleteTitleMutationVariables>;
export const GetAllUsersWithDetailDocument = gql`
    query getAllUsersWithDetail($name: String, $locationIds: [Float!], $strategyIds: [Float!], $departmentIds: [Float!], $titleIds: [Float!], $evaluatorIds: [Float!], $evaluationTypeIds: [Float!], $isActive: Boolean, $sort: UserSortField, $page: Float!) {
  getAllUsersWithDetail(
    name: $name
    locationIds: $locationIds
    strategyIds: $strategyIds
    departmentIds: $departmentIds
    titleIds: $titleIds
    evaluatorIds: $evaluatorIds
    evaluationTypeIds: $evaluationTypeIds
    isActive: $isActive
    sort: $sort
    page: $page
  ) {
    total
    page
    pageSize
    data {
      ...UserDetail
    }
  }
}
    ${UserDetailFragmentDoc}`;

/**
 * __useGetAllUsersWithDetailQuery__
 *
 * To run a query within a React component, call `useGetAllUsersWithDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersWithDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersWithDetailQuery({
 *   variables: {
 *      name: // value for 'name'
 *      locationIds: // value for 'locationIds'
 *      strategyIds: // value for 'strategyIds'
 *      departmentIds: // value for 'departmentIds'
 *      titleIds: // value for 'titleIds'
 *      evaluatorIds: // value for 'evaluatorIds'
 *      evaluationTypeIds: // value for 'evaluationTypeIds'
 *      isActive: // value for 'isActive'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllUsersWithDetailQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersWithDetailQuery, GetAllUsersWithDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersWithDetailQuery, GetAllUsersWithDetailQueryVariables>(GetAllUsersWithDetailDocument, options);
      }
export function useGetAllUsersWithDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersWithDetailQuery, GetAllUsersWithDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersWithDetailQuery, GetAllUsersWithDetailQueryVariables>(GetAllUsersWithDetailDocument, options);
        }
export type GetAllUsersWithDetailQueryHookResult = ReturnType<typeof useGetAllUsersWithDetailQuery>;
export type GetAllUsersWithDetailLazyQueryHookResult = ReturnType<typeof useGetAllUsersWithDetailLazyQuery>;
export type GetAllUsersWithDetailQueryResult = Apollo.QueryResult<GetAllUsersWithDetailQuery, GetAllUsersWithDetailQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetOneUsersDocument = gql`
    query GetOneUsers($id: Float!) {
  getOneUser(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetOneUsersQuery__
 *
 * To run a query within a React component, call `useGetOneUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneUsersQuery(baseOptions: Apollo.QueryHookOptions<GetOneUsersQuery, GetOneUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneUsersQuery, GetOneUsersQueryVariables>(GetOneUsersDocument, options);
      }
export function useGetOneUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneUsersQuery, GetOneUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneUsersQuery, GetOneUsersQueryVariables>(GetOneUsersDocument, options);
        }
export type GetOneUsersQueryHookResult = ReturnType<typeof useGetOneUsersQuery>;
export type GetOneUsersLazyQueryHookResult = ReturnType<typeof useGetOneUsersLazyQuery>;
export type GetOneUsersQueryResult = Apollo.QueryResult<GetOneUsersQuery, GetOneUsersQueryVariables>;
export const GetAllHighestRatingsDocument = gql`
    query getAllHighestRatings {
  getHighestRating {
    user {
      id
      name
      image
    }
    averageScore
    percentageFourOrGreater
  }
}
    `;

/**
 * __useGetAllHighestRatingsQuery__
 *
 * To run a query within a React component, call `useGetAllHighestRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllHighestRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllHighestRatingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllHighestRatingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllHighestRatingsQuery, GetAllHighestRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllHighestRatingsQuery, GetAllHighestRatingsQueryVariables>(GetAllHighestRatingsDocument, options);
      }
export function useGetAllHighestRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllHighestRatingsQuery, GetAllHighestRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllHighestRatingsQuery, GetAllHighestRatingsQueryVariables>(GetAllHighestRatingsDocument, options);
        }
export type GetAllHighestRatingsQueryHookResult = ReturnType<typeof useGetAllHighestRatingsQuery>;
export type GetAllHighestRatingsLazyQueryHookResult = ReturnType<typeof useGetAllHighestRatingsLazyQuery>;
export type GetAllHighestRatingsQueryResult = Apollo.QueryResult<GetAllHighestRatingsQuery, GetAllHighestRatingsQueryVariables>;
export const GetAllEvaluationTypesDocument = gql`
    query getAllEvaluationTypes {
  getAllEvaluationTypes {
    id
    name
    key
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllEvaluationTypesQuery__
 *
 * To run a query within a React component, call `useGetAllEvaluationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEvaluationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEvaluationTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEvaluationTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEvaluationTypesQuery, GetAllEvaluationTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEvaluationTypesQuery, GetAllEvaluationTypesQueryVariables>(GetAllEvaluationTypesDocument, options);
      }
export function useGetAllEvaluationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEvaluationTypesQuery, GetAllEvaluationTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEvaluationTypesQuery, GetAllEvaluationTypesQueryVariables>(GetAllEvaluationTypesDocument, options);
        }
export type GetAllEvaluationTypesQueryHookResult = ReturnType<typeof useGetAllEvaluationTypesQuery>;
export type GetAllEvaluationTypesLazyQueryHookResult = ReturnType<typeof useGetAllEvaluationTypesLazyQuery>;
export type GetAllEvaluationTypesQueryResult = Apollo.QueryResult<GetAllEvaluationTypesQuery, GetAllEvaluationTypesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
    roleCountryCode
    roleLocationId
    image
    roleCityCode
    showPreviousComment
    roles {
      id
      name
    }
    permissionsLimitedUsers {
      id
      limited {
        id
        name
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetAllRolesDocument = gql`
    query getAllRoles {
  getAllRoles {
    id
    name
  }
}
    `;

/**
 * __useGetAllRolesQuery__
 *
 * To run a query within a React component, call `useGetAllRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
      }
export function useGetAllRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRolesQuery, GetAllRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRolesQuery, GetAllRolesQueryVariables>(GetAllRolesDocument, options);
        }
export type GetAllRolesQueryHookResult = ReturnType<typeof useGetAllRolesQuery>;
export type GetAllRolesLazyQueryHookResult = ReturnType<typeof useGetAllRolesLazyQuery>;
export type GetAllRolesQueryResult = Apollo.QueryResult<GetAllRolesQuery, GetAllRolesQueryVariables>;
export const GetUserProfileDocument = gql`
    query getUserProfile($userId: Float!) {
  getUserProfile(userId: $userId) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($id: Float!, $data: UserProfileInput!) {
  updateUserProfile(id: $id, data: $data) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GetOneUsersByIdWithManyFieldsDocument = gql`
    query GetOneUsersByIdWithManyFields($id: Float!) {
  getOneUser(id: $id) {
    id
    name
    image
    isEvaluatorFor {
      id
      name
      image
    }
    openEvaluations {
      id
      name
      status
      isComplete
      optOut
      evaluatee {
        id
        firstName
        lastName
        image
      }
      contributor {
        id
        name
        image
      }
    }
    selfAssessment {
      evaluation {
        id
        name
        status
        isComplete
        optOut
      }
      duration
    }
    listOfContributors {
      evaluatorId
      status
      user {
        id
        name
        image
      }
      cycleContributorsUser {
        id
        user {
          id
          name
          image
        }
      }
    }
    evaluations {
      evaluation {
        id
        name
        status
        isComplete
        optOut
        evaluatee {
          id
          firstName
          lastName
          image
        }
      }
      duration
    }
  }
}
    `;

/**
 * __useGetOneUsersByIdWithManyFieldsQuery__
 *
 * To run a query within a React component, call `useGetOneUsersByIdWithManyFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneUsersByIdWithManyFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneUsersByIdWithManyFieldsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneUsersByIdWithManyFieldsQuery(baseOptions: Apollo.QueryHookOptions<GetOneUsersByIdWithManyFieldsQuery, GetOneUsersByIdWithManyFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneUsersByIdWithManyFieldsQuery, GetOneUsersByIdWithManyFieldsQueryVariables>(GetOneUsersByIdWithManyFieldsDocument, options);
      }
export function useGetOneUsersByIdWithManyFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneUsersByIdWithManyFieldsQuery, GetOneUsersByIdWithManyFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneUsersByIdWithManyFieldsQuery, GetOneUsersByIdWithManyFieldsQueryVariables>(GetOneUsersByIdWithManyFieldsDocument, options);
        }
export type GetOneUsersByIdWithManyFieldsQueryHookResult = ReturnType<typeof useGetOneUsersByIdWithManyFieldsQuery>;
export type GetOneUsersByIdWithManyFieldsLazyQueryHookResult = ReturnType<typeof useGetOneUsersByIdWithManyFieldsLazyQuery>;
export type GetOneUsersByIdWithManyFieldsQueryResult = Apollo.QueryResult<GetOneUsersByIdWithManyFieldsQuery, GetOneUsersByIdWithManyFieldsQueryVariables>;
export const UpdateOneCycleContributorDocument = gql`
    mutation UpdateOneCycleContributor($id: Float!, $data: CycleContributorInput!) {
  updateOneCycleContributor(id: $id, data: $data) {
    id
    status
  }
}
    `;
export type UpdateOneCycleContributorMutationFn = Apollo.MutationFunction<UpdateOneCycleContributorMutation, UpdateOneCycleContributorMutationVariables>;

/**
 * __useUpdateOneCycleContributorMutation__
 *
 * To run a mutation, you first call `useUpdateOneCycleContributorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCycleContributorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCycleContributorMutation, { data, loading, error }] = useUpdateOneCycleContributorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneCycleContributorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneCycleContributorMutation, UpdateOneCycleContributorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneCycleContributorMutation, UpdateOneCycleContributorMutationVariables>(UpdateOneCycleContributorDocument, options);
      }
export type UpdateOneCycleContributorMutationHookResult = ReturnType<typeof useUpdateOneCycleContributorMutation>;
export type UpdateOneCycleContributorMutationResult = Apollo.MutationResult<UpdateOneCycleContributorMutation>;
export type UpdateOneCycleContributorMutationOptions = Apollo.BaseMutationOptions<UpdateOneCycleContributorMutation, UpdateOneCycleContributorMutationVariables>;
export const GetUserWithContributorDocument = gql`
    query GetUserWithContributor($id: Float!) {
  getOneUser(id: $id) {
    id
    firstName
    lastName
    listOfContributors {
      id
      status
      evaluatorId
      cycleContributorsUser {
        id
        user {
          id
          firstName
          lastName
          image
          title {
            id
            name
          }
          department {
            id
            name
          }
          strategy {
            id
            name
          }
          location {
            id
            name
          }
        }
      }
    }
    evaluator {
      id
    }
  }
}
    `;

/**
 * __useGetUserWithContributorQuery__
 *
 * To run a query within a React component, call `useGetUserWithContributorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithContributorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithContributorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserWithContributorQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithContributorQuery, GetUserWithContributorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithContributorQuery, GetUserWithContributorQueryVariables>(GetUserWithContributorDocument, options);
      }
export function useGetUserWithContributorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithContributorQuery, GetUserWithContributorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithContributorQuery, GetUserWithContributorQueryVariables>(GetUserWithContributorDocument, options);
        }
export type GetUserWithContributorQueryHookResult = ReturnType<typeof useGetUserWithContributorQuery>;
export type GetUserWithContributorLazyQueryHookResult = ReturnType<typeof useGetUserWithContributorLazyQuery>;
export type GetUserWithContributorQueryResult = Apollo.QueryResult<GetUserWithContributorQuery, GetUserWithContributorQueryVariables>;
export const AddContributorUserDocument = gql`
    mutation AddContributorUser($data: CycleContributorUserInput!) {
  addOneCycleContributorUser(data: $data) {
    id
    projectDetails
    user {
      id
      firstName
      lastName
      image
      title {
        id
        name
      }
      department {
        id
        name
      }
      strategy {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
}
    `;
export type AddContributorUserMutationFn = Apollo.MutationFunction<AddContributorUserMutation, AddContributorUserMutationVariables>;

/**
 * __useAddContributorUserMutation__
 *
 * To run a mutation, you first call `useAddContributorUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddContributorUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addContributorUserMutation, { data, loading, error }] = useAddContributorUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddContributorUserMutation(baseOptions?: Apollo.MutationHookOptions<AddContributorUserMutation, AddContributorUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddContributorUserMutation, AddContributorUserMutationVariables>(AddContributorUserDocument, options);
      }
export type AddContributorUserMutationHookResult = ReturnType<typeof useAddContributorUserMutation>;
export type AddContributorUserMutationResult = Apollo.MutationResult<AddContributorUserMutation>;
export type AddContributorUserMutationOptions = Apollo.BaseMutationOptions<AddContributorUserMutation, AddContributorUserMutationVariables>;
export const DeleteCycleContributorUserDocument = gql`
    mutation DeleteCycleContributorUser($isSelectAll: Boolean!, $cycleContributorUserIds: [Float!]!, $userId: Float, $cycleId: Float) {
  deleteCycleContributorUser(
    isSelectAll: $isSelectAll
    cycleContributorUserIds: $cycleContributorUserIds
    userId: $userId
    cycleId: $cycleId
  )
}
    `;
export type DeleteCycleContributorUserMutationFn = Apollo.MutationFunction<DeleteCycleContributorUserMutation, DeleteCycleContributorUserMutationVariables>;

/**
 * __useDeleteCycleContributorUserMutation__
 *
 * To run a mutation, you first call `useDeleteCycleContributorUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCycleContributorUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCycleContributorUserMutation, { data, loading, error }] = useDeleteCycleContributorUserMutation({
 *   variables: {
 *      isSelectAll: // value for 'isSelectAll'
 *      cycleContributorUserIds: // value for 'cycleContributorUserIds'
 *      userId: // value for 'userId'
 *      cycleId: // value for 'cycleId'
 *   },
 * });
 */
export function useDeleteCycleContributorUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCycleContributorUserMutation, DeleteCycleContributorUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCycleContributorUserMutation, DeleteCycleContributorUserMutationVariables>(DeleteCycleContributorUserDocument, options);
      }
export type DeleteCycleContributorUserMutationHookResult = ReturnType<typeof useDeleteCycleContributorUserMutation>;
export type DeleteCycleContributorUserMutationResult = Apollo.MutationResult<DeleteCycleContributorUserMutation>;
export type DeleteCycleContributorUserMutationOptions = Apollo.BaseMutationOptions<DeleteCycleContributorUserMutation, DeleteCycleContributorUserMutationVariables>;
export const GetUserLockedSystemDocument = gql`
    query GetUserLockedSystem($id: Float!) {
  getOneUser(id: $id) {
    isLockedSystem
    department {
      id
      lockDate
    }
  }
}
    `;

/**
 * __useGetUserLockedSystemQuery__
 *
 * To run a query within a React component, call `useGetUserLockedSystemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLockedSystemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLockedSystemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserLockedSystemQuery(baseOptions: Apollo.QueryHookOptions<GetUserLockedSystemQuery, GetUserLockedSystemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLockedSystemQuery, GetUserLockedSystemQueryVariables>(GetUserLockedSystemDocument, options);
      }
export function useGetUserLockedSystemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLockedSystemQuery, GetUserLockedSystemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLockedSystemQuery, GetUserLockedSystemQueryVariables>(GetUserLockedSystemDocument, options);
        }
export type GetUserLockedSystemQueryHookResult = ReturnType<typeof useGetUserLockedSystemQuery>;
export type GetUserLockedSystemLazyQueryHookResult = ReturnType<typeof useGetUserLockedSystemLazyQuery>;
export type GetUserLockedSystemQueryResult = Apollo.QueryResult<GetUserLockedSystemQuery, GetUserLockedSystemQueryVariables>;
export const GetUserEvaluateeDocument = gql`
    query GetUserEvaluatee($id: Float!) {
  getOneUser(id: $id) {
    ...Evaluatee
    lastPromotionCycleId
  }
}
    ${EvaluateeFragmentDoc}`;

/**
 * __useGetUserEvaluateeQuery__
 *
 * To run a query within a React component, call `useGetUserEvaluateeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEvaluateeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEvaluateeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserEvaluateeQuery(baseOptions: Apollo.QueryHookOptions<GetUserEvaluateeQuery, GetUserEvaluateeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEvaluateeQuery, GetUserEvaluateeQueryVariables>(GetUserEvaluateeDocument, options);
      }
export function useGetUserEvaluateeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEvaluateeQuery, GetUserEvaluateeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEvaluateeQuery, GetUserEvaluateeQueryVariables>(GetUserEvaluateeDocument, options);
        }
export type GetUserEvaluateeQueryHookResult = ReturnType<typeof useGetUserEvaluateeQuery>;
export type GetUserEvaluateeLazyQueryHookResult = ReturnType<typeof useGetUserEvaluateeLazyQuery>;
export type GetUserEvaluateeQueryResult = Apollo.QueryResult<GetUserEvaluateeQuery, GetUserEvaluateeQueryVariables>;
export const DeleteUsersDocument = gql`
    mutation deleteUsers($filter: UserActionFilter!) {
  deleteUsers(filter: $filter)
}
    `;
export type DeleteUsersMutationFn = Apollo.MutationFunction<DeleteUsersMutation, DeleteUsersMutationVariables>;

/**
 * __useDeleteUsersMutation__
 *
 * To run a mutation, you first call `useDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsersMutation, { data, loading, error }] = useDeleteUsersMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDeleteUsersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUsersMutation, DeleteUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUsersMutation, DeleteUsersMutationVariables>(DeleteUsersDocument, options);
      }
export type DeleteUsersMutationHookResult = ReturnType<typeof useDeleteUsersMutation>;
export type DeleteUsersMutationResult = Apollo.MutationResult<DeleteUsersMutation>;
export type DeleteUsersMutationOptions = Apollo.BaseMutationOptions<DeleteUsersMutation, DeleteUsersMutationVariables>;
export const InactiveUserDocument = gql`
    mutation inactiveUser($filter: UserActionFilter!) {
  inactiveUser(filter: $filter) {
    id
  }
}
    `;
export type InactiveUserMutationFn = Apollo.MutationFunction<InactiveUserMutation, InactiveUserMutationVariables>;

/**
 * __useInactiveUserMutation__
 *
 * To run a mutation, you first call `useInactiveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInactiveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inactiveUserMutation, { data, loading, error }] = useInactiveUserMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useInactiveUserMutation(baseOptions?: Apollo.MutationHookOptions<InactiveUserMutation, InactiveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InactiveUserMutation, InactiveUserMutationVariables>(InactiveUserDocument, options);
      }
export type InactiveUserMutationHookResult = ReturnType<typeof useInactiveUserMutation>;
export type InactiveUserMutationResult = Apollo.MutationResult<InactiveUserMutation>;
export type InactiveUserMutationOptions = Apollo.BaseMutationOptions<InactiveUserMutation, InactiveUserMutationVariables>;
export const AddNewUserDocument = gql`
    mutation AddNewUser($data: UserProfileInput!) {
  addUserProfile(data: $data) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export type AddNewUserMutationFn = Apollo.MutationFunction<AddNewUserMutation, AddNewUserMutationVariables>;

/**
 * __useAddNewUserMutation__
 *
 * To run a mutation, you first call `useAddNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewUserMutation, { data, loading, error }] = useAddNewUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddNewUserMutation(baseOptions?: Apollo.MutationHookOptions<AddNewUserMutation, AddNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewUserMutation, AddNewUserMutationVariables>(AddNewUserDocument, options);
      }
export type AddNewUserMutationHookResult = ReturnType<typeof useAddNewUserMutation>;
export type AddNewUserMutationResult = Apollo.MutationResult<AddNewUserMutation>;
export type AddNewUserMutationOptions = Apollo.BaseMutationOptions<AddNewUserMutation, AddNewUserMutationVariables>;
export const PromoteUserDocument = gql`
    mutation promoteUser($id: Float!, $data: PromoteData!) {
  promoteUser(id: $id, data: $data) {
    id
  }
}
    `;
export type PromoteUserMutationFn = Apollo.MutationFunction<PromoteUserMutation, PromoteUserMutationVariables>;

/**
 * __usePromoteUserMutation__
 *
 * To run a mutation, you first call `usePromoteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePromoteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [promoteUserMutation, { data, loading, error }] = usePromoteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePromoteUserMutation(baseOptions?: Apollo.MutationHookOptions<PromoteUserMutation, PromoteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PromoteUserMutation, PromoteUserMutationVariables>(PromoteUserDocument, options);
      }
export type PromoteUserMutationHookResult = ReturnType<typeof usePromoteUserMutation>;
export type PromoteUserMutationResult = Apollo.MutationResult<PromoteUserMutation>;
export type PromoteUserMutationOptions = Apollo.BaseMutationOptions<PromoteUserMutation, PromoteUserMutationVariables>;
export const AddOneTitleDocument = gql`
    mutation addOneTitle($data: TitleInput!) {
  addOneTitle(data: $data) {
    id
    name
    isMDOrAbove
  }
}
    `;
export type AddOneTitleMutationFn = Apollo.MutationFunction<AddOneTitleMutation, AddOneTitleMutationVariables>;

/**
 * __useAddOneTitleMutation__
 *
 * To run a mutation, you first call `useAddOneTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneTitleMutation, { data, loading, error }] = useAddOneTitleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneTitleMutation(baseOptions?: Apollo.MutationHookOptions<AddOneTitleMutation, AddOneTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneTitleMutation, AddOneTitleMutationVariables>(AddOneTitleDocument, options);
      }
export type AddOneTitleMutationHookResult = ReturnType<typeof useAddOneTitleMutation>;
export type AddOneTitleMutationResult = Apollo.MutationResult<AddOneTitleMutation>;
export type AddOneTitleMutationOptions = Apollo.BaseMutationOptions<AddOneTitleMutation, AddOneTitleMutationVariables>;
export const UpdateOneTitleDocument = gql`
    mutation updateOneTitle($id: Float!, $data: TitleInput!) {
  updateOneTitle(id: $id, data: $data) {
    id
    name
    isMDOrAbove
  }
}
    `;
export type UpdateOneTitleMutationFn = Apollo.MutationFunction<UpdateOneTitleMutation, UpdateOneTitleMutationVariables>;

/**
 * __useUpdateOneTitleMutation__
 *
 * To run a mutation, you first call `useUpdateOneTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneTitleMutation, { data, loading, error }] = useUpdateOneTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneTitleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneTitleMutation, UpdateOneTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneTitleMutation, UpdateOneTitleMutationVariables>(UpdateOneTitleDocument, options);
      }
export type UpdateOneTitleMutationHookResult = ReturnType<typeof useUpdateOneTitleMutation>;
export type UpdateOneTitleMutationResult = Apollo.MutationResult<UpdateOneTitleMutation>;
export type UpdateOneTitleMutationOptions = Apollo.BaseMutationOptions<UpdateOneTitleMutation, UpdateOneTitleMutationVariables>;
export const AddOneLocationDocument = gql`
    mutation addOneLocation($data: LocationInput!) {
  addOneLocation(data: $data) {
    id
    name
    countryCode
  }
}
    `;
export type AddOneLocationMutationFn = Apollo.MutationFunction<AddOneLocationMutation, AddOneLocationMutationVariables>;

/**
 * __useAddOneLocationMutation__
 *
 * To run a mutation, you first call `useAddOneLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneLocationMutation, { data, loading, error }] = useAddOneLocationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneLocationMutation(baseOptions?: Apollo.MutationHookOptions<AddOneLocationMutation, AddOneLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneLocationMutation, AddOneLocationMutationVariables>(AddOneLocationDocument, options);
      }
export type AddOneLocationMutationHookResult = ReturnType<typeof useAddOneLocationMutation>;
export type AddOneLocationMutationResult = Apollo.MutationResult<AddOneLocationMutation>;
export type AddOneLocationMutationOptions = Apollo.BaseMutationOptions<AddOneLocationMutation, AddOneLocationMutationVariables>;
export const UpdateOneLocationDocument = gql`
    mutation updateOneLocation($id: Float!, $data: LocationInput!) {
  updateOneLocation(id: $id, data: $data) {
    id
    name
    countryCode
  }
}
    `;
export type UpdateOneLocationMutationFn = Apollo.MutationFunction<UpdateOneLocationMutation, UpdateOneLocationMutationVariables>;

/**
 * __useUpdateOneLocationMutation__
 *
 * To run a mutation, you first call `useUpdateOneLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneLocationMutation, { data, loading, error }] = useUpdateOneLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneLocationMutation, UpdateOneLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneLocationMutation, UpdateOneLocationMutationVariables>(UpdateOneLocationDocument, options);
      }
export type UpdateOneLocationMutationHookResult = ReturnType<typeof useUpdateOneLocationMutation>;
export type UpdateOneLocationMutationResult = Apollo.MutationResult<UpdateOneLocationMutation>;
export type UpdateOneLocationMutationOptions = Apollo.BaseMutationOptions<UpdateOneLocationMutation, UpdateOneLocationMutationVariables>;
export const AddOneStrategyDocument = gql`
    mutation addOneStrategy($data: StrategyInput!) {
  addOneStrategy(data: $data) {
    id
    name
  }
}
    `;
export type AddOneStrategyMutationFn = Apollo.MutationFunction<AddOneStrategyMutation, AddOneStrategyMutationVariables>;

/**
 * __useAddOneStrategyMutation__
 *
 * To run a mutation, you first call `useAddOneStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneStrategyMutation, { data, loading, error }] = useAddOneStrategyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneStrategyMutation(baseOptions?: Apollo.MutationHookOptions<AddOneStrategyMutation, AddOneStrategyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneStrategyMutation, AddOneStrategyMutationVariables>(AddOneStrategyDocument, options);
      }
export type AddOneStrategyMutationHookResult = ReturnType<typeof useAddOneStrategyMutation>;
export type AddOneStrategyMutationResult = Apollo.MutationResult<AddOneStrategyMutation>;
export type AddOneStrategyMutationOptions = Apollo.BaseMutationOptions<AddOneStrategyMutation, AddOneStrategyMutationVariables>;
export const UpdateOneStrategyDocument = gql`
    mutation updateOneStrategy($id: Float!, $data: StrategyInput!) {
  updateOneStrategy(id: $id, data: $data) {
    id
    name
  }
}
    `;
export type UpdateOneStrategyMutationFn = Apollo.MutationFunction<UpdateOneStrategyMutation, UpdateOneStrategyMutationVariables>;

/**
 * __useUpdateOneStrategyMutation__
 *
 * To run a mutation, you first call `useUpdateOneStrategyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneStrategyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneStrategyMutation, { data, loading, error }] = useUpdateOneStrategyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneStrategyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneStrategyMutation, UpdateOneStrategyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneStrategyMutation, UpdateOneStrategyMutationVariables>(UpdateOneStrategyDocument, options);
      }
export type UpdateOneStrategyMutationHookResult = ReturnType<typeof useUpdateOneStrategyMutation>;
export type UpdateOneStrategyMutationResult = Apollo.MutationResult<UpdateOneStrategyMutation>;
export type UpdateOneStrategyMutationOptions = Apollo.BaseMutationOptions<UpdateOneStrategyMutation, UpdateOneStrategyMutationVariables>;
export const AddOneDepartmentDocument = gql`
    mutation addOneDepartment($data: DepartmentInput!) {
  addOneDepartment(data: $data) {
    id
    name
  }
}
    `;
export type AddOneDepartmentMutationFn = Apollo.MutationFunction<AddOneDepartmentMutation, AddOneDepartmentMutationVariables>;

/**
 * __useAddOneDepartmentMutation__
 *
 * To run a mutation, you first call `useAddOneDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOneDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOneDepartmentMutation, { data, loading, error }] = useAddOneDepartmentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOneDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<AddOneDepartmentMutation, AddOneDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOneDepartmentMutation, AddOneDepartmentMutationVariables>(AddOneDepartmentDocument, options);
      }
export type AddOneDepartmentMutationHookResult = ReturnType<typeof useAddOneDepartmentMutation>;
export type AddOneDepartmentMutationResult = Apollo.MutationResult<AddOneDepartmentMutation>;
export type AddOneDepartmentMutationOptions = Apollo.BaseMutationOptions<AddOneDepartmentMutation, AddOneDepartmentMutationVariables>;
export const UpdateOneDepartmentDocument = gql`
    mutation updateOneDepartment($id: Float!, $data: DepartmentInput!) {
  updateOneDepartment(id: $id, data: $data) {
    id
    name
  }
}
    `;
export type UpdateOneDepartmentMutationFn = Apollo.MutationFunction<UpdateOneDepartmentMutation, UpdateOneDepartmentMutationVariables>;

/**
 * __useUpdateOneDepartmentMutation__
 *
 * To run a mutation, you first call `useUpdateOneDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneDepartmentMutation, { data, loading, error }] = useUpdateOneDepartmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneDepartmentMutation, UpdateOneDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneDepartmentMutation, UpdateOneDepartmentMutationVariables>(UpdateOneDepartmentDocument, options);
      }
export type UpdateOneDepartmentMutationHookResult = ReturnType<typeof useUpdateOneDepartmentMutation>;
export type UpdateOneDepartmentMutationResult = Apollo.MutationResult<UpdateOneDepartmentMutation>;
export type UpdateOneDepartmentMutationOptions = Apollo.BaseMutationOptions<UpdateOneDepartmentMutation, UpdateOneDepartmentMutationVariables>;
export const SetAllDeadlineForDepartmentDocument = gql`
    mutation setAllDeadlineForDepartment($strategyId: Float!, $data: DeadlineDepartment!) {
  setAllDeadlineForDepartment(strategyId: $strategyId, data: $data)
}
    `;
export type SetAllDeadlineForDepartmentMutationFn = Apollo.MutationFunction<SetAllDeadlineForDepartmentMutation, SetAllDeadlineForDepartmentMutationVariables>;

/**
 * __useSetAllDeadlineForDepartmentMutation__
 *
 * To run a mutation, you first call `useSetAllDeadlineForDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAllDeadlineForDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAllDeadlineForDepartmentMutation, { data, loading, error }] = useSetAllDeadlineForDepartmentMutation({
 *   variables: {
 *      strategyId: // value for 'strategyId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetAllDeadlineForDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<SetAllDeadlineForDepartmentMutation, SetAllDeadlineForDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAllDeadlineForDepartmentMutation, SetAllDeadlineForDepartmentMutationVariables>(SetAllDeadlineForDepartmentDocument, options);
      }
export type SetAllDeadlineForDepartmentMutationHookResult = ReturnType<typeof useSetAllDeadlineForDepartmentMutation>;
export type SetAllDeadlineForDepartmentMutationResult = Apollo.MutationResult<SetAllDeadlineForDepartmentMutation>;
export type SetAllDeadlineForDepartmentMutationOptions = Apollo.BaseMutationOptions<SetAllDeadlineForDepartmentMutation, SetAllDeadlineForDepartmentMutationVariables>;
