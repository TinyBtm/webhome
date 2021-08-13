/**
 * 开发环境
 */
let SITE_CONFIG = {
  // api接口请求地址  开发环境  TODO
  authUrl: "http://192.168.10.10:9002/", //测试服务  授权
  baseUrl: "http://192.168.10.10:9001/home", //测试服务  普通请求
  imgUrl: "http://192.168.10.10:9001", //图片地址
  // cdn地址 = 域名 + 版本号
  domain: "/",
  version: "",
  productionTip: false
};
module.exports = {
  SITE_CONFIG: {
    ...SITE_CONFIG,
    cdnUrl: SITE_CONFIG.domain + SITE_CONFIG.version,
    documentTitle: "碳排放公共服务平台"
  }
};
