<template>
  <li class="search-results__item">
    <div class="search-results__item-top">
      <span>
        <a :href="item.url" target="_blank" class="search-results__link">
          {{ item.name }}
        </a>
      </span>
      <button>B</button>
    </div>
    <div class="search-results__item-bottom">
      <span>{{ item.stars }}</span>
      <span>{{ item.forks }}</span>
    </div>
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
  border-radius: 10px;
}
.search-results__item-top {
  display: flex;
  justify-content: space-between;
}
.search-results__item-bottom {
  margin-top: 10px;
}
.search-results__link {
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: none;
  }
}
</style>
