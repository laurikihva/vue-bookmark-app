<template>
  <div class="overlay">
    <Spinner class="overlay__spinner" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    Spinner
  }
})
export default class Overlay extends Vue {}
</script>

<style lang="scss">
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(#2c3e50, 0.8);
}

.overlay__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
