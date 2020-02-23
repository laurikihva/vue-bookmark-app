<template>
  <div id="app">
    <div class="nav" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/bookmarks" class="nav__link">
        <span class="nav__label">Bookmarks</span>
        <span class="nav__counter">
          {{ bookmarks.length }}
        </span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import SearchResultItemInterface from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');

@Component
export default class App extends Vue {
  @bookmarks.State
  public bookmarks!: SearchResultItemInterface[];
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nav__label {
  text-decoration: underline;
}
.nav__counter {
  font-size: 13px;
  background-color: #2c3e50;
  color: #ffffff;
  margin-left: 3px;
  padding: 2px 5px 2px 2px;

  .router-link-exact-active & {
    background-color: #42b983;
  }
}
</style>
