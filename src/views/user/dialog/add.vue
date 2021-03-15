<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog
      title="新增"
      :visible.sync="dataSet.dialogInfoFlag"
      @close="close"
      width="580px"
      @opened="openDialog"
    >
      <el-form :model="dataSet.form" ref="addInfoForm">
        <el-form-item
          label="用户名:"
          :label-width="dataSet.formLabelWidth"
          prop="category"
        >
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item
          label="姓名:"
          :label-width="dataSet.formLabelWidth"
          prop="title"
        >
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          label="手机号:"
          :label-width="dataSet.formLabelWidth"
          prop="content"
        >
          <el-input></el-input>
        </el-form-item>
        <el-form-item
          label="地区:"
          :label-width="dataSet.formLabelWidth"
          prop="content"
        >
          <city-picker
            :cityPickerLevel="['province', 'city', 'area', 'street']"
            :cityPickerData.sync="dataSet.cityPickerData"
          ></city-picker>
        </el-form-item>
        <el-form-item
          label="禁启用:"
          :label-width="dataSet.formLabelWidth"
          prop="content"
        >
          <el-radio v-model="dataSet.roleStatus" label="1">禁用</el-radio>
          <el-radio v-model="dataSet.roleStatus" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item
          label="角色:"
          :label-width="dataSet.formLabelWidth"
          prop="content"
        >
          <el-checkbox-group v-model="dataSet.roleCode">
            <el-checkbox
              v-for="item in dataSet.roleItem"
              :key="item.role"
              :label="item.role"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
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
import { AddInfo } from "@/api/news";
import { GetRole } from "@/api/user";
// 组件
import CityPicker from "@/components/city-picker/index";
export default {
  name: "InfoDialog",
  components: { CityPicker },
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
  setup(props, { emit, root, refs }) {
    // 数据
    const dataSet = reactive({
      dialogInfoFlag: true, //弹窗标记
      cityPickerData: {}, //城市数据
      formLabelWidth: "80px",
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
      // 是否启用状态
      roleStatus: "1",
      //角色
      roleCode: [],
      //角色选项
      roleItem: [],
      categoryOption: [] // 分类下拉数据
    });
    /**
     * 请求角色
     */
    const getRole = () => {
      GetRole()
        .then(res => {
          dataSet.roleItem = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    // watch
    watchEffect(() => {
      dataSet.dialogInfoFlag = props.flag;
    });

    // 方法
    const close = () => {
      dataSet.dialogInfoFlag = false;
      emit("update:flag", false);
    };

    // 打开窗口动画结束时执行
    const openDialog = () => {
      getRole();
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
          root.$message({
            message: resData.message,
            type: "success"
          });
          dataSet.submitLoading = false;
          // 重置表单
          refs.addInfoForm.resetFields();
          // 刷新列表
          emit("addGetListEmit");
          close();
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
