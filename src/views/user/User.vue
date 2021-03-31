<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="10">
        <search-select :config="dataSet.configOption"></search-select>
      </el-col>
      <el-col :span="1"><el-button type="danger">搜索</el-button></el-col>
      <el-col :span="9"><el-button class="hide"></el-button></el-col>
      <el-col :span="4">
        <el-button
          type="danger"
          class="pull-right"
          @click="dataSet.dialog_add = true"
          >新增用户</el-button
        >
      </el-col>
    </el-row>
    <div class="table-data">
      <table-data :config="dataSet.configTable">
        <template v-slot:status="slotData"
          ><el-switch
            v-model="slotData.data.status"
            active-value="2"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949" 
          >
          </el-switch>
        </template>
        <template v-slot:operation="slotData"
          ><el-button type="success" @click="operation(slotData.data)"
            >编辑</el-button
          >
          <el-button type="danger" @click="operation(slotData.data)"
            >删除</el-button
          >
        </template>
        <template v-slot:tableFooterLeft
          ><el-button>批量删除</el-button>
        </template>
      </table-data>
    </div>
    <dialog-add :flag.sync="dataSet.dialog_add"></dialog-add>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SearchSelect from "@/components/select/SearchSelect";
import TableData from "@/components/table/Table";
import DialogAdd from "./dialog/add";
export default {
  name: "User",
  components: {
    SearchSelect,
    TableData,
    DialogAdd
  },

  setup() {
    const dataSet = reactive({
      dialog_add: false,
      configOption: { init: ["name", "phone", "email"] },
      // table 组件配置
      configTable: {
        // 多选框
        selection: true,
        // 翻页记录
        recordCheckbox: true,
        // 表头
        tHead: [
          { label: "用户名", field: "username", width: "150" },
          { label: "真实姓名", field: "truename", width: "120" },
          { label: "手机号", field: "phone", width: "150" },
          { label: "地区", field: "region", width: "200" },
          { label: "角色", field: "role", width: "120" },
          {
            label: "禁启用状态",
            field: "status",
            width: "120",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            width: "200",
            columnType: "slot",
            slotName: "operation"
          }
        ],

        // 请求接口
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        },
        pagination: true
      }
    });

    /**
     * 方法
     */
    const operation = params => {
      console.log(params);
    };
    return { dataSet, operation };
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
