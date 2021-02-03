<template>
  <div>
    <!-- 弹窗 -->

    <el-dialog
      title="编辑"
      :visible.sync="dataSet.dialogInfoFlag"
      @close="close"
      width="580px"
      @opened="openDialog"
    >
      <el-form :model="dataSet.form" ref="addInfoForm">
        <el-form-item label="类别" :label-width="dataSet.formLabelWidth">
          <el-select
            v-model="dataSet.form.categoryId"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in dataSet.categoryOption"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="标题"
          :label-width="dataSet.formLabelWidth"
          prop="title"
        >
          <el-input
            v-model="dataSet.form.title"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="概况"
          :label-width="dataSet.formLabelWidth"
          prop="content"
        >
          <el-input
            type="textarea"
            v-model="dataSet.form.content"
            placeholder="请输入内容"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          :loading="dataSet.submitLoading"
          @click="submit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watchEffect } from "@vue/composition-api";
import { AddInfo, GetList } from "@/api/news";

export default {
  name: "InfoDialog",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, root, refs }) {
    // 数据
    const dataSet = reactive({
      dialogInfoFlag: true, //弹窗标记
      formLabelWidth: "50px",
      submitLoading: false, // 按钮加载状态，避免连点
      // form表单
      form: {
        categoryId: "",
        title: "",
        imgUrl: "",
        createDate: "",
        status: "",
        content: ""
      },
      categoryOption: [] // 分类下拉数据
    });

    // watch
    watchEffect(() => {
      dataSet.dialogInfoFlag = props.flag;
    });

    // 方法
    const close = () => {
      dataSet.dialogInfoFlag = false;
      emit("update:flag", false);
    };

    // 打开新增菜单的时候传入数据
    const openDialog = () => {
      dataSet.categoryOption = props.category;
      getInfo();
    };
    // 获取列表数据
    const getInfo = () => {
      let requsetData = {
        pageNumber: 1,
        pageSize: 1,
        id: props.id
      };
      GetList(requsetData).then(res => {
        let resData = res.data.data.data[0];
        console.log(resData);
        dataSet.form = {
          categoryId: resData.categoryId,
          title: resData.title,
          content: resData.content
        };
      });
    };
    const submit = () => {
      let requsetData = {
        categoryId: dataSet.form.categoryId,
        title: dataSet.form.title,
        content: dataSet.form.content
      };
      // 在本地判断是否选了类型
      if (!dataSet.form.categoryId) {
        root.$message({
          message: "分类不能为空",
          type: "warning"
        });
        return false;
      }
      dataSet.submitLoading = true;
      AddInfo(requsetData)
        .then(res => {
          let resData = res.data;
          console.log(resData);
          root.$message({
            message: resData.message,
            type: "success"
          });
          dataSet.submitLoading = false;
          // 重置表单
          refs.addInfoForm.resetFields();
        })
        .catch(err => {
          console.log(err);
          dataSet.submitLoading = false;
        });
    };
    return {
      dataSet,

      close,
      openDialog,
      getInfo,
      submit
    };
  }
};
</script>
<style lang="scss" scoped>
.el-dialog__body {
  padding-right: 30px !important;
}
.dialog-footer {
  text-align: center;
}
.el-button {
  width: 200px;
}
</style>
