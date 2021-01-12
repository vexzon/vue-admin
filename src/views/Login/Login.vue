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
        :rules="rules"
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
        <el-form-item prop="pass" class="item-from">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
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
export default {
  name: "Login",
  data() {
    // 登录注册验证
    // 邮箱验证
    var validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名输入错误"));
      } else {
        callback();
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6到20位数字、字母"));
      } else {
        callback();
      }
    };
    // 验证码验证
    var validateCode = (rule, value, callback) => {
      let reg = (reg = /^[a-z0-9]{6}$/);
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6位验证码"));
      } else {
        callback();
      }
    };
    return {
      // 登录 注册 名字
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      // 登录注册验证
      ruleForm: {
        email: "",
        pass: "",
        code: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登录 注册切换
    toggleMenu(data) {
      console.log(data);
      this.menuTab.forEach(e => {
        console.log(e);
        e.current = false;
      });
      data.current = true;
    },
    // 登录注册验证方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
