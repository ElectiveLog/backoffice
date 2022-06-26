<template>
  <div>PLACE</div>
</template>

<script>
export default {
  name: 'Place',
  components: {},
  computed: {
    place() {
      const { id } = this.$route.params;
      return this.$store.state.places.find(
        item => item.id === parseInt(id, 10)
      );
    },
  },
};
</script>
