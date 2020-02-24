<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form id="form-search" class="form-search" @submit.prevent="submitForm">
      <Search
        hideLabel="true"
        placeholder="Search"
        v-model="inputValue"
        label="Search"
      />
      <button class="form-search__btn" type="submit">Search!</button>
    </form>
    <SearchResults isVisible="hasSearchOptions">
      <SearchResultsItem
        v-for="item in searchMatches"
        v-bind:item="item"
        :bookmarked="item.isBookmarked"
        :key="item.id"
      />
    </SearchResults>
    <paginate
      v-if="hasSearchOptions && paginationPages !== 0"
      :pageCount="paginationPages"
      :prevText="'Prev'"
      :nextText="'Next'"
      :clickHandler="handlePaginationClick"
      :containerClass="'home__pagination'"
    />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { namespace } from 'vuex-class';
import Paginate from 'vuejs-paginate';

import HelloWorld from '@/components/HelloWorld.vue';
import Search from '@/components/Search.vue';
import SearchResults from '@/components/SearchResults.vue';
import SearchResultsItem, {
  SearchResultItemInterface
} from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');

@Component({
  components: {
    HelloWorld,
    Paginate,
    Search,
    SearchResults,
    SearchResultsItem
  }
})
export default class Home extends Vue {
  inputValue = '';
  searchMatches: SearchResultItemInterface[] = [];
  bookmarkedItemsIds: number[] = [];
  paginationPages = 0;
  hasSearchOptions = false;
  mockedData = [
    {
      id: 1,
      name: 'repo_name',
      url: '#',
      stars: 1500,
      forks: 57,
      branches: 16,
      description:
        '**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.',
      contributors: 28,
      releases: 11
    }
  ];
  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];

  mounted(): void {
    if (this.bookmarks.length !== 0) {
      this.prepareBookmarkedIds();
    }
  }

  getApi(searchResult: string, pagination?: number) {
    const apiUrl =
      'https://api.github.com/search/repositories?q=' + searchResult;
    const page = pagination;
    const generateUrl = page ? apiUrl + '&page=' + page : apiUrl;
    console.log(generateUrl);

    Vue.axios
      .get(generateUrl)
      .then(response =>
        this.handleResponse(
          response.data.items,
          response.data.total_count,
          response.data
        )
      );
  }

  handleResponse(
    items: AxiosResponse,
    totalCount: number,
    resp: AxiosResponse
  ) {
    if (this.inputValue === '') {
      return;
    }

    this.setPaginationPages(totalCount);
    this.searchMatches = [];

    if (Array.isArray(items)) {
      console.log(resp);
      items.forEach(item => {
        this.searchMatches.push({
          id: item.id,
          name: item.name,
          descritpion: item.description,
          fullName: item.full_name,
          url: item.html_url,
          homepage: item.homepage,
          stars: item.stargazers_count,
          forks: item.forks_count,
          watchers: item.subscribers_count,
          isBookmarked:
            !!this.bookmarkedItemsIds.find(id => id === item.id) || false
        });
      });
    }

    this.hasSearchOptions = this.shouldShowResults();
  }

  setPaginationPages(total: number): void {
    const result = total / 30;
    if (result < 1) {
      this.paginationPages = 0;
    } else {
      this.paginationPages = Math.ceil(result);
    }
  }

  shouldShowResults(): boolean {
    return this.searchMatches.length !== 0 || false;
  }

  submitForm(): void {
    this.getApi(this.inputValue);
  }

  prepareBookmarkedIds(): void {
    this.bookmarks.forEach(item => this.bookmarkedItemsIds.push(item.id));
  }

  handlePaginationClick(pagNum: number) {
    this.getApi(this.inputValue, pagNum);
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.form-search {
  display: flex;
  justify-content: center;
}
.form-search__btn {
  margin-left: 15px;
}
ul.home__pagination {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  font-weight: 800;
}
li {
  .home__pagination & {
    margin: 0 5px;

    &.active {
      color: #42b983;
    }

    &.disabled {
      color: #9f9f9f;
    }
  }
}
a {
  .home__pagination > li.disabled & {
    pointer-events: none;
  }
}
</style>
