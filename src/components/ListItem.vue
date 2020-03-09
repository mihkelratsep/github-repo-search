<template>
  <div class="b-list-item">
    <div class="b-list-item-main" v-bind:class="{ bookmarked: isBookmarked(result.id) }">
      <router-link
        :to="{ path: `/repo/${owner}/${name}`}"
        class="b-list-item-link"
      >
        <div class="b-list-item-name">
          {{ name }}
        </div>
        <div class="b-list-item-author">
          <figure :style="{ backgroundImage: `url('${avatar}')` }">
            <img :src="avatar" />
          </figure>
          <span>{{ owner }}</span>
        </div>
        <div class="b-list-item-counts">
          <div class="b-list-item-counts-item">
            <i>
              <Icons name="star" color="#666" />
            </i>
            <span>{{ isNumber(stars) }}</span>
          </div>
          <div class="b-list-item-counts-item">
            <i>
              <Icons name="fork" color="#666" width="16" height="21" />
            </i>
            <span>{{ isNumber(forks) }}</span>
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
</template>

<script>
import Icons from './Icons.vue';
import numberFormat from './numberFormat';

export default {
  name: 'ResultItem',
  components: {
    Icons,
  },
  props: [
    'result',
    'name',
    'owner',
    'avatar',
    'stars',
    'forks',
  ],
  methods: {
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

<style scoped lang="scss">
@import '../assets/scss/list.scss';
</style>
