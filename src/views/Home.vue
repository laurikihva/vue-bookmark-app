<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form id="form-search" class="form-search" @submit.prevent="submitForm">
      <Search
        hideLabel="true"
        placeholder="Search"
        label="Search"
        v-on:inputChange="handleInputChange"
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
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { namespace } from 'vuex-class';

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
    Search,
    SearchResults,
    SearchResultsItem
  }
})
export default class Home extends Vue {
  inputValue = '';
  searchMatches: SearchResultItemInterface[] = [];
  bookmarkedItemsIds: number[] = [];
  hasSearchOptions = false;
  mockedData = [
    {
      id: 1,
      name: 'repo_name',
      url: '#',
      stars: 1500,
      forks: 57
    }
  ];
  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];

  mounted(): void {
    if (this.bookmarks.length !== 0) {
      this.prepareBookmarkedIds();
    }
  }

  getApi(searchResult: string) {
    const apiUrl = 'https://api.github.com/repositories';

    Vue.axios
      .get(apiUrl)
      .then(response => this.handleResponse(response.data, searchResult));
  }

  handleResponse(items: AxiosResponse, searchResult: string): void {
    this.searchMatches = [];

    if (this.inputValue === '') {
      return;
    }

    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item.name.toLowerCase().includes(searchResult.toLowerCase())) {
          this.searchMatches.push({
            id: item.id,
            name: item.name,
            url: item.html_url,
            stars: item.stargazers_url,
            forks: item.forks_url,
            isBookmarked:
              !!this.bookmarkedItemsIds.find(id => id === item.id) || false
          });
        }
      });
    }

    this.hasSearchOptions = this.shouldShowResults();
    console.log(this.searchMatches);
  }

  shouldShowResults(): boolean {
    return this.searchMatches.length !== 0 || false;
  }

  submitForm(): void {
    this.getApi(this.inputValue);
  }

  handleInputChange(value: string): void {
    this.inputValue = value;
  }

  prepareBookmarkedIds(): void {
    this.bookmarks.forEach(item => this.bookmarkedItemsIds.push(item.id));
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-search {
  display: flex;
  justify-content: center;
}
.form-search__btn {
  margin-left: 15px;
}
</style>
