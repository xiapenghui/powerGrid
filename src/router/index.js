import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import tableRouter from './modules/table'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
},

// 业务订单管理
{
  path: '/BusinessData',
  component: Layout,
  redirect: '/BusinessData/PurchaseIinformation',
  name: 'Table',
  alwaysShow: true,
  meta: {
    title: 'BusinessData',
    icon: 'tab'
  },
  children: [{
    path: 'productionList',
    component: () => import('@/views/BusinessData/productionList'),
    name: 'productionList',
    meta: {
      title: 'productionList'
    }
  },
  {
    path: 'PurchaseIinformation',
    component: () => import('@/views/BusinessData/PurchaseIinformation'),
    name: 'PurchaseIinformation',
    meta: {
      title: 'PurchaseIinformation'
    }
  },
  {
    path: 'SalesIinformation',
    component: () => import('@/views/BusinessData/SalesIinformation'),
    name: 'SalesIinformation',
    meta: {
      title: 'SalesIinformation'
    }
  },
  {
    path: 'MaintenanceInformation',
    component: () => import('@/views/BusinessData/MaintenanceInformation'),
    name: 'MaintenanceInformation',
    meta: {
      title: 'MaintenanceInformation'
    }
  },
  {
    path: 'WorkInformation',
    component: () => import('@/views/BusinessData/WorkInformation'),
    name: 'WorkInformation',
    meta: {
      title: 'WorkInformation'
    }
  },

  {
    path: 'SchedulingInformation',
    component: () => import('@/views/BusinessData/SchedulingInformation'),
    name: 'SchedulingInformation',
    meta: {
      title: 'SchedulingInformation'
    }
  },

  {
    path: 'ReportInformation',
    component: () => import('@/views/BusinessData/ReportInformation'),
    name: 'ReportInformation',
    meta: {
      title: 'ReportInformation'
    }
  },

  {
    path: 'KeyInformation',
    component: () => import('@/views/BusinessData/KeyInformation'),
    name: 'KeyInformation',
    meta: {
      title: 'KeyInformation'
    }
  },
  {
    path: 'IdInformation',
    component: () => import('@/views/BusinessData/IdInformation'),
    name: 'IdInformation',
    meta: {
      title: 'IdInformation'
    }
  },
  {
    path: 'SupplyInformation',
    component: () => import('@/views/BusinessData/SupplyInformation'),
    name: 'SupplyInformation',
    meta: {
      title: 'SupplyInformation'
    }
  },
  {
    path: 'SpareInventory',
    component: () => import('@/views/BusinessData/SpareInventory'),
    name: 'SpareInventory',
    meta: {
      title: 'SpareInventory'
    }
  },
  {
    path: 'FinishedInformation',
    component: () => import('@/views/BusinessData/FinishedInformation'),
    name: 'FinishedInformation',
    meta: {
      title: 'FinishedInformation'
    }
  }
  ]
},

