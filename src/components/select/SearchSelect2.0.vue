<template>
  <div>
    <el-input placeholder="请输入搜索关键字" class="input-with-select">
      <el-select
        v-model="optionValue"
        slot="prepend"
        placeholder="请选择"
        class="select-category"
      >
        <el-option
          v-for="item in initOptionData"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "Select",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      optionValue: "",
      initOptionData: [],
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "年龄" },
        { value: "email", label: "身高体重啊啊啊" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    };
  },
  methods: {
    initOption() {
      let initData = this.config.init;
      let optionArr = [];
      // 数据校验
      if (initData.length === 0) {
        return false;
      }

      initData.forEach(item => {
        // 过滤，filter匹配成功后是一个数组，需要取下标第一个
        let arr = this.options.filter(elem => elem.value == item);
        if (item.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 数据校验
      if (optionArr.length === 0) {
        return false;
      }
      // 初始化赋值
      this.initOptionData = optionArr;
      // 初始化搜索类型
      this.optionValue = optionArr[0].value;
    }
  },
  watch: {
    config: {
      handler() {
        this.initOption();
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
.select-category {
  width: 100px;
}
</style>
