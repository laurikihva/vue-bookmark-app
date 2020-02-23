<template>
  <li :class="BEM">
    <div class="search-results__item-top">
      <span>
        <router-link
          :to="{ name: 'Repo', params: { name: item.name, item } }"
          class="search-results__link"
        >
          {{ item.name }}
        </router-link>
      </span>
      <BookmarkButton
        text="Bookmark"
        class="search-results__btn"
        v-on:click="bookmarkClick"
        :isActive="item.isBookmarked"
      />
    </div>
    <div class="search-results__item-bottom">
      <div class="search-results__stars" title="Stars">
        <div class="search-results__icon">
          <svg
            viewBox="0 -10 511.99 511"
            xmlns="http://www.w3.org/2000/svg"
            class="search-results__svg"
          >
            <path
              d="M510.65 185.88a27.18 27.18 0 00-23.4-18.68l-147.8-13.42-58.4-136.75a27.22 27.22 0 00-50.08 0l-58.4 136.75L24.73 167.2a27.26 27.26 0 00-15.46 47.6L121 312.78 88.06 457.86a27.2 27.2 0 0040.5 29.42L256 411.08l127.42 76.2a27.2 27.2 0 0029.93-1.32 27.2 27.2 0 0010.58-28.1L391 312.77l111.72-97.96a27.25 27.25 0 007.94-28.93zm-252.2 223.73"
            />
          </svg>
        </div>
        <div class="search-results__counter">
          {{ this.stars }}
        </div>
      </div>
      <div class="search-results__forks" title="Forks">
        <div class="search-results__icon">
          <svg
            class="search-results__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 16"
          >
            <path
              d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
            ></path>
          </svg>
        </div>
        <div class="search-results__counter">
          {{ this.forks }}
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import BookmarkButton from '@/components/BookmarkButton.vue';

export interface SearchResultItemInterface {
  id: number;
  branches: string;
  description: string;
  commits: string;
  contributors: string;
  name: string;
  url: string;
  stars: string;
  releases: string;
  forks: string;
  isBookmarked: boolean;
}
const bookmarks = namespace('bookmarks');

@Component({
  components: {
    BookmarkButton
  },
  computed: {
    BEM(): string {
      const classArray = ['search-results__item'];

      if (this.$props.bookmarked) {
        classArray.push('is-bookmarked');
      }

      return classArray.join(' ');
    }
  }
})
export default class SearchResultsItem extends Vue {
  @Prop() private item!: SearchResultItemInterface;
  stars = 0;
  forks = 0;

  mounted(): void {
    Vue.axios
      .get(this.item.stars)
      .then(response => (this.stars = response.data.length));

    Vue.axios
      .get(this.item.forks)
      .then(response => (this.forks = response.data.length));
  }

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
.search-results__item {
  border: 1px solid #42b983;
  margin: 10px;
  padding: 10px;
  min-width: 230px;
  border-radius: 10px;

  &.is-bookmarked {
    background-color: #42b983;
  }
}
.search-results__item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-results__item-bottom {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.search-results__link {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: none;
  }
}
.search-results__btn {
  margin-left: 10px;
}
.search-results__stars,
.search-results__forks {
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #2c3e50;
  border-radius: 3px;
}
.search-results__svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.search-results__icon {
  margin-right: 5px;
}
</style>
