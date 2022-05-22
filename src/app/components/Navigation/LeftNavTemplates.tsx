import { MdAssessment, MdAssignment, MdAssignmentInd, MdHelp, MdHome, MdSettings } from 'react-icons/md';
import { UserRole as Role } from 'app/components/Auth/useRole';
import { useAuthContext } from '../Auth/authContext';
import { RoutesPath } from 'app/routes/routesPath';

export interface linkProps {
  label: string;
  link: string;
  icon?: any;
  isActive?: () => boolean;
  isModal?: boolean;
}

export interface MenuSection {
  label: string;
  icon: any;
  items: linkProps[];
}

const home: MenuSection = {
  label: 'HOME',
  icon: MdHome,
  items: [
    {
      label: 'Dashboard',
      link: RoutesPath.DASHBOARD,
    },
  ],
};
const actionAndReport: MenuSection = {
  label: 'VIEWS',
  icon: MdAssessment,
  items: [
    {
      label: 'Full',
      link: RoutesPath.ACTION,
      isActive: () => window.location.pathname === RoutesPath.ACTION && window.location.search === '',
    },
    {
      label: 'LOC',
      link: `${RoutesPath.ACTION}?mode=1`,
      isActive: () => window.location.search.indexOf('?mode=1') > -1,
    },
    {
      label: 'Evaluations',
      link: `${RoutesPath.ACTION}?mode=2`,
      isActive: () => window.location.search.indexOf('?mode=2') > -1,
    },
    {
      label: 'Reports',
      link: `${RoutesPath.ACTION}?mode=3`,
      isActive: () => window.location.search.indexOf('?mode=3') > -1,
    },
  ],
};
const users: MenuSection = {
  label: 'USERS',
  icon: MdAssignmentInd,
  items: [
    {
      label: 'All Users',
      link: RoutesPath.ALL_USERS,
    },
    {
      label: 'Add New User',
      link: RoutesPath.ADD_USER,
      isModal: true,
    },
  ],
};
const forms: MenuSection = {
  label: 'FORMS',
  icon: MdAssessment,
  items: [
    {
      label: 'All Forms',
      link: RoutesPath.EVALUATION_TYPE,
      isActive: () => window.location.pathname === RoutesPath.EVALUATION_TYPE,
    },
    {
      label: 'Create/Edit',
      link: RoutesPath.EVALUATION_TYPE + '/' + RoutesPath.EVALUATION_TYPE_ADD,
      isActive: () => window.location.pathname === RoutesPath.EVALUATION_TYPE + '/' + RoutesPath.EVALUATION_TYPE_ADD,
    },
  ],
};

const evaluations: MenuSection = {
  label: 'MY FORMS',
  icon: MdAssessment,
  items: [
    {
      label: 'My List Of Contributors',
      link: RoutesPath.USER_CONTRIBUTORS,
    },
    {
      label: 'My Self Assessment',
      link: RoutesPath.EVALUATIONS_SELF_ASSESSMENT,
      isActive: () => window.location.pathname === RoutesPath.EVALUATIONS_SELF_ASSESSMENT,
    },
    {
      label: 'My Evaluations',
      link: RoutesPath.EVALUATIONS,
      isActive: () => window.location.pathname === RoutesPath.EVALUATIONS,
    },
    {
      label: 'Open Evaluation',
      link: RoutesPath.EVALUATIONS_OPEN_EVALUATION,
      isActive: () => window.location.pathname === RoutesPath.EVALUATIONS_OPEN_EVALUATION,
    },
  ],
};

const settings: MenuSection = {
  label: 'SETTINGS',
  icon: MdSettings,
  items: [
    {
      label: 'User Variables',
      link: RoutesPath.VARIABLES,
    },
    {
      label: 'Reminders',
      link: RoutesPath.REMINDERS,
    },
    {
      label: 'Cycles',
      link: RoutesPath.CYCLES,
    },
    {
      label: 'Configuration',
      link: RoutesPath.CONFIGURATIONS,
    },
  ],
};
export const others: MenuSection = {
  label: 'Others',
  icon: MdHelp,
  items: [
    {
      label: 'Tech Support',
      link: RoutesPath.TECH_SUPPORT,
    },
  ],
};

const reportsMenu = {
  label: 'REPORTS',
  icon: MdAssessment,
  items: [
    {
      label: 'Performance Summary',
      link: RoutesPath.PERFORMANCE_SUMMARY,
    },
  ],
};

export const DeptAndEvaluatorMenu = [
  home,
  evaluations,
  {
    label: "MY TEAM'S FORMS",
    icon: MdAssignment,
    items: [
      {
        label: 'List Of Contributors',
        link: RoutesPath.LIST_OF_CONTRIBUTORS,
      },
      {
        label: 'Self Assessments',
        link: RoutesPath.EVALUATIONS_SELF_ASSESSMENT_LIST,
        isActive: () => window.location.pathname === RoutesPath.EVALUATIONS_SELF_ASSESSMENT_LIST,
      },
    ],
  },
  reportsMenu,
];

const notAssessmentList = {
  ...evaluations,
  items: evaluations.items.filter(it => it.label !== 'Self Assessment List'),
};

export const DepartmentHeadMenu = [home, evaluations, reportsMenu];

export const GetMenuTemplate = (): any => {
  const { selectedRole, identity, isAdminMode, isEvaluationMode } = useAuthContext();

  const isEvaluator = identity?.isEvaluator;

  //role: Department Head
  if (selectedRole.id === Role.DEPT_HEAD) {
    if (isEvaluator) {
      return DeptAndEvaluatorMenu;
    }
    return DepartmentHeadMenu;
  }

  if (isAdminMode) {
    if ([Role.SUPER_ADMIN, Role.SPECIAL_ADMIN].includes(selectedRole.id)) {
      return [home, actionAndReport, users, forms, settings];
    } else {
      return [home, actionAndReport, users];
    }
  } else if (isEvaluationMode) {
    if (isEvaluator) {
      return DeptAndEvaluatorMenu;
    } else {
      return [home, notAssessmentList];
    }
  } else {
    if (isEvaluator) {
      return DeptAndEvaluatorMenu;
    }

    return [home, notAssessmentList];
  }
};
