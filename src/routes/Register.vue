<template>
  <div class="form-body">
    <div class="row">
      <div class="form-holder">
        <div class="form-content">
          <div class="form-items">
            <h3>Inscription</h3>
            <p>
              Ce forumlaire vous inscrit en temps que Développeur Tiers. Merci
              de compléter les différentes informations.
            </p>
            <form
              class="requires-validation"
              novalidate
              @submit.prevent="handleRegister"
            >
              <div class="col-md-12">
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nom"
                  required
                  v-model="user.username"
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
                  v-model="user.email"
                  required
                />
                <div class="valid-feedback">Email valide</div>
                <div class="invalid-feedback">Email invalide</div>
              </div>

              <div class="col-md-12">
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  v-model="user.password"
                  required
                />
                <div class="valid-feedback">Mot de passe valide</div>
                <div class="invalid-feedback">Mot de passe invalide</div>
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
</template>
<script>
import User from '../models/user';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      roledata: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://localhost:5000/roles/',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNsaWVudEBjbGllbnQuY2xpZW50IiwibmFtZSI6ImNsaWVudGZkIiwicm9sZSI6IkNsaWVudCIsInVzZXJJZCI6ImNsNHNmc3NmNTAwMDEwMXB5ZXVwbnR5NXIiLCJpYXQiOjE2NTY0MDY4MzYsImV4cCI6MTY1NzAxMTYzNn0.ufvyvR3ngfSmK2kTYD_6BC2myzU4lheW1Kp6-UsliOs',
      },
    };

    axios(config)
      .then(response => {
        this.roledata = response.data;
      })
      .catch(error => {
        console.log('fdsqf' + error);
      });
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },

  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.roledata.forEach(role => {
        console.log(role.name);
        if (role.name === 'Developpeur Tiers') this.user.roleId = role.id;
      });

      this.$store.dispatch('auth/register', this.user).then(
        data => {
          this.message = data.message;
          this.successful = true;
          this.$notify({
            group: 'foo',
            title: 'Inscription réussie',
            type: 'success',
            text:
              'Bienvenue ' +
              this.user.email +
              ' !' +
              'Vous pouvez vous connecter.',
            duration: 8000,
          });
          this.$router.push('/login');
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
  },
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
