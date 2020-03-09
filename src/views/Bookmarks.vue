<template>
  <div class="b-bookmarks">
    <div class="l-main">
      <h1>Saved bookmarks</h1>
      <div class="b-list">
        <ListItem
          v-for="result in bookmarksList"
          :key="result.id"
          :result="result"
          :name="result.name"
          :owner="result.owner"
          :avatar="result.avatar"
          :stars="result.starsCount"
          :forks="result.forksCount"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import ListItem from '../components/ListItem.vue';

export default {
  name: 'Bookmarks',
  components: {
    ListItem,
  },
  computed: mapState([
    'bookmarksList',
  ]),
};
</script>


<style scoped lang="scss">
@import '../assets/scss/bookmarks.scss';
</style>
