import { reactive } from "@vue/composition-api";
import { GetCategory } from "@/api/news";

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
  return {
    getInfoCategory,
    categoryItem
  };
}
