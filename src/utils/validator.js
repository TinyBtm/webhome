/**
 * @description 验证邮箱格式
 * @param {String} email 邮箱号码
 * */
export function isEmail(email) {
  const regExp =
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  return regExp.test(email);
}

/**
 * @description 验证手机号码
 * @param {String} mobile 手机号
 * */
export function isMobile(mobile) {
  const regExp = /^[1][3-9][0-9]{9}$/;
  return regExp.test(mobile);
}

/**
 * @description 验证固话
 * @param {String} telephone 固话号码
 * */
export function isPhone(telephone) {
  const regExp = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  return regExp.test(telephone);
}
