import cookie from "cookie_js";

export function getToKen() {
  return cookie.get("admin_toKen");
}
