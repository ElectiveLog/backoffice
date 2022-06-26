<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <!-- Add anything else here -->
    <Footer />
    <notifications group="foo" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  created() {
    document.title = "CES'EATS";
  },
  methods: {
    ...mapMutations(['setPlaces']),
  },
};
</script>

<style>
@import '../style/style.css';
@import url('https://fonts.googleapis.com/css2?family=Anek+Latin:wght@500&display=swap');
@import '~bootstrap/dist/css/bootstrap.css';
</style>
