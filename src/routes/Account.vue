<template>
  <div>
    <div class="card-header">
      <h4 class="card-heading">Modifier son profil</h4>
    </div>
    <form class="card mb-4" @submit.prevent="handleEdit">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Nom</label>
              <input
                class="form-control"
                type="text"
                placeholder="Username"
                v-model="userData.name"
              />
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <div class="mb-4">
              <label class="form-label">Adresse e-mail</label>
              <input
                class="form-control"
                type="email"
                placeholder="Email"
                v-model="userData.email"
              />
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-4">
              <label class="form-label">Adresse</label>
              <input
                class="form-control"
                type="text"
                placeholder="Home Address"
                v-model="userData.address"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="green_button styled_button" type="submit">
          Sauvegarder les modifications
        </button>
      </div>
    </form>
    <button class="red_button styled_button" v-on:click="handleDelete">
      Supprimer son compte
    </button>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'Account',
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    handleEdit() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: 'put',
        url: 'http://localhost:5000/users/' + payloadUser.userId,
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
        data: this.userData,
      };

      axios(config)
        .then(
          this.$notify({
            group: 'foo',
            title: 'Modification réussie',
            type: 'success',
            text: 'Vos modifications ont été enregistrées',
            duration: 8000,
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete() {
      const payloadUser = this.decodeToken(user.accessToken);
      var config = {
        method: 'delete',
        url: 'http://localhost:5000/users/' + payloadUser.userId,
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      };

      axios(config)
        .then(() => {
          this.$notify({
            group: 'foo',
            title: 'Suppression réussie',
            type: 'success',
            text: 'Votre compte a été supprimé',
            duration: 8000,
          });
          this.$store.dispatch('auth/logout');
          this.$router.push('/login');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  created() {
    const payloadUser = this.decodeToken(user.accessToken);
    var config = {
      method: 'get',
      url: 'http://localhost:5000/users/' + payloadUser.userId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };

    axios(config)
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>
