import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import SearchResultItemInterface from '@/components/SearchResultsItem.vue';

@Module({ namespaced: true })
class Bookmarks extends VuexModule {
  public bookmarks: SearchResultItemInterface[] = [];
  @Mutation
  public setBookmark(newBookmark: SearchResultItemInterface): void {
    this.bookmarks.push(newBookmark);
  }
  @Action
  public updateBookmarks(newBookmark: SearchResultItemInterface): void {
    this.context.commit('setBookmark', newBookmark);
  }
}

export default Bookmarks;
