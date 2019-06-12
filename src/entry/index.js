import Vue from "vue";
import vueRouter from "../router/index";
import IndexVue from "../components/views/index.vue";
import 'lib-flexible/flexible'


const app = new Vue({
  router: vueRouter,
  render: (h) => h(IndexVue)
});
app.$mount('#app');