import { winLocalStorage } from "@/utils/utils";

export default {
  namespaced: true,
  state: {
    // 当前所在的页面
    routPathName: "",
    //tabs导航
    breadcrumb: [],
    //内容区高度
    clientHeight: 0,
    //搜索关键字
    searchKey: "",
  },
  mutations: {
    updateRoutPathName(state, val) {
      state.routPathName = val;
      winLocalStorage({ key: "routPathName", value: val });
    },
    updateBreadcrumb(state, val) {
      state.breadcrumb = val;
      winLocalStorage({ key: "breadcrumb", value: val });
    },
    updateClientHeight(state, val) {
      state.clientHeight = val;
    },
    updateSearchKey(state, val) {
      state.searchKey = val;
    },
  },
};
