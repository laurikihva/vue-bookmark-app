import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

export interface BookmarkInterface {
  id: number;
  name: string;
  descritpion: string;
  fullName: string;
  url: string;
  homepage: string;
  stars: number;
  forks: number;
  watchers: number;
  isBookmarked: boolean;
}

@Module({ namespaced: true })
class Bookmarks extends VuexModule {
  public bookmarks: BookmarkInterface[] = [];
  public lastModifiedBookmark: BookmarkInterface[] = [];
  @Mutation
  public setBookmark(newBookmark: BookmarkInterface): void {
    const matchingItem = this.bookmarks.find(
      (item: BookmarkInterface) => item.id === newBookmark.id
    );

    if (matchingItem) {
      this.bookmarks.splice(this.bookmarks.indexOf(matchingItem), 1);
      this.lastModifiedBookmark = [];
      this.lastModifiedBookmark.push(matchingItem);
    } else {
      this.bookmarks.push(newBookmark);
      this.lastModifiedBookmark = [];
      this.lastModifiedBookmark.push(newBookmark);
    }
  }
  @Action
  public updateBookmarks(newBookmark: BookmarkInterface): void {
    this.context.commit('setBookmark', newBookmark);
  }
}

export default Bookmarks;
