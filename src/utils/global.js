// vue 3.0
// import { MessageBox } from "element-ui";
import { ref } from "@vue/composition-api";
import { MessageBox } from "element-ui";
export function global() {
  const str = ref("");
  const confirm = params => {
    MessageBox.confirm(params.content, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        str.value = params.id || "";
        params.fn && params.fn(params.id || "");
        // this.$message({
        //   type: "success",
        //   message: "删除成功!"
        // });
      })
      .catch(() => {
        params.catchFn && params.catchFn();
        // this.$message({
        //   type: "info",
        //   message: "已取消删除"
        // });
      });
  };

  return {
    str,
    confirm
  };
}

// vue2.0

// import { MessageBox } from "element-ui";
// export default {
//   install(Vue, options) {
//     Vue.prototype.confirm = params => {
//       MessageBox.confirm(params.content, "提示", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: "warning",
//         center: true
//       })
//         .then(() => {
//           this.$message({
//             type: "success",
//             message: "删除成功!"
//           });
//         })
//         .catch(() => {
//           this.$message({
//             type: "info",
//             message: "已取消删除"
//           });
//         });
//       console.log(options);
//     };
//   }
// };

// vue 插件
