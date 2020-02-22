<template>
  <div :class="BEM">
    <label for="search" class="search__label">{{ label }}</label>
    <input
      type="text"
      id="search"
      class="search__input"
      v-model="searchValue"
      name="search"
      :placeholder="placeholder"
      v-on:input="onInputChange"
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
  private searchValue = '';

  onInputChange(): void {
    this.$emit('inputChange', this.searchValue);
  }
}
</script>

<style lang="scss">
.search__label {
  .search--no-label & {
    display: none;
  }
}
.search__input {
  border: 1px solid #2c3e50;
  padding: 10px;
  height: 20px;
  font-size: 18px;
  border-radius: 3px;
}
</style>
