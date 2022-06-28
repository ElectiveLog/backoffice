<template>
  <div class="table-container">
    <h3>Visualisation de la performance des serveurs et des micro-services</h3>
    <div>
      Dans un premier temps, il faut se rendre en ligne de commande, puis
      installer le package "docker". Une fois ce dernier installé, il est
      possible de voir les performances avec l'aide de la commande :
      <h6>docker stats</h6>

      Cette commande affiche tous les conteneurs qui ont été créés pour
      l'application. On y trouve :
      <ul style="list-style-type: square">
        <li>l'ID du conteneur</li>
        <li>le nom du conteneur</li>
        <li>le pourcentage de CPU utilisé</li>
        <li>la RAM utilisée</li>
        <li>le pourcentage de RAM utilisé</li>
        <li>
          la quantité de données que le conteneur a envoyées et reçues via son
          interface réseau
        </li>
        <li>
          la quantité de données que le conteneur a lues et écrites à partir des
          périphériques de bloc sur l'hôte
        </li>
        <li>le nombre de processus ou de threads que le conteneur a créés</li>
      </ul>
    </div>
    <div>
      <h3>Déployer de nouveaux services</h3>
      Nous utilisons un load-balancer afin de gérer les utilisateurs en cas de
      crash de l'un de nos 2 conteneurs. Il est donc possible d'éteindre un
      conteneur sans interruption du service. Le tutoriel est disponible sur le
      lien suivant :
      <a style="width: 80px" href="https://github.com/ElectiveLog/Load-Balancer"
        >Cliquez ici</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Performances',
  components: {},
  computed: {},
};
</script>

<style scoped></style>
