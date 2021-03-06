<template>
  <div class="home" id="home">
    <Overlay v-if="this.isSearching" />
    <img alt="Search logo" src="../assets/logo.png" class="home__logo" />
    <h1 id="title">Welcome to bookmarking app!</h1>
    <h3>Search below for any GitHub repository..</h3>
    <form id="home-search" class="home-search" @submit.prevent="submitForm">
      <Search
        hideLabel="true"
        placeholder="Search"
        v-model.trim="inputValue"
        label="Search"
      />
      <button class="home-search__btn" type="submit">Search!</button>
    </form>
    <NotificationMessage
      v-if="invalidStatus || noResults"
      :type="invalidStatus ? 'error' : undefined"
    >
      {{
        invalidStatus
          ? 'Oops! Something went wrong. Please try again!'
          : undefined
      }}
      {{
        noResults ? 'Couldnt find anything for ' + this.inputValue : undefined
      }}
    </NotificationMessage>
    <SearchResults v-if="hasSearchOptions">
      <SearchResultsItem
        v-for="item in searchMatches"
        v-bind:item="item"
        :bookmarked="item.isBookmarked"
        :key="item.id"
      />
    </SearchResults>
    <paginate
      v-if="hasSearchOptions && paginationPages !== 0 && !invalidStatus"
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

import NotificationMessage from '@/components/NotificationMessage.vue';
import Overlay from '@/components/Overlay.vue';
import Search from '@/components/Search.vue';
import SearchResults from '@/components/SearchResults.vue';
import SearchResultsItem, {
  SearchResultItemInterface
} from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');

@Component({
  components: {
    NotificationMessage,
    Overlay,
    Paginate,
    Search,
    SearchResults,
    SearchResultsItem
  }
})
export default class Home extends Vue {
  inputValue = '';
  invalidStatus = false;
  searchMatches: SearchResultItemInterface[] = [];
  bookmarkedItemsIds: number[] = [];
  paginationPages = 0;
  hasSearchOptions = false;
  isSearching = false;
  noResults = false;

  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];

  mounted(): void {
    if (this.bookmarks.length !== 0) {
      this.prepareBookmarkedIds();
    }
  }

  getApi(searchResult: string, pagination?: number) {
    const apiUrl =
      'https://api.github.com/search/repositories?q=' +
      encodeURIComponent(searchResult);
    const page = pagination;
    const generateUrl = page
      ? apiUrl + '&page=' + page + '&per_page=30'
      : apiUrl;

    Vue.axios
      .get(generateUrl)
      .then(response =>
        this.handleResponse(
          response,
          response.data.items,
          response.data.total_count
        )
      );
  }

  handleResponse(
    response: AxiosResponse,
    items: AxiosResponse,
    totalCount: number
  ) {
    this.searchMatches = [];
    this.paginationPages = 0;

    if (response.status !== 200) {
      this.invalidStatus = true;
      this.isSearching = false;
      return;
    }

    if (totalCount === 0) {
      this.isSearching = false;
      this.noResults = true;
      return;
    }

    this.setPaginationPages(totalCount);

    if (Array.isArray(items)) {
      items.forEach(item => {
        this.searchMatches.push({
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
        });
      });
    }

    this.isSearching = false;
    this.hasSearchOptions = this.shouldShowResults();
    this.$scrollTo('#title');
  }

  setPaginationPages(total: number): void {
    const result = total / 30;
    if (result < 1) {
      this.paginationPages = 0;
    } else {
      // Setting limit 34 since only first 1000 search results are available.
      this.paginationPages = result >= 34 ? 34 : Math.ceil(result);
    }
  }

  shouldShowResults(): boolean {
    return this.searchMatches.length !== 0 || false;
  }

  submitForm(): void {
    if (this.inputValue === '') {
      return;
    }

    this.noResults = false;
    this.invalidStatus = false;
    this.isSearching = true;
    this.getApi(this.inputValue);
  }

  prepareBookmarkedIds(): void {
    this.bookmarks.forEach(item => this.bookmarkedItemsIds.push(item.id));
  }

  handlePaginationClick(pagNum: number) {
    this.isSearching = true;
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
.home-search {
  display: flex;
  justify-content: center;
}
.home-search__btn {
  margin-left: 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #2c3e50;
  }
}
.home__logo {
  width: 270px;
}
h3 {
  .home & {
    margin-top: 0;
  }
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
