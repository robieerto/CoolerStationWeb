import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/home-page';
import Profile from './views/profile-page';
import Data from './views/data-page';
import Charts from './views/charts-page';
import defaultLayout from './layouts/side-nav-outer-toolbar';
import simpleLayout from './layouts/single-card';
import auth from '@/auth';

function loadView(view) {
  return () => import(/* webpackChunkName: "login" */ `./views/${view}.vue`);
}

const router = new createRouter({
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: Home,
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: Profile,
    },
    {
      path: '/data',
      name: 'Data',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: Data,
    },
    {
      path: '/charts',
      name: 'Charts',
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: Charts,
    },
    {
      path: '/login-form',
      name: 'login-form',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Prihlásenie',
      },
      component: loadView('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadView('reset-password-form'),
    },
    {
      path: '/create-account',
      name: 'create-account',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign Up',
      },
      component: loadView('create-account-form'),
    },
    {
      path: '/change-password/:recoveryCode',
      name: 'change-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Change Password',
      },
      component: loadView('change-password-form'),
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/recovery',
      redirect: '/home',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home',
    },
  ],
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.name === 'login-form' && auth.loggedIn()) {
    next({ name: 'home' });
  }

  if (requiresAuth && !auth.loggedIn()) {
    if (!auth.loggedIn()) {
      next({
        name: 'login-form',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
