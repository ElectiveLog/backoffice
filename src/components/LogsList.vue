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
      :items="logs"
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
  name: 'LogsList',
  components: {},
  data() {
    return {
      //Pagination
      perPage: 10,
      currentPage: 1,
      filter: '',
      logs: [],
      column: [
        {
          key: 'Type',
          label: 'Type',
        },
        {
          key: 'Description',
          label: 'Description',
        },
        {
          key: 'Date',
          label: 'Date',
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
      return this.logs.length;
    },
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);
    var config = {
      method: 'get',
      url: 'http://localhost:3000/api/logs/',
      headers: {
        Authorization: 'Bearer ' + payloadUser,
      },
    };
    await axios(config)
      .then(response => {
        response.data.logs.forEach(log => {
          this.logs.push({
            Type: log.type,
            Description: log.description,
            Date: log.createdAt.split('T')[0],
            Heure: log.createdAt
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
