import axios from "axios";
import { message } from "element-ui";
import qs from "qs";
import merge from "lodash/merge";
import { winLocalStorage } from "@/utils/utils";

let baseUrl, productionTip;
if (process.env.NODE_ENV === "development") {
  const { SITE_CONFIG } = require("../../public/config/config.dev");
  baseUrl = SITE_CONFIG.baseUrl;
  productionTip = SITE_CONFIG.productionTip;
} else {
  baseUrl = window.SITE_OPTION.baseUrl;
  productionTip = window.SITE_OPTION.productionTip;
}
const index = axios.create({
  baseURL: baseUrl, // 配置线上地址
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

/**
 * 请求拦截
 */
index.interceptors.request.use(
  (config) => {
    console.log(productionTip);
    config.headers["Authorization"] = `Bearer ${winLocalStorage({ key: "token", type: "read" })}`; // 请求头带上token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
index.interceptors.response.use(
  (response) => {
    /* console.log("response",response)
													if (response.data && response.data.code === 401) { // 401, token失效
														clearLoginInfo()
														router.push({ name: 'login' })
													} */
    return response;
  },
  (error) => {
    if (error.response.status) {
      console.log("error", error, error.response.data.message);
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 401:
        case 403:
          window.location.reload();
          // 清除token
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // router.push({ name: "login" });
          break;

        // 404请求不存在
        case 404:
          message({
            message: "网络请求不存在",
            type: "error",
            duration: 1500,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log(error.response.data.message.details);
          message({
            message: error.response.data.message,
            type: "error",
            duration: 1500,
          });
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
index.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return baseUrl + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
index.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    t: new Date().getTime(),
  };
  return openDefultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
index.adornData = (data = {}, openDefultdata = true, contentType = "json") => {
  var defaults = {
    t: new Date().getTime(),
  };
  data = openDefultdata ? merge(defaults, data) : data;
  return contentType === "json" ? JSON.stringify(data) : qs.stringify(data);
};

export default index;
