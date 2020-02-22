<template>
  <li class="search-results__item">
    <p>{{ item.name }}</p>
    <p>{{ item.stars }}</p>
    <p>{{ item.forks }}</p>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SearchResultsItem extends Vue {
  @Prop() private item!: string[];
}
</script>

<style lang="scss">
.search-results__item {
  border: 1px solid #42b983;
  margin: 10px;
  padding: 10px;
  min-width: 230px;
}
</style>
