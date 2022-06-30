import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import bootstrap from "bootstrap";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Notifications from 'vue-notification';
import VueSocketIO from 'vue-socket.io';

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: window.location.origin.split(':80')[0] + ':3006',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
    options: { withCredentials: false }, //Optional options
  })
);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);

new Vue({
  router,
  store,
  // bootstrap,
  render: h => h(App),
}).$mount('#app');
