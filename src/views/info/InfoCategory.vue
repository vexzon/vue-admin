<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <el-divider></el-divider>
    <div>
      <el-row :gutter="30">
        <el-col :span="10"
          ><div class="category">
            <h4>
              <i class="el-icon-plus"></i>
              新闻
              <div class="button-group">
                <el-button size="mini" round type="success">编辑</el-button>
                <el-button size="mini" round type="primary">添加子集</el-button>
                <el-button size="mini" round type="danger">删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="button-group">
                  <el-button size="mini" round type="success">编辑</el-button>
                  <el-button size="mini" round type="danger">删除</el-button>
                </div>
              </li>
              <li>国外</li>
              <li>信息</li>
            </ul>
          </div>
          <div class="category">
            <h4><i class="el-icon-plus"></i>新闻</h4>
            <ul>
              <li>国内</li>
              <li>国外</li>
              <li>信息</li>
            </ul>
          </div></el-col
        >
        <el-col :span="14">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form
            :label-position="labelPosition"
            label-width="140px"
            :model="formLabelAlign"
            class="category-editer"
          >
            <el-form-item label="一级分类名称：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-for-item>
              <el-button class="editer-button" type="danger">提交</el-button>
            </el-for-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup() {
    const labelPosition = ref("right");
    const formLabelAlign = reactive({
      name: "adafhjoasj"
    });
    return {
      labelPosition,
      formLabelAlign
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
  background-color: f3f3f3;
  padding-left: 22px;
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
