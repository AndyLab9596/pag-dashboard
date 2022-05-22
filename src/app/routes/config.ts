import { EvaluationView } from 'app/pages/EvaluationView/Loadable';
import { ActionPage } from 'app/pages/Action/Loadable';
import { AllUserPage } from 'app/pages/AllUser/Loadable';
import { ConfigurationsPage } from 'app/pages/Configuration/Loadable';
import { CyclesPage } from 'app/pages/Cycle/Loadable';
import { EvaluationEdit } from 'app/pages/EvaluationEdit/Loadable';
import { EvaluationSelfAssessmentPage } from 'app/pages/EvaluationSelfAssessment/Loadable';
import { EvaluationTypePage } from 'app/pages/EvaluationType/Loadable';
import { HomePage } from 'app/pages/Home/Loadable';
import { ListOfContributorsPage } from 'app/pages/ListOfContributors/Loadable';
import { ListOfContributorsOfUserPage } from 'app/pages/ListOfContributors/ListOfContributorsOfUser/Loadable';
import { ListOfContributorsOfUserEditPage } from 'app/pages/ListOfContributors/ListOfContributorsOfUserEdit/Loadable';
import { MyEvaluationsPage } from 'app/pages/MyEvaluations/Loadable';
import { MySelfAssessment } from 'app/pages/MySelfAssessment/Loadable';
import { NotFoundPage } from 'app/pages/NotFound/Loadable';
import { OpenEvaluationPage } from 'app/pages/OpenEvaluation/Loadable';
import { RemindersPage } from 'app/pages/Reminder/Loadable';
import { TechSupportPage } from 'app/pages/TechSupport/Loadable';
import { UserContributorsPage } from 'app/pages/UserContributors/Loadable';
import { UserContributorsOfUserPage } from 'app/pages/UserContributors/UserContributorsOfUser/Loadable';
import { VariablesPage } from 'app/pages/Variables/Loadable';
import { RoutesPath } from './routesPath';
import { PerformanceSummaryPage } from 'app/pages/PerformanceSummary/Loadable';
import { PerformanceSummaryDetailsPage } from 'app/pages/PerformanceSummary/PerformanceSummaryDetails/Loadable';
import { AddUserPage } from 'app/pages/AddUser/Loadable';
import { OverallPerformanceSummaryPage } from 'app/pages/OverallPerformanceSummary/Loadable';

/**
 * IMPORTANT WHEN USE EXACT=true
 * If inside your path route nested with anothers route, exact should be exact=false.
 * (e.g: /all-user nested with modal route "/all-user/modal/profileuser/1/Anjali%20Johannessen", if you use exact=true then modal cannot open, it will be redirected to default /dashboard)
 */

interface Route {
  path: string;
  component: (props?: unknown) => JSX.Element;
  isPrivate: boolean;
  isRestricted?: boolean;
  exact?: boolean;
  isModal?: boolean;
  onlyAdmin?: boolean;
}

const routes: Route[] = [
  {
    path: RoutesPath.DASHBOARD,
    component: HomePage,
    isPrivate: true,
    exact: true,
  },
  //role admin
  {
    path: RoutesPath.ACTION,
    component: ActionPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.ALL_USERS,
    component: AllUserPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.ADD_USER,
    component: AddUserPage,
    isPrivate: true,
    exact: true,
    isModal: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.EVALUATION_TYPE,
    component: EvaluationTypePage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.VARIABLES,
    component: VariablesPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.REMINDERS,
    component: RemindersPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.CYCLES,
    component: CyclesPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.CONFIGURATIONS,
    component: ConfigurationsPage,
    isPrivate: true,
    onlyAdmin: true,
  },
  {
    path: RoutesPath.TECH_SUPPORT,
    component: TechSupportPage,
    isPrivate: true,
  },
  {
    path: RoutesPath.OVERALL_PERFORMANCE_SUMMARY,
    component: OverallPerformanceSummaryPage,
    isPrivate: true,
    exact: true,
  },
  // role evaluations
  {
    path: RoutesPath.USER_CONTRIBUTORS,
    component: UserContributorsPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.USER_CONTRIBUTORS_OF_USER,
    component: UserContributorsOfUserPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.EVALUATIONS_SELF_ASSESSMENT,
    component: MySelfAssessment,
    isPrivate: true,
  },
  {
    path: RoutesPath.EVALUATIONS,
    component: MyEvaluationsPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.EVALUATIONS_OPEN_EVALUATION,
    component: OpenEvaluationPage,
    isPrivate: true,
  },
  {
    path: RoutesPath.LIST_OF_CONTRIBUTORS,
    component: ListOfContributorsPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER,
    component: ListOfContributorsOfUserPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.LIST_OF_CONTRIBUTORS_OF_USER_EDIT,
    component: ListOfContributorsOfUserEditPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.EVALUATIONS_SELF_ASSESSMENT_LIST,
    component: EvaluationSelfAssessmentPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.EVALUATIONS_EDIT,
    component: EvaluationEdit,
    isPrivate: true,
  },
  {
    path: RoutesPath.EVALUATIONS_VIEW,
    component: EvaluationView,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.PERFORMANCE_SUMMARY,
    component: PerformanceSummaryPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: RoutesPath.PERFORMANCE_SUMMARY_OF_USER,
    component: PerformanceSummaryDetailsPage,
    isPrivate: true,
  },
  {
    path: RoutesPath.NOT_FOUND,
    component: NotFoundPage,
    isPrivate: true,
  },
];

export default routes;
