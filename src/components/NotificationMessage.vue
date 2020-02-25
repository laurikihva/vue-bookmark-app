<template>
  <h4 :class="BEM">
    <slot />
  </h4>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    BEM(): string {
      const classArray = ['notification-message'];

      if (this.$props.type) {
        classArray.push('notification-message--' + this.$props.type);
      }

      return classArray.join(' ');
    }
  }
})
export default class NotificationMessage extends Vue {
  @Prop() private type?: 'error' | 'success';
}
</script>

<style lang="scss">
.notification-message {
  margin-top: 2em;
}
.notification-message--error {
  color: red;
}
</style>
