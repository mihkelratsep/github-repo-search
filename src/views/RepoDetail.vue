<template>
  <div class="b-repo-detail">
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <div class="b-repo">
        <div class="b-repo-main">
          <h1 class="b-repo-main-name">{{ repo.name }}</h1>
          <div class="b-repo-main-author">
            <figure :style="{ backgroundImage: `url('${repo.owner.avatar_url}')` }">
              <img :src="repo.owner.avatar_url" />
            </figure>
            <span>{{ repo.owner.login }}</span>
          </div>
          <div class="b-repo-main-counts">
            <div class="b-repo-main-counts-item">
              <i>
                <Icons name="star" color="#666" />
              </i>
              <span>{{ isNumber(repo.stargazers_count) }}</span>
            </div>
            <div class="b-repo-main-counts-item">
              <i>
                <Icons name="fork" color="#666" width="16" height="21" />
              </i>
              <span>{{ isNumber(repo.forks_count) }}</span>
            </div>
          </div>
        </div>
        <div class="b-repo-button">
          <a :href="repo.html_url" target="_blank" class="b-button-outline">View on Github</a>
        </div>
      </div>
      <div v-if="readme.length > 0">
        <div class="readme markdown-body">
          <VueMarkdown>
            {{ readme }}
          </VueMarkdown>
        </div>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueMarkdown from 'vue-markdown';
import Loader from '../components/Loader.vue';
import Icons from '../components/Icons.vue';
import numberFormat from '../components/numberFormat';

export default {
  name: 'Repo',
  components: {
    VueMarkdown,
    Loader,
    Icons,
  },
  data() {
    return {
      repo: {},
      readme: '',
      loading: true,
      error: '',
    };
  },
  mounted() {
    const { owner, repo } = this.$route.params;
    this.loading = true;

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const repoUrl = baseUrl;
    const readmeUrl = `${baseUrl}/readme`;

    const getRepo = axios.get(repoUrl);
    const getReadme = axios.get(readmeUrl);

    axios.all([getRepo, getReadme])
      .then(axios.spread((...responses) => {
        this.loading = false;
        const resRepo = responses[0];
        const resReadme = responses[1];
        this.repo = resRepo.data;
        this.readme = window.atob(resReadme.data.content);
      })).catch((error) => {
        this.error = error;
        this.loading = false;
      });
  },
  methods: {
    isNumber(val) {
      return numberFormat(val);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/repo-detail.scss';
</style>
