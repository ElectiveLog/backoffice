<template>
  <div>COUCOU</div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'ComponentsList',
  components: {},
  data() {
    return {
      logs: [],
      column: [
        {
          key: 'Type',
          sortable: true,
          label: 'Type',
        },
        {
          key: 'Description',
          sortable: true,
          label: 'Description',
        },
        {
          key: 'Date',
          sortable: true,
          label: 'Date',
        },
        {
          key: 'Heure',
          sortable: true,
          label: 'Heure',
        },
      ],
    };
  },
  computed: {},
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  created() {
    const payloadUser = this.decodeToken(user.accessToken);

    var config = {
      method: 'get',
      url: 'http://localhost:3000/api/logs/',
      headers: {
        Authorization: 'Bearer ' + payloadUser,
      },
    };
    axios(config)
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
