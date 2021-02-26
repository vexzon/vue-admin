<template>
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
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export default {
  name: "Table",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dataSet = reactive({
      tableConfig: {
        selection: true,
        recordCheckbox: false,
        requestData: {},
        tHead: []
      },
      tableData: []
    });
    /*
     * 方法
     */
    let loadData = () => {
      let requsetJson = dataSet.tableConfig.requestData;
      let requestData = {
        url: requestUrl[requsetJson.url],
        method: requsetJson.method,
        data: requsetJson.data
      };
      loadTableData(requestData)
        .then(res => {
          let resData = res.data.data.data;
          if (resData && resData.length > 0) {
            dataSet.tableData = resData;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
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
      loadData();
    });

    return {
      dataSet,
      // 方法
      loadData,
      initTableConfig
    };
  }
};
</script>
<style lang="scss" scoped></style>
<!-- 




-->
