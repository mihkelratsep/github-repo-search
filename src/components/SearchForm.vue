<template>
  <form class="b-search-form">
    <div class="b-search-form-input">
      <input type="text" name="query" v-model="query" placeholder="Search repositories...">
    </div>
    <button type="submit" @click.stop.prevent="search" class="b-search-form-button">
      <Icon name="search" color="#333333" />
    </button>
  </form>
</template>

<script>
import Icon from './Icons.vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    search() {
      if (this.query.length > 0) {
        this.$store.dispatch('getResults', [this.query, this.page = 1]);
        if (this.$router.history.current.query.q !== this.query) {
          this.$router.push(`/search?q=${this.query}`);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/search-form.scss';
</style>
