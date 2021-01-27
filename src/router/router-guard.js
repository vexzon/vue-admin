import router from "./index";
import { getToKen, removeToKen, removeUserName } from "../utils/get-token";
import store from "../store/index";
const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToKen()) {
    // 路由动态添加，分配菜单，每个角色分配不同菜单
    if (to.path === "/login") {
      removeToKen();
      removeUserName();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      next();
    }
  } else {
    // 判断路由是否跳转
    whiteRouter.indexOf(to.path) !== -1 ? next() : next("/login");
  }

  // toKen
});
