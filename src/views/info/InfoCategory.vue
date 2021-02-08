<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({ type: 'categoryFirstAdd' })"
      >添加一级分类</el-button
    >
    <el-divider></el-divider>
    <div>
      <el-row :gutter="30">
        <el-col :span="10"
          ><div
            class="category"
            v-for="firstItem in category.item"
            :key="firstItem.id"
          >
            <!-- 一级分类 -->
            <h4>
              <i class="el-icon-plus"></i>
              {{ firstItem.category_name }}
              <div class="button-group">
                <el-button
                  size="mini"
                  round
                  type="success"
                  @click="
                    editCategory({
                      categoryName: firstItem,
                      type: 'categoryFirstEdit'
                    })
                  "
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  round
                  type="primary"
                  @click="
                    handlerAddChildren({
                      categoryName: firstItem,
                      type: 'categoryChildrenEdit'
                    })
                  "
                  >添加子集</el-button
                >
                <el-button
                  size="mini"
                  round
                  type="danger"
                  @click="deleteFirstCategoryConfirm(firstItem.id)"
                  >删除</el-button
                >
              </div>
            </h4>
            <!-- 子集分类 -->
            <ul v-if="firstItem.children">
              <li v-for="childItem in firstItem.children" :key="childItem.id">
                {{ childItem.category_name }}
                <div class="button-group">
                  <el-button size="mini" round type="success">编辑</el-button>
                  <el-button size="mini" round type="danger">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <!-- 添加删除分类模块 -->
        <el-col :span="14">
          <h4 class="menu-title" ref="categoryEditer">一级分类编辑</h4>
          <el-form
            :label-position="labelPosition"
            label-width="140px"
            :model="form"
            class="category-editer"
          >
            <el-form-item label="一级分类名称：" v-if="categoryFirst">
              <el-input
                v-model="form.categoryName"
                :disabled="firstDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：" v-if="categoryChildren">
              <el-input
                v-model="form.seccategoryName"
                :disabled="secondDisabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="editer-button"
                type="danger"
                @click="categorySubmit"
                :loading="submitLoading"
                :disabled="submitDisabled"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref, watch } from "@vue/composition-api";
