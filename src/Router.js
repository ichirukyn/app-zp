import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/Views/Main/Home';
import NotFoundPage from '@/Views/Main/NotFoundPage';

import Auth from '@/Views/Main/User/Auth';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('user_token')) {
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
  routes: [
    // Main
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'Main'},
      component: Home,
    },

    // Auth
    {
      path: '/auth',
      name: 'Auth',
      meta: {layout: 'Main'},
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '*',
      name: 'NotFoundPage',
      meta: {layout: 'Empty'},
      component: NotFoundPage,
    },
  ]

})
