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
import jwt_decode from 'jwt-decode';

Vue.use(Router);

const router = new Router({
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
      path: '/:pathMatch(.*)*',
      beforeEnter: (to, from, next) => {
        next('/');
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const infosUser = jwt_decode(user.accessToken);
      const commercialPages = ['/logs', '/components', '/performances'];
      const techniquePages = ['/commandes', '/users', '/statistiques'];
      const devTiersPages = [
        '/commandes',
        '/users',
        '/statistiques',
        '/logs',
        '/performances',
      ];
      if (infosUser.role == 'Commercial' && commercialPages.includes(to.path)) {
        next('/');
      } else if (
        infosUser.role == 'Technique' &&
        techniquePages.includes(to.path)
      ) {
        next('/');
      } else if (
        infosUser.role == 'Developpeur Tiers' &&
        devTiersPages.includes(to.path)
      ) {
        next('/');
      }
    }
    next();
  }
});

export default router;
