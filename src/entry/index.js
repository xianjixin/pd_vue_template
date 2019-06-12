import Vue from 'vue';
import vueRouter from '../router/index';
import IndexVue from '../components/views/index.vue';
import store from '@/store';

const app = new Vue({
  router: vueRouter,
  store,
  render: h => h(IndexVue)
});
app.$mount('#app');
