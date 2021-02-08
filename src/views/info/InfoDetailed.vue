<template>
  <div>
    <el-form ref="form" :model="dataSet.form" label-width="120px">
      <!-- 信息分类 -->
      <el-form-item label="信息分类：">
        <el-select v-model="dataSet.form.categoryId">
          <el-option
            v-for="item in dataSet.category"
            :key="item.id"
            :value="item.id"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 新闻标题 -->
      <el-form-item label="新闻标题：">
        <el-input v-model="dataSet.form.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        缩略图
      </el-form-item>
      <el-form-item label="发布日期：">
        <el-date-picker
          v-model="dataSet.form.dataTime"
          placeholder="选择日期"
          disabled
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容：">
        <quill-editor v-model="dataSet.form.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button
          type="parimary"
          :loading="dataSet.submitLoading"
          @click="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/composition-api";
import { GetList, EditInfo } from "@/api/news";
import { timestampToTime } from "@/utils/common";

// 富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "InfoDetailed",
  components: { quillEditor },
  setup(props, { root }) {
    const dataSet = reactive({
      category: [],
      id: root.$route.params.id || root.$store.getters["infoDetailed/infoID"],
      title:
        root.$route.params.title ||
        root.$store.getters["infoDetailed/infoTitle"],
      submitLoading: false,
      form: {
        categoryId: "",
        title: "",
        dataTime: "",
        content: ""
      }
    });

    // 方法
    // 获取信息分类
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          dataSet.category = res;
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 获取当前ID的信息
    const getInfo = () => {
      let requsetData = {
        pageNumber: 1,
        pageSize: 1,
        id: dataSet.id
      };
      GetList(requsetData).then(res => {
        let resData = res.data.data.data[0];

        dataSet.form = {
          categoryId: resData.categoryId,
          title: resData.title,
          content: resData.content,
          dataTime: timestampToTime(resData.createDate)
        };
      });
    };
    // 提交数据
    const submit = () => {
      let requsetData = {
        id: dataSet.id,
        categoryId: dataSet.form.categoryId,
        title: dataSet.form.title,
        content: dataSet.form.content
      };

      dataSet.submitLoading = true;
      EditInfo(requsetData)
        .then(res => {
          let resData = res.data;
          console.log(resData);
          root.$message({
            message: resData.message,
            type: "success"
          });
          dataSet.submitLoading = false;
        })
        .catch(err => {
          console.log(err);
          dataSet.submitLoading = false;
        });
    };
    //生命周期
    onMounted(() => {
      getInfoCategory();
      getInfo();
    });
    return {
      dataSet,
      submit
    };
  }
};
</script>
<style scoped></style>
