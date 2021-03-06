import service from "@/utils/request";
/**
 * 列表
 */
export function GetRole(data) {
  return service.request({
    method: "post",
    url: "/role/",
    data
  });
}

// 添加用户
export function UserAdd(data) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data
  });
}

// 删除用户
export function UserDel(data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data
  });
}
