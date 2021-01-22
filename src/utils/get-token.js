import Cookies from "js-cookie";

const tokenKey = "tokenAdmin";
const userNameKey = "username";

// 获取token
export function getToKen() {
  return Cookies.get(tokenKey);
}

// 写入token
export function setToKen(toKen) {
  return Cookies.set(tokenKey, toKen);
}

// 删除token
export function removeToKen() {
  return Cookies.remove(tokenKey);
}

// 写入username
export function setUserName(value) {
  return Cookies.set(userNameKey, value);
}

// 获取username
export function getUserName() {
  return Cookies.get(userNameKey);
}

// 删除userName
export function removeUserName() {
  return Cookies.remove(userNameKey);
}
