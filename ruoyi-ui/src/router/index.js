import Vue from 'vue'
import Router from 'vue-router'
import VersionManger from '../views/sddm/VersionManager'
import sdkVersion from '../views/sddm/sdkVersion'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },

  {
    path: '/sddm',
    component: VersionManger,
    hidden: true,
  },

  {
    path: '/sdkversion',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/sddm/sdkver',
        component: () => import('@/views/sddm/sdkVersion'),
        name: 'sdkversion',
        meta: { title: 'SDK版本管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/testPlan',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/test/testPl',
        component: () => import('@/views/sddm/testPlanList/index.vue'),
        name: 'testPlan',
        meta: { title: '测试计划管理', icon: 'user' }
      },
      {
        path: '/testP2',
        component: () => import('@/views/sddm/testPlanList/testPlan/index.vue'),
        name: 'testPlanPage',
        meta: { title: '测试计划制定', icon: 'user' }
      },
      {
        path: '/testP3',
        component: () => import('@/views/sddm/testPlanList/testPlan/editTestPlan.vue'),
        name: 'editTestPlan',
        meta: { title: '测试计划修改', icon: 'user' }
      },
    ]
  },
  {
    path: '/sdkInterface',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/sddm/sdkInter',
        component: () => import('@/views/sddm/SDKinterface'),
        name: 'sdkInterface',
        meta: { title: '接口管理', icon: 'user' }
      }
    ]
  },
  //方法
  {
    path: '/method',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/sddm/math',
        component: () => import('@/views/sddm/method'),
        name: 'method',
        meta: { title: '方法管理', icon: 'user' }
      }
    ]
  },

  //用例
  {
    path: '/TestCase',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '/sddm/stockty',
        component: () => import('@/views/sddm/TestCase'),
        name: 'TestCase',
        meta: { title: '用例管理', icon: 'user' }
      }
    ]
  },
   //------------------------------测试结果模块Start-------------------------------------
  
  //问题列表
  {
    path: '/TestResult',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'questionList',
        component: () => import('@/views/sddm/TestResult/index.vue'),
        name: 'questionList',
        meta: { title: '问题列表', icon: 'user' }
      },
      {
        path: 'stockty',
        component: () => import('@/views/sddm/TestResult/TestReport/index.vue'),
        name: 'testReport',
        meta: { title: '测试报告', icon: 'user' }
      }
    ]
  }
  //-------------------------------测试结果模块End--------------------------------------
]

export default new Router({
  mode: 'history', // 去掉url中的#
 // base: '/ROOT/cs/',	//部署时index.html所在的路径地址
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
