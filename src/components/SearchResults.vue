<template>
  <ul class="search-results">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchResults extends Vue {}
</script>

<style lang="scss">
.search-results {
  display: flex;
  list-style: none;
  padding: 0;
  max-width: 550px;
  flex-wrap: wrap;
  border-radius: 10px;
  justify-content: center;
}
</style>
