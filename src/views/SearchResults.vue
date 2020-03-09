<template>
  <div class="b-search-results">
    <div class="l-main">
      <!-- loader -->
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <!-- query info -->
        <div class="b-search-results-info">
          <h1>{{ getQuery }}</h1>
          <p>{{ isNumber(resultsCount) }} repository results</p>
        </div>
        <!-- results list -->
        <div class="b-list">
          <ListItem
            v-for="result in results"
            :key="result.id"
            :result="result"
            :name="result.name"
            :owner="result.owner.login"
            :avatar="result.owner.avatar_url"
            :stars="result.stargazers_count"
            :forks="result.forks_count"
          />
        </div>
        <!-- load next & prev -->
        <div v-if="resultsCount > 10">
          <div class="load-more">
            <div v-if="page > 1">
              <button class="button" v-on:click="loadPrev">&laquo; Previous</button>
            </div>
            <div v-else>
              <span class="button disabled">&laquo; Previous</span>
            </div>
            <div class="load-more-pages">
              <span>Page {{ page }} of {{isNumber((resultsCount / 10).toFixed(0))}}</span>
            </div>
            <button class="button" v-on:click="loadNext">Next &raquo;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '../components/Loader.vue';
import numberFormat from '../components/numberFormat';
import ListItem from '../components/ListItem.vue';

export default {
  name: 'SearchResults',
  components: {
    ListItem,
    Loader,
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    getQuery() {
      return this.$store.getters.searchQuery;
    },
    ...mapState({
      loading: (state) => state.loading,
      results: (state) => state.results.items || [],
      resultsCount: (state) => state.results.total_count,
    }),
  },
  methods: {
    loadNext() {
      const query = this.$store.getters.searchQuery;
      this.$store.dispatch('getResults', [query, this.page += 1]);
      this.$router.push(`/search?q=${query}&p=${this.page}`);
    },
    loadPrev() {
      const query = this.$store.getters.searchQuery;
      this.$store.dispatch('getResults', [query, this.page -= 1]);
      this.$router.push(`/search?q=${query}&p=${this.page}`);
    },
    isNumber(val) {
      return numberFormat(val);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/search-results.scss';
</style>
