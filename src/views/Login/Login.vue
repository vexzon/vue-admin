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
        ref="loginForm"
        class="demo-ruleForm login-form"
        size="small"
      >
        <el-form-item prop="email" class="item-from">
          <label for="userName">邮箱</label>
          <el-input
            id="userName"
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
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
          <label for="passwords">重复密码</label>
          <el-input
            id="passwords"
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="14"
              ><el-input id="code" v-model="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="10">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                >{{ codeButtonStatus.text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12"
              ><el-button
                type="primary"
                class="login-btn block"
                @click="submitForm('loginForm')"
                >{{ menuTab[0].current === true ? "登录" : "注册" }}</el-button
              ></el-col
            >
            <el-col :span="12"
              ><el-button
                class="login-btn block"
                @click="resetForm('loginForm')"
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
import { GetSms, Register, Login } from "@/api/login";
import { onMounted, reactive, ref } from "@vue/composition-api";
import { isEmail, isPassword, isCode } from "@/utils/validate";
import sha1 from "js-sha1";
export default {
  name: "Login",

  setup(props, { refs, root }) {
    // 放置data数据、生命周期、自定义函数
    onMounted(() => {});
    // 登录 注册 名字
    const menuTab = reactive([
      { txt: "登录", current: true },
      { txt: "注册", current: false }
    ]);
    // 模块值
    // 声明函数
    // 验证码禁用
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    // 登录数据绑定对象
    const ruleForm = reactive({
      email: "",
      password: "",
      passwords: "",
      code: ""
    });
    // 倒计时
    const timer = ref(null);
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
    // 声明函数

    // 切换模块

    // 登录 注册切换
    const toggleMenu = data => {
      menuTab.forEach(e => {
        clearCountDown();
        e.current = false;
      });
      data.current = true;
      // 重置表单
      resetFormData();
    };

    // 清除表单数据
    const resetFormData = () => {
      refs.loginForm.resetFields();
    };

    // 更新按钮状态
    const updataButtonStatus = params => {
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    };

    // 获取验证码
    const getSms = () => {
      // 提示
      if (ruleForm.email == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      if (isEmail(ruleForm.email)) {
        root.$message.error("邮箱有误，请重新输入");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: ruleForm.email,
        module: menuTab[0].current === true ? "login" : "register"
      };
      updataButtonStatus({
        status: true,
        text: "发送中"
      });

      // 请求延长时间
      setTimeout(() => {
        // 请求接口
        GetSms(requestData)
          .then(res => {
            let data = res.data;
            root.$alert(data.message, "验证码");
            // 调定时器，倒计时
            countDown(30);
          })
          .catch(err => {
            root.$alert("获取失败");
            updataButtonStatus({
              status: false,
              text: "获取验证码"
            });
            console.log(err);
          });
      }, 2000);
    };

    // 提交表单
    // 登录注册验证方法
    const submitForm = formName => {
      // 注册
      refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          menuTab[0].current === true ? login() : register();
        } else {
          return false;
        }
      });
    };
    // 登录
    const login = () => {
      let requsetData = {
        username: ruleForm.email,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      Login(requsetData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 注册
    const register = () => {
      let requsetData = {
        username: ruleForm.email,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      Register(requsetData)
        .then(res => {
          let data = res.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          // 模拟注册成功
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(err => {
          // 失败执行的代码
          console.log(err);
        });
    };
    // 倒计时
    const countDown = number => {
      // 判断定时器是否存在，存在则清除
      if (timer.value) {
        clearInterval(timer.value);
      }

      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updataButtonStatus({
            status: false,
            text: "获取验证码"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    // 清除倒计时
    const clearCountDown = () => {
      // 还原验证码按钮状态
      updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      // 清除倒计时
      clearInterval(timer.value);
      // const codeButtonStatus = reactive({
      //   status: false,
      //   text: "获取验证码"
      // });
    };
    const resetForm = formName => {
      refs[formName].resetFields();
    };

    return {
      menuTab,
      toggleMenu,
      submitForm,
      resetForm,
      ruleForm,
      loginFromRuls,
      getSms,
      codeButtonStatus,
      clearCountDown
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

/*登录注册 */
.login-wrap {
  width: 330px;
  margin: auto;

  .menu-tab {
    text-align: center;
    margin: 0;
    padding-top: 100%;
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
.block {
  display: block;
  width: 100%;
}
</style>
