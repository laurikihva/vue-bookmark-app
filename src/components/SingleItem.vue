<template>
  <div class="single-item">
    <div class="single-item__heading">
      <a :href="item.url" class="single-item__link" target="_blank">
        <span class="single-item__link-icon">
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            class="single-item__svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0016 8a8 8 0 00-8-8z"
            />
          </svg>
        </span>
        <span class="single-item__link-label">{{ item.fullName }}</span>
      </a>
      <BookmarkButton
        text="Bookmark"
        :isActive="item.isBookmarked"
        v-bind:item="item"
      />
    </div>
    <div class="single-item__description">
      <p>{{ item.description }}</p>
      <p v-if="item.homepage">
        <a :href="item.homepage" target="_blank">{{ item.homepage }}</a>
      </p>
    </div>
    <div class="single-item__details">
      <ul class="single-item__details-list">
        <li class="single-item__details-list-item">
          <div class="single-item__details-label">
            <strong>{{ item.stars }}</strong> stars
          </div>
        </li>
        <li class="single-item__details-list-item">
          <div class="single-item__details-label">
            <strong>{{ item.forks }}</strong> forks
          </div>
        </li>
        <li class="single-item__details-list-item">
          <div class="single-item__details-label">
            <strong>{{ item.license || 'No license' }}</strong>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import BookmarkButton from '@/components/BookmarkButton.vue';
import SearchResultItemInterface from '@/components/SearchResultsItem.vue';

@Component({
  components: {
    BookmarkButton
  }
})
export default class SingleItem extends Vue {
  @Prop() private item!: SearchResultItemInterface;
}
</script>

<style lang="scss">
.single-item {
  border: 1px solid #2c3e50;
  border-radius: 10px;
  padding: 10px;
  width: 250px;

  @media (min-width: 800px) {
    width: 600px;
  }
}
.single-item__heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.single-item__link {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: none;
  }
}
.single-item__link-label {
  word-break: break-all;
}
.single-item__link-icon {
  margin-right: 5px;
}
.single-item__svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.single-item__description {
  text-align: left;
  margin-top: 1em;
}
.single-item__details {
  margin-top: 2em;
}
.single-item__details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.single-item__details-list-item {
  display: flex;
}
.single-item__details-icon {
  margin-right: 5px;
}
</style>
