<template>
  <footer
    class="footer text-center text-white spaceup"
    style="background-color: #f1f1f1"
  >
    <!-- Grid container -->
    <div class="container pt-4">
      <!-- Section: Social media -->
      <section class="mb-4">
        <!-- Facebook -->
        <a
          class="btn btn-link btn-floating btn-lg m-1 facebook"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><b-icon-facebook class="icon"></b-icon-facebook
          ><a class="btn-link btn-floating btn-sm text-dark m-1 small"
            >Facebook</a
          ></a
        >

        <!-- Twitter -->
        <a
          class="btn btn-link btn-floating btn-lg m-1 twitter"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><b-icon-twitter class="icon"></b-icon-twitter
          ><a class="btn-link btn-floating btn-sm text-dark m-1 small"
            >Twitter</a
          ></a
        >

        <!-- Google -->
        <a
          class="btn btn-link btn-floating btn-lg m-1 google"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><b-icon-google class="icon"></b-icon-google
          ><a class="btn-link btn-floating btn-sm text-dark m-1 small"
            >Google</a
          ></a
        >

        <!-- Instagram -->
        <a
          class="btn btn-link btn-floating btn-lg m-1 instagram"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
          ><b-icon-instagram class="icon"></b-icon-instagram
          ><a class="btn-link btn-floating btn-sm text-dark m-1 small"
            >Instagram</a
          ></a
        >

        <!-- Github -->
        <a
          class="btn btn-link btn-floating btn-lg m-1 github"
          target="_blank"
          href="https://github.com/ElectiveLog/"
          role="button"
          data-mdb-ripple-color="dark"
          ><b-icon-github class="icon"></b-icon-github>
          <a class="btn-link btn-floating btn-sm text-dark m-1 small"
            >Github</a
          ></a
        >

        <!-- Style Guide -->
        <a
          class="btn btn-link btn-floating btn-lg m-1"
          role="button"
          data-mdb-ripple-color="dark"
        >
          <router-link to="/styleguide"
            ><div @click="scrollToTop">
              <b-icon-card-checklist class="icon"></b-icon-card-checklist>

              <a class="up btn-link btn-floating btn-sm text-dark m-1 small"
                >Style Guide</a
              >
            </div>
          </router-link>
        </a>
      </section>
      <!-- Section: Social media -->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div
      class="text-center text-dark p-3"
      style="background-color: rgba(0, 0, 0, 0.2)"
    >
      <a class="text-dark">©2022 Copyright :</a>
      <a class="text-dark">Mathéo BRISÉ, Théo JEANNEY</a>
      <a class="text-dark">Florentin LUKACZ, Eva THOMAS</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<style scoped>
a {
  text-decoration: none;
  margin-bottom: 0 !important;
  font-size: medium;
}

.small {
  font-size: small;
}

.facebook {
  color: #395591 !important;
  fill: #395591 !important;
}

.twitter {
  color: #1c99e6 !important;
  fill: #1c99e6 !important;
}

.google {
  color: #db4437 !important;
  fill: #db4437 !important;
}

.instagram {
  color: #ba3280 !important;
  fill: #ba3280 !important;
}

.github {
  color: #000000 !important;
  fill: #000000 !important;
}

.spaceup {
  margin-top: 50px;
}

.footer {
  /* position: absolute; */
  height: 100%;
  bottom: 0;
  left: 0;
}
</style>

<script>
export default {
  name: 'Footer',
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
