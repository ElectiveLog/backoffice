<template>
  <main class="container">Home</main>
</template>

<script>
export default {
  name: 'home',
  components: {},
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.$store.commit('setSearch', value);
      },
    },
  },
};
</script>
