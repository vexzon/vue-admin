<template>
  <div>
    <el-row :gutter="5">
      <div class="overflow-h">
        <el-col :span="6">
          <el-select></el-select>
        </el-col>
        <el-col :span="6">
          <el-select></el-select>
        </el-col>
        <el-col :span="6">
          <el-select></el-select>
        </el-col>
        <el-col :span="6">
          <el-select></el-select>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.overflow-h {
  overflow: hidden;
}
</style>
