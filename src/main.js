import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/router-guard";

// 自定义全局方法
// import Global from "./utils/global";

Vue.use(VueCompositionAPI);
Vue.use(ElementUI);
// Vue.use(Global);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
