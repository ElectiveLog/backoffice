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
        <button
          v-if="currentUser"
          href
          @click.prevent="logOut"
          class="grey_button styled_button"
          type="button"
        >
          Déconnexion
        </button>

        &emsp;
        <router-link v-if="!currentUser" to="/login"
          ><button class="grey_button styled_button" type="button">
            Connexion
          </button></router-link
        >
        &emsp;
        <router-link v-if="currentUser" to="/statistics">
          <button class="grey_button styled_button" type="button">
            Utilisateurs
          </button>
        </router-link>
        <a> &emsp;</a>
        <router-link v-if="currentUser" to="/account">
          <button class="blue_button styled_button" type="button">
            Compte
            <b-icon-person-fill class="icon"></b-icon-person-fill>
          </button>
        </router-link>
        <a> &emsp;</a>
        <router-link to="/cart">
          <button class="grey_button styled_button" type="button">
            Panier
            <b-icon-cart-fill class="icon"></b-icon-cart-fill>&ensp;<span>{{
              orders
            }}</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    orders() {
      return this.$store.state.cart.length;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
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
</style>
