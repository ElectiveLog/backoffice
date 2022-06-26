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
      :items="orders"
      :fields="column"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      borderred
      responsive
      primary-key
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'CommandList',
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      filter: '',

      orders: [],
      articles: [],
      restaurants: [],
      column: [
        {
          key: 'Articles',
          label: 'Articles',
        },
        {
          key: 'State',
          label: 'Etat de la commande',
        },
        {
          key: 'Restaurant',
          label: 'Restaurant',
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
      return this.orders.length;
    },
  },
  methods: {
    decodeToken(token) {
      return jwt_decode(token);
    },
  },
  async created() {
    const payloadUser = this.decodeToken(user.accessToken);

    var configArticle = {
      method: 'get',
      url: 'http://localhost:3000/api/articles/',
      headers: {
        Authorization: 'Bearer ' + payloadUser,
      },
    };
    await axios(configArticle).then(response => {
      response.data.articles.forEach(article => {
        this.articles.push({
          Id: article._id,
          Name: article.name,
          Type: article.type,
          Price: article.price,
          Date: article.createdAt.split('T')[0],
          Heure: article.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
    });
    var configRestaurant = {
      method: 'get',
      url: 'http://localhost:3000/api/restaurants/',
      headers: {
        Authorization: 'Bearer ' + payloadUser,
      },
    };
    await axios(configRestaurant).then(response => {
      response.data.restaurants.forEach(restaurant => {
        this.restaurants.push({
          Id: restaurant._id,
          Name: restaurant.name,
          IdRestaurateur: restaurant.idRestaurateur,
          Address: restaurant.address,
        });
      });
    });

    var config = {
      method: 'get',
      url: 'http://localhost:3000/api/orders/',
      headers: {
        Authorization: 'Bearer ' + payloadUser,
      },
    };
    await axios(config)
      .then(response => {
        response.data.orders.forEach(order => {
          var articlesNames = '';

          //Get name of articles
          this.articles.forEach(article => {
            order.articles.forEach(articleInside => {
              if (article.Id === articleInside) {
                articlesNames += article.Name + ', ';
              }
            });
          });
          const articleNames = articlesNames.substring(
            0,
            articlesNames.length - 2
          );
          //Get name of the restaurant
          var nameRestaurant = '';
          this.restaurants.forEach(restaurant => {
            if (restaurant.Id === order.idRestaurant) {
              nameRestaurant = restaurant.Name;
            }
          });
          //Get name of the livreur

          this.orders.push({
            Articles: articleNames,
            State: order.state,
            Restaurant: nameRestaurant,
            Date: order.createdAt.split('T')[0],
            Heure: order.createdAt
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
