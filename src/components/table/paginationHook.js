import { reactive } from "@vue/composition-api";
export function pagination() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    pageSizes: [2, 5, 10, 20]
  });
  // 统计数据总和
  const totalCount = val => {
    pageData.total = val;
  };
  const handleSizeChange = val => {
    pageData.pageSize = val;
  };
  const handleCurrentChange = val => {
    pageData.currentPage = val;
  };
  return {
    pageData,
    totalCount,
    handleSizeChange,
    handleCurrentChange
  };
}
