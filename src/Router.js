import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/Views/Main/Home';
import NotFoundPage from '@/Views/Main/NotFoundPage';

import Auth from '@/Views/Main/User/Auth';
import Register from '@/Views/Main/User/Register';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('UserID') && !localStorage.getItem('UserAuth') && !localStorage.getItem('UserToken')) {
    next();
    return;
  }
  next('/');
};

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }


export default new Router({
  mode: 'history',
  routes: [
    // Main
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'Main'},
      component: Home,
    },
    {
      path: '/home',
      name: 'Hometwo',
      meta: {layout: 'Main'},
      component: Home,
      redirect: '/'
    },

    // Auth
    {
      path: '/auth',
      name: 'Auth',
      meta: {layout: 'Main'},
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },

    // Register
    {
      path: '/register',
      name: 'Register',
      meta: {layout: 'Main'},
      component: Register,
      beforeEnter: ifNotAuthenticated
    },

    // 404
    {
      path: '*',
      name: 'NotFoundPage',
      meta: {layout: 'Empty'},
      component: NotFoundPage,
    },
  ]

})
