<template>
  <div>
    <el-row :gutter="5">
      <div class="overflow-h">
        <el-col :span="6" v-if="init.province">
          <el-select v-model="dataSet.provinceValue" @change="handlerProvince">
            <el-option
              v-for="item in dataSet.provinceData"
              :key="item.PROVINCE_CODE"
              :value="item.PROVINCE_CODE"
              :label="item.PROVINCE_NAME"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.city">
          <el-select v-model="dataSet.cityValue" @change="handlerCity">
            <el-option
              v-for="item in dataSet.cityData"
              :key="item.CITY_CODE"
              :value="item.CITY_CODE"
              :label="item.CITY_NAME"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.area">
          <el-select v-model="dataSet.areaValue" @change="handlerArea">
            <el-option
              v-for="item in dataSet.areaData"
              :key="item.AREA_CODE"
              :value="item.AREA_CODE"
              :label="item.AREA_NAME"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" v-if="init.street">
          <el-select v-model="dataSet.streetValue">
            <el-option
              v-for="item in dataSet.streetData"
              :key="item.STREET_CODE"
              :value="item.STREET_CODE"
              :label="item.STREET_NAME"
            ></el-option>
          </el-select>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import { onBeforeMount, reactive } from "@vue/composition-api";
import { GetCityPicker } from "@/api/common";
export default {
  name: "CityPicker",
  props: {
    cityPickerLevel: {
      type: Array,
      default: () => []
    },
    cityPickerData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    // 初始化省市区街联动
    const init = reactive({
      province: false,
      city: false,
      area: false,
      street: false
    });
    //时间方法
    const dataSet = reactive({
      provinceValue: "",
      provinceData: [],
      cityValue: "",
      cityData: [],
      areaValue: "",
      areaData: [],
      streetValue: "",
      streetData: []
    });

    /**
     * 初始化
     */
    const initCityPicker = () => {
      let initData = props.cityPickerLevel;
      if (initData.length == 0) {
        init.forEach(item => {
          init[item] = true;
        });
      } else {
        initData.forEach(item => {
          init[item] = true;
        });
      }
    };

    /**
     * 获取省份
     */
    const getProvince = () => {
      GetCityPicker({ type: "province" })
        .then(result => {
          dataSet.provinceData = result.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 选择省份，获取城市
     */
    const handlerProvince = val => {
      resetValue({ type: "city" });
      GetCityPicker({ type: "city", province_code: val })
        .then(result => {
          dataSet.cityData = result.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 选择城市，获取区县
     */
    const handlerCity = val => {
      resetValue({ type: "area" });
      GetCityPicker({ type: "area", city_code: val })
        .then(result => {
          dataSet.areaData = result.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 选择区县，获取街道
     */
    const handlerArea = val => {
      resetValue({ type: "street" });
      GetCityPicker({ type: "street", area_code: val })
        .then(result => {
          dataSet.streetData = result.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     *重置
     */
    const resetValue = params => {
      const valueJson = {
        city: ["cityValue", "areaValue", "streetValue"],
        area: ["areaValue", "streetValue"],
        street: ["streetValue"]
      };

      // 清空指定的key值
      const arrObj = valueJson[params.type];
      arrObj.forEach(item => {
        dataSet[item] = "";
      });
    };

    onBeforeMount(() => {
      // 初始化
      initCityPicker();
      // 获取省份
      getProvince();
    });

    return {
      dataSet,
      getProvince,
      handlerProvince,
      handlerCity,
      handlerArea,
      resetValue,
      init
    };
  }
};
</script>
<style lang="scss" scoped>
.overflow-h {
  overflow: hidden;
}
</style>
