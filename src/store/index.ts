import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import VueAxios from 'vue-axios';
import createPersistedState from 'vuex-persistedstate';

import Bookmarks from '@/store/module/bookmarks';

import Toasted from 'vue-toasted';
import VueScrollTo from 'vue-scrollto';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const toastOptions = {
  position: 'top-right',
  duration: 5000,
  singleton: true,
  keepOnHover: true
};

Vue.use(Toasted, toastOptions);
Vue.use(VueScrollTo);

const store = new Vuex.Store({
  modules: {
    bookmarks: Bookmarks
  },
  plugins: [createPersistedState()]
});

export default store;
