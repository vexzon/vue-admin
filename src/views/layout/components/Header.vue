<template>
  <div id="header-wrap">
    <div class="icon-style"><i class="el-icon-menu"></i></div>
    <div class="user-style">
      <div class="user-info">
        <img src="../../../assets/icon-user.jpg" alt="" />
        <span>管理员</span>
      </div>
      <div class="header-icon"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
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
