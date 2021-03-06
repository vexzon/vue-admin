import { reactive } from "@vue/composition-api";
import { GetCategory, GetCategoryAll } from "@/api/news";
import service from "@/utils/request";

export function common() {
  // 声明变量，存储数据
  const categoryItem = reactive({
    item: []
  });

  // 获取分类
  const getInfoCategory = () => {
    GetCategory({})
      .then(res => {
        let resData = res.data;
        // 赋值
        categoryItem.item = resData.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 获取全部分类
  const getInfoCategoryAll = () => {
    GetCategoryAll({})
      .then(res => {
        let resData = res.data;
        // 赋值
        console.log(resData);
        console.log(resData.data);
        categoryItem.item = resData.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    getInfoCategory,
    getInfoCategoryAll,
    categoryItem
  };
}

// 请求表格数据
export function loadTableData(params) {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {}
  });
}

/**
 * 获取省市区街
 */

export function GetCityPicker(data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data
  });
}
