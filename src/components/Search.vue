<template>
  <div :class="BEM">
    <label for="search" class="search__label">{{ label }}</label>
    <input
      type="text"
      id="search"
      class="search__input"
      name="search"
      ref="searchInput"
      :value="value"
      :placeholder="placeholder"
      @input="updateValue"
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
  @Prop() private value!: string;
  $refs!: {
    searchInput: HTMLInputElement;
  };

  updateValue(): void {
    this.$emit('input', this.$refs.searchInput.value);
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
