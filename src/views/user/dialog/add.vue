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
          prop="username"
        >
          <el-input
            v-model="dataSet.form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名:"
          :label-width="dataSet.formLabelWidth"
          prop="truename"
        >
          <el-input
            v-model="dataSet.form.truename"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码:"
          :label-width="dataSet.formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="dataSet.form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号:"
          :label-width="dataSet.formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model.number="dataSet.form.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地区:"
          :label-width="dataSet.formLabelWidth"
          prop="region"
        >
          <city-picker
            :cityPickerLevel="['province', 'city', 'area', 'street']"
            :cityPickerData.sync="dataSet.cityPickerData"
          ></city-picker>
        </el-form-item>
        <el-form-item
          label="禁启用:"
          :label-width="dataSet.formLabelWidth"
          prop="status"
        >
          <el-radio v-model="dataSet.form.status" label="1">禁用</el-radio>
          <el-radio v-model="dataSet.form.status" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item
          label="角色:"
          :label-width="dataSet.formLabelWidth"
          prop="role"
        >
          <el-checkbox-group v-model="dataSet.form.role">
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
import { reactive, watch } from "@vue/composition-api";

import { GetRole, UserAdd } from "@/api/user";
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
  setup(props, { emit, root }) {
    // 数据
    const dataSet = reactive({
      dialogInfoFlag: true, //弹窗标记
      cityPickerData: {}, //城市数据
      formLabelWidth: "80px",
      submitLoading: false, // 按钮加载状态，避免连点
      // form表单
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "1",
        role: []
      },
      //角色选项
      roleItem: []
    });

    // 监听

    watch(() => (dataSet.dialogInfoFlag = props.flag));
    // 方法

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

    const close = () => {
      dataSet.dialogInfoFlag = false;
      emit("update:flag", false);
    };

    /**
     *
     */
    const submit = () => {
      if (!dataSet.form.username) {
        root.$message({
          message: "用户名不能为空",
          type: "error"
        });
        return false;
      }
      if (!dataSet.form.password) {
        root.$message({
          message: "密码不能为空",
          type: "error"
        });
        return false;
      }
      if (dataSet.form.role.length === 0) {
        root.$message({
          message: "请选择角色",
          type: "error"
        });
        return false;
      }
      let requsetData = dataSet.form;
      console.log(requsetData);

      // 添加用户
      UserAdd()
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 打开窗口动画结束时执行
    const openDialog = () => {
      getRole();
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