import {
  AddFirstCategory,
  DeleteCategory,
  EditCategory,
  AddChildrenCategory
} from "@/api/news";
import { global } from "@/utils/global";
import { common } from "@/api/common";
export default {
  name: "InfoCategory",
  setup(props, { root }) {
    // global
    const { confirm } = global();
    // 获取接口数据
    const { getInfoCategoryAll, categoryItem } = common();
    /*
    基础类型
     */
    const submitButtonType = ref("");
    const labelPosition = ref("right");
    const categoryFirst = ref(true);
    const categoryChildren = ref(true);
    const submitLoading = ref(false);
    const firstDisabled = ref(true);
    const secondDisabled = ref(true);
    const submitDisabled = ref(true);
    const deleteId = ref("");

    /*
    对象类型
     */
    const form = reactive({
      categoryName: "",
      seccategoryName: ""
    });

    const category = reactive({
      item: [],
      current: []
    });

    /*
    方法
     */
    const categorySubmit = () => {
      // 判断类型编辑或修改的类型
      if (submitButtonType.value == "categoryFirstAdd") {
        addFirstCatgory();
      }
      if (submitButtonType.value == "categoryFirstEdit") {
        editFirstCategory();
      }
      if (submitButtonType.value == "categoryChildrenEdit") {
        addChildrenCategory();
      }
    };

    const addFirstCatgory = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "warning"
        });
        return false;
      }

      // 按钮加载状态
      submitLoading.value = true;
      AddFirstCategory({ categoryName: form.categoryName })
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              message: res.data.message,
              type: "success"
            });
            category.item.push(res.data.data);
          }
          submitLoading.value = false;
          // refs.categoryEditer.resetFields();
          form.categoryName = "";
          form.seccategoryName = "";
        })
        .catch(err => {
          console.log(err);
          submitLoading.value = false;
        });
    };
    // 添加一级分类
    const addFirst = params => {
      submitButtonType.value = params.type;
      categoryFirst.value = true;
      categoryChildren.value = false;
      firstDisabled.value = false;
      submitDisabled.value = false;
      form.categoryName = "";
    };

    //添加子集

    const handlerAddChildren = params => {
      // 存储数据
      category.current = params.categoryName.id;
      // 更新显示一级分类文本
      form.categoryName = params.categoryName.category_name;
      // 更新确定按钮类型
      submitButtonType.value = params.type;
      // 启用子集输入框
      secondDisabled.value = false;
      // 启用按钮
      submitDisabled.value = false;
      // 显示二级分类输入框
      categoryChildren.value = true;
      // 禁用一级输入框
      firstDisabled.value = true;
      // 隐藏一级输入框W
    };

    //
    const addChildrenCategory = () => {
      if (!form.seccategoryName) {
        root.$message({
          message: "子集不能为空",
          type: "wraning"
        });
        return false;
      }
      let requsetDate = {
        categoryName: form.seccategoryName,
        parentId: category.current
      };
      AddChildrenCategory(requsetDate)
        .then(res => {
          let resData = res.data;
          root.$message({
            message: resData.message,
            type: "success"
          });
          form.seccategoryName = "";
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 删除一级分类
    const deleteFirstCategoryConfirm = categoryId => {
      deleteId.value = categoryId;
      confirm({
        content: "确认删除当前信息",
        fn: deleteCategory,
        catchFn: () => {
          deleteId.value = "";
        }
      });
    };

    // 调用删除分类接口
    const deleteCategory = () => {
      DeleteCategory({ categoryId: deleteId.value })
        .then(res => {
          console.log(res);
          let newDate = category.item.filter(item => item.id != deleteId.value);
          category.item = newDate;
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 编辑一级分类
    const editCategory = params => {
      categoryFirst.value = true;
      firstDisabled.value = false;
      categoryChildren.value = false;
      submitDisabled.value = false;
      submitButtonType.value = params.type;
      form.categoryName = params.categoryName.category_name;
      // 存储当前的数据对象
      category.current = params.categoryName;
    };

    // 调用修改分类接口
    const editFirstCategory = () => {
      if (category.current.length == 0) {
        root.$message({
          message: "未选择分类",
          type: "warning"
        });
        return false;
      }
      let requsetDate = {
        id: category.current.id,
        categoryName: form.categoryName
      };
      EditCategory(requsetDate)
        .then(res => {
          let resDate = res.data;
          root.$message({
            message: resDate.message,
            type: "success"
          });
          // let data = category.item.filter(item => {
          //   return item.id == category.current.id;
          // });
          category.current.category_name = resDate.data.data.categoryName;
          // data[0].category_name = resDate.data.data.categoryName;
          // 清空输入框
          form.categoryName = "";
          category.current = [];
        })
        .catch(err => {
          console.log(err);
        });
    };

    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );
    // 生命周期,挂载完成执行
    onMounted(() => {
      getInfoCategoryAll();
    });

    return {
      // 基础类型
      labelPosition,
      categoryFirst,
      categoryChildren,
      submitLoading,
      firstDisabled,
      secondDisabled,
      submitDisabled,

      // 对象类型
      form,
      category,

      // 方法
      categorySubmit,
      addFirstCatgory,
      addFirst,
      handlerAddChildren,
      deleteFirstCategoryConfirm,
      deleteCategory,
      editCategory,
      addChildrenCategory
    };
  }
};
</script>
<style lang="scss" scoped>
li {
  list-style-type: none;
}
ul,
h4 {
  padding: 0;
  margin: 0;
}

// 添加分类
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
  margin-bottom: 30px;
}
.category {
  position: relative;
  line-height: 44px;

  &:first-child {
    &::before {
      top: 20px;
    }
  }

  &:last-child {
    &::before {
      bottom: 21px;
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 32px;
    left: 22px;
    top: 0;
    bottom: 0;
    border-left: 1px dotted #ccc;
  }
  h4 {
    padding-left: 40px;
    position: relative;

    i {
      position: absolute;
      border: 1px solid #000;
      color: #000;
      font-size: 5px;
      top: 15px;
      left: 15px;
    }
  }
  li {
    padding-left: 36px;
    margin-left: 24px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 32px;
      left: 0;
      top: 22px;
      border-bottom: 1px dotted #ccc;
    }
  }
  h4,
  li {
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  z-index: 2;
  font-size: 12px;
  top: 0;
}

// 分类编辑
.category-editer {
  width: 500px;
}
.editer-button {
  margin-left: 140px;
  width: 150px;
  margin-top: 20px;
}
</style>
