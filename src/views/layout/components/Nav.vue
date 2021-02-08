<template>
  <div id="nav-wrap">
    <div class="icon-login"><img src="../../../assets/logo.png" alt="" /></div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
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
            <i class="icon-size" :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子菜单 -->
          <template v-for="subItem in item.children">
            <el-menu-item
              :key="subItem.id"
              :index="subItem.path"
              v-if="!subItem.hidden"
              >{{ subItem.meta.name }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, computed } from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
    /*
    data数据
    */
    const routers = reactive(root.$router.options.routes);

    // computed监听
    const isCollapse = computed(() => root.$store.state.app.isCollapse);

    /*
    函数
    */

    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #334a5f;
  @include webkit(transition, all 0.3s ease 0s);
}

.icon-login {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    width: 100px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.icon-size {
  font-size: 20px;
  padding-right: 10px;
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMini;
    .icon-login {
      img {
        width: 70%;
      }
    }
  }
}
</style>
