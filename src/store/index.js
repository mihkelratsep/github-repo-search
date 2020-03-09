import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchQuery: '',
    results: [],
    bookmarksList: [],
    toast: false,
    type: '',
    loading: false,
  },
  plugins: [createPersistedState({
    paths: [
      'searchQuery',
      'results',
      'bookmarksList',
    ],
  })],
  getters: {
    searchQuery(state) {
      return state.searchQuery;
    },
    bookmarksCount(state) {
      return state.bookmarksList.length;
    },
    showToast(state) {
      return state.toast;
    },
    bookmarkType(state) {
      return state.type;
    },
  },
  mutations: {
    bookmarkToggle(state, item) {
      const { bookmarksList } = state;
      const active = bookmarksList.find((x) => x.id === item.id);
      state.toast = true;
      let ret;
      if (active) {
        const itemIndex = bookmarksList.indexOf(active);
        state.type = 'BOOKMARK_REMOVED';
        ret = bookmarksList.splice(itemIndex, 1);
      } else {
        state.type = 'BOOKMARK_ADDED';
        ret = bookmarksList.push({
          id: item.id,
          name: item.name,
          owner: item.owner.login,
          avatar: item.owner.avatar_url,
          starsCount: item.stargazers_count,
          forksCount: item.forks_count,
        });
      }
      setTimeout(() => {
        state.toast = false;
      }, 4000);
      return ret;
    },
    hideToast(state) {
      state.toast = false;
    },
    SET_RESULTS(state, results) {
      state.results = results;
    },
  },
  actions: {
    getResults({ state, commit }, [query, page]) {
      state.results = [];
      state.loading = true;
      axios.get(`https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`)
        .then((res) => res.data)
        .then((results) => {
          state.searchQuery = query;
          state.loading = false;
          commit('SET_RESULTS', results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

export default store;
