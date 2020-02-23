<template>
  <div class="repo">
    <SingleItem v-bind:item="this.mockedData" />
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
  mockedData = [
    {
      id: 1,
      name: 'repo_name',
      url: '#',
      stars: 1500,
      forks: 57,
      branches: 16,
      description:
        '**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.',
      contributors: 28,
      releases: 11
    }
  ];
}
</script>

<style lang="scss">
.repo {
  display: flex;
  justify-content: center;
}
</style>
