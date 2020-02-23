import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import VueAxios from 'vue-axios';
import createPersistedState from 'vuex-persistedstate';

import Bookmarks from '@/store/module/bookmarks';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  modules: {
    bookmarks: Bookmarks
  },
  plugins: [createPersistedState()]
});

export default store;
