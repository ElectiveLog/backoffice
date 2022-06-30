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
      outlined
      fixed
      hover
      :items="orders"
      :fields="column"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      borderred
      responsive
      primary-key
    >
      <template #cell(show_details)="row">
        <b-button
          variant="dark"
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >
          {{ row.detailsShowing ? 'Cacher' : 'Afficher' }}
        </b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Date et heure de la commande: </b>Le {{ row.item.Date }} à
              {{ row.item.Heure }}</b-col
            >
          </b-row>
          <b-row v-if="row.item.parainage != null" class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Parrainage: </b>{{ row.item.parainage }}</b-col
            >
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Numéro: </b>{{ row.item.streetNumber }}</b-col
            >
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Adresse: </b>{{ row.item.addresse }}</b-col
            >
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Ville: </b>{{ row.item.city }}</b-col
            >
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Numéro de téléphone: </b>{{ row.item.phoneNumber }}</b-col
            >
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Pays: </b>{{ row.item.country }}</b-col
            >
          </b-row>
        </b-card>
      </template></b-table
    >
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
      userData: [],

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
          key: 'Prix',
          label: 'Prix',
        },
        {
          key: 'Restaurant',
          label: 'Restaurant',
        },
        // {
        //   key: 'Date',
        //   label: 'Date',
        // },
        // {
        //   key: 'Heure',
        //   label: 'Heure',
        // },
        { key: 'show_details', label: 'Details' },
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
    console.log(payloadUser.userId);
    var configUser = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/' + payloadUser.userId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    axios(configUser)
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    var configArticle = {
      method: 'get',
      url: 'http://10.117.129.194:8080/api/articles/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'X-Server-Select': 'mongo',
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
      url: 'http://10.117.129.194:8080/api/restaurants/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'X-Server-Select': 'mongo',
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
      url: 'http://10.117.129.194:8080/api/orders/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'X-Server-Select': 'mongo',
      },
    };
    await axios(config)
      .then(response => {
        console.log(response.data);
        response.data.orders.forEach(order => {
          var articlesNames = '';
          var priceOrder = 0;

          //Get name of articles
          this.articles.forEach(article => {
            order.articles.forEach(articleInside => {
              if (article.Id === articleInside._id) {
                articlesNames += article.Name + ', ';
                priceOrder += article.Price;
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
            if (order.idRestaurant != null)
              if (restaurant.Id === order.idRestaurant._id) {
                console.log('COUCOU');
                nameRestaurant = restaurant.Name;
              }
          });
          //Get name of the livreur
          this.orders.push({
            Articles: articleNames,
            State: order.state,
            Restaurant: nameRestaurant,
            Prix: priceOrder + ' €',
            Status: order.status,
            Date: order.createdAt.split('T')[0],
            Heure: order.createdAt
              .split('T')
              .pop()
              .split('.')[0],
            addresse: this.userData.address,
            streetNumber: this.userData.streetNumber,
            city: this.userData.city,
            phoneNumber: this.userData.phoneNumber,
            country: this.userData.country,
            parnainage: this.userData.sponsorshipCode,
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
