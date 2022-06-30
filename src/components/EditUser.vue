<template>
  <div>
    <div class="card-header">
      <h4 class="card-heading">Modifier un utilisateur</h4>
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
        <button class="green_button styled_button" type="submit">
          Sauvegarder les modifications
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'EditUser',
  components: {},
  data() {
    return {
      //Pagination
      idUser: this.$route.params.id,
      userData: {},
      roles: [],
      selected: '',
      rolesName: [],
    };
  },
  computed: {},
  methods: {
    handleEdit() {
      this.roles.forEach(role => {
        if (role.name == this.selected) {
          this.userData.roleId = role.id;
        }
      });
      var config = {
        method: 'put',
        url: 'http://localhost:8080/users/' + this.idUser,
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
        data: this.userData,
      };
      const payloadUser = this.decodeToken(user.accessToken);
      axios(config)
        .then(response => {
          if (response.status == 200) {
            var configLog = {
              method: 'post',
              url: 'http://localhost:8080/api/logs/create',

              data: {
                type: "Modification d'utilisateur",
                description:
                  payloadUser.email +
                  " a modifié l'utilisateur " +
                  this.userData.email,
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
              title: 'Modification réussie',
              type: 'success',
              text: 'Vos modifications ont été enregistrées',
              duration: 8000,
            }),
              this.$router.push('/users');
          } else {
            this.$notify({
              group: 'foo',
              title: 'Erreur',
              type: 'error',
              text: 'Une erreur est survenue',
              duration: 8000,
            });
          }
        })
        .catch(error => {
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
      url: 'http://localhost:8080/users/' + this.idUser,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    axios(config).then(response => {
      this.userData = response.data;
    });
    var configRoles = {
      method: 'get',
      url: 'http://localhost:8080/roles',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };

    await axios(configRoles)
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
    this.roles.forEach(role => {
      if (role.id == this.userData.roleId) {
        this.selected = role.name;
      }
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
