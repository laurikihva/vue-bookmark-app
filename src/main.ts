import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Toasted from 'vue-toasted';
import VueScrollTo from 'vue-scrollto';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

const toastOptions = {
  position: 'top-right',
  duration: 5000,
  singleton: true,
  keepOnHover: true
};

Vue.use(Toasted, toastOptions);
Vue.use(VueScrollTo);
