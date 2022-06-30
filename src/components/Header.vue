<template>
  <div class="header">
    <div class="container">
      <router-link v-if="!currentUser" to="/"
        ><img class="logo" src="../../public/Logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <router-link
        v-if="currentUser && this.userConnectedData.role === 'Technique'"
        to="/logs"
        ><img class="logo" src="../../public/Logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <router-link
        v-if="currentUser && this.userConnectedData.role === 'Commercial'"
        to="/users"
        ><img class="logo" src="../../public/Logo.png" alt="CES'EATS LOGO"
      /></router-link>
      <router-link
        v-if="
          currentUser && this.userConnectedData.role === 'Developpeur Tiers'
        "
        to="/components"
        ><img class="logo" src="../../public/Logo.png" alt="CES'EATS LOGO"
      /></router-link>

      <div class="header-right">
        &emsp;
        <router-link v-if="!currentUser" to="/login"
          ><button class="grey_button styled_button" type="button">
            Connexion
          </button></router-link
        >
        &emsp;
        <router-link v-if="!currentUser" to="/register"
          ><button class="grey_button styled_button" type="button">
            Inscription
          </button></router-link
        >
        <label v-if="currentUser" class="labelUserName"></label>
        &emsp;
        <b-dropdown
          v-if="currentUser"
          text="Mon compte"
          toggle-class="customDropdown"
        >
          <b-dropdown-item to="/account">Profil</b-dropdown-item>

          <b-dropdown-item
            v-if="this.userConnectedData.role === 'Technique'"
            to="/logs"
            >Logs</b-dropdown-item
          >
          <b-dropdown-item
            v-if="
              this.userConnectedData.role === 'Technique' ||
                this.userConnectedData.role === 'Developpeur Tiers'
            "
            to="/components"
            >Composants</b-dropdown-item
          >
          <b-dropdown-item
            v-if="this.userConnectedData.role === 'Technique'"
            to="/performances"
            >Performances</b-dropdown-item
          >
          <b-dropdown-item
            v-if="this.userConnectedData.role === 'Commercial'"
            to="/commandes"
            >Commandes</b-dropdown-item
          >
          <b-dropdown-item
            v-if="this.userConnectedData.role === 'Commercial'"
            to="/users"
            >Utilisateurs</b-dropdown-item
          >
          <b-dropdown-item
            v-if="this.userConnectedData.role === 'Commercial'"
            to="/statistiques"
            >Statistiques</b-dropdown-item
          >

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
      userConnectedData: [],
    };
  },

  methods: {
    logOut() {
      const payloadUser = this.decodeToken(user.accessToken);
      var configLog = {
        method: 'post',
        url: 'http://10.117.129.194:8080/api/logs/create',

        data: {
          type: 'Deconnexion',
          description: payloadUser.email + " s'est deconnecté.",
        },
      };
      axios(configLog)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);
    this.userConnectedData = payloadUser;
    var config = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/' + payloadUser.userId,
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
    document.getElementsByClassName('labelUserName')[0].innerHTML =
      'Bonjour ' + this.userData.name;
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
