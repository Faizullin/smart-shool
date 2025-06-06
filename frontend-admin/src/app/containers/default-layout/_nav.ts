import { INavData } from '@coreui/angular';
import { Constants } from 'src/app/constants/Constants';

export interface INavRolesData extends INavData {
  roles?: string[];
}
let navItemsData: INavRolesData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Dashboard tables',
    title: true,
  },
  {
    name: 'Users',
    url: '/dashboard/users',
    iconComponent: { name: 'cil-user' },
    roles: ['admin'],
  },
  {
    name: 'Notifications',
    url: '/dashboard/notifications',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Conferences',
    url: '/dashboard/conferences',
  },
  {
    name: 'Academic',
    title: true,
  },
  {
    name: 'Articles',
    url: '/dashboard/articles/list',
    // iconComponent: { name: 'cil-book' },
  },
  {
    name: 'Students',
    url: '/dashboard/students',
    // iconComponent: { name: 'cil-student' },
  },
  {
    name: 'Subjects',
    url: '/dashboard/subjects',
    // iconComponent: { name: 'cil-subject' },
  },
  {
    name: 'Subject Groups',
    url: '/dashboard/subject-groups/list',
    // iconComponent: { name: 'cil-subject' },
  },
  {
    name: 'Quiz system',
    title: true,
  },
  {
    name: 'Exams',
    url: '/dashboard/exams/list',
    // iconComponent: { name: 'cil-exam' },
  },
  {
    name: 'Quizzes',
    url: '/dashboard/quizzes/list',
    // iconComponent: { name: 'cil-quiz' },
  },
  {
    name: 'Results',
    url: '/dashboard/results/list',
    // iconComponent: { name: 'cil-result' },
  },
  {
    name: 'Project Works',
    url: '/dashboard/project-works/list',
    // iconComponent: { name: 'cil-result' },
  },
  {
    name: 'Student Answers',
    url: '/dashboard/student-answers',
    // iconComponent: { name: 'cil-result' },
    roles: ['admin'],
  },
  {
    name: 'Certificates',
    url: '/dashboard/certificates',
    // iconComponent: { name: 'cil-certificate' },
  },
  {
    name: 'System',
    title: true,
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: { name: 'cil-settings' },
    roles: ['admin'],
  },
];
const currentState = localStorage.getItem(
  Constants.SETTINGS_SHOW_COMPONENT_KEY,
);
if (currentState === 'true') {
  navItemsData = [
    ...navItemsData,
    {
      title: true,
      name: 'Theme',
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      iconComponent: { name: 'cil-drop' },
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      linkProps: { fragment: 'someAnchor' },
      iconComponent: { name: 'cil-pencil' },
    },
    {
      name: 'Components',
      title: true,
    },
    {
      name: 'Base',
      url: '/base',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Accordion',
          url: '/base/accordion',
        },
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
        },
        {
          name: 'Cards',
          url: '/base/cards',
        },
        {
          name: 'Carousel',
          url: '/base/carousel',
        },
        {
          name: 'Collapse',
          url: '/base/collapse',
        },
        {
          name: 'List Group',
          url: '/base/list-group',
        },
        {
          name: 'Navs & Tabs',
          url: '/base/navs',
        },
        {
          name: 'Pagination',
          url: '/base/pagination',
        },
        {
          name: 'Placeholder',
          url: '/base/placeholder',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
        },
        {
          name: 'Progress',
          url: '/base/progress',
        },
        {
          name: 'Spinners',
          url: '/base/spinners',
        },
        {
          name: 'Tables',
          url: '/base/tables',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      iconComponent: { name: 'cil-cursor' },
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
        },
        {
          name: 'Dropdowns',
          url: '/buttons/dropdowns',
        },
      ],
    },
    {
      name: 'Forms',
      url: '/forms',
      iconComponent: { name: 'cil-notes' },
      children: [
        {
          name: 'Form Control',
          url: '/forms/form-control',
        },
        {
          name: 'Select',
          url: '/forms/select',
        },
        {
          name: 'Checks & Radios',
          url: '/forms/checks-radios',
        },
        {
          name: 'Range',
          url: '/forms/range',
        },
        {
          name: 'Input Group',
          url: '/forms/input-group',
        },
        {
          name: 'Floating Labels',
          url: '/forms/floating-labels',
        },
        {
          name: 'Layout',
          url: '/forms/layout',
        },
        {
          name: 'Validation',
          url: '/forms/validation',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      iconComponent: { name: 'cil-chart-pie' },
    },
    {
      name: 'Icons',
      iconComponent: { name: 'cil-star' },
      url: '/icons',
      children: [
        {
          name: 'CoreUI Free',
          url: '/icons/coreui-icons',
          badge: {
            color: 'success',
            text: 'FREE',
          },
        },
        {
          name: 'CoreUI Flags',
          url: '/icons/flags',
        },
        {
          name: 'CoreUI Brands',
          url: '/icons/brands',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      iconComponent: { name: 'cil-bell' },
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
        },
        {
          name: 'Modal',
          url: '/notifications/modal',
        },
        {
          name: 'Toast',
          url: '/notifications/toasts',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      iconComponent: { name: 'cil-calculator' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/login',
      iconComponent: { name: 'cil-star' },
      children: [
        {
          name: 'Login',
          url: '/login',
        },
        {
          name: 'Register',
          url: '/register',
        },
        {
          name: 'Error 404',
          url: '/404',
        },
        {
          name: 'Error 500',
          url: '/500',
        },
      ],
    },
    {
      title: true,
      name: 'Links',
      class: 'py-0',
    },
    {
      name: 'Docs',
      url: 'https://coreui.io/angular/docs/templates/installation',
      iconComponent: { name: 'cil-description' },
      attributes: { target: '_blank', class: '-text-dark' },
      class: 'mt-auto',
    },
    {
      name: 'Try CoreUI PRO',
      url: 'https://coreui.io/product/angular-dashboard-template/',
      iconComponent: { name: 'cil-layers' },
      attributes: { target: '_blank' },
    },
  ];
}
export const navItems = navItemsData;
