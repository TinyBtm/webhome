import { MessageBox } from "element-ui";

/**
 * @description 基于element-ui封装 强提示框
 * @param {String} message 提示信息
 * @param {Object} options 其他属性
 * @param {String} options.title 标题
 **/
export function alert(message, options) {
  const title = options.title || "系统提示";
  MessageBox.alert(message, title, {
    showClose: false, //隐藏关闭按钮
    closeOnClickModal: false, //取消遮罩层关闭
    ...options,
  });
}

/**
 * @description 基于element-ui封装 确认提示框
 * @param {String} message 提示信息
 * @param {Object} options 其他属性
 * @param {String} options.title 标题
 * @param {function} options.confirm 确认回调
 * @param {function} options.cancel 取消\关闭回调
 **/
export function confirm(message, options) {
  const title = options.title || "系统提示";
  MessageBox.confirm(message, title, {
    showClose: false, //隐藏关闭按钮
    closeOnClickModal: false, //取消遮罩层关闭
    callback: (action) => {
      switch (action) {
        case "confirm":
          options.confirm && options.confirm();
          break;
        case "cancel":
        case "close":
          options.cancel && options.cancel();
          break;
      }
    },
    ...options,
  });
}
