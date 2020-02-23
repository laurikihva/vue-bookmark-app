import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import SearchResultItemInterface from '@/components/SearchResultsItem.vue';

@Module({ namespaced: true })
class Bookmarks extends VuexModule {
  public bookmarks: SearchResultItemInterface[] = [];
  @Mutation
  public setBookmark(newBookmark: SearchResultItemInterface): void {
    const matchingItem = this.bookmarks.find(
      (item: SearchResultItemInterface) => item === newBookmark
    );

    if (matchingItem) {
      this.bookmarks.splice(this.bookmarks.indexOf(matchingItem), 1);
    } else {
      this.bookmarks.push(newBookmark);
    }
  }
  @Action
  public updateBookmarks(newBookmark: SearchResultItemInterface): void {
    this.context.commit('setBookmark', newBookmark);
  }
}

export default Bookmarks;
