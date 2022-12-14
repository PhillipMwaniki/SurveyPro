import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Surveys from '../views/Surveys.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';

import SurveysCreate from '../views/SurveysCreate.vue';


const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      { path: '/surveys', name: 'surveys', component: Surveys },
      { path: '/surveys/create', name: 'surveys.create', component: SurveysCreate },
      { path: '/surveys/:id', name: 'surveys.update', component: SurveysCreate },
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
    ],
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'login'});
  }else if (store.state.user.token && to.meta.isGuest){
    next({ name: 'dashboard'});
  }else{
    next();
  }
});

export default router;
