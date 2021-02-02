<template>
  <div>
    <!-- 弹窗 -->

    <el-dialog
      title="新增"
      :visible.sync="dialogInfoFlag"
      @close="close"
      width="580px"
      @opened="openDialog"
    >
      <el-form :model="form">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              v-for="item in categoryOption.item"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.name"
            placeholder="请输入内容"
            style="height:150px"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from "@vue/composition-api";
import { AddInfo } from "@/api/news";
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
    }
  },
  setup(props, { emit }) {
    // 数据
    const dialogInfoFlag = ref(true);
    const formLabelWidth = ref("50px");
    const form = reactive({
      categoryId: "",
      title: "",
      imgUrl: "",
      createDate: "",
      status: "",
      content: ""
    });

    const categoryOption = reactive({
      item: []
    });
    // watch
    watchEffect(() => {
      dialogInfoFlag.value = props.flag;
    });

    // 方法
    const close = () => {
      dialogInfoFlag.value = false;
      emit("update:flag", false);
    };

    // 打开新增菜单的时候传入数据
    const openDialog = () => {
      categoryOption.item = props.category;
      console.log(props.category);
    };
    const submit = () => {
      let requsetData = {
        categoryId: form.region,
        title: "form.region",
        imgUrl: " 标题（string）",
        createDate: "日期（string）",
        status: "是否发布（string）（1：否，2：是）",
        content: "内容"
      };
      console.log(requsetData);
      AddInfo(requsetData);
    };
    return {
      dialogInfoFlag,
      formLabelWidth,
      form,
      categoryOption,

      close,
      openDialog,
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
