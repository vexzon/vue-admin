import { reactive } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export function loadData() {
  const tableData = reactive({
    item: [],
    total: 0
  });
  const tableLoadData = params => {
    let requsetJson = params;
    let requestData = {
      url: requestUrl[requsetJson.url],
      method: requsetJson.method,
      data: requsetJson.data
    };
    loadTableData(requestData)
      .then(res => {
        let resData = res.data.data.data;
        if (resData && resData.length > 0) {
          tableData.item = resData;
          tableData.total = res.data.data.total;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    tableData,
    tableLoadData
  };
}
