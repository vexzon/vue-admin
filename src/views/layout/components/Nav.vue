<template>
  <div id="nav-wrap">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <div class="icon-login"><img src="../../../assets/logo.png" alt="" /></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
    /*
    data数据
    */
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);

    /*
    函数
    */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleClose,
      handleOpen,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #334a5f;
}

// 修改菜单样式
.el-submenu {
  .is-active {
    background-color: rgba(245, 108, 108, 0.7) !important;
  }
}

.icon-login {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    width: 100px;
  }
}
</style>
