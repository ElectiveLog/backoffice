<template>
  <div>
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
    <div>
      <b-col>
        <b-row>
          <b-col>
            <b-pagination
              style="width: 300px, margin: 0,0,0,0;"
              size="md"
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </b-col>
          <b-col>
            <b-col>
              <b-button
                style="width: 200px; float: right"
                variant="dark"
                class="mr-2"
                @click="exportCSV"
                >Exporter en CSV</b-button
              >
            </b-col>
            <b-col>
              <label style="color: red; float: right; width: 200px">
                Exporter les données suppriment tous les logs !</label
              >
            </b-col>
          </b-col>
        </b-row>
      </b-col>
    </div>
  </div>
</template>
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
    async exportCSV() {
      //define the heading for each row of the data

      let dataStr = JSON.stringify(this.logs, null, 2);
      let dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      let exportFileDefaultName = 'logsData.json';

      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      var config = {
        method: 'delete',
        url: 'http://10.117.129.194:8080/api/logs/',
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      };
      await axios(config)
        .then(response => {
          if (response.status === 200) {
            this.$notify({
              group: 'foo',
              title: 'Suppression réussie',
              type: 'success',
              text: 'Les logs ont bien été supprimés.',
              duration: 8000,
            });
          } else {
            this.$notify({
              group: 'foo',
              title: 'Erreur',
              type: 'error',
              text: 'Un problème est survenu lors de la suppression des logs.',
              duration: 8000,
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  async created() {
    var config = {
      method: 'get',
      url: 'http://10.117.129.194:8080/api/logs/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
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

.pagination {
  width: 300px;
  margin: 0;
}
</style>
