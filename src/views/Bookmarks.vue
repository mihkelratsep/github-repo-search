<template>
  <div class="b-bookmarks">
    <div class="l-main">
      <h1>Saved bookmarks</h1>
      <div class="b-list">
        <div class="b-list-item" v-for="result in bookmarksList" :key="result.id">
          <div class="b-list-item-main">
            <router-link
              :to="{ path: `/repo/${result.owner}/${result.name}`}"
              class="b-list-item-link"
            >
              <div class="b-list-item-name">
                {{ result.name }}
              </div>
              <div class="b-list-item-author">
                <figure :style="{ backgroundImage: `url('${result.avatar}')` }">
                  <img :src="result.avatar" />
                </figure>
                <span>{{ result.owner }}</span>
              </div>
              <div class="b-list-item-counts">
                <div class="b-list-item-counts-item">
                  <i>
                    <Icons name="star" color="#666" />
                  </i>
                  <span>{{ isNumber(result.starsCount) }}</span>
                </div>
                <div class="b-list-item-counts-item">
                  <i>
                    <Icons name="fork" color="#666" width="16" height="21" />
                  </i>
                  <span>{{ isNumber(result.forksCount) }}</span>
                </div>
              </div>
            </router-link>
            <div class="b-list-item-button">
              <button
                class="button bookmarked"
                v-on:click="bookmarkToggle(result)"
              >
                Remove bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import Icons from '../components/Icons.vue';
import numberFormat from '../components/numberFormat';

export default {
  name: 'Bookmarks',
  components: {
    Icons,
  },
  methods: {
    bookmarkToggle(item) {
      this.$store.commit('bookmarkToggle', item);
    },
    isNumber(val) {
      return numberFormat(val);
    },
  },
  computed: mapState([
    'bookmarksList',
  ]),
};
</script>


<style scoped lang="scss">
@import '../assets/scss/bookmarks.scss';
</style>
