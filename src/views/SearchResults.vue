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
          <div class="b-list-item" v-for="result in results" :key="result.id">
            <div class="b-list-item-main" v-bind:class="{ bookmarked: isBookmarked(result.id) }">
              <router-link
                :to="{ path: `/repo/${result.owner.login}/${result.name}`}"
                class="b-list-item-link"
              >
                <div class="b-list-item-name">
                  {{ result.name }}
                </div>
                <div class="b-list-item-author">
                  <figure :style="{ backgroundImage: `url('${result.owner.avatar_url}')` }">
                    <img :src="result.owner.avatar_url" />
                  </figure>
                  <span>{{ result.owner.login }}</span>
                </div>
                <div class="b-list-item-counts">
                  <div class="b-list-item-counts-item">
                    <i>
                      <Icons name="star" color="#666" />
                    </i>
                    <span>{{ isNumber(result.stargazers_count) }}</span>
                  </div>
                  <div class="b-list-item-counts-item">
                    <i>
                      <Icons name="fork" color="#666" width="16" height="21" />
                    </i>
                    <span>{{ isNumber(result.forks_count) }}</span>
                  </div>
                </div>
              </router-link>
              <div class="b-list-item-button">
                <button
                  class="button"
                  v-on:click="bookmarkToggle(result)"
                  v-bind:class="{ bookmarked: isBookmarked(result.id) }"
                >
                  <div v-if="isBookmarked(result.id)">
                    Remove bookmark
                  </div>
                  <div v-else>
                    Add bookmark
                  </div>
                </button>
              </div>
            </div>
          </div>
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
import Icons from '../components/Icons.vue';
import Loader from '../components/Loader.vue';
import numberFormat from '../components/numberFormat';

export default {
  name: 'SearchResults',
  components: {
    Icons,
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
      bookmarksList: (state) => state.bookmarksList,
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
    bookmarkToggle(item) {
      this.$store.commit('bookmarkToggle', item);
    },
    isBookmarked(item) {
      return this.$store.state.bookmarksList.find((x) => x.id === item);
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
