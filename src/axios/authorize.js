import axios from "axios";
import { message } from "element-ui";

const { SITE_CONFIG } = require("../../public/config/config.dev");
const authUrl = SITE_CONFIG.authUrl;

const authorize = axios.create({
  baseURL: authUrl, // url = base url + request url
  timeout: 1000 * 30,
  /* withCredentials: true,
   headers: {
     'Content-Type': 'application/json; charset=utf-8'
   } */
});

/**
 * 请求拦截
 */
authorize.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
authorize.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          message({
            message: "密码错误",
            type: "error",
            duration: 1500,
          });
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          message({
            message: "无该账号",
            type: "error",
            duration: 1500,
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          message({
            message: "无权限访问",
            type: "error",
            duration: 1500,
          });
          // 清除token
          // clearLoginInfo();
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

export default authorize;
