<template>
  <div>
    <el-table
      :data="dataSet.tableData"
      border
      style="width:100%"
      :cell-style="{ 'text-align': 'center' }"
    >
      <!-- 多选框 -->
      <el-table-column
        v-if="dataSet.tableConfig.selection"
        type="selection"
      ></el-table-column>
      <!-- 文本数据渲染 -->
      <template v-for="item in dataSet.tableConfig.tHead">
        <!-- v-slot -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope"
            ><slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- 文本渲染 -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="dataSet.tableConfig.pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      background
    >
    </el-pagination>
  </div>
</template>
<script>
import { onBeforeMount, reactive, watch } from "@vue/composition-api";
import { loadData } from "./tableLoadData";
import { pagination } from "./paginationHook";
export default {
  name: "Table",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    // 加载数据
    const { tableData, tableLoadData } = loadData({ root });
    // 页码
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange,
      totalCount
    } = pagination();
    const dataSet = reactive({
      tableConfig: {
        selection: true,
        recordCheckbox: false,
        requestData: {},
        tHead: [],
        pagination: true
      },
      tableData: []
    });
    /*
     * 方法
     */
    // watch
    // 数据渲染
    watch(
      [() => tableData.item, () => tableData.total],
      ([tableData, total]) => {
        dataSet.tableData = tableData;
        totalCount(total);
      }
    );
    // 页码监听
    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([currentPage, pageSize]) => {
        let resquestData = dataSet.tableConfig.requestData;
        if (resquestData.data) {
          // 更新值
          resquestData.data.pageNumber = currentPage;
          resquestData.data.pageSize = pageSize;
          tableLoadData(dataSet.tableConfig.requestData);
        }
      }
    );

    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(dataSet.tableConfig);
      for (let key in configData) {
        // includes 检测数组内是否包含对应的数据
        if (keys.includes(key)) {
          dataSet.tableConfig[key] = configData[key];
        }
      }
    };
    onBeforeMount(() => {
      initTableConfig();
      tableLoadData(dataSet.tableConfig.requestData);
    });

    return {
      dataSet,
      // 方法
      initTableConfig,
      pageData,
      handleSizeChange,
      handleCurrentChange,
      totalCount
    };
  }
};
</script>
<style lang="scss" scoped></style>
<!-- 




-->
