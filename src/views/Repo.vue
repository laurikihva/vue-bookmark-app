<template>
  <div class="repo">
    <Overlay v-if="!this.hasLoaded" />
    <SingleItem v-if="hasLoaded" v-bind:item="this.item" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import SingleItem from '@/components/SingleItem.vue';
import Overlay from '@/components/Overlay.vue';
import { SearchResultItemInterface } from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');

@Component({
  components: {
    SingleItem,
    Overlay
  }
})
export default class Repo extends Vue {
  item = {};
  bookmarkedItemsIds: number[] = [];
  hasLoaded = false;

  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];

  mounted(): void {
    if (!this.$route.params.item) {
      this.prepareBookmarkedIds();
      const apiUrl = 'https://api.github.com/repos/' + this.$route.params.name;

      Vue.axios
        .get(apiUrl)
        .then(response => this.handleResponse(response.data));
    } else {
      this.item = this.$route.params.item;
      this.hasLoaded = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleResponse(item: any) {
    this.item = {
      id: item.id,
      name: item.name,
      description: item.description,
      fullName: item.full_name,
      url: item.html_url,
      homepage: item.homepage,
      stars: item.stargazers_count,
      forks: item.forks_count,
      license: item.license && item.license.name,
      isBookmarked:
        !!this.bookmarkedItemsIds.find(id => id === item.id) || false
    };

    this.hasLoaded = true;
  }

  prepareBookmarkedIds(): void {
    this.bookmarks.forEach(item => this.bookmarkedItemsIds.push(item.id));
  }
}
</script>

<style lang="scss">
.repo {
  display: flex;
  justify-content: center;
}
</style>
