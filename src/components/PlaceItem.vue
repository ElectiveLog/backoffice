<template>
  <router-link class="place" :to="`/${id}`"
    ><div class="bottomspace" @click="scrollToTop">
      <div :style="{ 'background-image': `url(/assets/${img})` }"></div>
      <h3>{{ title }}</h3>
      <h4>{{ category }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PlaceItem',
  props: {
    id: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.bottomspace {
  margin-bottom: 50px;
}
</style>
