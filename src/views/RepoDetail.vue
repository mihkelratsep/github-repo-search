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
      <div class="readme markdown-body">
        <VueMarkdown>
          {{ readme }}
        </VueMarkdown>
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
      readme: null,
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

    axios.get(repoUrl)
      .then((res) => res.data)
      .then((results) => {
        this.loading = false;
        this.repo = results;
      })
      .catch((error) => {
        this.error = error;
      });

    const { CancelToken } = axios;

    let cancel;

    if (cancel !== undefined) {
      cancel();
    }

    axios.get(readmeUrl, {
      cancelToken: new CancelToken(
        ((c) => {
          cancel = c;
        }),
      ),
    })
      .then((response) => {
        cancel();
        this.readme = window.atob(response.data.content);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.readme = null;
          this.error = 'This repository does not have a README.md file';
        } else {
          this.error = error;
        }
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
