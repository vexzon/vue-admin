<template>
  <el-table :data="dataSet.tableData" border style="width:100%">
    <!-- 多选框 -->
    <el-table-column
      v-if="dataSet.tableConfig.selection"
      type="selection"
    ></el-table-column>
    <!-- 文本数据渲染 -->
    <el-table-column
      v-for="item in dataSet.tableConfig.tHead"
      :key="item.field"
      :prop="item.field"
      :label="item.label"
      :width="item.width"
    ></el-table-column>
  </el-table>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
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
        tHead: []
      },
      tableData: [
        {
          email: "asd",
          name: "王小虎",
          phone: 11,
          address: "ada",
          role: "上海萨达"
        },
        {
          email: "asd",
          name: "王小虎",
          phone: 111,
          address: "ada",
          role: "上海萨达"
        }
      ]
    });
    /*
     * 方法
     */
    const initTableConfig = () => {
      let configData = props.config;
      for (let key in configData) {
        if (dataSet.tableConfig[key]) {
          dataSet.tableConfig[key] = configData[key];
        }
      }
    };
    onBeforeMount(() => {
      initTableConfig();
    });

    return {
      dataSet,
      // 方法
      initTableConfig
    };
  }
};
</script>
<style lang="scss" scoped></style>
