<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="10">
        <search-select :config="dataSet.configOption"></search-select>
      </el-col>
      <el-col :span="1"><el-button type="danger">搜索</el-button></el-col>
      <el-col :span="9"><el-button class="hide"></el-button></el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">新增用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SearchSelect from "@/components/select/SearchSelect";
export default {
  name: "User",
  components: {
    SearchSelect
  },

  setup() {
    const dataSet = reactive({
      configOption: { init: ["name", "phone", "email"] }
    });
    return { dataSet };
  }
};
</script>
<style lang="scss" scoped>
.pull-right {
  float: right;
  width: 100px;
}

.hide {
  opacity: 0;
}
</style>
