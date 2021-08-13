import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import router from "@/router/index";
import store from "@/store/index";
import axios from "@/axios"; // axios: https://github.com/axios/axios
import VueCookie from "vue-cookie"; // axios: https://github.com/alfhen/vue-cookie
import { authorizeToken } from "@/utils";
import "element-ui/lib/theme-chalk/index.css";
import "@/theme/default/index.css";
import "@/assets/css/common.less";
import "@/icon/iconfont.css"; // 字体图标库
const { SITE_CONFIG } = require("../public/config/config.dev");

window.SITE_CONFIG = SITE_CONFIG;
window.SITE_CONFIG["storeState"] = store.state;

Vue.config.productionTip = false;

//挂载全局组件
Vue.use(ElementUI);
Vue.use(VueCookie);

//挂在全局属性
Vue.prototype.$axios = axios;

//先行执行的方法
authorizeToken(function () {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
