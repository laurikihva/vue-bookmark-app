<template>
  <button :class="BEM" @click="bookmarkClick">
    <span class="bookmark-btn__text">{{ text }}</span>
    <span class="bookmark-btn__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 423.936 423.936"
        class="bookmark-btn__svg"
      >
        <path
          d="M327.68 0H96.256c-22.528 0-40.96 18.432-40.96 40.96v357.376c0 9.728 5.632 18.944 14.336 23.04 9.216 4.096 19.456 3.072 27.136-3.072l.512-.512 114.688-96.768 114.688 96.768.512.512c4.608 3.584 10.24 5.632 15.872 5.632 3.584 0 7.68-1.024 11.264-3.072 8.704-4.096 14.336-13.312 14.336-23.04V40.96C368.64 18.432 350.208 0 327.68 0z"
        />
      </svg>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import { SearchResultItemInterface } from '@/components/SearchResultsItem.vue';

const bookmarks = namespace('bookmarks');

@Component({
  computed: {
    BEM(): string {
      const classArray = ['bookmark-btn'];

      if (this.$props.isActive) {
        classArray.push('is-active');
      }

      return classArray.join(' ');
    }
  }
})
export default class BookmarkButton extends Vue {
  @Prop() private text!: string;
  @Prop() private isActive?: boolean;
  @Prop() private item!: SearchResultItemInterface;

  @bookmarks.State
  public removedBookmark!: SearchResultItemInterface[];
  public bookmarks!: SearchResultItemInterface[];

  @bookmarks.Action
  public updateBookmarks!: (newBookmark: SearchResultItemInterface) => void;

  bookmarkClick(): void {
    const item = this.item;

    if (!item.isBookmarked) {
      item.isBookmarked = true;
      this.$toasted.show('New bookmark added!');
    } else {
      item.isBookmarked = false;
      this.$toasted.show('Bookmark removed!', {
        action: {
          text: 'Undo',
          onClick: () => {
            this.removedBookmark[0].isBookmarked = true;
            this.updateBookmarks(this.removedBookmark[0]);
            this.$toasted.clear();
          }
        }
      });
    }

    this.updateBookmarks(item);
  }
}
</script>

<style lang="scss">
.bookmark-btn {
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #42b983;

  &:hover,
  &.is-active {
    color: #2c3e50;
  }
}
.bookmark-btn__icon {
  font-size: 24px;
}
.bookmark-btn__svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.bookmark-btn__text {
  /* https://developer.yahoo.com/blogs/ydn/clip-hidden-content-better-accessibility-53456.html */
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
}
</style>
