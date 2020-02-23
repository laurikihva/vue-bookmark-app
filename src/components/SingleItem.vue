<template>
  <div class="single-item">
    <div class="single-item__heading">
      <a :href="item.url" class="single-item__link">
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
        <span class="single-item__link-label">{{ item.name }}</span>
      </a>
      <BookmarkButton text="Bookmark" />
    </div>
    <div class="single-item__description">
      {{ item.description }}
    </div>
    <div class="single-item__details">
      <ul class="single-item__details-list">
        <li class="single-item__details-list-item">
          <div class="single-item__details-icon">
            <svg
              width="14"
              height="16"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 13H6V6h5v2H8v5zM7 1a6.97 6.97 0 00-5.41 2.59L0 2v4h4L2.5 4.5A5.71 5.71 0 117 13.7 5.71 5.71 0 011.3 8c0-.34.03-.67.09-1H.08A7 7 0 107 1z"
              />
            </svg>
          </div>
          <div class="single-item__details-label">
            <strong>{{ this.commits }}</strong> commits
          </div>
        </li>
        <li class="single-item__details-list-item">
          <div class="single-item__details-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 16"
              class="single-item__svg"
            >
              <path
                d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
              ></path>
            </svg>
          </div>
          <div class="single-item__details-label">
            <strong>{{ this.branches }}</strong> branches
          </div>
        </li>
        <li class="single-item__details-list-item">
          <div class="single-item__details-icon">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M7.73 1.73A2.5 2.5 0 005.96 1H3.5A2.51 2.51 0 001 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06a1 1 0 001.41 0l4.59-4.59a1 1 0 000-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"
              />
            </svg>
          </div>
          <div class="single-item__details-label">
            <strong>{{ this.releases }}</strong> releases
          </div>
        </li>
        <li class="single-item__details-list-item">
          <div class="single-item__details-icon">
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              class="single-item__svg"
            >
              <path
                d="M16 13c0 .44-.45 1-1 1H8a1 1 0 01-1-1H1c-.54 0-1-.56-1-1 0-2.63 3-4 3-4s.23-.4 0-1c-.84-.62-1.06-.59-1-3 .06-2.42 1.37-3 2.5-3s2.44.58 2.5 3c.06 2.41-.16 2.38-1 3-.23.59 0 1 0 1s1.55.71 2.42 2.09C9.2 9.37 10 8.99 10 8.99s.23-.4 0-1c-.84-.61-1.06-.58-1-3 .06-2.41 1.37-3 2.5-3s2.44.59 2.5 3c.05 2.42-.16 2.39-1 3-.23.6 0 1 0 1s3 1.38 3 4z"
              />
            </svg>
          </div>
          <div class="single-item__details-label">
            <strong>{{ this.contributors }}</strong> contributors
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
  branches = 0;
  commits = 0;
  contributors = 0;
  forks = 0;
  url = '';
  stars = 0;
  releases = 0;

  mounted(): void {
    console.log(this.item);
  }
}
</script>

<style lang="scss">
.single-item {
  border: 1px solid #2c3e50;
  border-radius: 10px;
  padding: 10px;
  width: 600px;
}
.single-item__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.single-item__link {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    text-decoration: none;
  }
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
