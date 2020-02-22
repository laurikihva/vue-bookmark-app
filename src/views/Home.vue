<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form id="search" class="form-search" @submit.prevent="submitForm">
      <Search
        hideLabel="true"
        placeholder="Search"
        label="Search"
        search="testValue"
        v-on:inputChange="handleInputChange"
      />
      <button class="form-search__btn" type="submit">Search!</button>
    </form>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';

import HelloWorld from '@/components/HelloWorld.vue';
import Search from '@/components/Search.vue';

@Component({
  components: {
    HelloWorld,
    Search
  }
})
export default class Home extends Vue {
  inputValue = '';
  searchMatches: Array<object> = [];

  getApi(searchResult: string): void {
    const apiUrl = 'https://api.github.com/repositories';

    Vue.axios
      .get(apiUrl)
      .then(response => this.handleResponse(response.data, searchResult));
  }

  handleResponse(items: AxiosResponse, searchResult: string): void {
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (item.name.toLowerCase().includes(searchResult.toLowerCase())) {
          this.searchMatches.push(item);
        }
      });
    }

    console.log(this.searchMatches);
  }

  submitForm(): void {
    this.getApi(this.inputValue);
  }

  handleInputChange(value: string): void {
    this.inputValue = value;
  }
}
</script>

<style lang="scss">
.form-search {
  display: flex;
  justify-content: center;
}
.form-search__btn {
  margin-left: 15px;
}
</style>
