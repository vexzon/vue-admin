<template>
  <div id="login">
    <div class="login-wrap">
      <!-- 登录注册按钮 -->
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 登录验证 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="loginFromRuls"
        ref="ruleForm"
        class="demo-ruleForm login-form"
        size="small"
      >
        <el-form-item prop="email" class="item-from">
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="passwords"
          class="item-from"
          v-show="menuTab[1].current"
        >
          <label for="">重复密码</label>
          <el-input
            type="passwords"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14"
              ><el-input v-model="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="10">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-button
                type="primary"
                class="login-btn block"
                @click="submitForm('ruleForm')"
                >提交</el-button
              ></el-col
            >
            <el-col :span="12"
              ><el-button class="login-btn block" @click="resetForm('ruleForm')"
                >清空</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { isEmail, isPassword, isCode } from "@/utils/validate";
export default {
  name: "Login",
  components: {},
  setup(props, content) {
    // 放置data数据、生命周期、自定义函数
    // 登录 注册 名字
    const menuTab = reactive([
      { txt: "登录", current: true },
      { txt: "注册", current: false }
    ]);
    // 声明函数
    // 登录数据绑定对象
    const ruleForm = reactive({
      email: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 登录注册验证
    // 邮箱验证
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (isEmail(value)) {
        callback(new Error("邮箱输入或格式错误"));
      } else {
        callback();
      }
    };
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (isPassword(value)) {
        callback(new Error("密码为6到20位,至少有一个数字和一个字母"));
      } else {
        callback();
      }
    };
    //确认重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login，直接通过
      if (menuTab[0].current == true) {
        callback();
      }
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("密码输入不一致"));
      } else {
        callback();
      }
    };
    // 验证码验证
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (isCode(value)) {
        callback(new Error("请输入6位验证码"));
      } else {
        callback();
      }
    };
    // 表单验证
    const loginFromRuls = reactive({
      email: [{ validator: validateEmail, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    // 登录 注册切换
    const toggleMenu = data => {
      menuTab.forEach(e => {
        e.current = false;
      });
      data.current = true;
    };
    // 登录注册验证方法
    const submitForm = formName => {
      content.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    const resetForm = formName => {
      content.refs[formName].resetFields();
    };
    return {
      menuTab,
      toggleMenu,
      submitForm,
      resetForm,
      ruleForm,
      loginFromRuls
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-color: #344a5f;
}
.block {
  display: block;
  width: 100%;
}

/*登录注册 */
.login-wrap {
  width: 330px;
  margin: auto;

  .menu-tab {
    text-align: center;

    li {
      display: inline-block;
      width: 88px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      background-color: #555;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
.login-form {
  label {
    display: block;
    color: #fff;
    font-size: 14px;
  }
}
.item-from {
  margin-bottom: 15px;
}
</style>
