<template>
  <div class="b-toast" v-on:click="hide">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import store from '../store';

export default {
  store,
  data() {
    const add = 'Bookmark added';
    const remove = 'Bookmark removed';
    const type = this.$store.getters.bookmarkType;
    return {
      message: type === 'BOOKMARK_ADDED' ? add : remove,
    };
  },
  methods: {
    hide() {
      this.$store.commit('hideToast');
    },
  },
};
</script>


<style scoped lang="scss">
@import '../assets/scss/toast.scss';
</style>
