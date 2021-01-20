<template>
  <div id="layout">
    <layout-header></layout-header>
    <layout-main></layout-main>
    <layout-nav></layout-nav>
  </div>
</template>
<script>
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import LayoutNav from "./components/Nav";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup() {}
};
</script>
<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>
