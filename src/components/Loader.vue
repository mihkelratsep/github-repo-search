<template>
  <div class="b-loader">
    <icons name="loader" color="#4ACD98" />
  </div>
</template>

<script>
import Icons from './Icons.vue';

export default {
  name: 'Loader',
  components: {
    Icons,
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/loader.scss';
</style>
