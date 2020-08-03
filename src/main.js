import Vue from 'vue';
import App from './App.vue';
import router from "./Router";
// import store from './Store/index.js'
Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
