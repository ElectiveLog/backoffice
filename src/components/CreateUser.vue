<template>
  <div>
    <div class="card-header">
      <h4 class="card-heading">Créer un utilisateur</h4>
    </div>
    <form class="card mb-4" @submit.prevent="handleCreate">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <div class="mb-4">
              <label class="form-label">Nom</label>
              <input
                class="form-control"
                type="text"
                placeholder="Nom de l'utilisateur"
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
          <div class="col-md-4">
            <div class="mb-4">
              <label class="form-label">Mot de passe</label>
              <input
                class="form-control"
                type="password"
                placeholder=""
                v-model="userData.password"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="mb-4">
              <label class="form-label">Numéro de rue</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.streetNumber"
              />
            </div>
          </div>
          <div class="col-md-8">
            <div class="mb-4">
              <label class="form-label">Rue</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.address"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-4">
              <label class="form-label">Ville</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.city"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-4">
              <label class="form-label">Pays</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.country"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-4">
              <label class="form-label">Numéro de téléphone</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.phoneNumber"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-4">
              <label class="form-label">Code parrainage</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model="userData.sponsorshipCode"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="mb-6">
              <label class="form-label">Roles</label>
              <b-form-select
                class="form-control"
                v-model="selected"
                :options="this.rolesName"
              ></b-form-select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="green_button styled_button" type="submit">Créer</button>
      </div>
    </form>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'CreateUser',
  components: {},
  data() {
    return {
      userData: {},
      rolesName: [],
      roles: [],
      selected: null,
    };
  },
  computed: {},
  methods: {
    handleCreate() {
      const payloadUser = this.decodeToken(user.accessToken);
      this.roles.forEach(role => {
        if (role.name === this.selected) {
          this.userData.roleId = role.id;
        }
      });
      var config = {
        method: 'post',
        url: 'http://10.117.129.194:8080/users/create',
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
        data: this.userData,
      };

      axios(config)
        .then(() => {
          var configLog = {
            method: 'post',
            url: 'http://10.117.129.194:8080/api/logs/create',

            data: {
              type: "Création d'utilisateur",
              description:
                payloadUser.email +
                " a créé l'utilisateur" +
                this.userData.email +
                ' sur le backoffice.',
            },
          };
          axios(configLog)
            .then(response => {
              console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              console.log(error);
            });
          this.$notify({
            group: 'foo',
            title: 'Création réussie',
            type: 'success',
            text: "L'utilisateur a bien été créé.",
            duration: 8000,
          }),
            this.$router.push('/users');
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  async created() {
    var config = {
      method: 'get',
      url: 'http://10.117.129.194:8080/roles',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };

    await axios(config)
      .then(response => {
        this.roles = response.data;
        response.data.forEach(role => {
          this.rolesName.push({
            value: role.name,
            text: role.name,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.input-table {
  width: 250px;
  margin-bottom: 2%;
}
</style>
