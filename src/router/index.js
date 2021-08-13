import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "@/store/index";

const originalReplace = VueRouter.prototype.replace;
const originalPush = VueRouter.prototype.push;
//修改原型对象中的replace方法
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
const INDEXPAGE = "homepage";
const router = new VueRouter({
  routes,
  mode: "history",
  base: "/",
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    console.log(to);
    switch (to.name) {
      case "case_electricity":
      case "case_iron":
      case "case_chemistry":
      case "case_fuel":
      case "case_material":
      case "case_paper":
      case "case_space":
      case "case_color":
      case "case_detail":
        store.commit("common/updateRoutPathName", "case");
        break;
      case "article":
      case "expert_detail":
        store.commit("common/updateRoutPathName", "expert");
        break;
      case "policy_detail":
        store.commit("common/updateRoutPathName", "policy");
        break;
      default:
        store.commit("common/updateRoutPathName", to.name);
    }
    if (to.name === "home") {
      next({ name: INDEXPAGE });
      document.title = "碳排放公共服务平台";
    } else {
      next();
      document.title = to.meta.title;
      if (to.name === INDEXPAGE) document.title = "碳排放公共服务平台";
    }
  } else {
    next({ name: INDEXPAGE });
    document.title = "碳排放公共服务平台";
  }
});
export default router;
