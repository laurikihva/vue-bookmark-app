<template>
  <ul :class="BEM">
    <slot />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    BEM(): string {
      const classArray = ['search-results'];

      if (this.$props.isVisible) {
        classArray.push('is-visible');
      }

      return classArray.join(' ');
    }
  }
})
export default class SearchResults extends Vue {
  @Prop() private isVisible?: boolean;
}
</script>

<style lang="scss">
.search-results {
  display: none;
  list-style: none;
  padding: 0;
  max-width: 550px;
  flex-wrap: wrap;
  border-radius: 10px;

  &.is-visible {
    display: flex;
  }
}
</style>
