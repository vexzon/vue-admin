<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view></router-view></div>
    </div>
  </div>
</template>
<script>
import {} from "@vue/composition-api";
export default {
  name: "LayoutMain",
  setup() {
    // const str = ref('{"name":"前端","title":"aaaa"}');
    // // 字符串转对象
    // const json = reactive(JSON.parse(str.value));
    // console.log(str.value);
    // console.log(json);
    // console.log(json.name);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // width: 100vw;
  // position: fixed;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // left: $navMenu;
  // border: 30px solid #f7f7f7;
  // padding: 20px;
  // box-sizing: border-box;
}
.main-content {
  height: 100%;
  width: 100%;
  padding-top: 100px;
  padding-right: 20px;
  box-sizing: border-box;
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.open {
  .main-content {
    padding-left: $navMenu + 20;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMini + 30;
  }
}
</style>
