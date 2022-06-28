import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/routes/Home.vue';
import StyleGuide from '@/routes/StyleGuide.vue';
import Login from '@/routes/Login.vue';
import Register from '@/routes/Register.vue';
import Account from '@/routes/Account.vue';
import Log from '@/routes/Log.vue';
import Components from '@/routes/Components.vue';
import Commandes from '@/routes/Commandes.vue';
import User from '@/routes/User.vue';
import Performances from '@/routes/Performances.vue';
import EditUser from '@/components/EditUser.vue';
import Statistiques from '@/routes/Statistiques.vue';
import CreateUser from '@/components/CreateUser.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/styleguide',
      name: 'styleguide',
      component: StyleGuide,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
    {
      path: '/components',
      name: 'components',
      component: Components,
    },
    {
      path: '/commandes',
      name: 'commandes',
      component: Commandes,
    },
    {
      path: '/logs',
      name: 'logs',
      component: Log,
    },
    {
      path: '/users',
      name: 'users',
      component: User,
    },
    {
      path: '/users/:id',
      name: 'editUser',
      component: EditUser,
    },
    {
      path: '/createUser',
      name: 'createUser',
      component: CreateUser,
    },
    {
      path: '/performances',
      name: 'Performances',
      component: Performances,
    },
    {
      path: '/statistiques',
      name: 'Statistiques',
      component: Statistiques,
    },
    {
      path: '/:id',
      name: 'place',
      component: () =>
        import(/* webpackChunkName: "place" */ '@/routes/Place.vue'),
    },
  ],
});
