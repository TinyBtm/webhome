import authorize from "@/axios/authorize";
import { winLocalStorage } from "@/utils/utils";

let timer2GetToken = 0;

/**
 * 获取uuid
 */
export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
  });
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem("permissions") || "[]").indexOf(key) !== -1 || false;
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = "id", pid = "parentId") {
  var res = [];
  var temp = {};
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i];
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]["children"]) {
        temp[data[k][pid]]["children"] = [];
      }
      if (!temp[data[k][pid]]["_level"]) {
        temp[data[k][pid]]["_level"] = 1;
      }
      data[k]["_level"] = temp[data[k][pid]]._level + 1;
      temp[data[k][pid]]["children"].push(data[k]);
    } else {
      res.push(data[k]);
    }
  }
  return res;
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  // Vue.cookie.delete("token");
  // store.commit("resetStore");
  // router.options.isAddDynamicMenuRoutes = false;
}

/**
 * 获取授权
 * */
export function authorizeToken(callback) {
  let formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append("scope", "carboncloud");
  formData.append("client_id", "homeclient");
  formData.append("client_secret", "123456");
  authorize({
    url: "/oauth/token",
    method: "post",
    data: formData,
  })
    .then(({ data }) => {
      winLocalStorage({ key: "token", value: data.access_token });
      callback && callback();
      if (timer2GetToken) {
        clearTimeout(timer2GetToken);
        timer2GetToken = 0;
      }
    })
    .catch(() => {
      timer2GetToken = setTimeout(authorizeToken, 500);
    });
}
