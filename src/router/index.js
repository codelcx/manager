import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const User = () => import('../views/user/User.vue')
const Limit = () => import('../views/limit/Limit.vue')
const Role = () => import('../views/limit/Role.vue')
const GoodList = () => import('../views/good/goodList.vue')
const GoodAdd = () => import('../views/good/goodAdd.vue')
const GoodParam = () => import('../views/good/goodParam.vue')
const GoodScate = () => import('../views/good/goodScate.vue')
const OrderList = () => import('../views/order/orderList.vue')
const Chart = () => import('../views/chart/Chart.vue')
const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/user',
        component:User
      },
      {
        path: '/limit',
        component:Limit      
      },
      {
        path: '/role',
        component:Role
      },
      {
      path: '/goodList',
      component:GoodList
      },
      {
      path: '/goodAdd',
      component:GoodAdd
      },
      {
        path: '/param',
        component:GoodParam
      },
      {
        path: '/sort',
        component:GoodScate
      },
      {
        path: '/order',
        component:OrderList
      },
      {
        path: '/chart',
        component:Chart
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token');
    token ? next() : next('/login');
  }
})
export default router
