<template>
  <div>
    <!-- 表头 -->
    <el-form>
      <el-row :gutter="10">
        <!-- 分类 -->
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
          ><div class="label-warp category">
            <label for="">分类:</label>
            <div class="warp-content">
              <el-select v-model="categoryValue" placeholder="请选择">
                <el-option
                  v-for="item in options.category"
                  :key="item.id"
                  :label="item.category_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div></div
        ></el-col>
        <!-- 日期 -->
        <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9"
          ><div class="label-warp date">
            <label for="">日期: </label>
            <div class="warp-content">
              <el-date-picker
                v-model="dateValue"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
              >
              </el-date-picker>
            </div></div
        ></el-col>
        <!-- 关键字 -->
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"
          ><div class="label-warp key-work">
            <label for="">关键字:</label>
            <div class="warp-content">
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-select
                  class="select-keyword"
                  v-model="searchKey"
                  slot="prepend"
                >
                  <el-option
                    v-for="item in searchOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-input>
            </div></div
        ></el-col>
        <!-- 搜索 -->
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"
          ><div class=" ">
            <el-button type="danger">搜索</el-button>
          </div></el-col
        >
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"
          ><div class=" ">
            <el-button type="danger" @click="dialogInfo = true">新增</el-button>
          </div></el-col
        >
      </el-row>
      <el-row><el-col> </el-col></el-row>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border class="table-content">
      <el-table-column type="selection" align="center" width="45">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        min-width="500px"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="category"
        label="类别"
        width="135px"
      >
      </el-table-column>
      <el-table-column align="center" prop="date" label="日期" width="237">
      </el-table-column>
      <el-table-column align="center" prop="user" label="管理员" width="115">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px"
        ><template>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row class="paging">
      <el-col :span="14">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="10"
        ><el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,sizes, prev, pager, next,jumper"
          :total="1000"
          class="page-display"
        >
        </el-pagination
      ></el-col>
    </el-row>

    <!-- 弹窗 -->
    <info-dialog
      :flag.sync="dialogInfo"
      :category="options.category"
    ></info-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import InfoDialog from "./dialog/InfoDialog";
import { global } from "@/utils/global";
// import { common } from "@/api/common";

export default {
  name: "Info",
  components: {
    InfoDialog
  },
  setup(props, { root }) {
    const { confirm } = global();
    // 获取数据
    // const { getInfoCategory, categoryItem } = common();

    // 数据

    const dialogInfo = ref(false);
    const searchKey = ref("id");
    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKeyWork = ref("");

    const options = reactive({ category: [] });

    // 搜索关键字
    const searchOptions = reactive([
      { value: "id", label: "ID" },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const tableData = reactive([
      {
        title: "1111",
        category: "新闻",
        date: "2021-01-21",
        user: "王小虎"
      },
      {
        title: "1111",
        category: "新闻",
        date: "2021-01-21",
        user: "王小虎"
      }
    ]);

    // 方法
    const handleSizeChange = val => {
      console.log(val);
    };
    const handleCurrentChange = val => {
      console.log(val);
    };

    // 删除列表
    const deleteItem = () => {
      confirm({
        content: "确认删除当前信息",
        fn: confirmDelete,
        id: "111"
      });
    };
    // 批量删除
    const deleteAll = () => {
      confirm({
        content: "确认删除选中信息",
        fn: confirmDelete,
        id: "222"
      });
    };

    // 确认删除
    const confirmDelete = () => {
      console.log(1112324);
    };

    //
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          options.category = res;
        })
        .catch(err => {
          console.log(err);
        });
    };
    onMounted(() => {
      // vue3.0
      getInfoCategory();

      //vuex
    });

    // 监听获取分类对象
    // watch(
    //   () => categoryItem.item,
    //   value => {
    //     options.category = value;
    //   }
    // );
    return {
      // 基础数据
      dialogInfo,
      searchKeyWork,
      tableData,
      searchKey,
      categoryValue,
      dateValue,

      // 对象数据
      options,
      searchOptions,

      // 方法
      handleSizeChange,
      handleCurrentChange,
      deleteItem,
      deleteAll,
      confirmDelete
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";

// 表头
.label-warp {
  &.category {
    @include labelDom(right, 40, 40);
  }

  &.date {
    @include labelDom(right, 60, 40);
  }

  &.key-work {
    @include labelDom(right, 60, 40);
    padding-right: 0px;
  }
}
.warp-content {
  padding-left: 10px;
}
.search-select {
  width: 80px;
  margin-right: 10px;
}
.el-col-keywork {
  padding-right: 0px !important;
}

// 表格内容
.select-keyword {
  width: 70px;
}

.table-content {
  margin-top: 20px;
}

// 分页
.paging {
  margin-top: 15px;
}
</style>
