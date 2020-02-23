<template>
  <div class="bookmarks">
    <h1>Your bookmarked Github repositories:</h1>
    <SearchResults isVisible="true">
      <SearchResultsItem
        v-for="item in bookmarks"
        v-bind:item="item"
        :key="item.id"
      />
    </SearchResults>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import SearchResults from '@/components/SearchResults.vue';
import SearchResultsItem, {
  SearchResultItemInterface
} from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');
@Component({
  components: {
    SearchResults,
    SearchResultsItem
  }
})
export default class Bookmarks extends Vue {
  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];
}
</script>
<style lang="scss">
.bookmarks {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
