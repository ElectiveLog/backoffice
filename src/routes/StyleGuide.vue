<template>
  <div class="container">
    <h1>Style Guide</h1>
    <!-- Introduction -->
    <a
      >Durant la phase de développement de ce site, le style guide suivant a été
      suivi minutieusement.</a
    ><br />
    <!-- Titres -->
    <h2>Les titres</h2>
    <a
      >Les différents titres du site seront sous les formes suivantes. Les
      titres sont totalement standardisés et devront être identiques sur tout le
      site. Cependant les couleurs de ces derniers peuvent être modifiées au
      besoin, notamment en fonction des couleurs de fond.</a
    >
    <br />
    <div>
      <ul>
        <h1>Premier titre</h1>
        <h2>Deuxième titre</h2>
        <h3>Troisième titre</h3>
        <h4>Quatrième titre</h4>
      </ul>
    </div>
    <br />

    <!-- Police -->
    <h2>La police</h2>
    <p>
      La police utilisée pour les titres, les paragraphes, les boutons et tous
      les autres éléments est Anek Latin 500. Le choix d'une seule et même
      police permet de coordonner les éléments et de garder une logique au sein
      du site.
    </p>
    <br />

    <!-- Couleurs -->
    <h2>Les couleurs</h2>
    <a
      >Les couleurs qui seront utilisées sur l'intégralité du site sont les
      suivantes. Elles constitueront la palette de tout le site.</a
    >
    <div class="row">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm text-center">
            <p class="circle green_background"></p>
            <a>Vert classique, sert aux validations</a>
          </div>
          <div class="col-sm text-center">
            <p class="circle cleargreen_background"></p>
            <a>Vert légèrement plus clair</a>
          </div>
          <div class="col-sm text-center">
            <p class="circle blue_background"></p>
            <a>Bleu de base, tirée du logo</a>
          </div>
          <div class="col-sm text-center">
            <p class="circle clearblue_background"></p>
            <a>Bleu légèrement plus clair</a>
          </div>
          <div class="col-sm text-center">
            <p class="circle grey_background"></p>
            <a>Gris anthracite, couleur sombre</a>
          </div>
          <div class="col-sm text-center">
            <p class="circle red_background"></p>
            <a>Rouge classique, sert aux erreurs</a>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Logos -->
    <h2>Les logos</h2>
    <a
      >Différents logos représentant la marque seront présents sur le site. Le
      logo principal de la marque, une version simplifiée et minimisée qui
      servira à l'utilisation du logo dans les lieux les plus réduits, et une
      version rectangulaire. Le choix de quel logo utiliser dépendra de
      l'emplacement spécifique.</a
    >
    <img class="logo_round" src="../../public/Logo.png" />
    <img class="logo_mini" src="../../public/logo_mini.png" />
    <img class="logo_rec" src="../../public/logo_rec.png" />

    <!-- Boutons -->
    <h2>Les boutons</h2>
    <a
      >Les différents boutons du site sont eux aussi standardisés. Le choix de
      la couleur du bouton dépend de sa fonction. Le vert servira à toutes les
      validations, le rouge aux annulations, et le bouton bleu ainsi que le gris
      serviront à tout le reste.</a
    >
    <div class="row">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-sm text-center">
            <button class="green_button styled_button" type="button">
              Valider
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="blue_button styled_button" type="button">
              Divers
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="grey_button styled_button" type="button">
              Divers
            </button>
          </div>
          <div class="col-sm text-center">
            <button class="red_button styled_button" type="button">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Form -->
    <h2>Les formulaires</h2>
    <a
      >Les différents formulaires du site, notamment utilisés pour l'inscription
      et la connexion seront comme ci-dessous :</a
    >
    <div class="form-body">
      <div class="row">
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Formulaire type</h3>
              <p>Merci de compléter les différentes informations.</p>
              <form class="requires-validation" novalidate>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="name"
                    placeholder="Nom"
                    required
                  />
                  <div class="valid-feedback">Nom valide</div>
                  <div class="invalid-feedback">Nom invalide</div>
                </div>

                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="email"
                    name="email"
                    placeholder="Adresse e-mail"
                    required
                  />
                  <div class="valid-feedback">Email valide</div>
                  <div class="invalid-feedback">Email invalide</div>
                </div>
                <div class="col-md-12">
                  <select class="form-select mt-3" required>
                    <option selected disabled value="">Liste</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div class="valid-feedback">Choix valide</div>
                  <div class="invalid-feedback">Choix invalide</div>
                </div>

                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    required
                  />
                  <div class="valid-feedback">Mot de passe valide</div>
                  <div class="invalid-feedback">Mot de passe invalide</div>
                </div>

                <div class="col-md-12 mt-3">
                  <label class="mb-3 mr-1" for="gender">Liste à puce : </label>
                  &ensp;

                  <input
                    type="radio"
                    class="btn-check"
                    name="liste"
                    id="option1"
                    autocomplete="off"
                    required
                  />
                  <label
                    class="blue_button styled_button small_button"
                    for="option1"
                    >Option 1</label
                  >
                  &ensp;
                  <input
                    type="radio"
                    class="btn-check"
                    name="liste"
                    id="option2"
                    autocomplete="off"
                    required
                  />
                  <!-- <label class="btn btn-sm btn-outline-secondary" for="option2" -->
                  <label
                    class="blue_button styled_button small_button"
                    for="option2"
                    >Option 2</label
                  >
                  <div class="valid-feedback mv-up">Selection valide</div>
                  <div class="invalid-feedback mv-up">Selection invalide</div>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label class="form-check-label"
                    >Je confirme les informations saisies</label
                  >
                  <div class="invalid-feedback">Merci de confirmer.</div>
                </div>

                <div class="form-button mt-3">
                  <button class="green_button styled_button" type="submit">
                    Valider
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleGuide',
};
</script>
