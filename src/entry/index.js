import Vue from "vue";
import vueRouter from "../router/index";
import IndexVue from "../components/views/index.vue";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible'
Vue.use(MintUI);

const app =  new Vue({
    router: vueRouter,
    render: (h)=> h(IndexVue)
});
app.$mount('#app');