<template>
  <div>
    <h4>1. Ajouter des composants réutilisables</h4>
    Pour ajouter des composants réutilisables, il suffit de créer un fichier
    dans le dossier components. Pour utiliser le composant, il suffit de
    l'ajouter dans le template de la page où il doit être utilisé.

    <h4>2. Supprimer des composants réutilisables</h4>
    Pour supprimer des composants réutilisables, il suffit de supprimer le
    fichier dans le dossier components.
    <br />

    <h4>3. Publier des composants</h4>

    <h6>Étape 1 - Configuration de la construction de la bibliothèque</h6>
    Vous devrez tirer parti de vue-cli pour construire vos composants sous forme
    de bibliothèque. Ajoutez vue-cli-service build --target lib --name myLib
    [entry] à vos scripts package.json. Par défaut, [entry] est votre App.vue,
    mais vous pouvez le changer en chemin relatif de tout fichier dans lequel
    vous importez ces composants. Vous pouvez choisir ou non d'enregistrer
    globalement ces composants.<br />
    <h6>
      Étape 2 - Pointer vers votre fichier de sortie dans le fichier
      package.json
    </h6>
    Assurez-vous que votre attribut principal dans package.json pointe
    correctement vers votre fichier de sortie.
    <br />
    <h6>Étape 3 - Ajouter l'attribut files à votre package.json</h6>
    C'est une étape importante. Nous devons spécifier quels fichiers doivent
    être téléchargés vers `npm` lorsque nous publions notre paquet. Nous allons
    juste push tous les fichiers qui nous concernent, au cas où quelqu'un
    voudrait utiliser le SFC (Single File Component) du dossier src. <br />
    <h6>Etape 4- Ajout/Connexion sur npm en tant qu'utilisateur</h6>
    Assurez-vous que vous êtes enregistré sur npm. npm adduser pour enregistrer
    un nouvel utilisateur et npm login pour vous connecter en tant
    qu'utilisateur existant.<br />
    <h6>
      Étape 5 - Vérification des informations d'identification de l'utilisateur
      de npm
    </h6>
    Tapez ‘npm whoami’ pour vérifier votre nom d'utilisateur.
    <br />
    <h6>Étape 6 - Nommer votre bibliothèque de composants</h6>
    Choisissez un nom pour votre package, vous devez vous assurer qu'il n'est
    pas déjà pris. Assurez-vous de le mettre dans votre package.json.
    <br />
    <h6>Étape 7 - Construction</h6>
    Construisez votre paquet en exécutant le script de paquet que vous avez
    ajouté à l'étape 1.
    <br />
    <h6>Étape 8 - Publication de votre bibliothèque de composants sur npm</h6>
    Finalement, exécutez npm publish --access public pour publier la
    bibliothèque en accès public.

    <h4>4. Réutilisabilité des composants</h4>
    Lors de la réalisation de ce projet, nous avons créé plusieurs composants.
    Tous ces composants sont accessibles via la commande :
    <h6 style="">npm install --save @restaurant-card39</h6>
    <div>
      Il est aussi possible de trouver les composants dans le lien suivant :
      <a
        style="width: 80px"
        href="https://www.npmjs.com/package/restaurant-card39"
        >Cliquez ici</a
      >
    </div>
    Ensuite, il faut import les composants dans le template de la page où ils
    doivent être utilisés, ou alors dans le parent le plus haut de l'arbre des
    composants. Les composants installés peuvent finalement être utilisé dans
    n'importe quelle page de l'application.
    <br />

    <div>
      <br />
      <h5>Liste des composants à télécharger</h5>
      <ul style="list-style-type: square">
        <li>Header, qui représente la barre de navigation</li>
        <li>Footer, qui représente le bas de la page</li>
        <li>
          UserList, qui représente un tableau avec une liste d'éléments de
          manière dynamique
        </li>
      </ul>
    </div>
    <h4 style="color: brown">
      Les composants ont été téléchargés {{ this.numberDownload }} fois.
    </h4>
  </div>
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
      numberDownload: 0,
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

    var configNumberDownload = {
      method: 'get',
      url: 'https://api.npmjs.org/downloads/point/last-month/restaurant-card39',
    };
    axios(configNumberDownload).then(response => {
      this.numberDownload = response.data.downloads;
    });

    var config = {
      method: 'get',
      url: 'http://10.117.129.194:8080/api/logs/',
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
