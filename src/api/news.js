import service from "@/utils/request";
// 列表
// 新增
// 编辑
// 删除

// 一级分类添加

export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}

// 获取分类
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}

// 获取所有分类(包含子集)
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  });
}

// 删除分类
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}

// 修改分类
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}

// 添加信息
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}

// 添加子集信息
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  });
}
// 获取信息

export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}

// 编辑信息
export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}

// 删除信息
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}