// 检验检测数据
{
  path: '/InspectionData',
  component: Layout,
  redirect: '/InspectionData/ContactBox',
  name: 'Table',

  meta: {
    title: 'InspectionData',
    icon: 'tab'
  },
  children: [{
    path: 'ContactBox',
    component: () => import('@/views/InspectionData/ContactBox'),
    name: 'ContactBox',
    meta: {
      title: 'ContactBox'
    }
  },
  {
    path: 'CasingCabinet',
    component: () => import('@/views/InspectionData/CasingCabinet'),
    name: 'CasingCabinet',
    meta: {
      title: 'CasingCabinet'
    }
  },
  {
    path: 'StaticContact',
    component: () => import('@/views/InspectionData/StaticContact'),
    name: 'StaticContact',
    meta: {
      title: 'StaticContact'
    }
  },
  {
    path: 'PostInsulator',
    component: () => import('@/views/InspectionData/PostInsulator'),
    name: 'PostInsulator',
    meta: {
      title: 'PostInsulator'
    }
  },
  {
    path: 'CircuitTrolley',
    component: () => import('@/views/InspectionData/CircuitTrolley'),
    name: 'CircuitTrolley',
    meta: {
      title: 'CircuitTrolley'
    }
  },
  {
    path: 'CurrentTransformer',
    component: () => import('@/views/InspectionData/CurrentTransformer'),
    name: 'CurrentTransformer',
    meta: {
      title: 'CurrentTransformer'
    }
  },

  {
    path: 'VoltageTransformer',
    component: () => import('@/views/InspectionData/VoltageTransformer'),
    name: 'VoltageTransformer',
    meta: {
      title: 'VoltageTransformer'
    }
  },
  {
    path: 'LightningArrester',
    component: () => import('@/views/InspectionData/LightningArrester'),
    name: 'LightningArrester',
    meta: {
      title: 'LightningArrester'
    }
  },
  {
    path: 'ChargedDisplay',
    component: () => import('@/views/InspectionData/ChargedDisplay'),
    name: 'ChargedDisplay',
    meta: {
      title: 'ChargedDisplay'
    }
  },
  {
    path: 'FuseInformation',
    component: () => import('@/views/InspectionData/FuseInformation'),
    name: 'FuseInformation',
    meta: {
      title: 'FuseInformation'
    }
  },
  {
    path: 'BusInformation',
    component: () => import('@/views/InspectionData/BusInformation'),
    name: 'BusInformation',
    meta: {
      title: 'BusInformation'
    }
  },
  {
    path: 'CabinetMaterial',
    component: () => import('@/views/InspectionData/CabinetMaterial'),
    name: 'CabinetMaterial',
    meta: {
      title: 'CabinetMaterial'
    }
  },
  {
    path: 'ResistanceCircuit',
    component: () => import('@/views/InspectionData/ResistanceCircuit'),
    name: 'ResistanceCircuit',
    meta: {
      title: 'ResistanceCircuit'
    }
  },
  {
    path: 'MechanicalOperation',
    component: () => import('@/views/InspectionData/MechanicalOperation'),
    name: 'MechanicalOperation',
    meta: {
      title: 'MechanicalOperation'
    }
  },
  {
    path: 'MechanicalTest',
    component: () => import('@/views/InspectionData/MechanicalTest'),
    name: 'MechanicalTest',
    meta: {
      title: 'MechanicalTest'
    }
  },
  {
    path: 'WithstandTest',
    component: () => import('@/views/InspectionData/WithstandTest'),
    name: 'WithstandTest',
    meta: {
      title: 'WithstandTest'
    }
  },
  {
    path: 'InsulationTest',
    component: () => import('@/views/InspectionData/InsulationTest'),
    name: 'InsulationTest',
    meta: {
      title: 'InsulationTest'
    }
  },
  {
    path: 'ElectricalInterlock',
    component: () => import('@/views/InspectionData/ElectricalInterlock'),
    name: 'ElectricalInterlock',
    meta: {
      title: 'ElectricalInterlock'
    }
  }

  ]
},

