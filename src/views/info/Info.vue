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
                type="daterange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
                format="yyyy 年 MM 月 dd 日   HH 时 mm 分 ss 秒"
                value-format="yyyy-MM-dd  HH:mm:ss"
              >
              </el-date-picker>
            </div></div
        ></el-col>
        <!-- 关键字 -->
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"
          ><div class="label-warp key-work">
            <label for="">关键字:</label>

            <div class="warp-content">
              <search-select :config="dataSet.configOption"></search-select>
              <!-- <el-input
                v-model="searchKeyWork"
                placeholder="请输入内容"
                class="input-with-select"
              >
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
              </el-input> -->
            </div>
          </div></el-col
        >
        <!-- 搜索 -->
        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"
          ><div class=" ">
            <el-button type="danger" @click="search">搜索</el-button>
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
    <el-table
      :data="tableData.item"
      border
      class="table-content"
      v-loading="dataSet.loadingData"
      @selection-change="handleSelectionChange"
    >
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
        prop="categoryId"
        label="类别"
        width="135px"
        :formatter="toCategory"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="日期"
        width="237"
        :formatter="toDate"
      >
      </el-table-column>
      <!-- <el-table-column align="center" prop="user" label="管理员" width="115">
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="300px"
        ><template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editInfo(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteItem(scope.row.id)"
            style="margin-right:10px"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="detailed(scope.row)"
            >编辑详情</el-button
          >
          <!-- <router-link
            :to="{
              name: 'InfoDetailed',
              query: { id: scope.row.id, title: scope.row.title }
            }"
            ><el-button size="mini" type="primary">编辑详情</el-button>
          </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row class="paging">
      <el-col :span="14">
        <el-button @click="deleteAll" type="danger">批量删除</el-button>
      </el-col>
      <el-col :span="10"
        ><el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataSet.total"
        >
        </el-pagination
      ></el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <info-dialog
      :flag.sync="dialogInfo"
      :category="options.category"
      @addGetListEmit="getList"
    ></info-dialog>
    <!-- 编辑弹窗 -->
    <edit-dialog
      :flag.sync="dialogInfoEdit"
      :category="options.category"
      :id="dataSet.infoId"
      @editGetListEmit="getList"
    ></edit-dialog>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import InfoDialog from "./dialog/AddDialog";
import EditDialog from "./dialog/EditDialog";
import { global } from "@/utils/global";
import { GetList, DeleteInfo } from "@/api/news";
import { timestampToTime } from "@/utils/common";
import SearchSelect from "@/components/select/SearchSelect";

export default {
  name: "Info",
  components: {
    InfoDialog,
    EditDialog,
    SearchSelect
  },
  setup(props, { root }) {
    const { confirm } = global();
    // 获取数据
    // const { getInfoCategory, categoryItem } = common();

    // 数据
    const dataSet = reactive({
      loadingData: false, //加载状态
      total: 0, //总页数
      deleteInfoId: "",
      infoId: "",
      configOption: {
        init: ["title", "id"]
      }
    });

    const dialogInfo = ref(false);
    const dialogInfoEdit = ref(false);
    const searchKey = ref("title");
    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKeyWork = ref("");

    const options = reactive({ category: [] });

    // 搜索关键字
    const searchOptions = reactive([
      {
        value: "title",
        label: "标题"
      },
      { value: "id", label: "ID" }
    ]);

    // 页码
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    // 表格数据
    const tableData = reactive({
      item: []
    });

    // 方法
    const handleSizeChange = val => {
      page.pageSize = val;
    };
    const handleCurrentChange = val => {
      page.pageNumber = val;

      getList();
    };

    // 搜索
    const search = () => {
      // let requsetData = formatDta();
      // console.log(requsetData);
      getList();
    };

    // 判断属性是否存在
    const formatDta = () => {
      let requsetData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      // 分类ID
      if (categoryValue.value) {
        requsetData.categoryId = categoryValue.value;
      }
      // 日期
      if (dateValue.value.length > 0) {
        requsetData.startTiem = dateValue.value[0];
        requsetData.endTime = dateValue.value[1];
      }
      // 关键字
      requsetData[searchKey.value] = searchKeyWork.value;
      return requsetData;
    };

    // 编辑数据
    const editInfo = id => {
      dataSet.infoId = id;
      dialogInfoEdit.value = true;
    };

    // 获取列表数据
    const getList = () => {
      // 单独处理数据

      let requsetData = formatDta();
      dataSet.loadingData = true; //加载状态
      GetList(requsetData)
        .then(res => {
          let resData = res.data.data;
          // 更新数据
          tableData.item = resData.data;
          // 页码数量
          dataSet.total = resData.total;
          // 加载状态
          dataSet.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          dataSet.loadingData = false;
        });
    };

    //
    const detailed = data => {
      root.$store.commit("infoDetailed/updateStateValue", {
        id: {
          value: data.id,
          session: true,
          sessionKey: "infoID"
        },
        title: {
          value: data.title,
          session: true,
          sessionKey: "infoTitle"
        }
      });
      root.$router.push({
        // 跳转页面
        // path: `/infoDetailed/${data.id}/${data.title}`
        name: "InfoDetailed",
        params: {
          id: data.id,
          title: data.title
        }
      });
    };

    /*
删除数据
*/

    // 删除列表提示信息
    const deleteItem = id => {
      dataSet.deleteInfoId = [id];

      confirm({
        content: "确认删除当前信息",
        fn: confirmDelete
      });
    };
    // 批量删除提示信息
    const deleteAll = () => {
      if (!dataSet.deleteInfoId || dataSet.deleteInfoId.length == 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "warning"
        });
        return false;
      }
      confirm({
        content: "确认删除选中信息",
        fn: confirmDelete
      });
    };

    // 确认删除
    const confirmDelete = () => {
      DeleteInfo({ id: dataSet.deleteInfoId })
        .then(res => {
          dataSet.deleteInfoId = "";
          getList();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    };

    //获取分类
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

    // 删除全部选中的
    const handleSelectionChange = val => {
      let dataId = val.map(item => item.id);
      dataSet.deleteInfoId = dataId;
    };

    // 生命周期
    onMounted(() => {
      // 获取分类
      getInfoCategory();
      // 获取列表
      getList();
    });

    // 转换日期格式
    const toDate = row => {
      return timestampToTime(row.createDate);
    };

    //转换类型
    const toCategory = row => {
      let categoryName = options.category.filter(
        item => item.id == row.categoryId
      )[0].category_name;
      return categoryName;
    };
    // 监听获取分类对象
    // watch(
    //   () => categoryItem.item,
    //   value => {
    //     options.category = value;
    //   }
    // );
    return {
      // 基础数据
      dataSet,
      dialogInfo,
      dialogInfoEdit,
      searchKeyWork,
      tableData,
      searchKey,
      categoryValue,
      dateValue,

      // 对象数据
      options,
      searchOptions,
      page,

      // 方法
      handleSizeChange,
      handleCurrentChange,
      detailed,
      search,
      formatDta,
      getList,
      deleteItem,
      deleteAll,
      confirmDelete,
      toDate,
      toCategory,
      handleSelectionChange,

      editInfo //编辑
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
.el-select.select-category {
  width: 80px;
}
// 表格内容

.table-content {
  margin-top: 20px;
}

// 分页
.paging {
  margin-top: 15px;
}
</style>
