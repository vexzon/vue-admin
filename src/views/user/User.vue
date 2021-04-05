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
      <table-data
        ref="userTable"
        :config="dataSet.configTable"
        :tableRow.sync="dataSet.tableRow"
      >
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
          ><el-button type="success">编辑</el-button>
          <el-button type="danger" @click="handerDel(slotData.data)"
            >删除</el-button
          >
        </template>
        <template v-slot:tableFooterLeft
          ><el-button @click="handerBatchDel()">批量删除</el-button>
        </template>
      </table-data>
    </div>
    <dialog-add :flag.sync="dataSet.dialog_add"></dialog-add>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { UserDel } from "@/api/user";

// 组件
import SearchSelect from "@/components/select/SearchSelect";
import TableData from "@/components/table/Table";
import DialogAdd from "./dialog/add";
import { global } from "@/utils/global";

export default {
  name: "User",
  components: {
    SearchSelect,
    TableData,
    DialogAdd
  },

  setup(props, { root, refs }) {
    const { confirm } = global();
    const dataSet = reactive({
      // table选择的数据
      tableRow: {},
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

    const handerBatchDel = () => {
      let userId = dataSet.tableRow.idItem;
      if (!userId || userId.length === 0) {
        root.$message({
          message: "请选择需要删除的内容",
          type: "error"
        });
        return false;
      }

      confirm({
        content: "确认删除当前信息",
        tip: "警告",
        fn: userDelete
      });
    };

    // 删除用户
    const userDelete = () => {
      UserDel({ id: dataSet.tableRow.idItem })
        .then(res => {
          console.log(res.data.data);
          refs.userTable.refreshData();
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 方法
     */
    const handerDel = params => {
      dataSet.tableRow.idItem = [params.id];
      confirm({
        content: "确认删除当前信息",
        tip: "警告",
        fn: userDelete
      });
    };

    return { dataSet, handerDel, handerBatchDel };
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
