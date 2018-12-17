import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterConfig from './router.config';
import MainVue from '../components/views/main/index.vue';
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      name: RouterConfig.main.name,
      path: RouterConfig.main.path,
      component: MainVue
    }
  ]
});
