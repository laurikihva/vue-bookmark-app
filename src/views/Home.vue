<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form id="search" class="form-search" @submit="submitForm">
      <Search hideLabel="true" placeholder="Search" />
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
  getApi(): void {
    const apiUrl = 'https://api.github.com/repositories';

    Vue.axios.get(apiUrl).then(response => this.handleResponse(response.data));
  }

  handleResponse(items: AxiosResponse): void {
    console.log(items);

    if (Array.isArray(items)) {
      items.forEach(item => console.log(item));
    }
  }

  submitForm(event: HTMLFormElement) {
    event.preventDefault();

    this.getApi();
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
