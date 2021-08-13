/**
 * @description local storage操作
 * @param {{value, key: string}} option 参数
 * @param {String} option.key 需要存储的数据名
 * @param {*} option.value 需要存储的数据
 * @param {String} option.type 操作类型 默认存值，读取需填read
 */
export const winLocalStorage = function (option) {
  const name = option.key,
    bIsRead = option.type && option.type === "read";
  let result;
  if (bIsRead) {
    //读
    result = localStorage.getItem(name);
    if (/^{.*}$/.test(result) || /^[.*]$/.test(result)) {
      //对象或者数组
      return JSON.parse(result);
    } else {
      return result;
    }
  } else {
    const value = option.value;
    //存
    switch (Object.prototype.toString.call(value)) {
      case "[object Object]": //对象
      case "[object Array]": //数组
        result = JSON.stringify(value);
        break;
      default:
        result = value;
    }
    localStorage.setItem(name, result);
  }
};

/**
 * @description 切割数组
 * @param {Array} array 原数组
 * @param {Number} count 原数组
 * */
export const cutArray = function (array, count) {
  let arr = [];
  let len = array.length;
  for (let i = 0; i < len; i += count) {
    arr.push(array.slice(i, i + count));
  }
  return arr;
};
