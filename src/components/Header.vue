<template>
  <div class="header">
    <div class="container">
      <router-link v-if="!currentUser" to="/"
        ><img class="logo" src="../../dist/assets/logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <router-link v-if="currentUser" to="/home"
        ><img class="logo" src="../../dist/assets/logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <div class="header-right">
        &emsp;
        <router-link v-if="!currentUser" to="/login"
          ><button class="grey_button styled_button" type="button">
            Connexion
          </button></router-link
        >
        <div v-if="currentUser">Bonjour {{ userData.name }}</div>
        &emsp;
        <b-dropdown
          v-if="currentUser"
          text="Mon compte"
          toggle-class="customDropdown"
        >
          <b-dropdown-item to="/account">Profil</b-dropdown-item>
          <b-dropdown-item to="/commandes">Commandes</b-dropdown-item>
          <b-dropdown-item to="/logs">Logs</b-dropdown-item>
          <b-dropdown-item to="/components">Composants</b-dropdown-item>
          <b-dropdown-item @click.prevent="logOut">Deconnexion</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
export default {
  name: 'Header',
  computed: {
    orders() {
      return this.$store.state.cart.length;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      userData: [],
    };
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);
    var config = {
      method: 'get',
      url: 'http://localhost:5000/users/' + payloadUser.userId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };

    await axios(config)
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.logo {
  width: 75px;
  height: 75px;
}
.header {
  margin-top: 20px;
  margin-bottom: 10px;
}
.customDropdown {
  background-color: brown;
}
</style>
