/**
 * 生产环境
 */
let SITE_OPTION = {
  // api接口请求地址  生产环境 TODO
  authUrl: "http://office.wxhandle.com:9002/", //测试服务  授权
  baseUrl: "http://office.wxhandle.com:9001/home", //测试服务  普通请求
  imgUrl: "http://office.wxhandle.com:9001", //图片地址
  // cdn地址 = 域名 + 版本号
  domain: "/",
  version: "",
  productionTip: true
};
window.SITE_OPTION = {
  ...SITE_OPTION,
  cdnUrl: SITE_OPTION.domain + SITE_OPTION.version,
  documentTitle: "碳排放公共服务平台"
};
