<template>
  <div id="app">
    <header class="header">
      <div class="l-main">
        <div class="header-main">
          <router-link :to="{ path: '/' }" class="header-main-logo">
            Github search
          </router-link>
          <router-link :to="{ path: '/bookmarks' }" class="header-main-bookmarks">
            Saved bookmarks
            <div class="header-main-bookmarks-badge">
              <span>{{ bookmarksCount }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </header>
    <div class="header-search">
      <SearchForm />
    </div>
    <div class="main">
      <router-view/>
    </div>
    <div v-if="toast">
      <Toast />
    </div>
  </div>
</template>

<script>
import store from './store';
import SearchForm from './components/SearchForm.vue';
import Toast from './components/Toast.vue';

export default {
  components: {
    Toast,
    SearchForm,
  },
  store,
  computed: {
    bookmarksCount() {
      return this.$store.getters.bookmarksCount;
    },
    toast() {
      return this.$store.getters.showToast;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/header.scss';
</style>