// 基础数据
{
  path: '/BasicData',
  component: Layout,
  redirect: '/BasicData/OrganizationalManagement/CompanyMaintenance',
  alwaysShow: true,
  hidden: true,
  name: 'BasicData',
  meta: {
    title: 'BasicData',
    icon: 'nested'
  },
  // 物料信息管理模块
  children: [
    // 组织架构管理
    {
      path: 'OrganizationalManagement',
      component: () => import('@/views/BasicData/OrganizationalManagement/index'), // Parent router-view
      name: 'OrganizationalManagement',
      meta: {
        title: 'OrganizationalManagement'
      },
      redirect: '/BasicData/OrganizationalManagement/CompanyMaintenance',
      children: [{
        path: 'CompanyMaintenance',
        component: () => import('@/views/BasicData/OrganizationalManagement/CompanyMaintenance'),
        name: 'CompanyMaintenance',
        meta: {
          title: 'CompanyMaintenance'
        }
      },
      {
        path: 'DepartmentMaintenance',
        component: () => import('@/views/BasicData/OrganizationalManagement/DepartmentMaintenance'),
        name: 'DepartmentMaintenance',
        meta: {
          title: 'DepartmentMaintenance'
        }
      }
      ]
    },

    // 生产信息管理
    {
      path: 'ProductionManagement',
      component: () => import('@/views/BasicData/ProductionManagement/index'), // Parent router-view
      name: 'ProductionManagement',
      meta: {
        title: 'ProductionManagement'
      },
      redirect: '/BasicData/ProductionManagement/LineMaintenance',
      children: [{
        path: 'LineMaintenance',
        component: () => import('@/views/BasicData/ProductionManagement/LineMaintenance'),
        name: 'LineMaintenance',
        meta: {
          title: 'LineMaintenance'
        }
      },
      {
        path: 'WorkMaintenance',
        component: () => import('@/views/BasicData/ProductionManagement/WorkMaintenance'),
        name: 'WorkMaintenance',
        meta: {
          title: 'WorkMaintenance'
        }
      },
      {
        path: 'ProcessMaintenance',
        component: () => import('@/views/BasicData/ProductionManagement/ProcessMaintenance'),
        name: 'ProcessMaintenance',
        meta: {
          title: 'ProcessMaintenance'
        }
      }
      ]
    }

  ]
}

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 系统管理
export const asyncRoutes = [{
  path: '/SystemManagement',
  component: Layout,
  redirect: '/SystemManagement/index',
  hidden: true,
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'SystemManagement',
    icon: 'lock',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [{
    path: 'index',
    component: () => import('@/views/SystemManagement/index'),
    name: 'RolePermission',
    meta: {
      title: 'rolePermission',
      roles: ['admin']
    }
  },
  {
    path: 'lookUser',
    hidden: true,
    component: () => import('@/views/SystemManagement/lookUser'),
    name: 'lookUser',
    meta: {
      title: 'lookUser',
      roles: ['admin']
    }
  },
  {
    path: 'userMangement',
    component: () => import('@/views/SystemManagement/userMangement'),
    name: 'userMangement',
    meta: {
      title: 'userMangement',
      roles: ['admin']
    }
  }
  ]
},

/** when your routing map is too long, you can split it into small modules **/
tableRouter,

{
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  hidden: true,
  meta: {
    title: 'errorPages',
    icon: '404'
  },
  children: [{
    path: '401',
    component: () => import('@/views/error-page/401'),
    name: 'Page401',
    meta: {
      title: 'page401',
      noCache: true
    }
  },
  {
    path: '404',
    component: () => import('@/views/error-page/404'),
    name: 'Page404',
    meta: {
      title: 'page404',
      noCache: true
    }
  }
  ]
},
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'Excel',
  hidden: true,
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [{
    path: 'export-excel',
    component: () => import('@/views/excel/export-excel'),
    name: 'ExportExcel',
    meta: {
      title: 'exportExcel'
    }
  },
  {
    path: 'export-selected-excel',
    component: () => import('@/views/excel/select-excel'),
    name: 'SelectExcel',
    meta: {
      title: 'selectExcel'
    }
  },
  {
    path: 'export-merge-header',
    component: () => import('@/views/excel/merge-header'),
    name: 'MergeHeader',
    meta: {
      title: 'mergeHeader'
    }
  },
  {
    path: 'upload-excel',
    component: () => import('@/views/excel/upload-excel'),
    name: 'UploadExcel',
    meta: {
      title: 'uploadExcel'
    }
  },
  {
    path: 'newTree',
    component: () => import('@/views/excel/newTree'),
    name: 'newTree',
    meta: {
      title: 'newTree'
    }
  }
  ]
},

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
