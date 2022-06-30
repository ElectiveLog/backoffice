<template>
  <div id="app" class="responsive_login">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- Add anything else here -->
    <Footer />
    <notifications group="foo" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import jwt_decode from 'jwt-decode';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  sockets: {
    connect: function() {
      console.log('socket connected');
    },
    OrderIsCreate: function() {
      const user = JSON.parse(localStorage.getItem('user'));
      const payloadUser = jwt_decode(user.accessToken);
      if (payloadUser.role == 'Restaurateur') {
        if (Notification.permission === 'granted') {
          new Notification(
            'Vous une nouvelle commande en en attente de validation'
          );
        }
      }
    },

    OrderIsAcceptRestaurant: function() {
      const user = JSON.parse(localStorage.getItem('user'));
      const payloadUser = jwt_decode(user.accessToken);
      if (payloadUser.role == 'Commercial') {
        if (Notification.permission === 'granted') {
          new Notification('Une commande a été acceptée par un restaurateur');
        }
      }
    },
    OrderIsAcceptLivreur: function() {
      const user = JSON.parse(localStorage.getItem('user'));
      const payloadUser = jwt_decode(user.accessToken);
      if (payloadUser.role == 'Commercial') {
        if (Notification.permission === 'granted') {
          new Notification('Une commande a été acceptée par un livreur');
        }
      }
    },
    OrderIsLivre: function() {
      const user = JSON.parse(localStorage.getItem('user'));
      const payloadUser = jwt_decode(user.accessToken);
      if (payloadUser.role == 'Commercial') {
        if (Notification.permission === 'granted') {
          new Notification('Une commande a été livrée');
        }
      }
    },
  },
  created() {
    document.title = "CES'EATS";
  },
  methods: {
    ...mapMutations(['setPlaces']),
  },
};
</script>

<style>
@import '../style/style.css';
@import url('https://fonts.googleapis.com/css2?family=Anek+Latin:wght@500&display=swap');
@import '~bootstrap/dist/css/bootstrap.css';
</style>
