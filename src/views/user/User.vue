<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="10">
        <search-select :config="dataSet.configOption"></search-select>
      </el-col>
      <el-col :span="1"><el-button type="danger">搜索</el-button></el-col>
      <el-col :span="9"><el-button class="hide"></el-button></el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">新增用户</el-button>
      </el-col>
    </el-row>
    <div class="table-data">
      <table-data :config="dataSet.configTable">
        <template>adasfa </template>
      </table-data>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SearchSelect from "@/components/select/SearchSelect";
import TableData from "@/components/table/Table";
export default {
  name: "User",
  components: {
    SearchSelect,
    TableData
  },

  setup() {
    const dataSet = reactive({
      configOption: { init: ["name", "phone", "email"] },
      // table 组件配置
      configTable: {
        // 多选框
        selection: false,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "用户名", field: "email", width: "150" },
          { label: "真实姓名", field: "name", width: "120" },
          { label: "手机号", field: "phone", width: "150" },
          { label: "地区", field: "address" },
          { label: "角色", field: "role", width: "120" },
          {
            label: "禁启用状态",
            field: "status",
            width: "120",
            columnType: "slot"
          }
        ]
      }
    });
    return { dataSet };
  }
};
</script>
<style lang="scss" scoped>
.pull-right {
  float: right;
  width: 100px;
}

.hide {
  opacity: 0;
}
.table-data {
  margin-top: 30px;
  text-align: center;
}
</style>
