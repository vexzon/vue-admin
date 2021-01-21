import router from "./index";
import { getToKen } from "../utils/app";

const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToKen()) {
    // 路由动态添加，分配菜单，每个角色分配不同菜单
    console.log("存在");
  } else {
    console.log("不存在");
    // 判断路由是否跳转
    whiteRouter.indexOf(to.path) !== -1 ? next() : next("/login");
  }

  // toKen
});
