<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">adagfasd</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
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
  padding-left: $navMenu + 20;
  padding-right: 20px;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
