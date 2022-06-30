<template>
  <div>
    <b-button style="float: right" to="/createUser"
      >Créer un utilisateur</b-button
    >
    <b-input
      class="input-table"
      v-model="filter"
      placeholder="Recherche ..."
    ></b-input>
    <b-table
      id="my-table"
      striped
      hover
      :items="users"
      :fields="column"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      borderred
      responsive
      primary-key
    >
      <template v-slot:cell(edit)="{ item }">
        <b-btn :to="`users/${item.id}`">Modifier</b-btn>
      </template>
      <template v-slot:cell(delete)="{ item }">
        <b-btn @click="deleteItem(item)">Supprimer</b-btn>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>
//à ajouter dans le b-table pour enlever le blabla : // label-sort-asc=""
label-sort-desc="" label-sort-clear=""
<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'UserList',
  components: {},
  data() {
    return {
      //Pagination
      perPage: 10,
      currentPage: 1,
      filter: '',
      users: [],
      roles: [],
      column: [
        {
          key: 'Name',
          label: 'Name',
        },
        {
          key: 'Email',
          label: 'Email',
        },
        {
          key: 'Adresse',
          label: 'Adresse',
        },
        {
          key: 'Role',
          label: 'Role',
        },
        {
          key: 'edit',
          label: 'Modifier',
        },
        {
          key: 'delete',
          label: 'Supprimer',
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.users.length;
    },
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
    editItem(item) {
      this.$router.push({
        name: 'EditUser',
        params: {
          id: item.id,
        },
      });
    },

    async deleteItem(item) {
      var payloadUser = this.decodeToken(user.accessToken);
      var configDelete = {
        method: 'delete',
        url: 'http://10.117.129.194:8080/users/' + item.id,
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      };
      await axios(configDelete)
        .then(() => {
          var configLog = {
            method: 'post',
            url: 'http://10.117.129.194:8080/api/logs/create',

            data: {
              type: "Suppression d'un utilisateur",
              description:
                payloadUser.email +
                " a supprimé l'utilisateur " +
                item.Email +
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
            title: 'Utilisateur supprimé',
            type: 'success',
            text: "L'utilisateur a été supprimé avec succès",
            duration: 8000,
          });
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].id === item.id) {
              this.users.splice(i, 1);
            }
          }

          this.users.pop();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  async created() {
    var configRoles = {
      method: 'get',
      url: 'http://10.117.129.194:8080/roles/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configRoles).then(response => {
      response.data.forEach(role => {
        this.roles.push({
          id: role.id,
          name: role.name,
        });
      });
    });
    var config = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(config)
      .then(response => {
        response.data.forEach(user => {
          var role = this.roles.find(role => role.id === user.roleId);

          this.users.push({
            id: user.id,
            Name: user.name,
            Email: user.email,
            Adresse: user.address,
            Role: role.name,
            Date: user.createdAt.split('T')[0],
            Heure: user.createdAt
              .split('T')
              .pop()
              .split('.')[0],
          });
        });
      })
      .catch(function(error) {
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
