<template>
  <div>
    <el-input placeholder="请输入搜索关键字" class="input-with-select">
      <el-select
        v-model="dataSet.optionValue"
        slot="prepend"
        placeholder="请选择"
        class="select-category"
      >
        <el-option
          v-for="item in dataSet.initOption"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-input>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
export default {
  name: "Select",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dataSet = reactive({
      optionValue: "",
      initOption: [],
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "年龄" },
        { value: "email", label: "身高体重啊啊啊" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    /*
     * 初始化下拉选择
     */

    const initOption = () => {
      let initData = props.config.init;
      let optionArr = [];
      // 数据校验
      if (initData.length === 0) {
        return false;
      }

      initData.forEach(item => {
        // 过滤，filter匹配成功后是一个数组，需要取下标第一个
        let arr = dataSet.options.filter(elem => elem.value == item);
        if (item.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 数据校验
      if (optionArr.length === 0) {
        return false;
      }
      // 初始化赋值
      dataSet.initOption = optionArr;
      // 初始化搜索类型
      dataSet.optionValue = optionArr[0].value;
    };
    onMounted(() => {
      initOption();
    });
    return { dataSet };
  }
};
</script>
<style scoped>
.select-category {
  width: 100px;
}
</style>
