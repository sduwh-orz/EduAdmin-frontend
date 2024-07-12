import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   // component: HomeView
  //   component: () => import('../views/HomeView.vue')
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/manage',
  //   name: 'Manage',
  //   component: () => import('../views/Manage.vue')
  // },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student.vue')
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/Teacher.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
