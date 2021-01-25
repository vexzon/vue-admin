<template>
  <div>
    <el-row type="flex" class="row-bg" :gutter="20">
      <el-col :span="3"
        ><div class="label-warp category grid-content bg-purple">
          <label for="">类型:</label>
          <div class="warp-content" style="width:100%">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div></div
      ></el-col>
      <el-col :span="8"
        ><div
          class="label-warp date grid-content bg-purple-light"
          style="width:100%"
        >
          <label for="">日期: </label>
          <div class="warp-content">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div></div
      ></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
