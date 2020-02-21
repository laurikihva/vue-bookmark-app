<template>
  <div :class="BEM">
    <label for="search__label">{{ label }}</label>
    <input
      type="text"
      id="search"
      v-model="label"
      name="search"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    BEM(): string {
      const classArray = ['search'];

      if (this.$props.hideLabel) {
        classArray.push('search--no-label');
      }

      return classArray.join(' ');
    }
  }
})
export default class Search extends Vue {
  @Prop() private label!: string;
  @Prop() private hideLabel?: boolean;
  @Prop() private placeholder?: string;
}
</script>

<style lang="scss">
.search__label {
  .search--no-label & {
    display: none;
  }
}
</style>
