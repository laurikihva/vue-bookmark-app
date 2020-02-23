<template>
  <div class="repo">
    <SingleItem v-if="hasItem" v-bind:item="this.item" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SingleItem from '@/components/SingleItem.vue';

@Component({
  components: {
    SingleItem
  }
})
export default class Repo extends Vue {
  item = {};
  hasItem = false;

  mounted(): void {
    if (!this.$route.params.item) {
      return;
    }

    this.hasItem = !!this.$route.params.item;
    this.item = this.$route.params.item;
  }
}
</script>

<style lang="scss">
.repo {
  display: flex;
  justify-content: center;
}
</style>
