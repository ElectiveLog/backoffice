<template>
  <div class="table-container">
    <VueApexCharts
      ref="realtimeChart"
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>

    <b-table :items="items" :fields="fields"> </b-table>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
var axios = require('axios');
const user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'Statistiques',
  components: { VueApexCharts },
  computed: {},

  methods: {
    updateSeriesLine() {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: this.series.data,
          },
        ],
        false,
        true
      );
    },
  },
  data() {
    return {
      nbUsers: 0,
      nbRestaurants: 0,
      nbLivreurs: 0,
      nbClients: 0,
      nbCommandes: 0,
      nbRestaurateurs: 0,
      nbCommerciaux: 0,
      nbTechniques: 0,
      nbDevTiers: 0,
      priceTotalForAllOrders: 0,
      maxCommandes: 0,
      bestClient: '',

      clients: [],
      restaurants: [],
      livreurs: [],
      commandes: [],
      users: [],
      restaurateurs: [],
      devTiers: [],
      commerciaux: [],
      techniques: [],
      roles: [],
      articles: [],

      nbUsersWithCode: 0,

      fields: [
        {
          key: 'description',
          label: 'Description',
        },
        { key: 'nb', label: 'Quantité' },
      ],
      items: [],

      series: [
        {
          name: "Nombre d'utilisateurs",
          data: [],
        },
      ],
      chartOptions: {
        xaxis: {
          categories: [
            'Clients',
            'Livreurs',
            'Restaurateurs',
            'Commerciaux',
            'Techniques',
            'Developpeurs Tiers',
          ],
        },
        yaxis: {
          min: 0,
          max: 50,
        },
        title: {
          text: "Nombre d'utilisateurs par rôle",
          align: 'center',
        },
      },
    };
  },
  async created() {
    //Get all roles
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
    //Get nb users
    var configUsers = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configUsers).then(response => {
      response.data.forEach(user => {
        var role = this.roles.find(role => role.id === user.roleId);
        this.users.push({
          id: user.id,
          Name: user.name,
          Email: user.email,
          Adresse: user.address,
          Role: role.name,
          City: user.city,
          SponsorshipCode: user.sponsorshipCode,
          Date: user.createdAt.split('T')[0],
          Heure: user.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbUsers = response.data.length;
    });
    //Get nb livreurs
    var roleLivreurId = '';
    this.roles.forEach(role => {
      if (role.name === 'Livreur') roleLivreurId = role.id;
    });

    var configLivreurs = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleLivreurId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configLivreurs).then(response => {
      response.data.forEach(livreur => {
        this.livreurs.push({
          id: livreur.id,
          Name: livreur.name,
          Email: livreur.email,
          Adresse: livreur.address,
          Role: 'Livreur',
          Date: livreur.createdAt.split('T')[0],
          Heure: livreur.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbLivreurs = response.data.length;
    });
    //Get nb clients
    var roleClientId = '';
    this.roles.forEach(role => {
      if (role.name === 'Client') roleClientId = role.id;
    });
    var configClients = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleClientId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configClients).then(response => {
      response.data.forEach(client => {
        this.clients.push({
          id: client.id,
          Name: client.name,
          Email: client.email,
          Adresse: client.address,
          Role: 'Client',
          Date: client.createdAt.split('T')[0],
          Heure: client.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbClients = response.data.length;
    });
    //Get nb restaurateurs
    var roleRestaurateurId = '';
    this.roles.forEach(role => {
      if (role.name === 'Restaurateur') roleRestaurateurId = role.id;
    });
    var configRestaurateurs = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleRestaurateurId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configRestaurateurs).then(response => {
      response.data.forEach(restaurateur => {
        this.restaurateurs.push({
          id: restaurateur.id,
          Name: restaurateur.name,
          Email: restaurateur.email,
          Adresse: restaurateur.address,
          Role: 'Restaurateur',
          Date: restaurateur.createdAt.split('T')[0],
          Heure: restaurateur.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbRestaurateurs = response.data.length;
    });
    //Get nb commerciaux
    var roleCommerciauxId = '';
    this.roles.forEach(role => {
      if (role.name === 'Commercial') roleCommerciauxId = role.id;
    });
    var configCommerciaux = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleCommerciauxId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configCommerciaux).then(response => {
      response.data.forEach(commerciaux => {
        this.commerciaux.push({
          id: commerciaux.id,
          Name: commerciaux.name,
          Email: commerciaux.email,
          Adresse: commerciaux.address,
          Role: 'Commercial',
          Date: commerciaux.createdAt.split('T')[0],
          Heure: commerciaux.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbCommerciaux = response.data.length;
    });
    //Get nb technique
    var roleTechniqueId = '';
    this.roles.forEach(role => {
      if (role.name === 'Technique') roleTechniqueId = role.id;
    });
    var configTechniques = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleTechniqueId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configTechniques).then(response => {
      response.data.forEach(technique => {
        this.techniques.push({
          id: technique.id,
          Name: technique.name,
          Email: technique.email,
          Adresse: technique.address,
          Role: 'Technique',
          Date: technique.createdAt.split('T')[0],
          Heure: technique.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbTechniques = response.data.length;
    });
    //Get nb technique
    var roleDevTiersId = '';
    this.roles.forEach(role => {
      if (role.name === 'Developpeur Tiers') roleDevTiersId = role.id;
    });
    var configDevTiers = {
      method: 'get',
      url: 'http://10.117.129.194:8080/users/get/role/' + roleDevTiersId,
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    };
    await axios(configDevTiers).then(response => {
      response.data.forEach(devTiers => {
        this.devTiers.push({
          id: devTiers.id,
          Name: devTiers.name,
          Email: devTiers.email,
          Adresse: devTiers.address,
          Role: 'Developpeur Tiers',
          Date: devTiers.createdAt.split('T')[0],
          Heure: devTiers.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbDevTiers = response.data.length;
    });
    //Get nb commandes
    var configOrders = {
      method: 'get',
      url: 'http://10.117.129.194:8080/api/orders/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'X-Server-Select': 'mongo',
      },
    };
    await axios(configOrders).then(response => {
      response.data.orders.forEach(order => {
        this.commandes.push({
          id: order.id,
          Date: order.createdAt.split('T')[0],
          Heure: order.createdAt
            .split('T')
            .pop()
            .split('.')[0],
          IdClient: order.idClient,
          IdLivreur: order.idLivreur,
          IdRestaurant: order.idRestaurant,
          Articles: order.articles,
          ActiveCodeSponsorhsip: order.activeCodeSponsorhsip,
          State: order.state,
        });
      });
      this.nbCommandes = response.data.count;
    });
    //Get nb restaurants
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
          id: restaurant.id,
          Name: restaurant.name,
          Adresse: restaurant.address,
          Articles: restaurant.articles,
          Date: restaurant.createdAt.split('T')[0],
          Heure: restaurant.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
      this.nbRestaurants = response.data.count;
    });
    //Get articles
    var configArticles = {
      method: 'get',
      url: 'http://10.117.129.194:8080/api/articles/',
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
        'X-Server-Select': 'mongo',
      },
    };
    await axios(configArticles).then(response => {
      response.data.articles.forEach(article => {
        this.articles.push({
          id: article.id,
          Name: article.name,
          Description: article.detail,
          Prix: article.price,
          Date: article.createdAt.split('T')[0],
          Heure: article.createdAt
            .split('T')
            .pop()
            .split('.')[0],
        });
      });
    });
    this.users.forEach(user => {
      if (user.SponsorshipCode != undefined) {
        this.nbUsersWithCode++;
      }
    });
    this.commandes.forEach(commande => {
      commande.Articles.forEach(article => {
        this.priceTotalForAllOrders += article.price;
      });
    });
    this.users.forEach(user => {
      var numberUserId = 0;
      this.commandes.forEach(commande => {
        if (user.id == commande.IdClient) {
          numberUserId++;
        }
      });
      if (numberUserId > this.maxCommandes) {
        this.maxCommandes = numberUserId;
        this.bestClient = user.Email;
      }
    });
    this.series.data = [
      this.nbClients,
      this.nbLivreurs,
      this.nbRestaurateurs,
      this.nbCommerciaux,
      this.nbTechniques,
      this.nbDevTiers,
    ];
    this.items = [
      {
        description: 'Utilisateurs avec un code de parrainage',
        nb: this.nbUsersWithCode,
      },
      { description: 'Commandes passées', nb: this.nbCommandes },
      {
        description: "Chiffre d'affaires global",
        nb: this.priceTotalForAllOrders + ' €',
      },
      {
        description: 'Client le plus actif',
        nb: this.bestClient,
      },
    ];
    this.updateSeriesLine();
  },
};
</script>
