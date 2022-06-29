<template>
  <div class="table-container">
    <UserList></UserList>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';

export default {
  name: 'User',
  components: {
    UserList,
  },
  computed: {},
};
</script>
