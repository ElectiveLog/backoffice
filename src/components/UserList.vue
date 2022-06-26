<template>
  <div class="table">
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
    ></b-table>
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
          key: 'Heure',
          label: 'Heure',
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
  },
  async created() {
    var config = {
      method: 'get',
      url: 'http://localhost:5000/users/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(config)
      .then(response => {
        console.log(response);
        response.data.forEach(user => {
          this.users.push({
            Name: user.name,
            Email: user.email,
            Adresse: user.address,
            Role: user.roleId,
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
