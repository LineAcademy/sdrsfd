import authenticateUser from '../auth/authenticateUser'
import checkUserSession from '@/auth/checkUserSession'
import Signin from '@/pages/auth/Signin.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import ChangePassword from '@/pages/auth/ChangePassword.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/pages/dashboard/Home.vue'
import Branches from '@/pages/masters/Branches.vue'
import Discounts from '@/pages/masters/Discounts.vue'
import Reports from '@/pages/reports/Reports.vue'
import Settings from '@/pages/settings/Settings.vue'
import Transactions from '@/pages/transactions/Transactions.vue'
import Error403 from '@/pages/error/403.vue'
import Error404 from '@/pages/error/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Signin,
    beforeEnter: checkUserSession,
    redirect: "login",
    children: [
      {
        path: "/login",
        component: Signin,
      }
    ],
  },
  {
    path: '/forgot-password',
    beforeEnter: checkUserSession,
    name: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/admin/reset-password',
    beforeEnter: checkUserSession,
    name: 'reset-password',
    component: ResetPassword,
  },
  {
    path: '/update-password',
    component: ChangePassword
  },
  {
    path: '/',
    redirect: '/dashboard',
    beforeEnter: authenticateUser,
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        alias: '',
        name: 'dashboard',
        meta: {
          screen: "Dashboard",
          permission: "dashboard"
        },
        component: Dashboard
      },
      {
        path: 'branches',
        alias: '',
        name: 'branches',
        meta: {
          screen: "Branches",
          permission: "branches"
        },
        component: Branches
      },
      {
        path: 'discounts',
        alias: '',
        name: 'discounts',
        meta: {
          screen: "Discounts",
          permission: "discounts"
        },
        component: Discounts
      },
      {
        path: 'reports',
        alias: '',
        name: 'reports',
        meta: {
          screen: "Reports",
          permission: "reports"
        },
        component: Reports
      },
      {
        path: 'settings',
        alias: '',
        name: 'settings',
        meta: {
          screen: "Settings",
          permission: "settings"
        },
        component: Settings
      },
      {
        path: 'transactions',
        alias: '',
        name: 'transactions',
        meta: {
          screen: "Transactions",
          permission: "transactions"
        },
        component: Transactions
      }
    ]
  },
  {
    path: '/access-forbidden',
    name: 'access-forbidden',
    component: Error403,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error404,
  },
]

export default routes