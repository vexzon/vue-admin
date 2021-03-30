<template>
  <div id="header-wrap">
    <div class="icon-style" @click="navMenuState">
      <i class="el-icon-menu"></i>
    </div>
    <div class="user-style">
      <div class="user-info">
        <img src="../../../assets/icon-user.jpg" alt="" />
        <span>{{ username }}</span>
      </div>
      <div class="header-icon" @click="exit"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "LayoutHeader",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    const navMenuState = () => {
      root.$store.commit("app/setCollapse");
    };

    // 退出
    const exit = () => {
      root.$store.dispatch("app/exit").then(() => {
        root.$router.push({
          name: "Login"
        });
      });
    };
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  @include webkit(transition, all 0.3s ease 0s);
  z-index: 9;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMini;
  }
}
.icon-style {
  font-size: 36px;
  line-height: 75px;
  border-right: 1px solid #999999;
  cursor: pointer;
  i {
    height: 75px;
    width: 75px;
    text-align: center;
  }
}
.user-style {
  display: flex;
  line-height: 75px;
  .user-info {
    display: flex;
    span {
      padding-right: 30px;
      line-height: 75px;
      border-right: 1px solid #999999;
    }

    img {
      width: 75px;
      height: 75px;
      text-align: center;
      margin-right: 10px;
      border-radius: 50%;
      border: 12px solid #fff;
      box-sizing: border-box;
    }
  }
  .header-icon {
    font-size: 36px;
    cursor: pointer;
    i {
      height: 75px;
      width: 75px;
      text-align: center;
    }
  }
}
</style>
